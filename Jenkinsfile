pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  environment {
    // AWS / ECR
    AWS_REGION = 'ap-northeast-2'
    AWS_ACCOUNT_ID = credentials('aws-account-id')
    AWS_ACCESS_KEY_ID = credentials('aws-access-key')
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')

    PROD_REPOSITORY_NAME = 'learney-eks'
    DEV_REPOSITORY_NAME = 'learney-dev'

    // Helm chart repo (옵션 배포)
    CHART_REPO_URL = 'https://github.com/Artificial-Society/lesser-plus-config.git'
    CHART_REPO_DIR = 'learney-helm-charts'
    NAMESPACE = 'service-ns'

    // Build secrets / env
    NPM_TOKEN = credentials('NEXT_PUBLIC_NPM_TOKEN')

    // 현재 프로젝트에서 실제 사용하는 최소 환경변수
    NEXT_PUBLIC_NOTION_TOKEN = credentials('NEXT_PUBLIC_NOTION_TOKEN')
    NEXT_PUBLIC_NOTION_NEWS_DATABASE_ID = credentials('NEXT_PUBLIC_NOTION_NEWS_DATABASE_ID')
    NEXT_PUBLIC_NOTION_FAQ_DATABASE_ID = credentials('NEXT_PUBLIC_NOTION_FAQ_DATABASE_ID')
    

    // 환경별로 달라지는 URL
    PROD_NEXT_PUBLIC_LMS_URL = credentials('PROD_NEXT_PUBLIC_LMS_URL')
    DEV_NEXT_PUBLIC_LMS_URL = credentials('DEV_NEXT_PUBLIC_LMS_URL')
    PROD_NEXT_PUBLIC_APP_URL = credentials('PROD_NEXT_PUBLIC_APP_URL')
    DEV_NEXT_PUBLIC_APP_URL = credentials('DEV_NEXT_PUBLIC_APP_URL')
    PROD_NEXT_PUBLIC_GRAPHQL_API_BASE_URL = credentials('PROD_NEXT_PUBLIC_GRAPHQL_API_BASE_URL')
    DEV_NEXT_PUBLIC_GRAPHQL_API_BASE_URL = credentials('DEV_NEXT_PUBLIC_GRAPHQL_API_BASE_URL')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Set Variables') {
      when {
        anyOf { branch 'main'; branch 'develop' }
      }
      steps {
        script {
          env.COMMIT_SHORT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()

          if (env.BRANCH_NAME == 'main') {
            env.IMAGE_TAG = "learney-${env.COMMIT_SHORT}"
            env.REPOSITORY_NAME = env.PROD_REPOSITORY_NAME
            env.NEXT_PUBLIC_LMS_URL = env.PROD_NEXT_PUBLIC_LMS_URL
            env.NEXT_PUBLIC_APP_URL = env.PROD_NEXT_PUBLIC_APP_URL
            env.NEXT_PUBLIC_GRAPHQL_API_BASE_URL = env.PROD_NEXT_PUBLIC_GRAPHQL_API_BASE_URL
            env.VALUES_YAML = 'values-prod.yaml'
            env.EKS_CLUSTER_NAME = 'learney-eks-prod'
          } else {
            env.IMAGE_TAG = "learney-dev-${env.BUILD_NUMBER}"
            env.REPOSITORY_NAME = env.DEV_REPOSITORY_NAME
            env.NEXT_PUBLIC_LMS_URL = env.DEV_NEXT_PUBLIC_LMS_URL
            env.NEXT_PUBLIC_APP_URL = env.DEV_NEXT_PUBLIC_APP_URL
            env.NEXT_PUBLIC_GRAPHQL_API_BASE_URL = env.DEV_NEXT_PUBLIC_GRAPHQL_API_BASE_URL
            env.VALUES_YAML = 'values-dev.yaml'
            env.EKS_CLUSTER_NAME = 'learney-eks-dev'
          }

          echo "[ENV] BRANCH=${env.BRANCH_NAME}"
          echo "[ENV] IMAGE_TAG=${env.IMAGE_TAG}"
          echo "[ENV] REPOSITORY=${env.REPOSITORY_NAME}"
        }
      }
    }

    stage('Create Next Env File') {
      when {
        anyOf { branch 'main'; branch 'develop' }
      }
      steps {
        sh '''
          cat > .env.production <<EOF
NEXT_PUBLIC_NOTION_TOKEN=${NEXT_PUBLIC_NOTION_TOKEN}
NEXT_PUBLIC_NOTION_NEWS_DATABASE_ID=${NEXT_PUBLIC_NOTION_NEWS_DATABASE_ID}
NEXT_PUBLIC_NOTION_FAQ_DATABASE_ID=${NEXT_PUBLIC_NOTION_FAQ_DATABASE_ID}
NEXT_PUBLIC_GRAPHQL_API_BASE_URL=${NEXT_PUBLIC_GRAPHQL_API_BASE_URL}
NEXT_PUBLIC_LMS_URL=${NEXT_PUBLIC_LMS_URL}
NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
NODE_ENV=production
EOF
        '''
      }
    }

    stage('Docker Build & Push') {
      when {
        anyOf { branch 'main'; branch 'develop' }
      }
      steps {
        sh '''
          set -eux
          aws ecr get-login-password --region "$AWS_REGION" \
            | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

          # BuildKit secret 사용 (Dockerfile에서 id=npm_token 읽음)
          DOCKER_BUILDKIT=1 docker build \
            --secret id=npm_token,env=NPM_TOKEN \
            -t "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:$IMAGE_TAG" \
            .

          docker push "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:$IMAGE_TAG"
        '''
      }
    }

    stage('Checkout Helm Chart Repo') {
      when {
        anyOf { branch 'main'; branch 'develop' }
      }
      steps {
        sh '''
          rm -rf "$CHART_REPO_DIR"
          git clone "$CHART_REPO_URL" "$CHART_REPO_DIR"
        '''
      }
    }

    stage('Helm Deploy') {
      when {
        anyOf { branch 'main'; branch 'develop' }
      }
      steps {
        script {
          awsEksUpdate(env.AWS_REGION, env.EKS_CLUSTER_NAME)

          def digest = sh(
            script: """
              aws ecr describe-images \
                --repository-name ${REPOSITORY_NAME} \
                --image-ids imageTag=${IMAGE_TAG} \
                --query 'imageDetails[0].imageDigest' \
                --output text
            """,
            returnStdout: true
          ).trim()

          if (!digest || digest == 'None') {
            error("Failed to resolve image digest for tag: ${IMAGE_TAG}")
          }

          sh """
            yq -i '.services.appService.image.repository =
              "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPOSITORY_NAME}"' \
              ${CHART_REPO_DIR}/charts/deployment/${VALUES_YAML}

            yq -i '.services.appService.image.digest = "${digest}"' \
              ${CHART_REPO_DIR}/charts/deployment/${VALUES_YAML}
          """

          sh """
            cd ${CHART_REPO_DIR}
            git add charts/deployment/${VALUES_YAML}
            git commit -m "deploy(${BRANCH_NAME}): update image digest" || true
            git push origin main
          """

          sh """
            helm upgrade --install learney ${CHART_REPO_DIR}/charts/deployment \
              -n ${NAMESPACE} \
              -f ${CHART_REPO_DIR}/charts/deployment/values.yaml \
              -f ${CHART_REPO_DIR}/charts/deployment/${VALUES_YAML} \
              --wait
          """
        }
      }
    }

    stage('Health Check') {
      when {
        anyOf { branch 'main'; branch 'develop' }
      }
      steps {
        sh 'kubectl rollout status deployment/app-service -n ${NAMESPACE} --timeout=180s || true'
      }
    }
  }

  post {
    always {
      sh 'rm -f .env.production || true'
    }
  }
}

def awsEksUpdate(region, clusterName) {
  sh "aws eks update-kubeconfig --name ${clusterName} --region ${region}"
}

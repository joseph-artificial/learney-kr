import type { ReactNode } from "react";
import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";

const GROWTH_MINT = "#F6FEFC";

function CardMockupArea({ children }: { children: ReactNode }) {
  return (
    <Box
      bg={GROWTH_MINT}
      position="relative"
      h={{ base: "360px", lg: "425px" }}
      pt={{ base: 8, lg: "74px" }}
      px={{ base: 6, lg: "38px" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      {children}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h={{ base: "12%", lg: "10%" }}
        pointerEvents="none"
        bgGradient={`linear(to-t, ${GROWTH_MINT} 0%, rgba(246,254,252,0.92) 28%, rgba(246,254,252,0) 100%)`}
      />
    </Box>
  );
}

function GradientTitle() {
  return (
    <Text color="#101828" fontWeight={600} fontSize={{ base: "36px", lg: "48px" }} lineHeight={{ base: "48px", lg: "60px" }} textAlign="center">
      <Box as="span" bgGradient="linear(to-r, #43D1BC 0%, #009B84 100%)" bgClip="text" color="transparent">
        데이터
      </Box>{" "}
      로 확인하는 문해력 성장
    </Text>
  );
}


function CardBottom({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Box
      bg="white"
      px={{base: '18.5px', lg: '30px'}}
      py={{base: '16px', lg: '40px'}}
      borderBottomRadius="20px"
      borderTopRadius="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack gap={{base: '9.5px', lg: '16px'}} align="center" textAlign="center" w="526px">
        <Text fontSize={{base: '16px', lg: '24px'}} fontWeight={700} color="#1D2939" lineHeight={{base: '22px', lg: '30px'}}>
          {title}
        </Text>
        <Text fontSize={{base: '14px', lg: '22px'}} fontWeight={500} color="#475467" lineHeight={{base: '20px', lg: '32px'}} whiteSpace="pre-line">
          {description}
        </Text>
      </Stack>
    </Box>
  );
}

interface ApplyTargetGrowthSectionProps {
  title: ReactNode;
  description: string;
}
export function ApplyTargetGrowthSection(props: ApplyTargetGrowthSectionProps) {
  const { title, description } = props;
  const leftCardImage = "/images/apply-target/elementary-growth/ElementaryGrowth1.png";
  const rightCardImage = "/images/apply-target/elementary-growth/ElementaryGrowth2.png";
  return (
    <Box bg="gray.25" py={{ base: '50px', lg: "120px" }} px={{ base: 4, lg: 6 }}>
      <Stack maxW="1200px" mx="auto" gap={15} align="center">
        <Stack gap={{base: '24px', lg: 5}} align="center" textAlign="center" data-aos="fade-up">
          {title}
          <Text
            color="#667085"
            fontWeight={500}
            fontSize={{ base: "14px", lg: "28px" }}
            lineHeight={{ base: "22px", lg: "40px" }}
            textAlign="center"
            whiteSpace="pre-line"
          >
            {description}
          </Text>
        </Stack>

        <Flex gap={6} direction={{ base: "column", lg: "row" }} w="full" justify="center">
          <Box
            flex={1}
            maxW={{ base: "100%", lg: "588px" }}
            h={{ base: "auto", lg: "615px" }}
            display="flex"
            flexDirection="column"
            overflow="hidden"
            borderRadius="20px"
            boxShadow="0px 0px 15px 0px rgba(0,0,0,0.06)"
            bg="white"
            data-aos="fade-right"
            data-aos-delay="60"
          >
            <CardMockupArea>
              <Image
                src={leftCardImage}
                alt=""
                maxW="100%"
                maxH="100%"
                w="auto"
                h="auto"
                objectFit="contain"
                objectPosition="center"
              />
            </CardMockupArea>
            <CardBottom
              title="정오표 & 리포트"
              description={"정오표에서 학생별 정답 여부를 한눈에 확인하고,\n리포트에서 평균 점수·소요 시간·참여도 변화를 추적해요."}
            />
          </Box>

          <Box
            flex={1}
            maxW={{ base: "100%", lg: "588px" }}
            h={{ base: "auto", lg: "615px" }}
            display="flex"
            flexDirection="column"
            overflow="hidden"
            borderRadius="20px"
            boxShadow="0px 0px 15px 0px rgba(0,0,0,0.06)"
            bg="white"
            data-aos="fade-left"
            data-aos-delay="120"
          >
            <CardMockupArea>
              <Image
                src={rightCardImage}
                alt=""
                maxW="100%"
                maxH="100%"
                w="auto"
                h="auto"
                objectFit="contain"
                objectPosition="center"
              />
            </CardMockupArea>
            <CardBottom
              title="주목할 학생"
              description={"점수가 떨어진 아이, 학습을 안 한 아이는\n'주목할 학생'으로 표시되어 빠짐없이 챙길 수 있어요."}
            />
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}

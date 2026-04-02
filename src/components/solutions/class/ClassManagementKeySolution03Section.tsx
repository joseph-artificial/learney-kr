import { Box, Flex, Stack, Text } from "@chakra-ui/react";

const LeftFeatureCard = (
  <Box
    border="2px solid #EBEBEB"
    borderRadius="20.84px"
    overflow="hidden"
    boxShadow="0px 0px 27.276px 0px rgba(0,0,0,0.05)"
    bg="transparent"
  >
    <Box
      bg="white"
      border="1.042px solid #EAECF0"
      borderBottom="1.042px solid #EAECF0"
      borderRadius="20.834px"
      
      pt="20.834px"
      pb="20.834px"
    >
      <Flex borderBottom="1.042px solid #EAECF0" flexDirection={'column'} px="20.834px">
        <Flex position="relative" w="41.668px" h="41.668px" mb="12px" alignItems={'center'} justifyContent={'center'}>
          <Box position="absolute" inset="0" bg="#CCFBEF" border="6.25px solid #F0FDF9" borderRadius="28px" />
          <Flex position="absolute" left="7.29px" top="7.29px" w="21.703px" h="21.703px" overflow="hidden" justifyContent={'center'} alignItems={'center'}>
            <Box as="img" src="/images/apply-target/elementary-feature-intro/user.png" alt="" w="100%" h="100%" mt={'5px'} ml={'5px'} />
          </Flex>
        </Flex>

        <Text color="#344054" fontWeight="600" fontSize="18.751px" lineHeight="29.168px" mb="16px">
          개인별 맞춤 학습
        </Text>

        <Flex gap="12.501px" mb="18px" >
          {[
            { label: "자습 시간" },
            { label: "학생 간 수준 차이가 클 때" },
          ].map((b) => (
            <Flex
              key={b.label}
              bg="white"
              border="1.042px solid #D0D5DD"
              borderRadius="8px"
              px="8.334px"
              py="4.167px"
              boxShadow="0px 1.042px 2.083px 0px rgba(16,24,40,0.05)"
              align="center"
              gap="8px"
            >
              <Box w="12.501px" h="12.501px" overflow="hidden">
                <Box as="img" src="/images/apply-target/elementary-feature-intro/check.png" alt="" w="12.5px" h="12.5px" objectFit="contain" />
              </Box>
              <Text color="#344054" fontWeight="500" fontSize="14.58px" lineHeight="20.834px" whiteSpace="nowrap">
                {b.label}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex flexDirection={'column'} px="20.834px" pt={'10px'}>
        <Text color="#475467" fontWeight="500" fontSize="16.667px" lineHeight="25.001px" mb="12px">
          매일 24:00에 학생 개인별 맞춤 콘텐츠를 AI가 추천합니다.
        </Text>

        <Box bg="#F9FAFB" borderRadius="12.501px" px="12.501px" py="12.501px">
          <Flex align="center" gap="8px" mb="12px">
            <Text color="#98A2B3" fontWeight="500" fontSize="16.667px" lineHeight="25.001px" whiteSpace="nowrap">
              오늘의 학습에 포함할 영역
            </Text>
          </Flex>

          <Flex gap="20px">
            {[
              { label: "읽기" },
              { label: "쓰기" },
              { label: "듣기·말하기" },
            ].map((c) => (
              <Flex key={c.label} align="center" gap="8px">
                <Box
                  w="20.834px"
                  h="20.834px"
                  borderRadius="6px"
                  bg="#F2F4F7"
                  border="1.042px solid #D0D5DD"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                >
                  <Box as="img" src="/images/apply-target/elementary-feature-intro/check2.png" alt="" w="18px" h="18px" objectFit="contain" />
                </Box>
                <Text color="#98A2B3" fontWeight="500" fontSize="16.667px" lineHeight="25.001px" whiteSpace="nowrap">
                  {c.label}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Box>
      </Flex>

      
    </Box>
  </Box>
);

const RightFeatureCard = (
  <Box
    border="2px solid #7FCFC2"
    borderRadius="20.84px"
    overflow="hidden"
    boxShadow="0px 0px 27.276px 0px rgba(0,0,0,0.05)"
    bg="transparent"
  >
    <Box bg="#F0FDF9" borderBottom="1.042px solid #EAECF0" px="20.834px" pt="20.834px" pb="20.834px">
      <Flex position="relative" w="41.668px" h="41.668px" mb="12px" alignItems={'center'} justifyContent={'center'}>
        <Box position="absolute" inset="0" bg="#CCFBEF" border="6.25px solid #F0FDF9" borderRadius="28px" />
        <Flex position="absolute" left="7.29px" top="7.29px" w="21.703px" h="21.703px" overflow="hidden" justifyContent={'center'} alignItems={'center'}>
          <Box as="img" src="/images/apply-target/elementary-feature-intro/users.png" alt="" w="100%" h="100%" mt={'5px'} ml={'5px'} />
        </Flex>
      </Flex>

      <Text color="#344054" fontWeight="600" fontSize="18.751px" lineHeight="29.168px" mb="16px">
        클래스 공통 학습
      </Text>

      <Flex gap="12.501px">
        {["수업 시간", "클래스 단위 학습"].map((label) => (
          <Flex
            key={label}
            bg="white"
            border="1.042px solid #D0D5DD"
            borderRadius="8px"
            px="8.334px"
            py="4.167px"
            boxShadow="0px 1.042px 2.083px 0px rgba(16,24,40,0.05)"
            align="center"
            gap="8px"
          >
            <Box w="12.501px" h="12.501px" overflow="hidden">
              <Box as="img" src="/images/apply-target/elementary-feature-intro/check.png" alt="" w="12.5px" h="12.5px" objectFit="contain" />
            </Box>
            <Text color="#344054" fontWeight="500" fontSize="14.58px" lineHeight="20.834px" whiteSpace="nowrap">
              {label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>

    <Box bg="#F0FDF9" px="20.834px" pt="10.417px" pb="20.834px">
      <Text color="#475467" fontWeight="500" fontSize="16.667px" lineHeight="25.001px" mb="12px">
        매일 24:00에 클래스에 같은 학습 콘텐츠를 AI가 추천합니다.
      </Text>

      <Box bg="#EDF1F0" borderRadius="12.501px" px="12.501px" py="12.501px">
        <Flex align="center" gap="8px" mb="12px">
          <Text color="#667085" fontWeight="500" fontSize="16.667px" lineHeight="25.001px" whiteSpace="nowrap">
            오늘의 학습에 포함할 영역
          </Text>
          
        </Flex>

        <Flex gap="20px">
          {[
            { label: "읽기" },
            { label: "쓰기" },
            { label: "듣기·말하기" },
          ].map((c) => (
            <Flex key={c.label} align="center" gap="8px">
              <Box
                w="20.834px"
                h="20.834px"
                borderRadius="6px"
                bg="#F0FDF9"
                border="1.042px solid #0E9384"
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
              >
                <Box as="img" src="/images/apply-target/elementary-feature-intro/check2.png" alt="" w="18px" h="18px" objectFit="contain" />
              </Box>
              <Text color="#0E9384" fontWeight="500" fontSize="16.667px" lineHeight="25.001px" whiteSpace="nowrap">
                {c.label}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  </Box>
);


export function ClassManagementKeySolution03Section() {
  return (
    <Box as="section" bg="white" py={{ base: 16, lg: "60px" }} px={{ base: 4, lg: 8 }}>
      <Stack maxW="1200px" mx="auto" gap={{ base: 8, lg: "40px" }}>
        <Stack gap={{ base: 5, lg: "25px" }} data-aos="fade-up">
          <Flex gap={4} wrap="wrap">
            <Flex h="36px" px="12px" py="6px" borderRadius="40px" bg="#E8F9EB" align="center">
              <Text color="#51A986" fontWeight="600" fontSize="16px" lineHeight="24px">
                솔루션 3
              </Text>
            </Flex>
            <Flex h="36px" px="12px" py="6px" borderRadius="40px" borderWidth="1px" borderColor="#51A986" align="center">
              <Text color="#51A986" fontWeight="600" fontSize="16px" lineHeight="24px">
                학습 배포 자동화
              </Text>
            </Flex>
          </Flex>

          <Text color="#1D2939" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "44px", lg: "60px" }}>
            03. 자동으로 시작하는{" "}
            <Box as="span" bgGradient="linear(to-r, #65E2B0, #00A98A)" bgClip="text" color="transparent">
              오늘의 학습
            </Box>
          </Text>

          <Box bg="#F9FAFB" borderRadius="20px" px={{ base: 5, lg: "30px" }} py={{ base: 5, lg: "30px" }}>
            <Stack gap={2.5}>
              <Text color="#1D2939" fontWeight="600" fontSize={{ base: "26px", lg: "22px" }} lineHeight={{ base: "36px", lg: "32px" }}>
                등록만 하면, 문해력 관리가 바로 시작돼요!
              </Text>
              <Text color="#475467" fontWeight="500" fontSize={{ base: "22px", lg: "22px", xl: "22px" }} lineHeight={{ base: "34px", lg: "32px", xl: "32px" }} whiteSpace="pre-line">
                {"AI가 학생의 수준을 분석하고, 매일 읽기·쓰기·듣기말하기 학습을 알아서 구성해줘요.\n반 전체에게 같은 학습을 주고 싶으면 '클래스 공통 학습'으로, 학생마다 다르게 주고 싶으면 '개인별 맞춤 학습'으로 설정해요."}
              </Text>
            </Stack>
          </Box>
        </Stack>

        {/* <Box bg="#F9FAFB" borderRadius="20px" h={{ base: "auto", lg: "480px" }} px={{ base: 4, lg: "70px" }} py={{ base: 8, lg: "66px" }}>
          <Flex position="relative" gap={{ base: 5, xl: 0 }} direction={{ base: "column", xl: "row" }} align="stretch" justify="space-between">
            <Stack
              w={{ base: "full", xl: "479px" }}
              borderWidth="2px"
              borderColor="#EBEBEB"
              borderRadius="20px"
              bg="white"
              overflow="hidden"
              zIndex={1}
            >
              <Stack p="20px" gap={2}>
                <Flex w="42px" h="42px" borderRadius="28px" bg="#CCFBEF" borderWidth="6px" borderColor="#F0FDF9" align="center" justify="center">
                  <Box as="img" src="/images/solutions/class-management/key-solution-03/icon-user.svg" alt="" w="21px" h="21px" />
                </Flex>
                <Text color="#344054" fontWeight="600" fontSize="19px" lineHeight="29px">
                  개인별 맞춤 학습
                </Text>
                <Flex gap={3} wrap="wrap">
                  <Tag label="자습 시간" />
                  <Tag label="학생 간 수준 차이가 클 때" />
                </Flex>
              </Stack>
              <Stack borderTopWidth="1px" borderColor="#EAECF0" pt="10px" px="20px" pb="20px" gap={4}>
                <Text color="#475467" fontWeight="500" fontSize="17px" lineHeight="25px">
                  매일 24:00에 학생 개인별 맞춤 콘텐츠를 AI가 추천합니다.
                </Text>
                <Stack bg="#F9FAFB" borderRadius="12px" p="12px" gap={2.5}>
                  <Text color="#98A2B3" fontWeight="500" fontSize="17px" lineHeight="25px">
                    오늘의 학습에 포함할 영역
                  </Text>
                  <Flex gap={5} wrap="wrap">
                    <AreaOption label="읽기" active={false} />
                    <AreaOption label="쓰기" active={false} />
                    <AreaOption label="듣기·말하기" active={false} />
                  </Flex>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              w={{ base: "full", xl: "479px" }}
              mt={{ base: 0, xl: "45px" }}
              borderWidth="2px"
              borderColor="#7FCFC2"
              borderRadius="20px"
              bg="#F0FDF9"
              overflow="hidden"
              position="relative"
              zIndex={2}
            >
              <Stack p="20px" gap={2}>
                <Flex w="42px" h="42px" borderRadius="28px" bg="#CCFBEF" borderWidth="6px" borderColor="#F0FDF9" align="center" justify="center">
                  <Box as="img" src="/images/solutions/class-management/key-solution-03/icon-users.svg" alt="" w="21px" h="21px" />
                </Flex>
                <Text color="#344054" fontWeight="600" fontSize="19px" lineHeight="29px">
                  클래스 공통 학습
                </Text>
                <Flex gap={3} wrap="wrap">
                  <Tag label="수업 시간" />
                  <Tag label="클래스 단위 학습" />
                </Flex>
              </Stack>
              <Stack borderTopWidth="1px" borderColor="#EAECF0" pt="10px" px="20px" pb="20px" gap={4}>
                <Text color="#475467" fontWeight="500" fontSize="17px" lineHeight="25px">
                  매일 24:00에 클래스에 같은 학습 콘텐츠를 AI가 추천합니다.
                </Text>
                <Stack bg="#EDF1F0" borderRadius="12px" p="12px" gap={2.5}>
                  <Text color="#667085" fontWeight="500" fontSize="17px" lineHeight="25px">
                    오늘의 학습에 포함할 영역
                  </Text>
                  <Flex gap={5} wrap="wrap">
                    <AreaOption label="읽기" active />
                    <AreaOption label="쓰기" active />
                    <AreaOption label="듣기·말하기" active />
                  </Flex>
                </Stack>
              </Stack>
              <Box as="img" src="/images/solutions/class-management/key-solution-03/floating-button.svg" alt="" position="absolute" top="-32px" right="-32px" w="96px" h="96px" />
            </Stack>
          </Flex>
        </Box> */}
        <Box
          position="relative"
          w="full"
          h={{ base: "860px", lg: "480px" }}
          borderRadius="28px"
          overflow="hidden"
          bg={'#F9FAFB'}
          data-aos="fade-up"
          data-aos-delay="80"
        >
          {/* mobile */}
          <Box display={{ base: "block", lg: "none" }} px="16px" pt="56px" pb="56px">
            <Stack spacing="28px">
              <Box w="full">{LeftFeatureCard}</Box>
              <Box w="full">{RightFeatureCard}</Box>
            </Stack>
          </Box>

          {/* desktop */}
          <Box display={{ base: "none", lg: "block" }}>
            <Box position="absolute" left="121px" top="63px" w="479.187px">
              {LeftFeatureCard}
            </Box>
            <Box position="absolute" left="614px" top="108px" w="479.187px">
              {RightFeatureCard}
            </Box>
            <Box position="absolute" left="1061px" top="71px" w="64px" h="64px" pointerEvents="none">
              <Box as="img" src="/images/apply-target/elementary-feature-intro/mark.png" alt="" w="64px" h="64px" />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}




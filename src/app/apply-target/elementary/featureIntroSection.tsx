import { Box, Flex, Stack, Text } from "@chakra-ui/react";

const LeftFeatureCard = (
  <Box
    border={{ base: "1.785px solid #EBEBEB", lg: "2px solid #EBEBEB" }}
    borderRadius={{ base: "15px", lg: "20.84px" }}
    overflow="hidden"
    boxShadow={{
      base: "0px 0px 24.341px 0px rgba(0,0,0,0.05)",
      lg: "0px 0px 27.276px 0px rgba(0,0,0,0.05)",
    }}
    bg="transparent"
  >
    <Box
      bg="white"
      border={{ base: "none", lg: "1.042px solid #EAECF0" }}
      borderRadius={{ base: "0", lg: "20.834px" }}
      overflow="hidden"
      pt={{ base: 0, lg: "20.834px" }}
      pb={{ base: 0, lg: "20.834px" }}
    >
      <Flex
        borderBottom={{ base: "0.93px solid #EAECF0", lg: "1.042px solid #EAECF0" }}
        flexDirection="column"
        gap={{ base: "7.437px", lg: "0" }}
        px={{ base: "18.593px", lg: "20.834px" }}
        pt={{ base: "18.593px", lg: 0 }}
        pb={{ base: "18.593px", lg: 0 }}
        borderTopRadius={{ base: "18.593px", lg: "0" }}
      >
        <Flex
          position="relative"
          w={{ base: "29.748px", lg: "41.668px" }}
          h={{ base: "29.748px", lg: "41.668px" }}
          mb={{ base: 0, lg: "12px" }}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            position="absolute"
            left={{ base: "-3.72px", lg: 0 }}
            top={{ base: "-3.72px", lg: 0 }}
            right={{ base: "auto", lg: 0 }}
            bottom={{ base: "auto", lg: 0 }}
            w={{ base: "37.185px", lg: "auto" }}
            h={{ base: "37.185px", lg: "auto" }}
            bg="#CCFBEF"
            border={{ base: "5.578px solid #F0FDF9", lg: "6.25px solid #F0FDF9" }}
            borderRadius="28px"
          />
          <Flex
            position="absolute"
            left={{ base: "2.79px", lg: "7.29px" }}
            top={{ base: "2.79px", lg: "7.29px" }}
            w={{ base: "18.593px", lg: "21.703px" }}
            h={{ base: "18.593px", lg: "21.703px" }}
            overflow="hidden"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              as="img"
              src="/images/apply-target/elementary-feature-intro/user.png"
              alt=""
              w="100%"
              h="100%"
              mt={{ base: "3px", lg: "5px" }}
              ml={{ base: "3px", lg: "5px" }}
            />
          </Flex>
        </Flex>

        <Text
          color="#344054"
          fontWeight="600"
          fontSize={{ base: "16.733px", lg: "18.751px" }}
          lineHeight={{ base: "26.03px", lg: "29.168px" }}
          mb={{ base: 0, lg: "16px" }}
        >
          개인별 맞춤 학습
        </Text>

        <Flex
          gap={{ base: "8.924px", lg: "12.501px" }}
          mb={{ base: 0, lg: "18px" }}
          flexWrap={{ base: "wrap", lg: "nowrap" }}
          alignItems={{ base: "flex-start", lg: "center" }}
        >
          {[
            { label: "자습 시간" },
            { label: "학생 간 수준 차이가 클 때" },
          ].map((b) => (
            <Flex
              key={b.label}
              bg="white"
              border={{ base: "0.93px solid #D0D5DD", lg: "1.042px solid #D0D5DD" }}
              borderRadius="8px"
              pl={{ base: "7.437px", lg: "8.334px" }}
              pr={{ base: "9.296px", lg: "8.334px" }}
              py={{ base: "3.719px", lg: "4.167px" }}
              boxShadow="0px 1.042px 2.083px 0px rgba(16,24,40,0.05)"
              align="center"
              gap={{ base: "3.719px", lg: "8px" }}
            >
              <Box w={{ base: "11.156px", lg: "12.501px" }} h={{ base: "11.156px", lg: "12.501px" }} overflow="hidden">
                <Box as="img" src="/images/apply-target/elementary-feature-intro/check.png" alt="" w="12.5px" h="12.5px" objectFit="contain" />
              </Box>
              <Text
                color="#344054"
                fontWeight="500"
                fontSize={{ base: "13.01px", lg: "14.58px" }}
                lineHeight={{ base: "18.593px", lg: "20.834px" }}
                whiteSpace="nowrap"
              >
                {b.label}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex
        flexDirection="column"
        px={{ base: "18.593px", lg: "20.834px" }}
        pt={{ base: "9.296px", lg: "10px" }}
        pb={{ base: "18.593px", lg: "20.834px" }}
        gap={{ base: "13.944px", lg: "0" }}
        borderBottomRadius={{ base: "18.661px", lg: "0" }}
      >
        <Text
          color="#475467"
          fontWeight={{ base: "400", lg: "500" }}
          fontSize={{ base: "12px", lg: "16.667px" }}
          lineHeight={{ base: "18px", lg: "25.001px" }}
          mb={{ base: 0, lg: "12px" }}
        >
          매일 24:00에 학생 개인별 맞춤 콘텐츠를 AI가 추천합니다.
        </Text>

        <Box
          bg="#F9FAFB"
          borderRadius={{ base: "11.156px", lg: "12.501px" }}
          px={{ base: "10px", lg: "12.501px" }}
          py={{ base: "10px", lg: "12.501px" }}
        >
          <Flex direction="column" gap={{ base: "4px", lg: "0" }}>
            <Flex align="center" gap={{ base: "3.719px", lg: "8px" }} mb={{ base: 0, lg: "12px" }}>
              <Text
                color="#98A2B3"
                fontWeight="500"
                fontSize={{ base: "12px", lg: "16.667px" }}
                lineHeight={{ base: "18px", lg: "25.001px" }}
                whiteSpace="nowrap"
              >
                오늘의 학습에 포함할 영역
              </Text>
            </Flex>

            <Flex flexWrap={{ base: "wrap", lg: "nowrap" }} gap={{ base: "8.924px", lg: "20px" }} alignItems="center">
              {[
                { label: "읽기" },
                { label: "쓰기" },
                { label: "듣기·말하기" },
              ].map((c) => (
                <Flex key={c.label} align="center" gap={{ base: "11.156px", lg: "8px" }}>
                  <Box
                    w={{ base: "18.593px", lg: "20.834px" }}
                    h={{ base: "18.593px", lg: "20.834px" }}
                    borderRadius="6px"
                    bg="#F2F4F7"
                    border={{ base: "0.93px solid #D0D5DD", lg: "1.042px solid #D0D5DD" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                  >
                    <Box as="img" src="/images/apply-target/elementary-feature-intro/check2.png" alt="" w="18px" h="18px" objectFit="contain" />
                  </Box>
                  <Text
                    color="#98A2B3"
                    fontWeight={{ base: "600", lg: "500" }}
                    fontSize={{ base: "10.709px", lg: "16.667px" }}
                    lineHeight={{ base: "16.063px", lg: "25.001px" }}
                    whiteSpace="nowrap"
                  >
                    {c.label}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  </Box>
);

const RightFeatureCard = (
  <Box
    border={{ base: "1.785px solid #7FCFC2", lg: "2px solid #7FCFC2" }}
    borderRadius={{ base: "15px", lg: "20.84px" }}
    // overflow="hidden"
    boxShadow={{
      base: "0px 0px 24.341px 0px rgba(0,0,0,0.05)",
      lg: "0px 0px 27.276px 0px rgba(0,0,0,0.05)",
    }}
    bg="transparent"
    position="relative"
  >
    <Box position="absolute" right="-20px" top="-20px" w="64px" h="64px" pointerEvents="none" display={{ base: "block", lg: "none" }}>
        <Box as="img" src="/images/apply-target/elementary-feature-intro/mark.png" alt="" w="64px" h="64px" />
      </Box>
    <Box
      bg="#F0FDF9"
      borderBottom={{ base: "0.93px solid #EAECF0", lg: "1.042px solid #EAECF0" }}
      px={{ base: "18.593px", lg: "20.834px" }}
      pt={{ base: "18.593px", lg: "20.834px" }}
      pb={{ base: "18.593px", lg: "20.834px" }}
      borderTopRadius={{ base: "18.593px", lg: "20.834px" }}
      display="flex"
      flexDirection="column"
      gap={{ base: "7.437px", lg: "0" }}
    >
      <Flex
        position="relative"
        w={{ base: "29.748px", lg: "41.668px" }}
        h={{ base: "29.748px", lg: "41.668px" }}
        mb={{ base: 0, lg: "12px" }}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          position="absolute"
          left={{ base: "-3.72px", lg: 0 }}
          top={{ base: "-3.71px", lg: 0 }}
          right={{ base: "auto", lg: 0 }}
          bottom={{ base: "auto", lg: 0 }}
          w={{ base: "37.185px", lg: "auto" }}
          h={{ base: "37.185px", lg: "auto" }}
          bg="#CCFBEF"
          border={{ base: "5.578px solid #F0FDF9", lg: "6.25px solid #F0FDF9" }}
          borderRadius="28px"
        />
        <Flex
          position="absolute"
          left={{ base: "2.79px", lg: "7.29px" }}
          top={{ base: "2.8px", lg: "7.29px" }}
          w={{ base: "18.593px", lg: "21.703px" }}
          h={{ base: "18.593px", lg: "21.703px" }}
          overflow="hidden"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            as="img"
            src="/images/apply-target/elementary-feature-intro/users.png"
            alt=""
            w="100%"
            h="100%"
            mt={{ base: "3px", lg: "5px" }}
            ml={{ base: "3px", lg: "5px" }}
          />
        </Flex>
      </Flex>

      <Text
        color="#344054"
        fontWeight="600"
        fontSize={{ base: "16.733px", lg: "18.751px" }}
        lineHeight={{ base: "26.03px", lg: "29.168px" }}
        mb={{ base: 0, lg: "16px" }}
      >
        클래스 공통 학습
      </Text>

      <Flex gap={{ base: "9.37px", lg: "12.501px" }} flexWrap={{ base: "wrap", lg: "nowrap" }} alignItems={{ base: "flex-start", lg: "center" }}>
        {["수업 시간", "클래스 단위 학습"].map((label) => (
          <Flex
            key={label}
            bg="white"
            border={{ base: "0.93px solid #D0D5DD", lg: "1.042px solid #D0D5DD" }}
            borderRadius="8px"
            pl={{ base: "7.437px", lg: "8.334px" }}
            pr={{ base: "9.296px", lg: "8.334px" }}
            py={{ base: "3.719px", lg: "4.167px" }}
            boxShadow="0px 1.042px 2.083px 0px rgba(16,24,40,0.05)"
            align="center"
            gap={{ base: "3.719px", lg: "8px" }}
          >
            <Box w={{ base: "11.156px", lg: "12.501px" }} h={{ base: "11.156px", lg: "12.501px" }} overflow="hidden">
              <Box as="img" src="/images/apply-target/elementary-feature-intro/check.png" alt="" w="12.5px" h="12.5px" objectFit="contain" />
            </Box>
            <Text
              color="#344054"
              fontWeight="500"
              fontSize={{ base: "13.01px", lg: "14.58px" }}
              lineHeight={{ base: "18.593px", lg: "20.834px" }}
              whiteSpace="nowrap"
            >
              {label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>

    <Box
      bg="#F0FDF9"
      px={{ base: "18.593px", lg: "20.834px" }}
      pt={{ base: "9.296px", lg: "10.417px" }}
      pb={{ base: "18.593px", lg: "20.834px" }}
      borderBottomRadius={{ base: "18.661px", lg: "20.834px" }}
    >
      <Flex direction="column" gap={{ base: "13.944px", lg: "0" }}>
        <Text
          color="#475467"
          fontWeight={{ base: "400", lg: "500" }}
          fontSize={{ base: "12px", lg: "16.667px" }}
          lineHeight={{ base: "18px", lg: "25.001px" }}
          mb={{ base: 0, lg: "12px" }}
        >
          매일 24:00에 클래스에 같은 학습 콘텐츠를 AI가 추천합니다.
        </Text>

        <Box
          bg="#EDF1F0"
          borderRadius={{ base: "11.156px", lg: "12.501px" }}
          px={{ base: "10px", lg: "12.501px" }}
          py={{ base: "10px", lg: "12.501px" }}
        >
          <Flex direction="column" gap={{ base: "4px", lg: "0" }}>
            <Flex align="center" gap={{ base: "3.719px", lg: "8px" }} mb={{ base: 0, lg: "12px" }}>
              <Text
                color="#667085"
                fontWeight="500"
                fontSize={{ base: "12px", lg: "16.667px" }}
                lineHeight={{ base: "18px", lg: "25.001px" }}
                whiteSpace="nowrap"
              >
                오늘의 학습에 포함할 영역
              </Text>
            </Flex>

            <Flex flexWrap={{ base: "wrap", lg: "nowrap" }} gap={{ base: "8.924px", lg: "20px" }} alignItems="center">
              {[
                { label: "읽기" },
                { label: "쓰기" },
                { label: "듣기·말하기" },
              ].map((c) => (
                <Flex key={c.label} align="center" gap={{ base: "11.156px", lg: "8px" }}>
                  <Box
                    w={{ base: "18.593px", lg: "20.834px" }}
                    h={{ base: "18.593px", lg: "20.834px" }}
                    borderRadius="6px"
                    bg="#F0FDF9"
                    border={{ base: "0.93px solid #0E9384", lg: "1.042px solid #0E9384" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                  >
                    <Box as="img" src="/images/apply-target/elementary-feature-intro/check2.png" alt="" w="18px" h="18px" objectFit="contain" />
                  </Box>
                  <Text
                    color="#0E9384"
                    fontWeight={{ base: "600", lg: "500" }}
                    fontSize={{ base: "10.709px", lg: "16.667px" }}
                    lineHeight={{ base: "16.063px", lg: "25.001px" }}
                    whiteSpace="nowrap"
                  >
                    {c.label}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  </Box>
);

export const FeatureIntroSectionContents = (
  <Box
    position="relative"
    w="full"
    h={{ base: "auto", lg: "480px" }}
    minH={{ base: "unset", lg: "480px" }}
    borderRadius="28px"
    overflow="hidden"
    bgGradient="linear(135.9680355950917deg, rgb(239, 252, 246) 0.10324%, rgb(249, 250, 251) 111.96%)"
  >
    {/* mobile — Figma 741:43687 / 741:43720 */}
    <Box display={{ base: "block", lg: "none" }} px="27px" pt="32px" pb="49px">
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
);

export const FeatureIntroSectionTitle = (
  <>
    <Text
      color="gray.800"
      fontWeight="600"
      fontSize={{ base: "24px", lg: "48px" }}
      lineHeight={{ base: "34px", lg: "60px" }}
      textAlign={{ base: "center", lg: "left" }}
    >
      매일 아침 10분의 힘,{" "}
      <Box as="span" bgGradient="linear(to-r, #43D1BC, #009B84)" bgClip="text" color="transparent">
        오늘의 학습
      </Box>
    </Text>
  </>
  
);

export const FeatureIntroSectionCheckItems = [
  "반 전체에게 같은 학습을 제공할 수 있어요.",
  "학생별로 개인화된 학습을 제공할 수 있어요.",
];
export const FeatureIntroSectionCateforyList: string[] = [
  "주요 기능 01",
  "AI 수준별 학습",
];

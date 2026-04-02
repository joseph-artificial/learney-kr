"use client";

import { keyframes } from "@emotion/react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";

type ConcernCard = {
  quote: string;
  tone: "blue" | "mint";
  avatar: string;
};

const cards: ConcernCard[] = [
  {
    quote: "“아침 자습 시간에 뭘 시켜야 할지\n매번 고민이에요.\n프린트물 준비하기도 부담되고요.”",
    tone: "blue",
    avatar: "/images/etc/woman.png",
  },
  {
    quote: "“교과서만으로는 부족한데,,\n수업에 쓸 만한 보충 자료를 찾는데\n시간이 다 가요.”",
    tone: "mint",
    avatar: "/images/etc/man.png",
  },
  {
    quote: "“에듀테크를 도입하고 싶은데,,\n세팅이 복잡하면 결국 어려워서\n안 쓰게 돼요.”",
    tone: "blue",
    avatar: "/images/etc/woman.png",
  },
  {
    quote: "“학생의 수준이 다른데,\n같은 자료를 주자니 애매하고\n다른 자료를 주자니 현실적으로 어려워요.”",
    tone: "mint",
    avatar: "/images/etc/man.png",
  },
];

const rolling = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

export function FeaturesSection() {
  return (
    <Box
      as="section"
      id="features"
      bg="gray.50"
      py={{ base: "50px", lg: "120px" }}
      overflow="hidden"
      data-aos="fade-up"
      data-aos-delay="0"
      data-aos-duration="900"
      data-aos-offset="120"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="true"
      data-aos-easing="ease-out-cubic"
    >
      <Stack align="center" gap={{ base: 8, lg: "60px" }}>
        <Text
          fontFamily="heading"
          fontWeight="600"
          fontSize={{ base: "24px", lg: "48px" }}
          lineHeight={{ base: "34px", lg: "60px" }}
          textAlign="center"
          color="black"
          data-aos="fade-up"
          data-aos-delay="0"
          data-aos-duration="900"
          data-aos-offset="120"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
        >
          선생님이라면 한 번쯤 이런{" "}
          <Box as="span" color="#2CA395">
            고민,
          </Box>
          <br />
          해보셨을 거예요.
        </Text>

        <Box
          w="full"
          overflow="hidden"
          data-aos="fade-up"
          data-aos-delay="80"
          data-aos-duration="900"
          data-aos-offset="180"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
        >
          <Flex
            w="max-content"
            gap={{base: '10px', lg: '24px'}}
            px={{ base: 4, lg: "120px" }}
            animation={`${rolling} 60s linear infinite`}
          >
            {[...cards, ...cards, ...cards, ...cards].map((card, idx) => (
              <ConcernRollingCard key={`${card.quote}-${idx}`} card={card} />
            ))}
          </Flex>
        </Box>
      </Stack>

    </Box>
  );
}

function ConcernRollingCard({ card }: { card: ConcernCard }) {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap="20px"
      p={{base: '13px', lg: '29.81px'}}
      w={{ base: "240px", lg: "540px" }}
      maxW="540px"
      h={{base: '120px', lg: '250px'}}
      borderRadius="16px"
      bg={card.tone === "blue" ? "#ECF4FC" : "#E7F4F3"}
      boxShadow="0px 0px 20px 0px #FFFFFF"
      flexShrink={0}
    >
      <Flex
        w={{base: '30px', lg: '56px'}}
        h={{base: '30px', lg: '56px'}}
        minW={{ base: "30px", lg: "56px" }}
        minH={{ base: "30px", lg: "56px" }}
        flexShrink={0}
        borderRadius="50%"
        bg="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 1px 2px rgba(16, 24, 40, 0.08)"
      >
        <Box as="img" src={card.avatar} alt="" w={{base: '19px', lg: '35px'}} h={{base: '19px', lg: '35px'}} objectFit="contain" opacity={0.5} />
      </Flex>
      <Text
        fontFamily="body"
        fontWeight="500"
        fontSize={{ base: "12px", lg: "24px" }}
        lineHeight={{ base: "18px", lg: "36px" }}
        color="gray.800"
        textAlign="center"
        whiteSpace="pre-line"
      >
        {card.quote}
      </Text>
    </Flex>
  );
}

 "use client";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import CheckIcon from "@/components/icon/CheckIcon";
import { HeroCardDef, MiniCard } from "../ScrollingCardColumn";
import { Image } from "@chakra-ui/next-js";

type MiniCard = {
  title: string;
  subject: string;
  icon: string;
  tone: string;
  x: string;
  y: string;
};

const CHECK_ITEMS = [
  "교과서를 선택하면, 단원·성취 기준에 맞춰 추천 학습이 정렬돼요.",
  "성취 기준에 맞는 콘텐츠를 골라 바로 배포할 수 있어요.",
];

const miniCardsImageList = {
  WRITE: {
    categoryBorderColor: "#F9DBAF",
    categoryTextColor: "#B93815",
    categoryBgColor: "#FEF6EE",
    icon: "",
  },
  READ: {
    categoryBorderColor: "#99F6E0",
    categoryTextColor: "#107569",
    categoryBgColor: "#F0FDF9",
    icon: "",
  },
  SPEAK: {
    categoryBorderColor: "#B9E6FE",
    categoryTextColor: "#026AA2",
    categoryBgColor: "#F0F9FF",
    icon: "",
  },
  INTERACTIVE: {
    categoryBorderColor: "",
    categoryTextColor: "",
    categoryBgColor: "",
    icon: "",
  },
  TEXTBOOK: {
    categoryBorderColor: "#D9D6FE",
    categoryTextColor: "#5925DC",
    categoryBgColor: "#F4F3FF",
    icon: "",
  },
};

const HERO_CARDS_RIGHT: HeroCardDef[] = [
  {
    title: "뱅크시의 찢어진 그림, 가치 상승의 비밀",
    learningType: "READ",
    tag: "예술",
    grade: "중1~중2",
    time: "9분",
    image: "/images/learning/Read_Art.png",
    hashtag: '#예술 #문학 #문학 이해',
    description: (<Text fontSize={'15px'} fontWeight={'600'} lineHeight={'23.37px'} color={'gray.500'}><Box as="span" color="gray.700">중등 1학년 클래스</Box>에서<br />많이 활용한 학습</Text>)
  },
  {
    title: "우리가 매일 쓰는 인터넷의 비밀",
    learningType: "WRITE",
    tag: "이야기하는 글",
    grade: "중1~중2",
    time: "10분",
    image: "/images/learning/Write_Narrative.png",
    hashtag: '#연극 #문학 #문학 이해'
  },
  {
    title: "똑같은 빨간 티셔츠를 입은 두 모둠",
    learningType: "SPEAK",
    tag: "이해와 전달",
    grade: "중1~중2",
    time: "10분",
    image: "/images/learning/Speak_Analysis.png",
    hashtag: '#아동문학 #자아이해 #리더쉽'
  },
  {
    title: "속미인곡",
    learningType: "TEXTBOOK",
    tag: "천재(노미숙)",
    grade: "중1~중2",
    time: "10분",
    image: "/images/learning/textbook.png",
    description: (<Text fontSize={'15px'} fontWeight={'600'} lineHeight={'23.37px'} color={'gray.500'}><Box as="span" color="gray.700">천재 교과서 2학기 1단원</Box>과<br />연계된 학습</Text>)
  },
  // {
  //   title: "수라",
  //   learningType: "TEXTBOOK",
  //   tag: "천재(노미숙)",
  //   grade: "중1~중2",
  //   time: "10분",
  //   image: "/images/learning/textbook.png",
  // }
];

// const waveFlow = keyframes`
//   0% { transform: translateX(0); }
//   100% { transform: translateX(-50%); }
// `;

// const waveBob = keyframes`
//   0%, 100% { transform: translateY(0); }
//   25% { transform: translateY(-24px); }
//   50% { transform: translateY(12px); }
//   75% { transform: translateY(-16px); }
// `;


export function MiddleHighExploreSection() {
  const rollingCards = [...HERO_CARDS_RIGHT];

  return (
    <Box bg="white" py={{ base: '50px', lg: "120px" }} px={{ base: 4, lg: "120px" }} id="apply-target-explore-intro">
      <Stack maxW="1200px" mx="auto" gap={{ base: '20px', lg: "60px" }}>
        <Stack gap={{base: '16px', lg: '25px'}} data-aos="fade-up">
          <Flex gap={4} wrap="wrap" justify={{base: 'center', lg: 'flex-start'}}>
            <Flex h={{base: '28px', lg: '36px'}} align="center" justify="center" px={{base: '10px', lg: '14px'}} py={{base: '2px', lg: '2px'}} bg="#E8F4F5" borderRadius="30px">
              <Text color="#0E9384" fontWeight="600" fontSize={{base: '12px', lg: '16px'}} lineHeight={{base: '18px', lg: '24px'}}>
                주요 기능 01
              </Text>
            </Flex>
            <Flex h={{base: '28px', lg: '36px'}} align="center" justify="center" px={{base: '10px', lg: '14px'}} py={{base: '2px', lg: '2px'}} border="1px solid #0E9384" borderRadius="30px">
              <Text color="#0E9384" fontWeight="600" fontSize={{base: '12px', lg: '16px'}} lineHeight={{base: '18px', lg: '24px'}}>
                추천 학습 정렬
              </Text>
            </Flex>
          </Flex>

          <Text color="#1D2939" fontWeight="600" fontSize={{ base: "24px", lg: "48px" }} lineHeight={{ base: "34px", lg: "60px" }} textAlign={{base: 'center', lg: 'left'}}>
            수업 준비를 간단하게,{" "}
            <Box as="span" bgGradient="linear(to-r, #43D1BC 0%, #009B84 100%)" bgClip="text" color="transparent">
              탐색하기
            </Box>
          </Text>

          <Flex direction={{ base: "column", lg: "row" }} gap={{ base: '20px', lg: "60px" }} justify="space-between">
            <Text color="#1D2939" fontWeight="500" fontSize={{ base: "16px", lg: "24px" }} lineHeight={{ base: "24px", lg: "34px" }} whiteSpace="pre-line" textAlign={{base: 'center', lg: 'left'}}>
              {"교과서를 고르면,\n수업에 쓸 학습이 바로 나와요."}
            </Text>

            <Stack gap="10px" bg={{base: '#F9FAFB', lg: 'transparent'}} p={{base: '10px', lg: '0px'}} border={{base: '1px solid #EAECF0', lg: 'none'}} borderRadius="10px" boxShadow={{base: '0px 0px 20px 0px rgba(0,0,0,0.05)', lg: 'none'}} w={{base: 'full', lg: 'fit-content'}}>
              {CHECK_ITEMS.map((item) => (
                <Flex key={item} gap="10px" align="center">
                  <CheckIcon boxSize={{base: '16px', lg: '24px'}} color="#667085" />
                  <Text color="#667085" fontWeight="500" fontSize={{ base: "14px", lg: "24px" }} lineHeight={{ base: "20px", lg: "34px" }}>
                    {item}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Flex>
        </Stack>

        <Flex
          w="full"
          h={{ base: "360px", lg: "480px" }}
          borderRadius="28px"
          position="relative"
          overflow="hidden"
          bgGradient="linear(136deg, #EFFCFA 0%, #F9FAFB 100%)"
          data-aos="fade-up"
          data-aos-delay="80"
          mt={{ base: '26px', lg: '0px' }}
          direction={{ base: "column", lg: "row" }}
          justify={{ base: "center", lg: "space-between" }}
          align={{ base: "center", lg: "flex-start" }}
        >

          <Flex
            // position="absolute"
            inset={{ base: "12px", lg: "24px" }}
            h="100%"
            align="center"
            gap="10px"
            w="full"
            // animation={`${waveFlow} 28s linear infinite`}
            // pointerEvents="none"
            justifyContent="center"
            display={{base: 'none', lg: 'flex'}}
          >
            {rollingCards.map((card, idx) => {
              const categoryBorderColor = miniCardsImageList[card.learningType]?.categoryBorderColor ?? "";
              const categoryTextColor = miniCardsImageList[card.learningType]?.categoryTextColor ?? "";
              const categoryBgColor = miniCardsImageList[card.learningType]?.categoryBgColor ?? "";
              const mt = idx === 0 ? "0" : (idx === 1 ? "48px" : (idx === 2 ? "0" : (idx === 3 ? "48px" : (idx === 4 ? "0" : "0px"))));
              return (
                <Box key={`${card.title}-${idx}`}  mt={mt}>
                  <MiniCard
                    title={card.title}
                    tag={card.tag}
                    learningType={card.learningType}
                    image={card?.image ?? ""}
                    categoryBorderColor={categoryBorderColor}
                    categoryTextColor={categoryTextColor}
                    categoryBgColor={categoryBgColor}
                    grade={card.grade}
                    time={card.time}
                    hashtag={card.hashtag}
                    description={card.description}
                  />
                </Box>
              );
            })}
          </Flex>
          <Flex h={'full'} w={'full'} alignItems="center" display={{ base: 'flex', lg: 'none' }} align={'center'} justify={'center'} py={'16px'} px={'24px'}>
            <Box w={'100%'} h={'100%'} position={'relative'}>
              <Image
                src="/images/apply-target/MiddleHighExplore.svg"
                alt="middle-explore-mobile"
                fill
                unoptimized
                quality={100}
                style={{ objectFit: "cover"}}
              />
            </Box>
            
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
}


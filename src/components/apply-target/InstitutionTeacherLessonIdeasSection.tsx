import { Box, Stack, Text } from "@chakra-ui/react";

const LESSON_IDEA_ROWS = [
  {
    grade: "초등 3~4학년",
    situation: "아침 활동 시간",
    method: '"오늘의 학습"으로 하루 10분 문해력 학습',
  },
  {
    grade: "초등 3~4학년",
    situation: "국어 수업 시간",
    method: "단원에 맞춘 읽기 학습으로 중심생각 파악 연습",
  },
  {
    grade: "초등 5~6학년",
    situation: "국어 수업 시간",
    method: "글에서 생략된 내용을 추론하는 교과 연계 학습",
  },
  {
    grade: "중학교",
    situation: "국어 수업 시간",
    method: "글에 사용된 설명 방법을 AI 튜터와 함께 분석",
  },
  {
    grade: "중학교",
    situation: "국어·정보 융합",
    method: "디지털 캠페인 문구를 쓰기 학습으로 작성",
  },
  {
    grade: "고등학교",
    situation: "공통 국어 수업",
    method: "비문학 지문의 논증 타당성을 평가한 뒤 글 작성",
  },
] as const;

const lessonIdeaCellBorder = "1.5px solid #D0D5DD";

const getRowColor = (grade: string) => {
  if (grade.includes("초등")) return "#146590";
  if (grade.includes("중학교")) return "#836CBA";
  return "#667085";
};

export function InstitutionTeacherLessonIdeasSection() {
  return (
    <Box as="section" py={{ base: 16, lg: "120px" }} px={{ base: 4, lg: 8 }} position="relative" overflow="hidden">
      <Box
        position="absolute"
        inset={0}
        bgImage="url('/images/apply-target/institution/lesson-ideas-bg.png')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        opacity={0.3}
      />
      <Stack position="relative" maxW="1200px" mx="auto" align="center" gap={{ base: 10, lg: "60px" }}>
        <Stack gap={5} align="center" data-aos="fade-up">
          <Box
            h="36px"
            px="14px"
            py="2px"
            borderRadius="30px"
            borderWidth="1px"
            borderColor="#4DABCE"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="#4DABCE" fontWeight="600" fontSize="16px" lineHeight="24px">
              활용 예시
            </Text>
          </Box>
          <Text color="#101828" fontWeight="600" fontSize={{ base: "34px", lg: "48px" }} lineHeight={{ base: "44px", lg: "60px" }} textAlign="center">
            교사들이 제안한
            <br />
            <Box as="span" bgGradient="linear(to-r, #43B9D1, #933CB8)" bgClip="text">
              러니 활용 수업 아이디어
            </Box>
          </Text>
        </Stack>

        <Box
          bg="white"
          borderRadius="10px"
          p={{ base: 5, lg: 10 }}
          w="full"
          maxW="1000px"
          boxShadow="0px 0px 30px 0px rgba(0,0,0,0.05)"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          <Stack gap={5} align="center">
            <Box w="full" overflowX="auto" borderWidth="1.5px" borderStyle="solid" borderColor="#EAECF0" borderRadius="6px" p={0}>
              <Box
                as="table"
                mx="auto"
                bg="white"
                w="100%"
                borderRadius="6px"
                overflow="hidden"
                borderWidth="1.5px"
                borderStyle="solid"
                borderColor="#EAECF0"
                sx={{ borderCollapse: "collapse", borderSpacing: 0, minWidth: "860px" }}
              >
                <Box as="thead" bg="#E7F2FA">
                  <Box as="tr">
                    {["학교급", "활용 상황", "활용 방법"].map((label, i) => (
                      <Box
                        key={label}
                        as="th"
                        borderBottom={lessonIdeaCellBorder}
                        borderRight={i < 2 ? lessonIdeaCellBorder : undefined}
                        px={4}
                        py={3}
                        textAlign="left"
                        w={i === 2 ? "56%" : "22%"}
                        fontWeight="500"
                        fontSize="18px"
                        lineHeight="1.3"
                        color="#98A2B3"
                      >
                        {label}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box as="tbody">
                  {LESSON_IDEA_ROWS.map((row) => {
                    const rowColor = getRowColor(row.grade);
                    return (
                      <Box as="tr" key={`${row.grade}-${row.situation}-${row.method}`} bg="white">
                        <Box
                          as="td"
                          borderTop={lessonIdeaCellBorder}
                          borderRight={lessonIdeaCellBorder}
                          px={4}
                          py={3}
                          fontWeight="600"
                          fontSize="19px"
                          lineHeight="1.3"
                          color={rowColor}
                          verticalAlign="top"
                        >
                          {row.grade}
                        </Box>
                        <Box
                          as="td"
                          borderTop={lessonIdeaCellBorder}
                          borderRight={lessonIdeaCellBorder}
                          px={4}
                          py={3}
                          fontWeight="600"
                          fontSize="19px"
                          lineHeight="1.3"
                          color={rowColor}
                          verticalAlign="top"
                        >
                          {row.situation}
                        </Box>
                        <Box
                          as="td"
                          borderTop={lessonIdeaCellBorder}
                          px={4}
                          py={3}
                          fontWeight="500"
                          fontSize="19px"
                          lineHeight="1.3"
                          color={rowColor}
                          verticalAlign="top"
                        >
                          {row.method}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>

            <Text color="#98A2B3" fontWeight="500" fontSize="18px" lineHeight="31px" textAlign="center" px={2}>
              충남교육청 실증 평가 보고서 - &apos;활용 수업 아이디어&apos; 기반
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

import { Box } from "@chakra-ui/react";

type TermsPageContentProps = {
  title: string;
  html: string;
};

export function TermsPageContent({ title, html }: TermsPageContentProps) {
  return (
    <Box bg="white" w="100%" pt="30px" maxW="1200px" mx="auto">
      <Box
        aria-label={title}
        w="100%"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Box>
  );
}
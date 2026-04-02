import { Heading, Stack, Text, type ResponsiveValue } from '@chakra-ui/react';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | ResponsiveValue<'left' | 'center'>;
}

export default function SectionHeader({
  label,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <Stack spacing={'20px'} w="full" textAlign={align}>
      <Stack spacing={'12px'} w="full">
        {label && (
          <Text
            fontWeight={600}
            fontSize={'16px'}
            lineHeight={'24px'}
            color={'#107569'}
          >
            {label}
          </Text>
        )}
        <Heading
          fontWeight={600}
          fontSize={{ base: '24px', sm: '30px', lg: '36px' }}
          lineHeight={{ base: '32px', sm: '38px', lg: '44px' }}
          color={'#101828'}
        >
          {title}
        </Heading>
      </Stack>
      {description && (
        <Text
          color={'#475467'}
          fontSize={{ base: '16px', lg: '20px' }}
          lineHeight={{ base: '26px', lg: '30px' }}
          whiteSpace="pre-line"
        >
          {description}
        </Text>
      )}
    </Stack>
  );
}

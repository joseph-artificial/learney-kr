import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export interface FormFieldProps {
  title: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  helperText?: string;
  errorMessage?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  isRequired = false,
  isInvalid = false,
  helperText,
  errorMessage,
  children,
}) => {
  const { t } = useTranslation();
  const hasError = isInvalid || (errorMessage !== undefined && errorMessage !== '');

  return (
    <FormControl isRequired={false} isInvalid={hasError}>
      <FormLabel
        fontSize="14px"
        fontWeight="medium"
        color="gray.700"
        mb="6px"
      >
        <Flex align="center" gap="6px">
          <Text>{title}</Text>
          {isRequired && (
            <Text color="error.500">{'(필수)'}</Text>
          )}
        </Flex>
      </FormLabel>

      {children}

      {helperText && !errorMessage && (
        <FormHelperText
          fontSize="14px"
          color="#98A2B3"
          lineHeight="20px"
          mt="6px"
          mb="0"
        >
          {helperText}
        </FormHelperText>
      )}

      {errorMessage && (
        <Text fontSize="14px" color="error.500" lineHeight="20px" mt="6px">
          {errorMessage}
        </Text>
      )}
    </FormControl>
  );
};

export default FormField;

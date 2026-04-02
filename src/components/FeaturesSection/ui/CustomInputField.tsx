import React from 'react';
import {
  Box,
  HStack,
  Icon,
  Input,
  InputGroup,
  Spinner,
  Text,
} from '@chakra-ui/react';
import CustomSelect, { type CustomSelectItem } from './CustomSelect';
import FormField from './FormField';

function AlertCircleRedIcon() {
  return (
    <Icon viewBox="0 0 16 16" w="16px" h="16px" color="error.500">
      <path
        d="M8 5.33333V8M8 10.6667H8.00667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Icon>
  );
}

export interface CustomInputFieldProps {
  title: string;
  placeholder: string;
  isRequired?: boolean;
  isPass?: boolean;
  inputType?: 'text' | 'select';
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  helperText?: string;
  errorMessage?: string;
  selectItems?: CustomSelectItem[] | string[];
  onSelect?: (value: string) => void;
  menuMaxH?: number;
  menuW?: number;
  matchWidth?: boolean;
  h?: string | number;
  name?: string;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  isChecking?: boolean;
  displayCounter?: boolean;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  title,
  placeholder,
  inputType = 'text',
  isRequired = false,
  isPass = true,
  value = '',
  defaultValue,
  onChange,
  onBlur,
  onKeyDown,
  maxLength,
  helperText,
  errorMessage,
  selectItems = [],
  onSelect,
  menuMaxH = 360,
  menuW,
  matchWidth = true,
  h = '44px',
  name,
  type = 'text',
  autoFocus,
  disabled = false,
  isChecking = false,
  displayCounter,
}) => {
  const actualValue = value || defaultValue || '';

  const hasError =
    (errorMessage !== undefined && errorMessage !== '') ||
    (isRequired && !isPass);

  const actualErrorMessage =
    errorMessage || (isRequired && !isPass ? '필수 항목을 입력해 주세요.' : undefined);

  const borderColor = hasError ? 'error.300' : 'gray.300';

  const showCounter = displayCounter ?? (maxLength !== undefined);

  // 우측 아이콘 영역 표시 여부
  const showRightElement = isChecking || hasError || (showCounter && maxLength);

  return (
    <FormField
      title={title}
      isRequired={isRequired}
      isInvalid={hasError}
      helperText={helperText}
      errorMessage={actualErrorMessage}
    >
      {inputType === 'select' ? (
        <CustomSelect
          placeholder={placeholder}
          items={selectItems}
          value={value}
          defaultValue={defaultValue}
          onSelect={(code) => {
            onChange?.(code);
            onSelect?.(code);
          }}
          h={h}
          menuMaxH={menuMaxH}
          menuW={menuW}
          matchWidth={matchWidth}
        />
      ) : (
        <InputGroup>
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            maxLength={maxLength}
            name={name}
            type={type}
            autoFocus={autoFocus}
            h={h}
            fontSize="16px"
            lineHeight="24px"
            borderRadius="12px"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
            px="14px"
            py="10px"
            isDisabled={disabled}
            bg={disabled ? 'gray.50' : 'white'}
            color={disabled ? 'gray.500' : 'gray.900'}
            _focus={{
              borderColor: hasError ? 'error.300' : 'primary.300',
              boxShadow: hasError
                ? '0px 0px 0px 2px #FFFFFF, 0px 0px 0px 4px #F04438'
                : '0px 0px 0px 2px #FFFFFF, 0px 0px 0px 4px #15B79E',
            }}
            _placeholder={{ color: 'gray.500', fontSize: '16px' }}
            _disabled={{ bg: 'gray.50', color: 'gray.500', cursor: 'not-allowed' }}
          />
          {showRightElement && (
            <Box
              position="absolute"
              right="14px"
              top="50%"
              transform="translateY(-50%)"
              h={h}
              display="flex"
              alignItems="center"
            >
              <HStack spacing="8px">
                {showCounter && maxLength && (
                  <Text fontSize="12px" fontWeight="500" color="gray.400">
                    {actualValue.length}/{maxLength}
                  </Text>
                )}

                {isChecking && <Spinner size="sm" color="primary.500" />}

                {hasError && !isChecking && <AlertCircleRedIcon />}
              </HStack>
            </Box>
          )}
        </InputGroup>
      )}
    </FormField>
  );
};

export default CustomInputField;

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  InputGroup,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  useToast
} from '@chakra-ui/react';
import { RefObject, useCallback, useState } from 'react';
import CustomInputField from './ui/CustomInputField';
import { type CustomSelectItem } from './ui/CustomSelect';
import FormField from './ui/FormField';

const API_BASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_BASE_URL + '/class-service';

interface FormData {
  studentCount: string;
  duration: string;
  startDate: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  inquiry: string;
  privacyConsent: boolean;
}

type TouchedFields = Partial<Record<keyof FormData, boolean>>;

const initialFormData: FormData = {
  studentCount: '',
  duration: '1',
  startDate: '',
  name: '',
  email: '',
  phone: '',
  organization: '',
  inquiry: '',
  privacyConsent: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{9,15}$/;

function getTodayString(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function MultiplyIcon() {
  return (
    <Icon viewBox="0 0 12 12" w="12px" h="12px" color="primary.500">
      <path
        d="M11 1L1 11M1 1L11 11"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Icon>
  );
}

function CalendarIcon() {
  return (
    <Icon viewBox="0 0 17 19" w="20px" h="20px" color="gray.500">
      <path
        d="M15.8333 7.5H0.833334M11.6667 0.833333V4.16667M5 0.833333V4.16667M4.83333 17.5H11.8333C13.2335 17.5 13.9335 17.5 14.4683 17.2275C14.9387 16.9878 15.3212 16.6054 15.5608 16.135C15.8333 15.6002 15.8333 14.9001 15.8333 13.5V6.5C15.8333 5.09987 15.8333 4.3998 15.5608 3.86502C15.3212 3.39462 14.9387 3.01217 14.4683 2.77248C13.9335 2.5 13.2335 2.5 11.8333 2.5H4.83333C3.4332 2.5 2.73314 2.5 2.19836 2.77248C1.72795 3.01217 1.3455 3.39462 1.10582 3.86502C0.833334 4.3998 0.833334 5.09987 0.833334 6.5V13.5C0.833334 14.9001 0.833334 15.6002 1.10582 16.135C1.3455 16.6054 1.72795 16.9878 2.19836 17.2275C2.73314 17.5 3.4332 17.5 4.83333 17.5Z"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Icon>
  );
}

export default function FeaturesSection({ formRef }: { formRef?: RefObject<HTMLDivElement | null>
 }) {
  // const { t } = useTranslation();
  const toast = useToast();
  const [form, setForm] = useState<FormData>({ ...initialFormData, startDate: getTodayString() });
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const getFieldError = useCallback(
    (field: keyof FormData): string | undefined => {
      if (!touched[field]) return undefined;

      switch (field) {
        case 'studentCount':
          if (!form.studentCount.trim()) return '사용할 학생 수를 입력해 주세요' as string;
          return undefined;
        case 'startDate':
          if (!form.startDate) return '사용 시작일을 선택해 주세요' as string;
          return undefined;
        case 'name':
          if (!form.name.trim()) return '성함을 입력해 주세요' as string;
          return undefined;
        case 'email':
          if (!form.email.trim()) return '이메일을 입력해 주세요' as string;
          if (!EMAIL_REGEX.test(form.email.trim())) return '양식에 맞게 입력해 주세요' as string;
          return undefined;
        case 'phone':
          if (!form.phone.trim()) return '휴대폰 번호를 입력해 주세요' as string;
          if (!PHONE_REGEX.test(form.phone.trim())) return '양식에 맞게 입력해 주세요' as string;
          return undefined;
        case 'organization':
          if (!form.organization.trim()) return '소속을 입력해 주세요' as string;
          return undefined;
        case 'privacyConsent':
          if (!form.privacyConsent) return '개인정보 수집 및 활용에 동의해 주세요.' as string;
          return undefined;
        default:
          return undefined;
      }
    },
    [form, touched],
  );

  const isFormValid =
    form.studentCount.trim() !== '' &&
    form.duration !== '' &&
    form.startDate !== '' &&
    form.name.trim() !== '' &&
    EMAIL_REGEX.test(form.email.trim()) &&
    PHONE_REGEX.test(form.phone.trim()) &&
    form.organization.trim() !== '' &&
    form.privacyConsent;

  const handleSubmit = async () => {
    const allTouched: TouchedFields = {
      studentCount: true,
      duration: true,
      startDate: true,
      name: true,
      email: true,
      phone: true,
      organization: true,
      privacyConsent: true,
    };
    setTouched(allTouched);

    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      const students = parseInt(form.studentCount) || 0;
      const period = parseInt(form.duration) || 0;

      const request = {
        amount: students,
        country: 'KR',
        email: form.email.trim(),
        groupName: form.organization.trim(),
        memo: form.inquiry.trim(),
        period,
        phoneNumber: form.phone.trim(),
        startDate: form.startDate,
        username: form.name.trim(),
      };
      // console.log('[견적서 발송] POST', `${API_BASE_URL}/invoices`);
      // console.log('[견적서 발송] body:', JSON.stringify(request, null, 2));
      const invoiceRes = await fetch(`${API_BASE_URL}/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!invoiceRes.ok && invoiceRes.status !== 204) {
        let message = '견적서 발송 실패';
        try {
          const errorBody = await invoiceRes.text();
          if (errorBody) {
            message = errorBody;
          }
        } catch {
          // ignore body parse error
        }
        throw new Error(message);
      }

      toast({
        title: '견적서가 이메일로 발송되었습니다.' as string,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setForm({ ...initialFormData, startDate: getTodayString() });
      setTouched({});
    } catch (error) {
      toast({
        title: '요청 중 오류가 발생했습니다. 다시 시도해 주세요.' as string,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const durationOptions: CustomSelectItem[] = Array.from({ length: 12 }, (_, i) => ({
    code: String(i + 1),
    
    label: `${i + 1} 개월` as string,
  }));

  const privacyError = getFieldError('privacyConsent');
  const startDateError = getFieldError('startDate');
  const isLgSize = useBreakpointValue({ base: false, lg: true })

  return (
    <>
      <Box
        bg="gray.25"
        py={{ base: '20px', lg: '120px' }}
        px={{ base: 4, lg: 6 }}
        ref={formRef}
      >
        <Stack maxW="1200px" mx="auto" gap={10} align="center" boxShadow={!isLgSize ? 'xl' : 'none'} borderRadius={{base: '10px', lg: 'none'}}>
          <Stack gap={{base: '20px', lg: 3}} textAlign="center" maxW="720px">
            <Text
              fontFamily="heading"
              fontWeight="600"
              fontSize={{ base: "24px", lg: "48px" }}
              lineHeight={{ base: "32px", lg: "60px" }}
              color="gray.900"
            >
              {isLgSize ? '견적 신청하기' : '가격 확인하기'}
            </Text>
            <Text
              fontSize={{ base: "12px", lg: "24px" }}
              lineHeight={{ base: "18px", lg: "32px" }}
              color="gray.700"
            >
              이용 조건을 입력하면 담당자가 확인 후 상세 견적서를 안내드립니다.
            </Text>
          </Stack>

          <Box
            w="full"
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="12px"
            boxShadow="0 0 20px rgba(0,0,0,0.04)"
          >
            <Stack gap={{base: '12px', lg: 8}} p={{base: '20px', lg: '40px'}}>
            
            
              {/* 이용 조건 */}
              <Stack spacing={'12px'}>
                <Text fontWeight={600} fontSize={'18px'} lineHeight={'28px'} color={'gray.900'}>
                  {'이용 조건'}
                </Text>
                <Flex
                  gap={{base: '12px', lg: '20px'}}
                  direction={{ base: 'column', lg: 'row' }}
                  alignItems={{ base: 'stretch', lg: 'flex-start' }}
                >
                  <Box flex={1} w={{ base: '100%', lg: 'auto' }}>
                    <CustomInputField
                      
                      title={'사용 학생 수'}
                      
                      placeholder={'숫자를 입력해 주세요'}
                      isRequired
                      type="number"
                      value={form.studentCount}
                      onChange={(v) => updateField('studentCount', v)}
                      onBlur={() => handleBlur('studentCount')}
                      errorMessage={getFieldError('studentCount')}
                    />
                  </Box>
                  <Flex
                    display={{ base: 'none', lg: 'flex' }}
                    mt="26px"
                    h="44px"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <MultiplyIcon />
                  </Flex>
                  <Box flex={1} w={{ base: '100%', lg: 'auto' }}>
                    <CustomInputField
                      
                      title={'이용 기간'}
                      
                      placeholder={'1 개월'}
                      isRequired
                      inputType="select"
                      selectItems={durationOptions}
                      value={form.duration}
                      onChange={(v) => updateField('duration', v)}
                    />
                  </Box>
                  <Box flex={1} w={{ base: '100%', lg: 'auto' }}>
                    <FormField
                      
                      title={'사용 시작일'}
                      isRequired
                      isInvalid={!!startDateError}
                      errorMessage={startDateError}
                    >
                      <InputGroup>
                        <Input
                          type="date"
                          value={form.startDate}
                          min={getTodayString()}
                          onChange={(e) => updateField('startDate', e.target.value)}
                          onBlur={() => handleBlur('startDate')}
                          h="44px"
                          fontSize="16px"
                          lineHeight="24px"
                          borderRadius="12px"
                          border="1px solid"
                          borderColor={startDateError ? 'error.300' : 'gray.300'}
                          boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                          px="14px"
                          py="10px"
                          color="gray.900"
                          _hover={{ borderColor: startDateError ? 'error.300' : 'primary.500' }}
                          _focus={{
                            borderColor: startDateError ? 'error.300' : 'primary.300',
                            boxShadow: startDateError
                              ? '0px 0px 0px 2px #FFFFFF, 0px 0px 0px 4px #F04438'
                              : '0px 0px 0px 2px #FFFFFF, 0px 0px 0px 4px #15B79E',
                          }}
                          sx={{
                            '&::-webkit-calendar-picker-indicator': {
                              opacity: 0,
                              position: 'absolute',
                              right: 0,
                              top: 0,
                              width: '100%',
                              height: '100%',
                              cursor: 'pointer',
                            },
                          }}
                        />
                        <Box
                          position="absolute"
                          right="12px"
                          top="50%"
                          transform="translateY(-50%)"
                          h="44px"
                          display="flex"
                          alignItems="center"
                          pointerEvents="none"
                        >
                          <CalendarIcon />
                        </Box>
                      </InputGroup>
                    </FormField>
                  </Box>
                </Flex>
              </Stack>

              {/* 신청자 정보 */}
              <Stack spacing={'12px'}>
                <Text fontWeight={600} fontSize={'18px'} lineHeight={'28px'} color={'gray.900'}>
                  신청자 정보
                </Text>

                {/* 성함 / 이메일 */}
                <Flex gap={{base: '12px', lg: '20px'}} direction={{ base: 'column', lg: 'row' }} alignItems="flex-start">
                  <Box flex={1} w={{ base: '100%', lg: 'auto' }}>
                    <CustomInputField
                      
                      title={'성함'}
                      
                      placeholder={'성함을 입력해 주세요'}
                      isRequired
                      value={form.name}
                      onChange={(v) => updateField('name', v)}
                      onBlur={() => handleBlur('name')}
                      errorMessage={getFieldError('name')}
                    />
                  </Box>
                  <Box flex={1} w={{ base: '100%', lg: 'auto' }}>
                    <CustomInputField
                      
                      title={'이메일'}
                      
                      placeholder={'이메일을 입력해 주세요'}
                      isRequired
                      type="email"
                      value={form.email}
                      onChange={(v) => updateField('email', v)}
                      onBlur={() => handleBlur('email')}
                      errorMessage={getFieldError('email')}
                    />
                  </Box>
                </Flex>

                {/* 휴대폰 번호 / 소속 */}
                <Flex gap={{base: '12px', lg: '20px'}} direction={{ base: 'column', lg: 'row' }} alignItems="flex-start">
                  <Box flex={1} w={{ base: '100%', lg: 'auto' }}>
                    <CustomInputField
                      
                      title={'휴대폰 번호'}
                      
                      placeholder={'휴대폰 번호를 입력해 주세요'}
                      isRequired
                      type="tel"
                      value={form.phone}
                      onChange={(v) => updateField('phone', v)}
                      onBlur={() => handleBlur('phone')}
                      errorMessage={getFieldError('phone')}
                      
                      helperText={"'-'를 제외한 숫자만 입력해 주세요"}
                    />
                  </Box>
                  <Box flex={1} w={{ base: '100%', lg: 'auto' }}>
                    <CustomInputField
                      
                      title={'소속'}
                      
                      placeholder={'소속을 입력해주세요.'}
                      isRequired
                      value={form.organization}
                      onChange={(v) => updateField('organization', v)}
                      onBlur={() => handleBlur('organization')}
                      errorMessage={getFieldError('organization')}
                    />
                  </Box>
                </Flex>

                {/* 요청 및 문의 사항 */}
                <FormField
                  
                  title={'요청 및 문의 사항'}
                >
                  <Textarea
                    
                    placeholder={'요청 및 문의사항을 입력해 주시면 담당자 확인 후 이메일로 답변해 드려요.'}
                    value={form.inquiry}
                    onChange={(e) => updateField('inquiry', e.target.value)}
                    minH="120px"
                    fontSize="16px"
                    lineHeight="24px"
                    borderRadius="12px"
                    border="1px solid"
                    borderColor="gray.300"
                    boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                    px="14px"
                    py="12px"
                    color="gray.900"
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{ borderColor: 'primary.500' }}
                    _focus={{
                      borderColor: 'primary.300',
                      boxShadow: '0px 0px 0px 2px #FFFFFF, 0px 0px 0px 4px #15B79E',
                    }}
                    resize="vertical"
                  />
                </FormField>

                {/* 개인정보 동의 */}
                <Stack spacing={'6px'}>
                  <Flex
                    as="label"
                    gap={'12px'}
                    alignItems="flex-start"
                    cursor="pointer"
                  >
                    <Box pt={'2px'}>
                      <Checkbox
                        variant="primary"
                        size={{base: 'md', lg: 'lg'}}
                        isChecked={form.privacyConsent}
                        onChange={(e) => {
                          updateField('privacyConsent', e.target.checked);
                          if (!touched.privacyConsent) {
                            setTouched((prev) => ({ ...prev, privacyConsent: true }));
                          }
                        }}
                      />
                    </Box>
                    <Stack spacing={'2px'}>
                      <Text fontWeight={500} fontSize={{base: '14px', lg: '16px'}} lineHeight={{base: '20px', lg: '24px'}} color={'gray.700'}>
                        개인정보 수집 및 활용에 동의합니다.
                        <Text as="span" color={'error.500'}> {'(필수)'}</Text>
                      </Text>
                      <Text fontSize={{base: '14px', lg: '16px'}} lineHeight={{base: '20px', lg: '24px'}} color={'gray.600'}>
                        견적서 발송, 도입 안내를 위한 목적으로만 활용됩니다.
                      </Text>
                    </Stack>
                  </Flex>
                  {privacyError && (
                    <Text fontSize="14px" color="error.500" lineHeight="20px">
                      {privacyError}
                    </Text>
                  )}
                </Stack>
              </Stack>
            
          

            </Stack>
            {/* 버튼 */}
              <Box  px={'40px'} pt={'20px'} pb={'40px'} borderTop={'1px solid'} borderColor="gray.200" display={{base: 'none', lg: 'block'}}>
                <Button
                  w="full"
                  h="auto"
                  py={'12px'}
                  px={'20px'}
                  rounded={'12px'}
                  fontWeight={600}
                  fontSize={'16px'}
                  lineHeight={'24px'}
                  color="white"
                  bg={isFormValid && !isSubmitting ? 'primary.600' : 'gray.300'}
                  border="1px solid"
                  borderColor={isFormValid && !isSubmitting ? 'primary.600' : 'gray.300'}
                  boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                  _hover={{ bg: isFormValid && !isSubmitting ? 'primary.700' : 'gray.300' }}
                  cursor={isFormValid && !isSubmitting ? 'pointer' : 'not-allowed'}
                  isLoading={isSubmitting}
                  onClick={isFormValid && !isSubmitting ? handleSubmit : undefined}
                >
                  상담 신청 및 이메일로 견적서 받기
                </Button>
              </Box>
          </Box>
          
        </Stack>
        {/* 버튼 */}
        <Box   pt={'20px'} pb={'40px'} display={{base: 'block', lg: 'none'}}>
          <Button
            w="full"
            h="auto"
            py={'12px'}
            px={'20px'}
            rounded={'12px'}
            fontWeight={600}
            fontSize={'16px'}
            lineHeight={'24px'}
            color="white"
            bg={isFormValid && !isSubmitting ? 'primary.600' : 'gray.300'}
            border="1px solid"
            borderColor={isFormValid && !isSubmitting ? 'primary.600' : 'gray.300'}
            boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
            _hover={{ bg: isFormValid && !isSubmitting ? 'primary.700' : 'gray.300' }}
            cursor={isFormValid && !isSubmitting ? 'pointer' : 'not-allowed'}
            isLoading={isSubmitting}
            onClick={isFormValid && !isSubmitting ? handleSubmit : undefined}
          >
            상담 신청 및 이메일로 견적서 받기
          </Button>
        </Box>
      </Box>

    
    </>
    
  );
}

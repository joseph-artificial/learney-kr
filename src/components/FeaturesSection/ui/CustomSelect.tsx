import React, { forwardRef, useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  useDisclosure,
  type MenuProps,
} from '@chakra-ui/react';

function ChevronDownIcon({ color = 'gray.500' }: { color?: string }) {
  return (
    <Icon viewBox="0 0 20 20" w="20px" h="20px" color={color}>
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Icon>
  );
}

function SelectCheckIcon() {
  return (
    <Icon viewBox="0 0 20 20" w="20px" h="20px" color="primary.500">
      <path
        d="M16.6668 5L7.50016 14.1667L3.3335 10"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Icon>
  );
}

const scrollStyle = {
  '&::-webkit-scrollbar': { width: '6px' },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': { background: '#D0D5DD', borderRadius: '3px' },
  '&::-webkit-scrollbar-thumb:hover': { background: '#98A2B3' },
};

export interface CustomSelectItem {
  code: string;
  label: string;
  color?: string;
  disabled?: boolean;
}

export interface CustomSelectProps {
  placeholder?: string;
  items: CustomSelectItem[] | string[];
  onSelect?: (code: string) => void;
  menuMaxH?: number;
  menuW?: number;
  defaultValue?: string;
  value?: string;
  matchWidth?: boolean;
  placement?: MenuProps['placement'];
  h?: string | number;
  disabled?: boolean;
}

type CustomMenuButtonProps = {
  selectedValue?: string;
  placeholder?: string;
  h?: string | number;
  disabled?: boolean;
  "aria-expanded"?: boolean;
} & React.ComponentProps<typeof Box>;

const CustomMenuButton = forwardRef<HTMLDivElement, CustomMenuButtonProps>((props, ref) => {
  const { selectedValue, placeholder, h, disabled, ...rest } = props;
  const isOpen = props['aria-expanded'] === true;
  return (
    <Box ref={ref} {...rest}>
      <InputGroup cursor={disabled ? 'not-allowed' : 'pointer'}>
        <Input
          cursor={disabled ? 'not-allowed' : 'pointer'}
          value={selectedValue}
          placeholder={placeholder}
          readOnly
          border="1px solid"
          borderColor={isOpen ? 'primary.500' : 'gray.300'}
          borderRadius="12px"
          boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
          _hover={{ borderColor: disabled ? 'gray.300' : 'primary.500' }}
          _focus={{
            borderColor: 'primary.300',
            boxShadow: '0px 0px 0px 2px #FFFFFF, 0px 0px 0px 4px #15B79E',
          }}
          _placeholder={{ color: 'gray.500' }}
          h={h}
          px="14px"
          fontSize="16px"
          lineHeight="24px"
          color="gray.900"
          disabled={disabled}
          opacity={disabled ? 0.6 : 1}
        />
        <InputRightElement pointerEvents="none" h={h}>
          <ChevronDownIcon color={disabled ? 'gray.400' : 'gray.500'} />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
});
CustomMenuButton.displayName = 'CustomMenuButton';

const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder,
  items,
  onSelect,
  menuMaxH,
  menuW,
  defaultValue,
  value,
  matchWidth = true,
  placement,
  h = '44px',
  disabled = false,
}) => {
  const normalizedItems: CustomSelectItem[] =
    Array.isArray(items) && items.length > 0 && typeof items[0] === 'string'
      ? (items as string[]).map((str) => ({ code: str, label: str }))
      : (items as CustomSelectItem[]);

  const [internalSelected, setInternalSelected] = useState<string>(defaultValue ?? '');
  const selected = value ?? internalSelected;

  const handleSelect = (code: string) => {
    if (value === undefined) {
      setInternalSelected(code);
    }
    onSelect?.(code);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      const idx = normalizedItems.findIndex((item) => item.code === selected);
      const el = itemRefs.current[idx];
      if (el) {
        el.scrollIntoView({ block: 'nearest' });
        el.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isOpen, selected, normalizedItems]);

  const selectedItem = normalizedItems.find((item) => item.code === selected);
  const inputDisplayValue = selectedItem?.label ?? '';

  return (
    <Menu
      isOpen={isOpen && !disabled}
      onOpen={disabled ? undefined : onOpen}
      onClose={onClose}
      {...(matchWidth ? { matchWidth: true } : {})}
      {...(placement ? { placement } : {})}
    >
      <MenuButton
        as={CustomMenuButton}
        selectedValue={inputDisplayValue}
        placeholder={placeholder}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        h={h}
        disabled={disabled}
      />
      <Portal appendToParentPortal={false}>
        <MenuList
          p={1}
          borderRadius="12px"
          maxH={menuMaxH ?? 360}
          boxShadow="lg"
          minW={menuW ? `${menuW}px` : '100px'}
          overflowY="scroll"
          sx={scrollStyle}
          zIndex="popover"
        >
          {normalizedItems.map((item, idx) => (
            <MenuItem
              key={item.code}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              aria-selected={selected === item.code}
              tabIndex={-1}
              onClick={() => !item.disabled && handleSelect(item.code)}
              isDisabled={item.disabled}
              cursor="pointer"
              borderRadius="12px"
              _hover={{ bg: 'gray.50' }}
              bg={selected === item.code ? 'gray.50' : 'white'}
              _disabled={{ opacity: 0.4, cursor: 'not-allowed' }}
              gap={1}
              my={1}
            >
              <Flex align="center" justify="space-between" w="full">
                <Box as="span" color="gray.900" fontWeight={500} fontSize="16px">
                  {item.label}
                </Box>
                {selected === item.code && <SelectCheckIcon />}
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default CustomSelect;

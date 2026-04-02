import { Icon, IconProps } from "@chakra-ui/react";

type CheckIconProps = IconProps;

export default function CheckIcon(props: CheckIconProps) {
  return (
    <Icon
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M3 8.5L6.3 11.8L13 4.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
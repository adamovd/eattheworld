import styled from "styled-components";
import Image from "next/image";

interface AvatarProps {
  width: number;
  height: number;
}

export const Avatar = styled(Image)<AvatarProps>`
  height: ${(props: AvatarProps) => props.height || 50};
  width: ${(props: AvatarProps) => props.width || 50};
  border-radius: 50%;
`;

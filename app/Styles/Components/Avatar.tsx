import styled from "styled-components";

interface AvatarWrapperProps {
  width: number;
  height: number;
}

export const Avatar = styled.section<AvatarWrapperProps>`
  height: ${(props: AvatarWrapperProps) => props.height || "50px"};
  width: ${(props: AvatarWrapperProps) => props.width || "50px"};
  clip-path: circle(50%);
  overflow: hidden;
  position: relative;

  &img {
    height: ${(props: AvatarWrapperProps) => props.height || "50px"};
    width: ${(props: AvatarWrapperProps) => props.width || "50px"};
    object-fit: cover;
    object-position: center center;
  }
`;

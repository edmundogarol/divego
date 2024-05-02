import Icon from "@components/Icon/Icon";
import { color } from "@styles/colors";
import { CONTAINER_PADDING_DEFAULT } from "@styles/constants";
import styled from "styled-components/native";

export const LeftDrawerMenuButtonContainer = styled.Pressable`
  padding-left: ${CONTAINER_PADDING_DEFAULT}px;
`;

export const MenuIcon = styled(Icon)`
  font-size: 35px;
  color: ${color("SystemBlue1")};
`;

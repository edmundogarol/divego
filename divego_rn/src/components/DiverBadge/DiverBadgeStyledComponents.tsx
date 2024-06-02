import { color } from "@styles/colors";
import styled from "styled-components/native";
import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_LARGE,
  CONTAINER_MARGIN_SMALL,
} from "@styles/constants";
import Icon from "@components/Icon/Icon";
import { debugBorder } from "@utils/utils";

export const DiverIconBackground = styled.View``;

export const DiverIconContainer = styled.View<{ clr?: string }>`
  height: 120px;
  width: 180px;
  background-color: ${({ clr }) => clr || color("SystemBlue4")};
  margin-left: auto;
  padding-top: ${CONTAINER_MARGIN_SMALL}px;
  margin-right: auto;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  z-index: 3;
`;

export const AgencyIconText = styled.Text<{
  fontSize?: number | string;
  fontSpacing?: number | string;
}>`
  position: absolute;
  font-size: ${(props) => props.fontSize}px;
  font-weight: 800;
  color: ${color("SystemLabel2")};
  bottom: ${CONTAINER_MARGIN_SMALL}px;
  left: ${CONTAINER_MARGIN_SMALL}px;
  z-index: -2;
  letter-spacing: ${(props) => props.fontSpacing}px;
`;

export const CertificationIconText = styled.Text`
  position: absolute;
  font-size: 30px;
  font-weight: 700;
  color: ${color("SystemLabel2")};
  top: ${CONTAINER_MARGIN_SMALL}px;
  right: ${CONTAINER_MARGIN_SMALL}px;
`;

export const BadgeBackgroundIcon = styled(Icon)`
  position: absolute;
  bottom: -60px;
  right: -10px;
  z-index: -3;
`;

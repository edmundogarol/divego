import { color } from "@styles/colors";
import styled from "styled-components/native";
import { CONTAINER_MARGIN_SMALL } from "@styles/constants";
import Icon from "@components/Icon/Icon";
import { debugBorder } from "@utils/utils";

export const DiverIconBackground = styled.View``;

export const DiverIconContainer = styled.View<{ clr?: string }>`
  height: 150px;
  width: 180px;
  background-color: ${({ clr }) => clr || color("SystemBlue4")};
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  overflow: hidden;
`;

export const AgencyIconText = styled.Text`
  position: absolute;
  font-size: 20px;
  font-weight: 900;
  color: ${color("SystemLabel2")};
  bottom: ${CONTAINER_MARGIN_SMALL}px;
  left: ${CONTAINER_MARGIN_SMALL}px;
`;

export const CertificationIconText = styled.Text`
  position: absolute;
  font-size: 25px;
  font-weight: 900;
  color: ${color("SystemLabel2")};
  top: ${CONTAINER_MARGIN_SMALL}px;
  right: ${CONTAINER_MARGIN_SMALL}px;
`;

export const BadgeBackgroundIcon = styled(Icon)`
  position: absolute;
  transform: rotate(-10deg);
  top: -30px;
  left: -10px;
`;

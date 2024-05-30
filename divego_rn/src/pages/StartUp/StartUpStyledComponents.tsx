import Icon from "@components/Icon/Icon";
import { color } from "@styles/colors";
import {
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_LARGE,
  FORM_HEADER_SIZE,
} from "@styles/constants";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
const { width } = Dimensions.get("screen");

export const StartUpContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const ScreenContentsContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${width}px;
  margin: auto;
`;

export const BackButton = styled.Pressable`
  position: absolute;
  padding: ${CONTAINER_PADDING_LARGE}px;
  z-index: 1;
`;

export const BackButtonText = styled.Text`
  font-size: 16px;
`;

export const UserRolesContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 300px;
  height: auto;
  justify-content: center;
  flex-wrap: wrap;
`;

export const UserRolesContainerTitle = styled.Text`
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: ${color("SystemLabel2")};
  font-weight: 300;
`;

export const UserRolesContainerSubtitle = styled.Text`
  max-width: 250px;
  font-size: 12px;
  letter-spacing: 1.2px;
  color: ${color("SystemLabel2")};
  font-weight: 300;
`;

export const UserRoleButtonLabelContainer = styled.Pressable`
  align-items: center;
`;

export const UserRoleButtonLabel = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 10px;
  color: #ffffff;
  letter-spacing: 1.5px;
  font-weight: 400;
`;

export const UserRoleButton = styled.View<{ color?: string }>`
  background-color: ${({ color }) => color};
  width: 120px;
  height: 120px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  margin: ${CONTAINER_PADDING_DEFAULT}px;
`;

export const UserRoleButtonIcon = styled(Icon)`
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const FreediveScubaSwitchContainer = styled.View`
  align-items: center;
  position: absolute;
  right: ${CONTAINER_PADDING_DEFAULT}px;
  top: ${CONTAINER_PADDING_DEFAULT}px;
`;

export const FreediveScubaSwitchText = styled.Text`
  padding: ${CONTAINER_PADDING_DEFAULT}px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
`;

export const DiverDetailsFormContainer = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: start;
  flex-wrap: wrap;
  padding: ${CONTAINER_PADDING_LARGE}px;
  width: ${width}px;
`;

export const HeaderContainer = styled.View``;

export const DiverDetailsFormHeader = styled.Text`
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  font-size: ${FORM_HEADER_SIZE}px;
  text-align: center;
`;

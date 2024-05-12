import Icon from "@components/Icon/Icon";
import { color } from "@styles/colors";
import { CONTAINER_PADDING_DEFAULT } from "@styles/constants";
import styled from "styled-components/native";

export const UserRolesContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 90%;
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

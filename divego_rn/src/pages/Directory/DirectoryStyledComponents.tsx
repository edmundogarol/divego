import Icon from "@components/Icon/Icon";
import { color } from "@styles/colors";
import {
  CONTAINER_MARGIN_SMALL,
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_SMALL,
} from "@styles/constants";
import { debugBorder } from "@utils/utils";
import styled from "styled-components/native";

export const DirectoryItemContainer = styled.View`
  height: 100px;
  margin: ${CONTAINER_MARGIN_SMALL}px;
  overflow: hidden;
  border-radius: 10px;
  border-color: ${color("SystemBlue3")};
  border-width: 1px;
`;

export const DirectoryItemImage = styled.ImageBackground`
  height: 100px;
`;

export const DirectoryItemHeader = styled.View`
  display: flex;
  flex-direction: row;
  color: black;
  height: 40px;
  background-color: #658eb5b1;
  align-items: center;
  padding-left: ${CONTAINER_PADDING_DEFAULT}px;
`;

export const DirectoryItemText = styled.Text`
  color: ${color("SystemWhite")};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const DirectoryAmenitiesContainer = styled.View`
  margin-left: ${CONTAINER_PADDING_DEFAULT}px;
  display: flex;
  flex-direction: row;
`;

export const DirectoryAmenitiesIconContainer = styled(Icon)`
  margin-right: ${CONTAINER_PADDING_SMALL}px;
`;

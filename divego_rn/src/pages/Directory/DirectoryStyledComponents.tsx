import Icon from "@components/Icon/Icon";
import { color } from "@styles/colors";
import {
  CONTAINER_MARGIN_LARGE,
  CONTAINER_MARGIN_SMALL,
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_LARGE,
  CONTAINER_PADDING_SMALL,
} from "@styles/constants";
import { debugBorder } from "@utils/utils";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
const { width } = Dimensions.get("screen");

export const DirectoryContainer = styled.View`
  padding: ${CONTAINER_PADDING_LARGE}px;
  width: ${width}px;
`;

export const DirectoryItemContainer = styled.Pressable<{ active?: boolean }>`
  height: ${(props) => (props.active ? 200 : 100)}px;
  margin-top: ${CONTAINER_MARGIN_SMALL}px;
  margin-bottom: ${CONTAINER_MARGIN_SMALL}px;
  overflow: hidden;
  border-radius: 10px;
  border-color: ${color("SystemBlue3")};
  border-width: 1px;
`;

export const DirectoryItemImage = styled.ImageBackground<{ active?: boolean }>`
  height: ${(props) => (props.active ? 200 : 100)}px;
`;

export const DirectoryItemHeader = styled.View`
  display: flex;
  flex-direction: row;
  color: black;
  height: 40px;
  background-color: #42709bb0;
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

export const CurrentLocationButtonContainer = styled.Pressable`
  display: flex;
  align-items: center;
  margin-right: ${CONTAINER_MARGIN_LARGE}px;
`;

export const CurrentLocationMapContainer = styled.View`
  height: 60%;
  border-width: 1px;
  border-color: ${color("SystemLabel1")};
`;

export const CurrentLocationText = styled.Text`
  text-align: center;
  text-transform: uppercase;
  color: ${color("SystemLabel2")};
`;

export const SetPinMarker = styled.ImageBackground`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 70px;
  flex: 1;
  z-index: 2;
  transform: translate(-29px, -39.8px);
`;

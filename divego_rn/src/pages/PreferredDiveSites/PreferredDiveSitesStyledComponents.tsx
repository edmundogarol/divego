import Icon from "@components/Icon/Icon";
import { color } from "@styles/colors";
import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_SMALL,
  CONTAINER_PADDING_DEFAULT,
} from "@styles/constants";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
const { width } = Dimensions.get("screen");

export const ScreenContentsContainer = styled.View`
  align-items: center;
  justify-content: start;
  width: ${width}px;
  position: relative;
`;

export const DiverDetailsFormContainer = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${CONTAINER_PADDING_DEFAULT}px;
`;

export const DiveSitesListContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const AddDiveSiteContainer = styled.Pressable`
  width: 160px;
  height: 160px;
  align-items: center;
  justify-content: center;
  background-color: ${color("SystemBlue3")};
  border-radius: 20px;
  margin: ${CONTAINER_MARGIN_DEFAULT}px;
`;

export const DiveSiteContainer = styled.View`
  width: 160px;
  height: 160px;
  align-items: center;
  justify-content: center;
  border-width: 3px;
  border-color: ${color("SystemBlue4")};
  border-radius: 20px;
  margin: ${CONTAINER_MARGIN_DEFAULT}px;
`;

export const DiveSiteImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
`;

export const DiveSiteTitleContainer = styled.View`
  position: absolute;
  z-index: 2;
  top: 0;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: ${color("SystemBlue3")};
  width: 100%;
  padding: ${CONTAINER_MARGIN_SMALL}px;
  height: min-content;
`;
export const DiveSiteTitle = styled.Text`
  text-align: center;
  color: ${color("SystemWhite")};
`;
export const DiveSiteIconContainer = styled.Pressable`
  position: absolute;
  right: ${CONTAINER_MARGIN_SMALL}px;
  bottom: ${CONTAINER_MARGIN_SMALL}px;
`;
export const DiveSiteIcon = styled(Icon)`
  color: ${color("SystemError1")};
`;

export const EmptyDiveSiteContainer = styled.View`
  width: 160px;
  height: 160px;
  align-items: center;
  justify-content: center;
  border-width: 3px;
  border-color: ${color("SystemBlue4")};
  border-radius: 20px;
  border-style: dashed;
  margin: ${CONTAINER_MARGIN_DEFAULT}px;
`;

export const PaidDiveSiteContainer = styled.View`
  width: 160px;
  height: 160px;
  align-items: center;
  justify-content: center;
  background-color: ${color("SystemLabel1")};
  border-radius: 20px;
  margin: ${CONTAINER_MARGIN_DEFAULT}px;
`;

export const AddDiveSiteTitle = styled.Text`
  margin-top: ${CONTAINER_MARGIN_SMALL}px;
  color: ${color("SystemWhite")};
`;

export const PaidDiveSiteTitle = styled.Text`
  margin-top: ${CONTAINER_MARGIN_SMALL}px;
  color: ${color("SystemWhite")};
  width: 100px;
  text-align: center;
`;

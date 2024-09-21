import Button from "@components/Button/Button";
import Icon from "@components/Icon/Icon";
import { color } from "@styles/colors";
import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_SMALL,
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_SMALL,
} from "@styles/constants";
import { debugBorder } from "@utils/utils";
import styled from "styled-components/native";

export const NominateDiveSiteDetailsFormContainer = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${CONTAINER_PADDING_DEFAULT}px;
`;

export const NominateDiveSitePhotoContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const NominateDiveSitePhoto = styled.Image`
  width: 200px;
  height: 150px;
  border-radius: 10px;
`;

export const DiveSiteImageButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ChangeDiveSiteImageButton = styled(Button)`
  margin-top: ${CONTAINER_PADDING_DEFAULT}px;
  margin-right: ${CONTAINER_PADDING_SMALL}px;
  margin-left: ${CONTAINER_PADDING_SMALL}px;
`;

export const AmenitiesContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  justify-content: space-between;
`;

export const AmenityButton = styled.Pressable<{ active?: boolean }>`
  margin: ${CONTAINER_MARGIN_SMALL}px;
  border-color: ${(props) =>
    props.active ? color("SystemBlue3") : color("SystemLabel1")};
  border-width: 2px;
  border-radius: 10px;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.active ? color("SystemBlue3") : "transparent"};
`;

export const NominateAmenitiesButtonIcon = styled(Icon)<{ active?: boolean }>`
  font-size: 30px;
  color: ${(props) => (props.active ? "white" : color("SystemLabel1"))};
`;

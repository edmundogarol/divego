import Button from "@components/Button/Button";
import {
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_SMALL,
} from "@styles/constants";
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

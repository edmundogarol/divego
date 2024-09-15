import { CONTAINER_PADDING_DEFAULT } from "@styles/constants";
import styled from "styled-components/native";

export const NominateDiveSiteDetailsFormContainer = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${CONTAINER_PADDING_DEFAULT}px;
`;

export const NominateDiveSitePhotoContainer = styled.View``;

export const NominateDiveSitePhoto = styled.Image`
  width: 200px;
  height: 200px;
`;

import { color } from "@styles/colors";
import { CONTAINER_PADDING_SMALL } from "@styles/constants";
import { debugBorder } from "@utils/utils";
import styled from "styled-components/native";

export const ProfilePictureUploaderContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ProfilePictureImage = styled.Image`
  border-color: ${color("SystemBlue4")};
  border-width: 2px;
  border-radius: 70px;
`;

export const ProfilePictureUploadIconContainer = styled.View``;

export const ProfilePictureUploadButton = styled.Button``;

export const ProfilePictureBadgeContainer = styled.View<{ scale?: number }>`
  position: absolute;
  z-index: 2;
  transform: translate(100px, 40px) scale(${({ scale }) => scale || 1});
`;

export const ProfilePictureUploaderRemoveContainer = styled.Pressable`
  position: absolute;
  background-color: ${color("SystemBlue4")};
  padding: ${CONTAINER_PADDING_SMALL}px;
  border-radius: 30px;
  transform: translate(35px, -65px);
  z-index: 2;
`;

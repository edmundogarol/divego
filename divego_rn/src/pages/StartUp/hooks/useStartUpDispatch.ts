import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import {
  FreediveAgencyEnum,
  Freediver,
  FreediverTypeEnum,
  User,
} from "@interfaces/CustomTypes";
import {
  StartUpAction,
  updateCertificationsList,
  updateStartUpActiveIndex,
  updateStartUpAgency,
  updateStartUpFreediver,
  updateStartUpDetails,
  updateStartUpScreensGroup,
  resetStartUpFreediver,
} from "../StartUpState";
import { StartUpScreensGroup } from "../StartUpInterfaces";

interface StartUpDispatch {
  updateStartUpActiveIndex(index: number): void;
  updateStartUpAgency(agency: FreediveAgencyEnum | null): void;
  updateStartUpFreediver(freediver: Freediver): void;
  updateStartUpScreensGroup(screens_group: StartUpScreensGroup): void;
  updateStartUpDetails({
    user,
    freediver_type,
  }: {
    user: User;
    freediver_type: FreediverTypeEnum;
  }): void;
  updateCertificationsList(certifications_list: Array<Array<string>>): void;
  resetStartUpFreediver(): void;
}

export const useStartUpDispatch = (): StartUpDispatch => {
  const dispatch: Dispatch<StartUpAction> = useDispatch();
  return {
    updateStartUpActiveIndex(index: number): void {
      dispatch(updateStartUpActiveIndex(index));
    },
    updateStartUpAgency(agency: FreediveAgencyEnum | null): void {
      dispatch(updateStartUpAgency(agency));
    },
    updateStartUpFreediver(freediver: Freediver): void {
      dispatch(updateStartUpFreediver(freediver));
    },
    updateStartUpScreensGroup(screens_group: StartUpScreensGroup): void {
      dispatch(updateStartUpScreensGroup(screens_group));
    },
    updateStartUpDetails({
      user,
      freediver_type,
    }: {
      user: User;
      freediver_type: FreediverTypeEnum;
    }): void {
      dispatch(
        updateStartUpDetails({
          user,
          freediver_type,
        }),
      );
    },
    updateCertificationsList(certifications_list: Array<Array<string>>): void {
      dispatch(updateCertificationsList(certifications_list));
    },
    resetStartUpFreediver(): void {
      dispatch(resetStartUpFreediver());
    },
  };
};

export default useStartUpDispatch;

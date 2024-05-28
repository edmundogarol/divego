import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import {
  FreediveAgencyEnum,
  FreediverType,
  User,
} from "@interfaces/CustomTypes";
import {
  StartUpAction,
  updateCertificationsList,
  updateStartUpActiveIndex,
  updateStartUpAgency,
  updateStartUpDetails,
  updateStartUpScreensGroup,
} from "../StartUpState";
import { StartUpScreensGroup } from "../StartUpInterfaces";

interface StartUpDispatch {
  updateStartUpActiveIndex(index: number): void;
  updateStartUpAgency(agency: FreediveAgencyEnum | null): void;
  updateStartUpScreensGroup(screens_group: StartUpScreensGroup): void;
  updateStartUpDetails({
    user,
    freediver_type,
  }: {
    user: User;
    freediver_type: FreediverType;
  }): void;
  updateCertificationsList(certifications_list: Array<Array<string>>): void;
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
    updateStartUpScreensGroup(screens_group: StartUpScreensGroup): void {
      dispatch(updateStartUpScreensGroup(screens_group));
    },
    updateStartUpDetails({
      user,
      freediver_type,
    }: {
      user: User;
      freediver_type: FreediverType;
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
  };
};

export default useStartUpDispatch;

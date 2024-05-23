import { CustomSvgIconName } from "@components/Icon/libraries/CustomSvgIcon";
import { ColorKey } from "@styles/colors";

export interface CustomWindow extends Window {
  host: string;
  navigator: any;
  baseURL: string;
}

export enum Roles {
  Diver = "diver",
  Instructor = "instructor",
  Store = "store",
  Staff = "staff",
}

export enum DiverType {
  Freediver = "freediver",
  ScubaDiver = "scuba_diver",
}

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  bio?: string;
  location?: string;
  birth_date?: string;
  logged_in: boolean;
  is_staff: boolean;
  verified: boolean;
  active_role: Roles;
  diver_type: DiverType;
}

export interface RoleDetails {
  roleId: string;
  title: string;
  confirmMessage: string;
}

export interface RoleData extends RoleDetails {
  type: "scuba" | "freediver";
  iconName: CustomSvgIconName | undefined;
  buttonColor: ColorKey | undefined;
  onConfirm: () => void;
}

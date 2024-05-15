import { CustomSvgIconName } from "@components/Icon/libraries/CustomSvgIcon";
import { ColorKey } from "@styles/colors";

export interface CustomWindow extends Window {
  host: string;
  navigator: any;
  baseURL: string;
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
}

export interface RoleDetails {
  roleId: string;
  title: string;
  confirmMessage: string;
}

export interface RoleData extends RoleDetails {
  iconName: CustomSvgIconName | undefined;
  buttonColor: ColorKey | undefined;
  onConfirm: () => void;
}

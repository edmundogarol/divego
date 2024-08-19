import { CustomSvgIconName } from "@components/Icon/libraries/CustomSvgIcon";
import { ColorKey } from "@styles/colors";
import { Asset } from "react-native-image-picker";
import { ICountry } from "react-native-international-phone-number";

export interface CustomWindow extends Window {
  host: string;
  navigator: any;
  baseURL: string;
}

export enum RolesEnum {
  Diver = "diver",
  Instructor = "instructor",
  Store = "store",
  Staff = "staff",
}

export enum DiverTypeEnum {
  Freediver = "freediver",
  ScubaDiver = "scuba_diver",
}

export enum FreediverTypeEnum {
  FUN_DIVER = "fun_diver",
  LINE_DIVER = "line_diver",
  SPEAR_FISHER = "spear_fisher",
}

export enum Privileges {
  SUPER = "super",
  ADMIN = "admin",
  SCOUT = "scout",
}

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone?: string;
  phoneCountry?: ICountry;
  bio?: string;
  locations: Location[];
  privileges: Privileges[];
  current_location?: Location;
  birth_date?: string;
  logged_in: boolean;
  is_staff: boolean;
  verified: boolean;
  active_role: RolesEnum | null;
  diver_type: DiverTypeEnum | null;
  image?: Asset | string;
}

export interface Location {
  id?: string;
  place_id?: string;
  description?: string;
  main?: string;
  coordinates?: {
    lng: number;
    lat: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
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

export enum FreediveAgencyEnum {
  Molchanovs = "molchanovs",
  Aida = "aida",
  Padi = "padi",
  NonCertified = "non",
  Other = "other",
}

export enum FreediveCertificationEnum {
  NON_CERT = "non_cert",
  OTHER_CERT = "other_cert",
  MOLCHANOVS_WD = "molchanovs_waveD",
  MOLCHANOVS_W1 = "molchanovs_wave1",
  MOLCHANOVS_W2 = "molchanovs_wave2",
  MOLCHANOVS_W3 = "molchanovs_wave3",
  MOLCHANOVS_W4 = "molchanovs_wave4",
  MOLCHANOVS_W2I = "molchanovs_wave2i",
  MOLCHANOVS_W3I = "molchanovs_wave3i",
  MOLCHANOVS_W4I = "molchanovs_wave4i",
  MOLCHANOVS_IT = "molchanovs_it",
  MOLCHANOVS_W3IT = "molchanovs_w3it",
  MOLCHANOVS_W4IT = "molchanovs_w4it",
  MOLCHANOVS_ITD = "molchanovs_itd",
  AIDA_1 = "aida1",
  AIDA_2 = "aida2",
  AIDA_3 = "aida3",
  AIDA_4 = "aida4",
  AIDA_I = "aida_instructor",
  AIDA_MI = "aida_master_instructor",
  AIDA_IT = "aida_instructor_trainer",
  PADI_B = "padi_basic",
  PADI_F = "padi_freediver",
  PADI_AF = "padi_advanced_freediver",
  PADI_MF = "padi_master_freediver",
  PADI_FI = "padi_freediver_instructor",
  PADI_AFI = "padi_advanced_freediver_instructor",
  PADI_MFI = "padi_master_freediver_instructor",
  PADI_IT = "padi_freediver_instructor_trainer",
}

export interface Freediver {
  id?: number;
  user?: User;
  location?: string;
  preferred_dive_locations: string[];
  freediver_type: FreediverTypeEnum | null;
  certification?: FreediveCertificationEnum | null;
  certification_number?: string;
  certification_verified: boolean;
  image?: string;
  image_public?: string;
}

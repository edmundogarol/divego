import { FreediveAgencyEnum } from "@interfaces/CustomTypes";

export const FREEDIVE_AGENCY_SELECT_ITEMS = [
  { value: FreediveAgencyEnum.NonCertified, label: "Non-Certified" },
  { value: FreediveAgencyEnum.Molchanovs, label: "Molchanovs" },
  { value: FreediveAgencyEnum.Aida, label: "AIDA" },
  { value: FreediveAgencyEnum.Padi, label: "PADI" },
  { value: FreediveAgencyEnum.Other, label: "Other" },
];

export const FREEDIVE_CERTIFICATIONS_SHORTENED = {
  non_cert: "N/A",
  other_cert: "OT",
  molchanovs_waveD: "DW",
  molchanovs_wave1: "W1",
  molchanovs_wave2: "W2",
  molchanovs_wave3: "W3",
  molchanovs_wave4: "W4",
  molchanovs_wave2i: "W2I",
  molchanovs_wave3i: "W3I",
  molchanovs_wave4i: "W4I",
  molchanovs_it: "IT",
  molchanovs_w3it: "3IT",
  molchanovs_w4it: "4IT",
  molchanovs_itd: "ITD",
  aida1: "A1",
  aida2: "A2",
  aida3: "A3",
  aida4: "A4",
  aida_instructor: "IN",
  aida_master_instructor: "MI",
  aida_instructor_trainer: "IT",
  padi_basic: "B",
  padi_freediver: "F",
  padi_advanced_freediver: "AF",
  padi_master_freediver: "MF",
  padi_freediver_instructor: "IN",
  padi_advanced_freediver_instructor: "AI",
  padi_master_freediver_instructor: "MI",
  padi_freediver_instructor_trainer: "IT",
};

export const LONG_LAT_DELTA = 0.0019;

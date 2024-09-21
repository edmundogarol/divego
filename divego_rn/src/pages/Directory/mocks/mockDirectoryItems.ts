import clubkontiki from "@assets/dev/club_kontiki.png";
import doublek from "@assets/dev/double_k.png";
import panagsamabeach from "@assets/dev/panagsama_beach.png";
import tongobay from "@assets/dev/tongo_bay.png";
import freediveplanet from "@assets/dev/freedive_planet.png";
import { LocationAmenities, LocationsNearby } from "@interfaces/CustomTypes";

const mockDirectoryItems: { [key: number]: LocationsNearby } = {
  1: {
    id: 1,
    place_id: "1231231",
    description: "Club Kontiki",
    mapPhoto: clubkontiki,
    amenities: ["showers", "toilet", "food", "fee"] as LocationAmenities[],
    active: false,
  },
  2: {
    id: 2,
    place_id: "2342932",
    description: "Double K Academy",
    mapPhoto: doublek,
    amenities: [
      "showers",
      "toilet",
      "food",
      "gym",
      "fee",
    ] as LocationAmenities[],
    active: false,
  },
  3: {
    id: 3,
    place_id: "0293032",
    description: "Panagsama Beach",
    mapPhoto: panagsamabeach,
    amenities: ["food"] as LocationAmenities[],
    active: false,
  },
  4: {
    id: 4,
    place_id: "2039320",
    description: "Tongo Bay",
    mapPhoto: tongobay,
    amenities: [],
    active: false,
  },
  5: {
    id: 5,
    place_id: "2309432",
    description: "Freedive Planet",
    mapPhoto: freediveplanet,
    amenities: [
      "showers",
      "toilet",
      "food",
      "gym",
      "fee",
    ] as LocationAmenities[],
    active: false,
  },
};

export default mockDirectoryItems;

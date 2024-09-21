import clubkontiki from "@assets/dev/club_kontiki.png";
import doublek from "@assets/dev/double_k.png";
import panagsamabeach from "@assets/dev/panagsama_beach.png";
import tongobay from "@assets/dev/tongo_bay.png";
import freediveplanet from "@assets/dev/freedive_planet.png";

const mockDirectoryItems = [
  {
    id: 1,
    place_id: "1231231",
    description: "Club Kontiki",
    img: clubkontiki,
    amenities: ["showers", "toilet", "food", "fee"],
  },
  {
    id: 2,
    place_id: "2342932",
    description: "Double K Academy",
    img: doublek,
    amenities: ["showers", "toilet", "food", "gym"],
  },
  {
    id: 3,
    place_id: "0293032",
    description: "Panagsama Beach",
    img: panagsamabeach,
    amenities: ["food"],
  },
  {
    id: 4,
    place_id: "2039320",
    description: "Tongo Bay",
    img: tongobay,
  },
  {
    id: 5,
    place_id: "2309432",
    description: "Freedive Planet",
    img: freediveplanet,
    amenities: ["showers", "toilet", "food", "gym"],
  },
];

export default mockDirectoryItems;

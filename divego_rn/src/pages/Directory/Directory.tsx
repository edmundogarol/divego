import { useCallback } from "react";
import { ImageBackground, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import {
  DirectoryAmenitiesContainer,
  DirectoryAmenitiesIconContainer,
  DirectoryItemContainer,
  DirectoryItemHeader,
  DirectoryItemImage,
  DirectoryItemText,
} from "./DirectoryStyledComponents";
import Gap from "@components/Gap/Gap";
import Input from "@components/Input/Input";
import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import clubkontiki from "@assets/dev/club_kontiki.png";
import doublek from "@assets/dev/double_k.png";
import panagsamabeach from "@assets/dev/panagsama_beach.png";
import tongobay from "@assets/dev/tongo_bay.png";
import freediveplanet from "@assets/dev/freedive_planet.png";
import Icon from "@components/Icon/Icon";
import { color } from "@styles/colors";

const Directory: React.FunctionComponent = () => {
  const navigation = useReactNavigation();
  const renderInputIcon = useRenderInputIcon();

  const renderDirectoryItem = useCallback(({ item }: any) => {
    return (
      <DirectoryItemContainer>
        <DirectoryItemImage source={item.img}>
          <DirectoryItemHeader>
            <DirectoryItemText>{item.description}</DirectoryItemText>
            <DirectoryAmenitiesContainer>
              {item.amenities &&
                item.amenities?.map((amenity: string) => {
                  switch (amenity) {
                    case "toilet":
                      return (
                        <DirectoryAmenitiesIconContainer
                          color={color("SystemWhite")}
                          name="toilet"
                          type={IconTypeEnum.MaterialCommunityIcons}
                        />
                      );
                    case "showers":
                      return (
                        <DirectoryAmenitiesIconContainer
                          color={color("SystemWhite")}
                          name="shower"
                          type={IconTypeEnum.FontAwesome}
                        />
                      );
                    case "food":
                      return (
                        <DirectoryAmenitiesIconContainer
                          color={color("SystemWhite")}
                          name="food"
                          type={IconTypeEnum.MaterialCommunityIcons}
                        />
                      );
                    case "gym":
                      return (
                        <DirectoryAmenitiesIconContainer
                          color={color("SystemWhite")}
                          name="barbell"
                          type={IconTypeEnum.Ionicons}
                        />
                      );
                    default:
                      return (
                        <DirectoryAmenitiesIconContainer
                          color={color("SystemWhite")}
                          name="question"
                          type={IconTypeEnum.FontAwesome5}
                        />
                      );
                  }
                })}
            </DirectoryAmenitiesContainer>
          </DirectoryItemHeader>
        </DirectoryItemImage>
      </DirectoryItemContainer>
    );
  }, []);

  useCustomScreenOptions({
    title: <Text>{"Dive Directory"}</Text>,
    backButtonOnPress: () => navigation.goBack(),
  });

  return (
    <ScrollView scrollEnabled={true}>
      <Gap level={1} />
      <Input
        placeholder="Enter Dive Site Location"
        icon={renderInputIcon("search", IconTypeEnum.FontAwesome, false)}
        googleAutoComplete
      />
      <FlatList
        data={[
          {
            id: 1,
            place_id: "1231231",
            description: "Club Kontiki",
            img: clubkontiki,
            amenities: ["showers", "toilet", "food"],
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
        ]}
        scrollEnabled={false}
        renderItem={renderDirectoryItem}
        contentContainerStyle={{}}
      />
    </ScrollView>
  );
};

export default Directory;

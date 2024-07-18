import { Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import Gap from "@components/Gap/Gap";
import Input from "@components/Input/Input";
import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import useRenderDirectoryItem from "./hooks/useRenderDirectoryItem";
import mockDirectoryItems from "./mocks/mockDirectoryItems";
import { DirectoryContainer } from "./DirectoryStyledComponents";
import CurrentLocationButton from "./CurrentLocationButton";

const Directory: React.FunctionComponent = () => {
  const navigation = useReactNavigation();
  const renderInputIcon = useRenderInputIcon();
  const renderDirectoryItem = useRenderDirectoryItem();

  useCustomScreenOptions({
    title: <Text>{"Dive Directory"}</Text>,
    backButtonOnPress: () => navigation.goBack(),
    rightButton: <CurrentLocationButton />,
  });

  return (
    <DirectoryContainer>
      <Input
        placeholder="Enter Dive Site Location"
        icon={renderInputIcon("search", IconTypeEnum.FontAwesome, false)}
        googleAutoComplete
        subtext={
          "Showing suggestions within a 10km radius from current location"
        }
      />
      <ScrollView scrollEnabled={true}>
        <Gap level={1} />
        <FlatList
          data={mockDirectoryItems}
          scrollEnabled={false}
          renderItem={renderDirectoryItem}
          contentContainerStyle={{}}
        />
      </ScrollView>
    </DirectoryContainer>
  );
};

export default Directory;

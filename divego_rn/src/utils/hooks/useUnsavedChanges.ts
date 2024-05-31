import { Alert } from "react-native";

const useUnsavedChanges = (
  unsavedCondition: boolean,
  continueNoSavingAction: () => void,
  noUnsavedAction: () => void,
) => {
  return () => {
    if (unsavedCondition) {
      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. Save them first or all information provided will be lost if you leave.",
        [
          {
            text: "Cancel",
          },
          {
            text: "Continue",
            onPress: continueNoSavingAction,
          },
        ],
      );
    } else {
      noUnsavedAction();
    }
  };
};

export default useUnsavedChanges;

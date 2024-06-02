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
        "You have unsaved changes. Save them first or all your progress will be lost.",
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

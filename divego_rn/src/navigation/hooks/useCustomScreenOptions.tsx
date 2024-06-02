import React, { useEffect } from "react";
import { useCommonHeaderOptions } from "@navigation/hooks/useCommonHeaderOptions";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import BackButton from "@navigation/components/BackButton";
import { If } from "@components/If/If";

interface CustomScreenOptionProps {
  title: string;
  backButtonOnPress?: () => void;
  backButtonDisabled?: boolean;
  rightButtonOnPress?: () => void;
  rightButtonText?: string;
  rightButtonDisabled?: boolean;
  depList: any[];
  loadCondition?: boolean;
}

const useCustomScreenOptions = ({
  title,
  backButtonOnPress,
  backButtonDisabled,
  rightButtonOnPress,
  rightButtonDisabled,
  rightButtonText,
  depList,
  loadCondition = true,
}: CustomScreenOptionProps): void => {
  const navigation = useReactNavigation();
  const headerOptions = useCommonHeaderOptions();

  useEffect(() => {
    if (loadCondition) {
      navigation.setOptions({
        ...headerOptions,
        headerTitle: title,
        headerLeft: (): React.ReactElement => (
          <If condition={!!backButtonOnPress}>
            <BackButton
              disabled={backButtonDisabled}
              onPress={() => (backButtonOnPress ? backButtonOnPress() : null)}
            />
          </If>
        ),
        headerRight: (): React.ReactElement => (
          <If condition={!!rightButtonOnPress}>
            <BackButton
              forward
              disabled={rightButtonDisabled}
              text={rightButtonText}
              onPress={() => (rightButtonOnPress ? rightButtonOnPress() : null)}
            />
          </If>
        ),
      });
    }
  }, [depList]);
};

export default useCustomScreenOptions;

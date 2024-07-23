import React, { useEffect } from "react";
import { useCommonHeaderOptions } from "@navigation/hooks/useCommonHeaderOptions";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import BackButton from "@navigation/components/BackButton";
import { Else, If } from "@components/If/If";
import { Text } from "react-native";
import { PageEnum } from "@interfaces/NavigationTypes";

interface CustomScreenOptionProps {
  title: string | JSX.Element;
  backButtonOnPress?: () => void;
  backButtonDisabled?: boolean;
  backButton?: JSX.Element;
  rightButtonOnPress?: () => void;
  rightButtonText?: string;
  rightButtonDisabled?: boolean;
  rightButton?: JSX.Element;
  depList?: any[];
  loadCondition?: boolean;
  onClose?: () => void;
}

const useCustomScreenOptions = ({
  title,
  backButton,
  backButtonOnPress,
  backButtonDisabled,
  rightButton,
  rightButtonOnPress,
  rightButtonDisabled,
  rightButtonText,
  depList = [],
  loadCondition = true,
  onClose,
}: CustomScreenOptionProps): void => {
  const navigation = useReactNavigation();
  const headerOptions = useCommonHeaderOptions();

  useEffect(() => {
    if (onClose) {
      navigation.self().addListener("beforeRemove", (e) => {
        if (
          e.target &&
          e?.target.includes(navigation.getCurrentPageName() as PageEnum)
        ) {
          onClose();
        }
      });
    }
  }, [navigation]);

  useEffect(() => {
    if (loadCondition) {
      navigation.setOptions({
        ...headerOptions,
        headerTitle: () => (
          <Text
            style={{ maxWidth: 150, textAlign: "center", fontSize: 17 }}
            numberOfLines={2}>
            {title}
          </Text>
        ),
        headerLeft: (): React.ReactElement => (
          <If condition={!!backButton}>
            {backButton || <></>}
            <Else>
              <If condition={!!backButtonOnPress}>
                <BackButton
                  disabled={backButtonDisabled}
                  onPress={() =>
                    backButtonOnPress ? backButtonOnPress() : null
                  }
                />
              </If>
            </Else>
          </If>
        ),
        headerRight: (): React.ReactElement => (
          <If condition={!!rightButton}>
            {rightButton || <></>}
            <Else>
              <If condition={!!rightButtonOnPress}>
                <BackButton
                  forward
                  disabled={rightButtonDisabled}
                  text={rightButtonText}
                  onPress={() =>
                    rightButtonOnPress ? rightButtonOnPress() : null
                  }
                />
              </If>
            </Else>
          </If>
        ),
      });
    }
  }, [...depList]);
};

export default useCustomScreenOptions;

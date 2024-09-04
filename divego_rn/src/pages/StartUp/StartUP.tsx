import React from "react";
import useRoleScreens from "./hooks/useRoleScreens";
import useStartUpState from "./hooks/useStartUpState";
import useStartUpDispatch from "./hooks/useStartUpDispatch";
import Carousel from "@components/Carousel/Carousel";

const StartUp: React.FunctionComponent = () => {
  const { active_index, screens_group } = useStartUpState();
  const { updateStartUpActiveIndex } = useStartUpDispatch();
  const roleScreens = useRoleScreens();
  const startUpScreens = roleScreens();

  return (
    <Carousel
      activeIndex={active_index}
      updateIndex={updateStartUpActiveIndex}
      screens={startUpScreens[screens_group]}
    />
  );
};

export default StartUp;

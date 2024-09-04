import React from "react";
import useDirectoryState from "../hooks/useDirectoryState";
import useNominateDiveSiteScreens from "../hooks/useNominateDiveSiteScreens";
import useDirectoryDispatch from "../hooks/useDirectoryDispatch";
import Carousel from "@components/Carousel/Carousel";

const NominateDiveSite: React.FunctionComponent = () => {
  const { nominateDiveSiteActiveIndex } = useDirectoryState();
  const { updateNominateDiveSiteActiveIndex } = useDirectoryDispatch();
  const nominateDiveSiteScreens = useNominateDiveSiteScreens();

  return (
    <Carousel
      activeIndex={nominateDiveSiteActiveIndex}
      updateIndex={updateNominateDiveSiteActiveIndex}
      screens={nominateDiveSiteScreens}
    />
  );
};

export default NominateDiveSite;

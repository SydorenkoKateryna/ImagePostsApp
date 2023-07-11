import React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowLeftSvg = ({ style: { stroke = "#212121" } }) => {
  return (
    <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M20 12H4"
        stroke={stroke}
        strokeOpacity={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 18L4 12L10 6"
        stroke={stroke}
        strokeOpacity={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowLeftSvg;

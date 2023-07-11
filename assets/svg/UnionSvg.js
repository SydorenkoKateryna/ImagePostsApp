import React from "react";
import Svg, { Path } from "react-native-svg";

const UnionSvg = ({ style: { fill = "#212121" } }) => {
  return (
    <Svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 0.5H6.5V6.5H0.5V7.5H6.5V13.5H7.5V7.5H13.5V6.5H7.5V0.5Z"
        fill={fill}
        fillOpacity={0.8}
      />
    </Svg>
  );
};

export default UnionSvg;

import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const ProfileImgSvg = ({
  style: { fill = "#FF6C00", stroke = "#FF6C00", backgroundColor = "#ffffff" },
}) => {
  return (
    <Svg width={25} height={25} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle
        cx={12.5}
        cy={12.5}
        r={12}
        fill={backgroundColor}
        stroke={stroke}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
        fill={fill}
      />
    </Svg>
  );
};

export default ProfileImgSvg;

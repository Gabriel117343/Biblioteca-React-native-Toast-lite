import Svg, { Path } from 'react-native-svg';
import React from 'react';
const WarningSvg = ({ color = 'white', size = 16, ...props }) => (React.createElement(Svg, { width: size, height: size, fill: color, viewBox: "0 0 16 16", ...props },
    React.createElement(Path, { d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" }),
    React.createElement(Path, { d: "M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" })));
export default WarningSvg;
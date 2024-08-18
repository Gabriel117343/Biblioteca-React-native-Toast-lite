import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { TOAST_CONFIG } from '../toasts/toastConfig';
const WarningSvg = ({ toastStyle = 'primary', iconColor, iconStyle = 'outline', iconSize = 28, }) => {
    const defaultColor = TOAST_CONFIG.warning[toastStyle]['iconColor'];
    return (React.createElement(Svg, { width: iconSize, height: iconSize, fill: iconColor ?? defaultColor, viewBox: "0 0 16 16" }, toastStyle === 'primary' && iconStyle !== 'solid' ? (React.createElement(React.Fragment, null,
        iconStyle === 'outline' && (React.createElement(React.Fragment, null,
            React.createElement(Path, { d: "M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z" }),
            React.createElement(Path, { d: "M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" }))),
        iconStyle === 'default' && (React.createElement(Path, { d: "M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0" })))) : (React.createElement(Path, { d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" }))));
};
export default WarningSvg;
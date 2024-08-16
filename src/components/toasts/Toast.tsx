import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutLeft,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import ErrorSvg from '../ui/ErrorSvg';
import SuccessSvg from '../ui/SuccessSvg';
import InfoSvg from '../ui/InfoSvg';
import WarningSvg from '../ui/WarningSvg';
import { toastStyles, positionStyles } from './commonStyles';
import { ToastProps } from './types';
import { TOAST_CONFIG } from './toastConfig';

export const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  position,
  toastStyle = 'primary',
  icon,
  duration = 3000,
  progress = true,
  border = true,
  styles, // objeto de estilos personalizados
}) => {
  const progressValue = useSharedValue(0);

  useEffect(() => {
    // Reiniciar el progressValue cuando cambie el type y animarlo nuevamente
    progressValue.value = 0;
    // la animación se ejecuta varias veces hasta que se cumpla la duración
    progressValue.value = withTiming(115, { duration: duration });
  }, [duration, progressValue, progress, type]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutLeft}
      style={[
        toastStyles.container,
        positionStyles[position ?? 'top'],
        {
          borderWidth: border ? 1 : 0,
          borderColor:
            styles?.borderColor ?? TOAST_CONFIG[type][toastStyle].borderColor,
        },
      ]}
    >
      <View
        style={[
          StyleSheet.absoluteFillObject,
          toastStyles.fondoContainer,
          {
            backgroundColor:
              styles?.backgroundColor ??
              TOAST_CONFIG[type][toastStyle].backgroundColor,
          },
        ]}
      />
      <View style={toastStyles.contentContainer}>
        <RenderIcon
          type={type}
          toastStyle={toastStyle}
          iconColor={
            styles?.iconColor ?? TOAST_CONFIG[type][toastStyle].iconColor
          }
          icon={icon}
          iconSize={styles?.iconSize}
          iconStyle={styles?.iconStyle}
        />

        <View style={title ? {} : { alignItems: 'center' }}>
          {title && (
            <Text
              style={[
                toastStyles.title,
                {
                  fontSize: styles?.titleSize ?? TOAST_CONFIG[type].titleSize,
                  color:
                    styles?.titleColor ??
                    TOAST_CONFIG[type][toastStyle].titleColor,
                },
              ]}
            >
              {title ?? TOAST_CONFIG[type].title}
            </Text>
          )}
          <Text
            style={[
              toastStyles.text,
              {
                fontSize: styles?.textSize ?? TOAST_CONFIG[type].textSize,
                color:
                  styles?.textColor ?? TOAST_CONFIG[type][toastStyle].textColor,
              },
              !title && { fontWeight: 'bold' },
            ]}
          >
            {message ?? TOAST_CONFIG[type].message}
          </Text>
        </View>
        {progress && (
          <View style={toastStyles.progressContainer}>
            <Animated.View
              style={[
                toastStyles.progressBar,
                animatedStyle,
                {
                  backgroundColor:
                    styles?.progressColor ??
                    TOAST_CONFIG[type][toastStyle].progressColor,
                },
              ]}
            />
          </View>
        )}
      </View>
    </Animated.View>
  );
};
// Función para renderizar el icono según el tipo de toast

interface RenderIconProps {
  type: 'error' | 'success' | 'info' | 'warning' | 'loading';
  toastStyle: 'primary' | 'secondary' | 'primaryDark' | 'dark'; // este parametro si tiene un valor por defecto
  icon?: string; // emoji
  iconColor?: string; // opcionales
  iconSize?: number;
  iconStyle?: 'solid' | 'outline' | 'default';
}
function RenderIcon({
  type,
  toastStyle,
  iconColor,
  icon,
  iconSize,
  iconStyle,
}: RenderIconProps) {
  const iconProgress = useSharedValue(0);

  useEffect(() => {
    // Reiniciar el iconProgress cuando cambie el type y animarlo nuevamente
    iconProgress.value = 0;
    iconProgress.value = withTiming(1, { duration: 500 });
  }, [iconProgress, type]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(iconProgress.value, [0, 1], [0, 1]),
      transform: [
        {
          scale: interpolate(iconProgress.value, [0, 1], [0.5, 1]),
        },
      ],
    };
  });

  const renderIcon = () => {
    if (icon)
      return (
        <Text
          style={[
            {
              fontSize: iconSize ?? 25,
            },
          ]}
        >
          {icon}
        </Text>
      );
    switch (type) {
      case 'error':
        return (
          <ErrorSvg
            toastStyle={toastStyle}
            iconColor={iconColor}
            iconSize={iconSize}
            iconStyle={iconStyle}
          />
        );
      case 'success':
        return (
          <SuccessSvg
            toastStyle={toastStyle}
            iconColor={iconColor}
            iconSize={iconSize}
            iconStyle={iconStyle}
          />
        );
      case 'info':
        return (
          <InfoSvg
            toastStyle={toastStyle}
            iconColor={iconColor}
            iconSize={iconSize}
            iconStyle={iconStyle}
          />
        );
      case 'warning':
        return (
          <WarningSvg
            toastStyle={toastStyle}
            iconColor={iconColor}
            iconSize={iconSize}
            iconStyle={iconStyle}
          />
        );
      case 'loading':
        return <ActivityIndicator size={iconSize ?? 30} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <Animated.View style={animatedIconStyle}>{renderIcon()}</Animated.View>
  );
}

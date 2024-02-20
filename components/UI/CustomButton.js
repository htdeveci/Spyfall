import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/globalConstants";

export default function CustomButton({
  children,
  onPress,
  fontSize,
  style,
  innerStyle,
  secondary = false,
  cancel = false,
  success = false,
  disabled = false,
  iconLabel = null,
  iconLabelGap = 16,
  fullWidth = true,
  customChildren = false,
  upperCase = true,
  buttonColorProp,
  rippleColorProp,
  textStyle,
}) {
  let buttonColor = COLORS.primary;
  let rippleColor = COLORS.primaryDark;

  if (secondary) {
    buttonColor = COLORS.secondary;
    rippleColor = COLORS.secondaryDark;
  }

  if (cancel) {
    buttonColor = COLORS.error;
    rippleColor = COLORS.errorDark;
  }

  if (success) {
    buttonColor = COLORS.success;
    rippleColor = COLORS.successDark;
  }

  if (disabled) {
    buttonColor = COLORS.darkGray;
  }

  if (buttonColorProp) {
    buttonColor = buttonColorProp;
  }
  if (rippleColorProp) {
    rippleColor = rippleColorProp;
  }

  return (
    <View
      style={[
        styles.buttonOuterContainer,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      <Pressable
        style={[
          styles.buttonInnerContainer,
          innerStyle,
          { backgroundColor: buttonColor },
        ]}
        onPress={onPress}
        android_ripple={{ color: rippleColor }}
        disabled={disabled}
      >
        {!customChildren && (
          <Text style={[styles.buttonText, textStyle, { fontSize }]}>
            {upperCase ? children.toUpperCase() : children}
          </Text>
        )}

        {customChildren && iconLabel && (
          <>
            <Text
              style={[
                styles.buttonText,
                textStyle,
                { marginRight: iconLabelGap },
              ]}
            >
              {upperCase ? iconLabel.toUpperCase() : iconLabel}
            </Text>
            {children}
          </>
        )}

        {customChildren && !iconLabel && children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,
  },
  buttonInnerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: COLORS.text,
    textAlign: "center",
  },
  fullWidth: {
    flex: 1,
  },
});

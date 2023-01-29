import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/globalConstants";

export default function CustomButton({
  children,
  onPress,
  fontSize,
  style,
  secondary = false,
  cancel = false,
  success = false,
  disabled = false,
  // icon = false,
  iconLabel = null,
  iconLabelGap = 16,
  fullWidth = true,
  useOpacity = true,
  customChildren = false,
  upperCase = true,
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

  return (
    <View
      style={[
        styles.buttonOuterContainer,
        style,
        { alignItems: fullWidth ? undefined : "center" },
      ]}
    >
      <Pressable
        style={
          useOpacity
            ? ({ pressed }) =>
                pressed
                  ? [
                      styles.buttonInnerContainer,
                      styles.pressed,
                      { backgroundColor: buttonColor },
                    ]
                  : [
                      styles.buttonInnerContainer,
                      { backgroundColor: buttonColor },
                    ]
            : [styles.buttonInnerContainer, { backgroundColor: buttonColor }]
        }
        onPress={onPress}
        android_ripple={{ color: rippleColor }}
        disabled={disabled}
      >
        {!customChildren && (
          <Text style={[styles.buttonText, { fontSize }]}>
            {upperCase ? children.toUpperCase() : children}
          </Text>
        )}

        {customChildren && iconLabel && (
          <>
            <Text style={[styles.buttonText, { marginRight: iconLabelGap }]}>
              {upperCase ? iconLabel.toUpperCase() : iconLabel}
            </Text>
            {children}
          </>
        )}

        {customChildren && !iconLabel && { children }}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.text,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

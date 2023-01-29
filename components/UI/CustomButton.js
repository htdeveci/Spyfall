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
  icon = false,
  iconLabel = null,
  iconLabelGap = 16,
  fullWidth = true,
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
        style={({ pressed }) =>
          pressed
            ? [
                styles.buttonInnerContainer,
                styles.pressed,
                { backgroundColor: buttonColor },
              ]
            : [styles.buttonInnerContainer, { backgroundColor: buttonColor }]
        }
        onPress={onPress}
        android_ripple={{ color: rippleColor }}
        disabled={disabled}
      >
        {!icon && (
          <Text style={[styles.buttonText, { fontSize }]}>
            {children.toUpperCase()}
          </Text>
        )}

        {icon && iconLabel && (
          <Text style={[styles.buttonText, { marginRight: iconLabelGap }]}>
            {iconLabel.toUpperCase()}
          </Text>
        )}

        {icon && children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    flex: 1,
  },
  buttonInnerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    elevation: 2,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.text,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

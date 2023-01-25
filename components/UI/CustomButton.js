import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/globalConstants";

export default function CustomButton({
  children,
  onPress,
  // height,
  fontSize,
  style,
  cancel = false,
  success = false,
  disabled = false,
}) {
  let buttonColor = COLORS.primary;
  let rippleColor = COLORS.primaryDark;

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
    <View style={[styles.buttonOuterContainer, style]}>
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
        // height={height}
        onPress={onPress}
        android_ripple={{ color: rippleColor }}
        disabled={disabled}
      >
        <Text style={[styles.buttonText, { fontSize }]}>
          {children.toUpperCase()}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 10,
    overflow: "hidden",
    flex: 1,
  },
  buttonInnerContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.text,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

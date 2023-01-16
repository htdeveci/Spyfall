import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CustomButton({
  children,
  onPress,
  height,
  fontSize,
  style,
}) {
  return (
    <View style={[styles.buttonOuterContainer, style]}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        height={height}
        onPress={onPress}
        android_ripple={{ color: "#cc7400" }}
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
    // margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: "#ff9100",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff5e8",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

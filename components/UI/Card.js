import { Pressable, StyleSheet, View } from "react-native";

import { COLORS } from "../../constants/globalConstants";

export default function Card({ style, children, onPress = null }) {
  if (onPress) {
    return (
      <Pressable style={[styles.container, style]} onPress={onPress}>
        {children}
      </Pressable>
    );
  } else {
    return <View style={[styles.container, style]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    backgroundColor: COLORS.border,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
});

import { StyleSheet, View } from "react-native";
import { COLORS, GAP_BETWEEN_LAYERS } from "../../constants/globalConstants";

export default function BorderedView({ style, children }) {
  return <View style={[styles.seperator, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  seperator: {
    // flex: 1,
    // flexDirection: "row",
    borderWidth: 0.5,
    borderStyle: "dashed",
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: GAP_BETWEEN_LAYERS,
    marginBottom: GAP_BETWEEN_LAYERS,
  },
});

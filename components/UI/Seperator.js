import { StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/globalConstants";

export default function Seperator({ style }) {
  return <View style={[styles.seperator, style]}></View>;
}

const styles = StyleSheet.create({
  seperator: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.border,
  },
});

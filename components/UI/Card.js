import { StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/globalConstants";

export default function Card(props) {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    backgroundColor: COLORS.lightGray,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
  },
});

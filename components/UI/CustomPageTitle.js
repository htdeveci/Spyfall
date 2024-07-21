import { StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/globalConstants";

export default function CustomPageTitle({ title }) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.text,
    fontSize: 30,
    textAlign: "center",
  },
});

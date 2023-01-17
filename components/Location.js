import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

export default function Location({ location }) {
  const toggleLocationHandler = () => {
    // setLocation((location) => !location);
  };

  return (
    <View style={styles.container}>
      <Switch value={location} onValueChange={toggleLocationHandler} />

      <Pressable onPress={toggleLocationHandler} style={styles.locationSwitch}>
        <Text style={styles.locationSwitchText}>{location.locationName}</Text>
      </Pressable>

      <Pressable style={styles.openDetailButton}>
        <Ionicons name="caret-down" size={24} color={COLORS.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderColor: COLORS.border,
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  locationSwitch: {
    flex: 1,
    paddingLeft: 10,
    marginRight: 10,
  },
  locationSwitchText: {
    color: COLORS.text,
    flex: 1,
    textAlignVertical: "center",
  },
  openDetailButton: {
    alignSelf: "stretch",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

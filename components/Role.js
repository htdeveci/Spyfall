import { StyleSheet, Text, TextInput, View } from "react-native";
import COLORS from "../constants/colors";
import CustomTextInput from "./UI/CustomTextInput";

export default function Role({ children, index, onRoleChange }) {
  const roleChangeHandler = (changedRole) => {
    onRoleChange(changedRole);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: COLORS.textReverse,
          textAlign: "right",
          width: 50,
          marginRight: 4,
        }}
      >
        {`${index}. Rol:`}
      </Text>
      <CustomTextInput value={children} onChangeText={roleChangeHandler} />
      {/* <Text style={{ color: COLORS.textReverse }}>{children}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.text,
    width: "50%",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 5,
    paddingVertical: 6,
    // marginHorizontal: 10,
  },
});

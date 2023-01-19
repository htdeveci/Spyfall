import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { COLORS } from "../constants/globalConstants";
import CustomTextInput from "./UI/CustomTextInput";

export default function Role({
  children,
  index,
  onRoleChange,
  style,
  showCheckbox,
  textAlign = "left",
}) {
  const [enableRole, setEnableRole] = useState(true);

  const toggleRoleEnableHandler = () => {
    setEnableRole((state) => !state);
  };

  const roleChangeHandler = (changedRole) => {
    onRoleChange(changedRole);
  };

  return (
    <View style={[styles.container, style]}>
      {showCheckbox && (
        <Checkbox
          status={enableRole ? "checked" : "unchecked"}
          onPress={toggleRoleEnableHandler}
          color={COLORS.secondary}
        />
      )}

      <CustomTextInput
        value={children}
        placeholder={`${index}. Rol`}
        onChangeText={roleChangeHandler}
        style={{ textAlign: textAlign }}
      />
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

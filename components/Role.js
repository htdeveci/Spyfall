import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { COLORS } from "../constants/globalConstants";
import CustomTextInput from "./UI/CustomTextInput";

export default function Role({
  children,
  index,
  onRoleNameChange,
  style,
  showCheckbox,
  enableRole,
  onRoleEnabledChange,
  textAlign = "left",
}) {
  const toggleRoleEnableHandler = () => {
    onRoleEnabledChange(!enableRole, index);
  };

  const roleNameChangeHandler = (newRoleName) => {
    onRoleNameChange(newRoleName, index);
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
        onChangeText={roleNameChangeHandler}
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
  },
});

import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../constants/globalConstants";
import { changeRoleName, toggleRoleStatus } from "../store/locationsSlice";
import CustomTextInput from "./UI/CustomTextInput";

export default function Role({ index, style, locationIndex, roleIndex }) {
  const role = useSelector(
    (state) => state.locations[locationIndex].roles[roleIndex]
  );
  const dispatch = useDispatch();

  const toggleRoleStatusHandler = () => {
    dispatch(toggleRoleStatus({ locationIndex, roleIndex }));
  };

  const roleNameChangeHandler = (newRoleName) => {
    dispatch(
      changeRoleName({ locationIndex, roleIndex, roleName: newRoleName })
    );
  };

  return (
    <>
      {role && (
        <View style={[styles.container, style]}>
          <Checkbox
            status={role.enabled ? "checked" : "unchecked"}
            onPress={toggleRoleStatusHandler}
            color={COLORS.secondary}
          />

          <CustomTextInput
            value={role.roleName}
            placeholder={`${index}. Rol`}
            onChangeText={roleNameChangeHandler}
          />
        </View>
      )}
    </>
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

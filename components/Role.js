import { StyleSheet, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { COLORS } from "../constants/globalConstants";
import { changeRoleName, toggleRoleStatus } from "../store/locationsSlice";
import CustomTextInput from "./UI/CustomTextInput";

export default function Role({ index, style, roleId }) {
  const role = useSelector((store) => {
    let selectedRole;
    for (let i = 0; i < store.locations.length; i++) {
      selectedRole = store.locations[i].roles.find((r) => r.id === roleId);
      if (!!selectedRole) break;
    }
    return selectedRole;
  });
  const dispatch = useDispatch();

  const toggleRoleStatusHandler = () => {
    dispatch(toggleRoleStatus({ roleId }));
  };

  const roleNameChangeHandler = (newRoleName) => {
    dispatch(
      changeRoleName({
        roleId,
        roleName: newRoleName,
      })
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
    borderColor: COLORS.backgroud,
    borderRadius: 10,
    paddingRight: 5,
    paddingVertical: 6,
  },
});

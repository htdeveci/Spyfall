import { StyleSheet, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { COLORS } from "../constants/globalConstants";
import { changeRoleName, toggleRoleStatus } from "../store/locationsSlice";
import CustomTextInput from "./UI/CustomTextInput";

export default function Role({
  index,
  style,
  locationGroupId,
  locationId,
  roleId,
}) {
  const role = useSelector((store) => {
    const locGroup = store.locations.future.find(
      (locGroup) => locGroup.id === locationGroupId
    );
    const location = locGroup.data.find((loc) => loc.id === locationId);
    return location.roles.find((r) => r.id === roleId);
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const toggleRoleStatusHandler = () => {
    dispatch(toggleRoleStatus({ locationGroupId, locationId, roleId }));
  };

  const roleNameChangeHandler = (newRoleName) => {
    setTimeout(
      () =>
        dispatch(
          changeRoleName({
            locationGroupId,
            locationId,
            roleId,
            roleName: newRoleName,
          })
        ),
      0
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
            placeholder={`${index}. ${t("Role.text.roleNamePlaceHolder")}`}
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

import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import {
  COLORS,
  GAP_BETWEEN_LAYERS,
  LINE_HEIGHT,
} from "../constants/globalConstants";
import Role from "./Role";
import CustomTextInput from "./UI/CustomTextInput";
import Card from "./UI/Card";
import {
  changeLocationName,
  deleteLocation,
  toggleAllRolesStatusForOneLocation,
  toggleLocationStatus,
} from "../store/locationsSlice";
import CustomButton from "./UI/CustomButton";

export default function Location({
  locationGroupId,
  locationId,
  roleHeight,
  style,
}) {
  const location = useSelector((store) => {
    const locGroup = store.locations.future.find(
      (locGroup) => locGroup.id === locationGroupId
    );
    return locGroup.data.find((loc) => loc.id === locationId);
  });
  const [expandRoles, setExpandRoles] = useState(false);
  const [enableAllRoles, setEnableAllRoles] = useState("indeterminate");
  const dispatch = useDispatch();

  const toggleLocationStatusHandler = () => {
    dispatch(toggleLocationStatus({ locationGroupId, locationId }));
  };

  const toggleExpandRolesHandler = () => {
    setExpandRoles((state) => !state);
  };

  const locationNameChangeHandler = (value) => {
    dispatch(
      changeLocationName({ locationGroupId, locationId, locationName: value })
    );
  };

  const toggleAllRolesStatusHandler = () => {
    let enabled = "checked";
    if (enableAllRoles === "checked") enabled = "unchecked";
    dispatch(
      toggleAllRolesStatusForOneLocation({
        locationGroupId,
        locationId,
        status: enabled === "checked",
      })
    );
    setEnableAllRoles(enabled);
  };

  const getRoles = () => {
    let result = [];
    for (let i = 0; i < location.roles.length; i++) {
      result.push(
        <Role
          key={i}
          index={i + 1}
          locationGroupId={locationGroupId}
          locationId={locationId}
          roleId={location.roles[i].id}
          style={{ height: roleHeight }}
        />
      );
    }
    return result;
  };

  const deleteLocationHandler = () => {
    dispatch(deleteLocation({ locationGroupId, locationId }));
    // setExpandRoles(false);
  };

  return (
    <>
      {location && (
        <View style={style}>
          <View style={[styles.container, { height: LINE_HEIGHT }]}>
            <Checkbox
              status={location.enabled ? "checked" : "unchecked"}
              onPress={toggleLocationStatusHandler}
              color={COLORS.primary}
            />

            <Pressable
              style={styles.locationSwitch}
              onPress={toggleLocationStatusHandler}
            >
              <Text style={styles.locationSwitchText}>
                {location.locationName ? location.locationName : "Mekan Ad??"}
              </Text>
            </Pressable>

            <Pressable
              style={styles.openDetailButton}
              onPress={toggleExpandRolesHandler}
            >
              {!expandRoles && (
                <Ionicons name="caret-down" size={24} color={COLORS.text} />
              )}
              {expandRoles && (
                <Ionicons name="caret-up" size={24} color={COLORS.text} />
              )}
            </Pressable>
          </View>

          {expandRoles && (
            <>
              <View style={styles.rolesContainer}>
                <Card style={{ width: "50%", height: roleHeight }}>
                  <CustomTextInput
                    placeholder="Mekan Ad??"
                    value={location.locationName}
                    onChangeText={locationNameChangeHandler}
                    style={{ textAlign: "center" }}
                  />
                </Card>

                <Card
                  style={{
                    width: "50%",
                    height: roleHeight,
                    paddingVertical: 0,
                  }}
                >
                  <Pressable
                    onPress={toggleAllRolesStatusHandler}
                    style={styles.allRolesPressable}
                  >
                    <Text
                      style={{
                        color: COLORS.textReverse,
                      }}
                    >
                      B??t??n Roller
                    </Text>
                    <Checkbox
                      status={enableAllRoles}
                      onPress={toggleAllRolesStatusHandler}
                      color={COLORS.secondary}
                    />
                  </Pressable>
                </Card>

                {getRoles()}

                <View
                  style={{
                    height: roleHeight,
                    width: "50%",
                    borderWidth: 1,
                    borderColor: COLORS.backgroud,
                  }}
                >
                  <CustomButton
                    onPress={deleteLocationHandler}
                    cancel
                    customChildren
                    iconLabel="MEKANI S??L"
                  >
                    <MaterialIcons
                      name="delete-forever"
                      size={30}
                      color={COLORS.text}
                    />
                  </CustomButton>
                </View>
              </View>
            </>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: COLORS.border,
    borderStyle: "solid",
    borderWidth: 1,
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
  rolesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: GAP_BETWEEN_LAYERS / 2,
    justifyContent: "center",
  },
  allRolesPressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
    height: "100%",
    width: "100%",
  },
});

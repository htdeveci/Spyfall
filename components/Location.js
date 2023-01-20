import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";

import { COLORS } from "../constants/globalConstants";
import Role from "./Role";
import CustomTextInput from "./UI/CustomTextInput";
import CustomButton from "./UI/CustomButton";
import Card from "./UI/Card";

export default function Location({ location, onLocationChange, height }) {
  const [loc, setLocation] = useState(location);
  const [expandRoles, setExpandRoles] = useState(false);
  const [enableAllRoles, setEnableAllRoles] = useState("indeterminate");

  const toggleLocationEnableHandler = () => {
    setStates({ ...location, enabled: !location.enabled });
  };

  const toggleExpandRolesHandler = () => {
    setExpandRoles((state) => !state);
  };

  const locationNameChangeHandler = (value) => {
    setStates({ ...location, locationName: value });
  };

  const roleNameChangeHandler = (newRoleName, index) => {
    let roles = location.roles;
    roles[index - 1].roleName = newRoleName;
    setStates({ ...location, roles: roles });
  };

  const toggleRoleEnabledHandler = (value, index) => {
    let roles = location.roles;
    roles[index - 1].enabled = value;
    setStates({ ...location, roles: roles });
    if (!value) {
      setEnableAllRoles("indeterminate");
    }
  };

  const setStates = (currentState) => {
    setLocation(currentState);
    onLocationChange(currentState);
  };

  const toggleAllRolesHandler = () => {
    let enabled = "checked";
    if (enableAllRoles === "checked") enabled = "unchecked";
    setEnableAllRoles(enabled);
    setStates({
      ...location,
      roles: location.roles.map((role) => {
        return { ...role, enabled: enabled === "checked" ? true : false };
      }),
    });
  };

  const getRoles = () => {
    let result = [];
    for (let i = 0; i < 12; i++) {
      result.push(
        <Role
          key={i}
          index={i + 1}
          onRoleNameChange={roleNameChangeHandler}
          showCheckbox
          enableRole={location.roles[i].enabled}
          onRoleEnabledChange={toggleRoleEnabledHandler}
        >
          {location.roles[i].roleName}
        </Role>
      );
    }
    return result;
  };

  return (
    <>
      {location && (
        <View style={{ marginBottom: 10 }}>
          <View style={[styles.container, { height: height }]}>
            <Checkbox
              status={location.enabled ? "checked" : "unchecked"}
              onPress={toggleLocationEnableHandler}
              color={COLORS.primary}
            />

            <Pressable
              style={styles.locationSwitch}
              onPress={toggleLocationEnableHandler}
            >
              <Text style={styles.locationSwitchText}>
                {location.locationName}
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
            <View style={styles.rolesContainer}>
              <Role
                style={{ backgroundColor: COLORS.lightGray }}
                textAlign="center"
                onRoleNameChange={locationNameChangeHandler}
              >
                {location.locationName}
              </Role>

              <Card style={{ flexDirection: "row", width: "50%" }}>
                <Text
                  style={{
                    color: COLORS.textReverse,
                  }}
                >
                  Bütün Roller
                </Text>
                <Checkbox
                  status={enableAllRoles}
                  onPress={toggleAllRolesHandler}
                  color={COLORS.secondary}
                />
              </Card>

              {getRoles()}
            </View>
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
    padding: 5,
    justifyContent: "center",
  },
});

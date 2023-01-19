import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";

import { COLORS } from "../constants/globalConstants";
import Role from "./Role";
import CustomTextInput from "./UI/CustomTextInput";

export default function Location({ location, onLocationChange, height }) {
  const [enableLocation, setEnableLocation] = useState(location.enabled);
  const [expandRoles, setExpandRoles] = useState(false);
  // const [location, setLocation] = useState(null);

  // useEffect(() => {
  //   setLocation(location);
  // }, []);

  const toggleLocationHandler = () => {
    setEnableLocation((prevState) => !prevState);
    onLocationChange({ ...location, enabled: !location.enabled });
  };

  const toggleRolesHandler = () => {
    setExpandRoles((state) => !state);
  };

  const locationNameChangeHandler = (value) => {
    onLocationChange({ ...location, locationName: value });
  };

  const getRoles = () => {
    let result = [];
    for (let i = 0; i < 12; i++) {
      result.push(
        <Role
          key={i}
          index={i + 1}
          onRoleChange={(newRole) => (location.roles[i] = newRole)}
          showCheckbox
        >
          {location.roles[i] ? location.roles[i] : ""}
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
              status={enableLocation ? "checked" : "unchecked"}
              onPress={toggleLocationHandler}
              color={COLORS.primary}
            />

            <Pressable
              style={styles.locationSwitch}
              onPress={toggleLocationHandler}
            >
              <Text style={styles.locationSwitchText}>
                {location.locationName}
              </Text>
            </Pressable>

            <Pressable
              style={styles.openDetailButton}
              onPress={toggleRolesHandler}
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
                style={{
                  width: "70%",
                  backgroundColor: COLORS.lightGray,
                }}
                textAlign="center"
                onRoleChange={locationNameChangeHandler}
              >
                {location.locationName}
              </Role>
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

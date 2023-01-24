import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { COLORS } from "../constants/globalConstants";
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

export default function Location({ locationIndex, height, style }) {
  const location = useSelector((state) => state.locations[locationIndex]);
  const [expandRoles, setExpandRoles] = useState(false);
  const [enableAllRoles, setEnableAllRoles] = useState("indeterminate");
  const dispatch = useDispatch();

  const toggleLocationStatusHandler = () => {
    dispatch(toggleLocationStatus({ index: locationIndex }));
  };

  const toggleExpandRolesHandler = () => {
    setExpandRoles((state) => !state);
  };

  const locationNameChangeHandler = (value) => {
    dispatch(changeLocationName({ index: locationIndex, locationName: value }));
  };

  const toggleAllRolesStatusHandler = () => {
    let enabled = "checked";
    if (enableAllRoles === "checked") enabled = "unchecked";
    dispatch(
      toggleAllRolesStatusForOneLocation({
        index: locationIndex,
        status: enabled === "checked",
      })
    );
    setEnableAllRoles(enabled);
  };

  const getRoles = () => {
    let result = [];
    for (let i = 0; i < 12; i++) {
      result.push(
        <Role
          key={i}
          index={i + 1}
          locationIndex={locationIndex}
          roleIndex={i}
          roleId={location.roles[i].id}
        />
      );
    }
    return result;
  };

  const deleteLocationHandler = () => {
    dispatch(deleteLocation({ locationId: location.id }));
    setExpandRoles(false);
  };

  return (
    <>
      {location && (
        <View style={style}>
          <View style={[styles.container, { height: height }]}>
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
            <>
              <View style={styles.rolesContainer}>
                <Card style={{ width: "50%" }}>
                  <CustomTextInput
                    placeholder="Mekan Adı"
                    value={location.locationName}
                    onChangeText={locationNameChangeHandler}
                    style={{ textAlign: "center" }}
                  />
                </Card>

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
                    onPress={toggleAllRolesStatusHandler}
                    color={COLORS.secondary}
                  />
                </Card>

                {getRoles()}

                <View
                  style={{
                    height: height,
                    width: "50%",
                    borderWidth: 1,
                    borderColor: COLORS.backgroud,
                  }}
                >
                  <CustomButton onPress={deleteLocationHandler} cancel>
                    mekanı sİl
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
    padding: 5,
    justifyContent: "center",
  },
});

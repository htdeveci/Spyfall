import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { v1 as uuidv1 } from "uuid";

import Location from "../components/Location";
import CustomButton from "../components/UI/CustomButton";
import {
  COLORS,
  NAVIGATION_NAME_GAME_SETUP,
} from "../constants/globalConstants";
import {
  addNewLocationSlot,
  cancelChanges,
  returnToDefaultSettings,
  saveLocationsToStorage,
} from "../store/locationsSlice";

const lineHeight = 50;

export default function Locations({ navigation, storedLocations }) {
  const [locations, setLocations] = useState(storedLocations);
  const dispatch = useDispatch();

  const cancelHandler = () => {
    dispatch(cancelChanges());
    navigation.goBack();
  };

  const saveLocationsHandler = () => {
    dispatch(saveLocationsToStorage());
    navigation.navigate(NAVIGATION_NAME_GAME_SETUP);
  };

  const getLocationComponents = () => {
    let locationComponents = [];
    for (let i = 0; i < locations.length; i++) {
      locationComponents.push(
        <Location
          key={uuidv1()}
          locationIndex={i}
          height={lineHeight}
          style={styles.addMarginBottom}
        />
      );
    }
    return locationComponents;
  };

  const returnToDefaultSettingsHandler = () => {
    dispatch(returnToDefaultSettings());
    dispatch(saveLocationsToStorage());
    navigation.goBack();
  };

  const addNewLocationHandler = () => {
    const newLocation = {
      locationName: "Yeni Mekan",
      id: uuidv1(),
      enabled: true,
      roles: [
        { enabled: true, roleName: "", id: uuidv1() },
        { enabled: true, roleName: "", id: uuidv1() },
        { enabled: true, roleName: "", id: uuidv1() },
        { enabled: true, roleName: "", id: uuidv1() },
        { enabled: true, roleName: "", id: uuidv1() },
        { enabled: true, roleName: "", id: uuidv1() },
        { enabled: true, roleName: "", id: uuidv1() },
        { enabled: true, roleName: "", id: uuidv1() },
        { enabled: true, roleName: "", id: uuidv1() },
        { enabled: true, roleName: "", id: uuidv1() },
        { enabled: true, roleName: "", id: uuidv1() },
        { enabled: true, roleName: "", id: uuidv1() },
      ],
    };
    setLocations((state) => [...state, newLocation]);
    dispatch(addNewLocationSlot({ newLocation }));
  };

  return (
    <>
      <Text style={styles.locationsLabel}>MEKANLAR</Text>
      <View style={styles.container}>
        {locations && (
          <>
            {getLocationComponents()}
            <View style={[styles.buttonContainer, styles.addMarginBottom]}>
              <CustomButton onPress={addNewLocationHandler} success>
                Yeni mekan ekle
              </CustomButton>
            </View>
            <View style={[styles.buttonContainer, styles.addMarginBottom]}>
              <CustomButton
                onPress={cancelHandler}
                cancel
                style={{ marginRight: 5 }}
              >
                İptal
              </CustomButton>
              <CustomButton
                style={{ marginLeft: 5 }}
                onPress={saveLocationsHandler}
              >
                Kaydet
              </CustomButton>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton onPress={returnToDefaultSettingsHandler}>
                varsayılana dön
              </CustomButton>
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    height: lineHeight,
  },
  locationsLabel: {
    color: COLORS.text,
    fontSize: 30,
    textAlign: "center",
  },
  addMarginBottom: {
    marginBottom: 10,
  },
});

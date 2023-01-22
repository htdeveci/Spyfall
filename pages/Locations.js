import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { v1 as uuidv1 } from "uuid";

import Location from "../components/Location";
import CustomButton from "../components/UI/CustomButton";
import {
  COLORS,
  NAVIGATION_NAME_GAME_SETUP,
} from "../constants/globalConstants";
import locationsDefaults from "../locations-defaults.json";
import {
  cancelChanges,
  getLocations,
  initLocations,
  saveLocationsToStorage,
} from "../store/locationsSlice";

const lineHeight = 50;

export default function Locations({ navigation, locationsProp }) {
  // const { locations } = useLocation();
  // const storedLocations = useSelector((state) => state.locations);
  const [locations, setLocations] = useState(locationsProp);
  const dispatch = useDispatch();

  /*   useEffect(() => {
    const fetchLocationData = async () => {
      const storedLocations = await getLocations();
      // console.log(storedLocations);
      // dispatch(initLocations({ storedLocations: storedLocations }));
      setLocations(storedLocations);
    };
    fetchLocationData();
  }, []); */

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
        <Location key={uuidv1()} locationIndex={i} height={lineHeight} />
      );
    }
    return locationComponents;
  };

  return (
    <>
      <Text style={styles.locationsLabel}>MEKANLAR</Text>
      <View style={styles.container}>
        {locations && (
          <>
            {getLocationComponents()}
            <View style={styles.buttonContainer}>
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
    marginBottom: 10,
  },
});

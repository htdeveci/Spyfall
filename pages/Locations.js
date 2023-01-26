import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { v1 as uuidv1 } from "uuid";

import Location from "../components/Location";
import CustomButton from "../components/UI/CustomButton";
import CustomFlatList from "../components/UI/CustomFlatList";
import {
  COLORS,
  LINE_HEIGHT,
  NAVIGATION_NAME_GAME_SETUP,
} from "../constants/globalConstants";
import {
  addNewLocationSlot,
  cancelChanges,
  returnToDefaultSettings,
  saveLocationsToStorage,
} from "../store/locationsSlice";

export default function Locations({ navigation }) {
  const locations = useSelector((store) => store.locations.future);
  const dispatch = useDispatch();

  const cancelHandler = () => {
    dispatch(cancelChanges());
    navigation.goBack();
  };

  const saveLocationsHandler = () => {
    dispatch(saveLocationsToStorage());
    navigation.navigate(NAVIGATION_NAME_GAME_SETUP);
  };

  const returnToDefaultSettingsHandler = () => {
    dispatch(returnToDefaultSettings());
  };

  const addNewLocationHandler = () => {
    const newLocation = {
      locationName: "",
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
    dispatch(addNewLocationSlot({ newLocation }));
  };

  const renderLocations = (item) => {
    return (
      <Location
        locationId={item.item.id}
        height={LINE_HEIGHT}
        style={styles.addMarginBottom}
      />
    );
  };

  const renderButtons = () => {
    return (
      <>
        <View style={[styles.buttonContainer, styles.addMarginBottom]}>
          <CustomButton onPress={addNewLocationHandler} success>
            YENİ MEKAN EKLE
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
            VARSAYILANA DÖN
          </CustomButton>
        </View>
      </>
    );
  };

  return (
    <CustomFlatList
      data={locations}
      listLabel="MEKANLAR"
      renderItem={renderLocations}
      FooterComponent={renderButtons}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    height: LINE_HEIGHT,
  },
  addMarginBottom: {
    marginBottom: 10,
  },
});

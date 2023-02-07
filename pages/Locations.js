import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { v1 as uuidv1 } from "uuid";

import Location from "../components/Location";
import BorderedView from "../components/UI/BorderedView";
import CustomButton from "../components/UI/CustomButton";
import CustomFlatList, { goToBottom } from "../components/UI/CustomFlatList";
import Seperator from "../components/UI/Seperator";
import {
  COLORS,
  GAP_BETWEEN_LAYERS,
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
  const savedLocations = useSelector((store) => store.locations.current);
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.stringify(locations) !== JSON.stringify(savedLocations)) {
      setIsChanged(true);
    }
  }, [locations]);

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

  const addNewLocationHandler = async () => {
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
    await dispatch(addNewLocationSlot({ newLocation }));
    goToBottom();
  };

  const renderLocations = (item) => {
    return (
      <Location
        locationId={item.item.id}
        roleHeight={LINE_HEIGHT - 5}
        style={
          item.index + 1 !== locations.length ? styles.addMarginBottom : null
        }
      />
    );
  };

  const renderButtons = () => {
    return (
      <BorderedView>
        <View style={[styles.buttonContainer, styles.addMarginBottom]}>
          <CustomButton
            onPress={returnToDefaultSettingsHandler}
            customChildren
            secondary
            iconLabel="VARSAYILAN"
            style={{ marginRight: GAP_BETWEEN_LAYERS / 2 }}
          >
            <FontAwesome name="gears" size={30} color={COLORS.text} />
          </CustomButton>

          <CustomButton
            onPress={addNewLocationHandler}
            customChildren
            iconLabel="YENİ MEKAN"
            iconLabelGap={10}
            style={{ marginLeft: GAP_BETWEEN_LAYERS / 2 }}
          >
            <MaterialIcons
              name="add-location-alt"
              size={30}
              color={COLORS.text}
            />
          </CustomButton>
        </View>

        <View style={[styles.buttonContainer]}>
          <CustomButton
            onPress={cancelHandler}
            cancel
            customChildren
            iconLabel="İptal"
            iconLabelGap={10}
            style={{ marginRight: GAP_BETWEEN_LAYERS / 2 }}
          >
            <MaterialIcons name="cancel" size={30} color={COLORS.text} />
          </CustomButton>

          <CustomButton
            onPress={saveLocationsHandler}
            disabled={!isChanged}
            success
            customChildren
            iconLabel="Kaydet"
            style={{ marginLeft: GAP_BETWEEN_LAYERS / 2 }}
          >
            <Entypo name="save" size={30} color={COLORS.text} />
          </CustomButton>
        </View>
      </BorderedView>
    );
  };

  return (
    <>
      <CustomFlatList
        data={locations}
        listLabel="MEKANLAR"
        renderItem={renderLocations}
        // FooterComponent={renderButtons}
      />
      {renderButtons()}
    </>
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
    marginBottom: GAP_BETWEEN_LAYERS,
  },
});

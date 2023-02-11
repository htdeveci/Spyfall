import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Switch, Text } from "react-native";
import { SectionList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Location from "../components/Location";
import BorderedView from "../components/UI/BorderedView";
import CustomButton from "../components/UI/CustomButton";
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
  toggleLocationGroupStatus,
} from "../store/locationsSlice";
import {
  getEnabledLocationsLength,
  getTotalLocationsLength,
} from "./GameSetup";

export default function Locations({ navigation }) {
  const locationGroups = useSelector((store) => store.locations.future);
  const savedLocationGroups = useSelector((store) => store.locations.current);
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();
  const scrollRef = useRef();

  useEffect(() => {
    if (
      JSON.stringify(locationGroups) !== JSON.stringify(savedLocationGroups)
    ) {
      setIsChanged(true);
    }
  }, [locationGroups]);

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
    dispatch(addNewLocationSlot());
    const customLocationGroup = locationGroups.find(
      (locGroup) => locGroup.title === "Özel"
    );
    if (customLocationGroup) {
      dispatch(
        toggleLocationGroupStatus({
          locationGroupId: customLocationGroup.id,
          status: true,
        })
      );
    }
    scrollRef.current.scrollToLocation({
      sectionIndex: locationGroups.length - 1,
      itemIndex: locationGroups[locationGroups.length - 1].data.length - 1,
    });
  };

  const renderLocations = (item) => {
    const locationGroupId = item.section.id;
    const locationGroupEnabled = item.section.enabled;
    return (
      <>
        {locationGroupEnabled && (
          <Location
            locationGroupId={locationGroupId}
            locationId={item.item.id}
            roleHeight={LINE_HEIGHT - 5}
            style={[
              locationGroups.findIndex((loc) => loc.id === locationGroupId) +
                1 ===
                locationGroups.length &&
              item.index + 1 ===
                locationGroups[locationGroups.length - 1].data.length
                ? { marginBottom: GAP_BETWEEN_LAYERS }
                : styles.addMarginBottom,
              { paddingHorizontal: GAP_BETWEEN_LAYERS / 2 },
            ]}
          />
        )}
      </>
    );
  };

  const renderButtons = () => {
    return (
      <BorderedView>
        <View
          style={[styles.buttonContainer, { marginBottom: GAP_BETWEEN_LAYERS }]}
        >
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

  const renderHeader = (title, enabled, id) => {
    return (
      <CustomButton
        style={[
          styles.buttonContainer,
          {
            backgroundColor: COLORS.border,
            borderStyle: "solid",
            borderWidth: 1,
          },
        ]}
        onPress={toggleLocationGroupStatusHandler.bind(...arguments, id)}
        iconLabel={title}
        buttonColorProp={enabled ? COLORS.primary : COLORS.primaryDarker}
        rippleColorProp={COLORS.primaryDark}
        useOpacity={false}
        customChildren
        textStyle={{ flex: 1 }}
      >
        {/* <Checkbox
            color={COLORS.secondaryDark}
            status={enabled ? "checked" : "unchecked"}
            onPress={toggleLocationGroupStatusHandler.bind(...arguments, id)}
            uncheckedColor={COLORS.secondaryDarker}
          /> */}

        <Switch
          value={enabled}
          onChange={toggleLocationGroupStatusHandler.bind(...arguments, id)}
          trackColor={{
            false: COLORS.lightGray,
            true: COLORS.secondaryDarker,
          }}
          thumbColor={enabled ? COLORS.secondary : COLORS.secondaryDarker}
        />
      </CustomButton>
    );
  };

  const toggleLocationGroupStatusHandler = (event, locationGroupId) => {
    dispatch(toggleLocationGroupStatus({ locationGroupId }));
  };

  return (
    <>
      <Text
        style={styles.locationsLabel}
      >{`MEKANLAR ${getEnabledLocationsLength(
        locationGroups
      )}/${getTotalLocationsLength(locationGroups)}`}</Text>
      <SectionList
        ref={scrollRef}
        sections={locationGroups}
        keyExtractor={(item, index) => item + index}
        renderItem={renderLocations}
        renderSectionHeader={({ section: { title, enabled, id } }) =>
          renderHeader(title, enabled, id)
        }
      />

      {renderButtons()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationsLabel: {
    color: COLORS.text,
    fontSize: 30,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    height: LINE_HEIGHT,
  },
  addMarginBottom: {
    marginBottom: GAP_BETWEEN_LAYERS / 2,
  },
});

import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { PureComponent, useEffect, useRef, useState } from "react";
import { Pressable, Switch, Text } from "react-native";
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
  changeCanRolesExpandable,
  returnToDefaultLocations,
  saveLocationsToStorage,
  toggleLocationGroupStatus,
} from "../store/locationsSlice";
import {
  getEnabledLocationsLength,
  getTotalLocationsLength,
} from "./GameSetup";
import CustomDialog from "../components/UI/CustomDialog";
import { useTranslation } from "react-i18next";
import { Checkbox } from "react-native-paper";
import Toast from "react-native-toast-message";
import CustomModal from "../components/UI/CustomModal";

class RenderLocations extends PureComponent {
  render() {
    const { locationGroups, item, section } = this.props;

    const locationGroupId = section.id;
    const locationGroupEnabled = section.enabled;

    return (
      <>
        {locationGroupEnabled && (
          <Location
            locationGroupId={locationGroupId}
            locationId={item.id}
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
  }
}

export default function Locations({ navigation }) {
  const locationGroups = useSelector((store) => store.locations.future);
  const savedLocationGroups = useSelector((store) => store.locations.current);
  const [isChanged, setIsChanged] = useState(false);
  const [deleteCustomGroup, setDeleteCustomGroup] = useState(false);
  const [showDefaultLocationsDialog, setShowDefaultLocationsDialog] =
    useState(false);
  const [showSaveChangesDialog, setShowSaveChangesDialog] = useState(false);
  const [
    showNotSelectedLocationErrorDialog,
    setShowNotSelectedLocationErrorDialog,
  ] = useState(false);
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (
      JSON.stringify(locationGroups) !== JSON.stringify(savedLocationGroups)
    ) {
      setIsChanged(true);
    }
  }, [locationGroups]);

  useEffect(() => {
    return navigation.addListener("beforeRemove", (event) => {
      if (isThereAnyLocationSelected()) {
        return;
      }

      event.preventDefault();
    });
  }, [navigation, isThereAnyLocationSelected]);

  const isThereAnyLocationSelected = () => {
    for (let i = 0; i < locationGroups.length; i++) {
      if (locationGroups[i].enabled) {
        for (let j = 0; j < locationGroups[i].data.length; j++) {
          if (locationGroups[i].data[j].enabled) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const cancelHandler = () => {
    dispatch(cancelChanges());
    navigation.goBack();
  };

  const saveLocationsHandler = () => {
    setShowSaveChangesDialog(false);
    dispatch(saveLocationsToStorage());
    navigation.navigate(NAVIGATION_NAME_GAME_SETUP);
  };

  const closeNotSelectedLocationErrorDialog = () => {
    setShowNotSelectedLocationErrorDialog(false);
    dispatch(cancelChanges());
  };

  const openSaveChangesDialogHandler = () => {
    if (isThereAnyLocationSelected()) {
      setShowSaveChangesDialog(true);
    } else {
      setShowNotSelectedLocationErrorDialog(true);
    }
  };

  const closeSaveChangesDialogHandler = () => {
    setShowSaveChangesDialog(false);
  };

  const openDefaultLocationsDialogHandler = () => {
    setShowDefaultLocationsDialog(true);
  };

  const closeDefaultLocationsDialogHandler = () => {
    setShowDefaultLocationsDialog(false);
  };

  const returnToDefaultSettingsHandler = async () => {
    dispatch(changeCanRolesExpandable({ canRolesExpandable: false }));
    setShowDefaultLocationsDialog(false);
    await dispatch(
      returnToDefaultLocations({
        currentLanguage: i18n.language,
        deleteCustomGroup: deleteCustomGroup,
      })
    );
    dispatch(changeCanRolesExpandable({ canRolesExpandable: true }));
  };

  const addNewLocationHandler = async () => {
    try {
      dispatch(
        addNewLocationSlot({
          customGroupTitle: t("LocationsSlice.customGroupTitle"),
        })
      );

      const customLocationGroup = locationGroups.find(
        (locGroup) => locGroup.title === t("LocationsSlice.customGroupTitle")
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
    } catch (err) {
      console.log(err);
    }
  };

  const renderButtons = () => {
    return (
      <BorderedView>
        <View
          style={[styles.buttonContainer, { marginBottom: GAP_BETWEEN_LAYERS }]}
        >
          <CustomButton
            onPress={openDefaultLocationsDialogHandler}
            customChildren
            secondary
            iconLabel={t("Locations.button.default")}
            style={{ marginRight: GAP_BETWEEN_LAYERS / 2 }}
          >
            <FontAwesome name="gears" size={30} color={COLORS.text} />
          </CustomButton>

          <CustomButton
            onPress={addNewLocationHandler}
            customChildren
            iconLabel={t("Locations.button.newLocation")}
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
            iconLabel={t("Locations.button.cancel")}
            iconLabelGap={10}
            style={{ marginRight: GAP_BETWEEN_LAYERS / 2 }}
          >
            <MaterialIcons name="cancel" size={30} color={COLORS.text} />
          </CustomButton>

          <CustomButton
            onPress={openSaveChangesDialogHandler}
            disabled={!isChanged}
            success
            customChildren
            iconLabel={t("Locations.button.save")}
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

  const toggleDeleteCustomGroupSelection = () => {
    setDeleteCustomGroup((prev) => !prev);
  };

  return (
    <>
      <CustomDialog
        show={showDefaultLocationsDialog}
        onClose={closeDefaultLocationsDialogHandler}
        onSubmit={returnToDefaultSettingsHandler}
      >
        {t("Locations.dialog.defaultCheck.text")}
        {"\n"}

        <View style={styles.deleteCustomGroupContainer}>
          <Pressable onPress={toggleDeleteCustomGroupSelection}>
            <Text style={styles.deleteCustomGroupText}>
              {t("Locations.dialog.defaultCheck.deleteCustomText")}
            </Text>
          </Pressable>
          <Checkbox
            status={deleteCustomGroup ? "checked" : "unchecked"}
            onPress={toggleDeleteCustomGroupSelection}
            color={COLORS.secondary}
          />
        </View>
        {"\n"}

        <Text style={{ color: COLORS.errorDark, fontSize: 12 }}>
          {t("Locations.dialog.defaultCheck.warning")}
        </Text>
      </CustomDialog>

      <CustomDialog
        show={showSaveChangesDialog}
        onClose={closeSaveChangesDialogHandler}
        onSubmit={saveLocationsHandler}
      >
        {t("Locations.dialog.saveCheck.text")}
      </CustomDialog>

      <CustomModal
        show={showNotSelectedLocationErrorDialog}
        onClose={closeNotSelectedLocationErrorDialog}
      >
        <Text style={styles.notSelectedLocationText}>
          {t("Locations.modal.emptyLocationCheck.text")}
        </Text>
      </CustomModal>

      <Text style={styles.locationsLabel}>{`${t(
        "Locations.text.locations"
      )} ${getEnabledLocationsLength(locationGroups)}/${getTotalLocationsLength(
        locationGroups
      )}`}</Text>

      <SectionList
        ref={scrollRef}
        sections={locationGroups}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index, section }) => (
          <RenderLocations
            key={index}
            locationGroups={locationGroups}
            item={item}
            section={section}
          />
        )}
        renderSectionHeader={({ section: { title, enabled, id } }) =>
          renderHeader(title, enabled, id)
        }
        keyboardDismissMode="on-drag"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            scrollRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
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
  deleteCustomGroupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteCustomGroupText: {
    color: COLORS.secondaryDark,
    fontStyle: "italic",
  },
  notSelectedLocationText: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.errorDark,
  },
});

/* const renderLocations = (item) => {
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
}; */

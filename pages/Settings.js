import { useRef, useState } from "react";
import { NativeModules, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Switch } from "react-native-paper";
import { useTranslation } from "react-i18next";

import CustomButton from "../components/UI/CustomButton";
import {
  COLORS,
  GAP_BETWEEN_LAYERS,
  LINE_HEIGHT,
} from "../constants/globalConstants";
import CustomDropdown from "../components/UI/CustomDropdown";
import { languageResources } from "../translation/i18n";
import languageList from "../translation/languagesList.json";
import { toggleGameRolesStatus } from "../store/locationsSlice";
import BorderedView from "../components/UI/BorderedView";

export default function Settings({ navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const enableRoles = useSelector((store) => store.locations.enableRoles);
  const dropdownRef = useRef();
  const [makeEveryoneSpy, setMakeEveryoneSpy] = useState(false);

  const toggleRolesEnabled = () => {
    dispatch(toggleGameRolesStatus());
  };

  const closeSettingsButtonHandler = () => {
    navigation.goBack();
  };

  const changeLanguageHandler = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage);
  };

  const toggleMakeEveryoneSpy = () => {
    setMakeEveryoneSpy((prev) => !prev);
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.line}>
            <CustomButton
              onPress={() => {
                dropdownRef.current.openDropdown();
              }}
              innerStyle={{ justifyContent: "space-between" }}
              buttonColorProp={COLORS.lightGray}
              textStyle={{ color: COLORS.textReverse }}
              rippleColorProp={"#ffffff00"}
              upperCase={false}
              iconLabel={t("Settings.button.language")}
              useOpacity={false}
              customChildren
            >
              <View style={{ flex: 0.5 }}>
                <CustomDropdown
                  ref={dropdownRef}
                  data={Object.keys(languageResources)}
                  defaultValue={i18n.language}
                  onSelect={(selectedItem) => {
                    changeLanguageHandler(selectedItem);
                  }}
                  customizedButtonChild={(selectedItem) => {
                    if (languageList[selectedItem]) {
                      return (
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: COLORS.secondaryDark,
                              fontSize: 20,
                            }}
                          >
                            {languageList[selectedItem].nativeName}
                          </Text>
                        </View>
                      );
                    }
                  }}
                  customizedRowChild={(selectedItem) => {
                    return (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color:
                              i18n.language === selectedItem
                                ? COLORS.text
                                : COLORS.textReverse,
                            fontSize: 18,
                          }}
                        >
                          {languageList[selectedItem].nativeName}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </CustomButton>
          </View>

          <View style={styles.line}>
            <CustomButton
              onPress={toggleRolesEnabled}
              innerStyle={{ justifyContent: "space-between" }}
              buttonColorProp={COLORS.lightGray}
              textStyle={{ color: COLORS.textReverse }}
              upperCase={false}
              rippleColorProp={"#ffffff00"}
              iconLabel={t("Settings.button.enableRoles")}
              useOpacity={false}
              customChildren
            >
              <Switch
                onValueChange={toggleRolesEnabled}
                value={enableRoles}
                thumbColor={enableRoles ? COLORS.secondary : COLORS.darkGray}
                trackColor={{
                  false: COLORS.gray,
                  true: COLORS.secondaryDarker,
                }}
              />
            </CustomButton>
          </View>

          {/* 

          // This switch makes everyone a spy. Logic will be implemented later on.
          
          <View style={styles.line}>
            <CustomButton
              onPress={toggleMakeEveryoneSpy}
              innerStyle={{ justifyContent: "space-between" }}
              buttonColorProp={COLORS.lightGray}
              textStyle={{ color: COLORS.textReverse }}
              rippleColorProp={"#ffffff00"}
              upperCase={false}
              iconLabel={t("Settings.button.makeEveryoneSpy")}
              useOpacity={false}
              customChildren
            >
              <Switch
                onValueChange={toggleMakeEveryoneSpy}
                value={makeEveryoneSpy}
                thumbColor={
                  makeEveryoneSpy ? COLORS.secondary : COLORS.darkGray
                }
                trackColor={{
                  false: COLORS.gray,
                  true: COLORS.secondaryDarker,
                }}
              />
            </CustomButton>
          </View> */}
        </View>

        <BorderedView>
          <View style={{ height: LINE_HEIGHT }}>
            <CustomButton onPress={closeSettingsButtonHandler}>
              {t("Settings.button.return")}
            </CustomButton>
          </View>
        </BorderedView>
      </View>

      {/*  <View style={styles.container}>
        <View>
          <View style={styles.line}>
            <Text style={styles.text}>{t("Settings.text.enableRoles")}</Text>
            <Switch
              onValueChange={toggleRolesEnabled}
              value={enableRoles}
              thumbColor={enableRoles ? COLORS.primary : COLORS.darkGray}
              trackColor={{
                false: COLORS.lightGray,
                true: COLORS.primaryDark,
              }}
            />
          </View>

          <View style={styles.line}>
            <Text style={[styles.text, { flex: 1 }]}>
              {t("Settings.text.language")}
            </Text>
            <View style={{ flex: 1 }}>
              <CustomDropdown
                data={Object.keys(languageResources)}
                defaultValue={i18n.language}
                onSelect={(selectedItem, index) => {
                  changeLanguageHandler(selectedItem);
                }}
                customizedButtonChild={(selectedItem) => {
                  if (languageList[selectedItem]) {
                    return (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.textReverse,
                            fontSize: 20,
                          }}
                        >
                          {languageList[selectedItem].nativeName}
                        </Text>
                      </View>
                    );
                  }
                }}
                customizedRowChild={(selectedItem) => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.textReverse,
                          fontSize: 18,
                        }}
                      >
                        {languageList[selectedItem].nativeName}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.line}>
          <CustomButton onPress={closeSettingsButtonHandler}>
            {t("Settings.button.return")}
          </CustomButton>
        </View>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
  },
  text: {
    color: COLORS.text,
    fontSize: 20,
  },
  line: {
    height: LINE_HEIGHT,
    marginBottom: GAP_BETWEEN_LAYERS,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

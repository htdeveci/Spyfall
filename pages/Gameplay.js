import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import CustomButton from "../components/UI/CustomButton";
import CustomModal from "../components/UI/CustomModal";
import {
  COLORS,
  GAP_BETWEEN_LAYERS,
  LINE_HEIGHT,
} from "../constants/globalConstants";
import GameController from "../components/GameController";
import CustomFlatList from "../components/UI/CustomFlatList";
import Card from "../components/UI/Card";
import BorderedView from "../components/UI/BorderedView";

let enabledLocations = [];

export default function Gameplay({ navigation, route }) {
  const { numberOfSpy } = route.params;
  const players = useSelector((store) => store.players);
  const locationGroups = useSelector((store) => store.locations.current);
  const enableRoles = useSelector((store) => store.locations.enableRoles);
  const [showPlayerRoleModal, setShowPlayerRoleModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [allPlayersWithRoles, setAllPlayersWithRoles] = useState(null);
  const [enableGameControllerButtons, setEnableGameControllerButtons] =
    useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedGameTime, setSelectedGameTime] = useState(10);
  const { t } = useTranslation();

  useEffect(() => {
    enabledLocations = getEnabledLocations();

    let allPlayers = [];
    if (numberOfSpy >= players.length || enabledLocations.length === 0) {
      players.forEach((player) => {
        allPlayers.push({
          ...player,
          roleSeen: false,
          location: null,
          isSpy: true,
        });
      });
    } else {
      const locationIndex = Math.floor(Math.random() * enabledLocations.length);
      const selectedLocation = enabledLocations[locationIndex];

      let spiesIds = [];
      let spyIndex = Math.floor(Math.random() * players.length);
      for (let i = 0; i < numberOfSpy; i++) {
        while (spiesIds.includes(players[spyIndex].id)) {
          spyIndex = Math.floor(Math.random() * players.length);
        }
        spiesIds.push(players[spyIndex].id);
      }

      let usableRoles = [];
      if (enableRoles) {
        usableRoles = selectedLocation.roles.filter((role) => {
          if (role.enabled && role.roleName !== "") return role;
        });
      }

      players.forEach((player) => {
        allPlayers.push({
          ...player,
          roleSeen: false,
          location: {
            locationName: selectedLocation.locationName,
            locationId: selectedLocation.id,
          },
          isSpy: spiesIds.includes(player.id),
          role: getARole(usableRoles),
        });
      });
    }
    setAllPlayersWithRoles(allPlayers);
  }, []);

  const getEnabledLocations = () => {
    let enabledLocations = [];
    locationGroups.forEach((locGroup) => {
      if (locGroup.enabled) {
        locGroup.data.forEach((loc) => {
          if (loc.enabled) {
            enabledLocations.push(loc);
          }
        });
      }
    });
    return enabledLocations;
  };

  const getARole = (usableRoles) => {
    if (usableRoles.length > 0) {
      return usableRoles[Math.floor(Math.random() * usableRoles.length)]
        .roleName;
    }
    return "";
  };

  const playerClickHandler = (id) => {
    const player = allPlayersWithRoles.find((player) => player.id === id);
    setSelectedPlayer(player);
    setShowPlayerRoleModal(true);
  };

  const closePlayerRoleModalHandler = (event) => {
    setShowPlayerRoleModal(false);
    const players = allPlayersWithRoles;
    players.find((p) => p.id === selectedPlayer.id).roleSeen = true;
    setAllPlayersWithRoles(players);
    checkAllPlayerSeenRole();
  };

  const checkAllPlayerSeenRole = () => {
    let result = true;
    allPlayersWithRoles.forEach((player) => {
      result = result && player.roleSeen;
    });
    setEnableGameControllerButtons(result);
  };

  const getSpyNames = () => {
    let spies = [];
    allPlayersWithRoles.forEach((player) => {
      if (player.isSpy) spies.push(player.playerName);
    });
    return spies;
  };

  const renderPlayers = (item) => {
    return (
      <View
        style={{
          height: LINE_HEIGHT,
          marginBottom:
            item.index + 1 === allPlayersWithRoles.length
              ? 0
              : GAP_BETWEEN_LAYERS,
        }}
      >
        <CustomButton
          onPress={playerClickHandler.bind(null, item.item.id)}
          upperCase={false}
          disabled={item.item.roleSeen}
        >
          {item.item.playerName}
        </CustomButton>
      </View>
    );
  };

  const renderLocations = (item) => {
    return (
      <>
        <Card
          style={{
            paddingVertical: 0,
            width: "50%",
            borderRadius: 6,
          }}
        >
          <Text>{item.item.locationName}</Text>
        </Card>
      </>
    );
  };

  const renderGameController = () => {
    return (
      <BorderedView>
        <GameController
          enableButtons={enableGameControllerButtons}
          location={
            allPlayersWithRoles[0].location
              ? allPlayersWithRoles[0].location.locationName
              : null
          }
          spies={getSpyNames()}
          navigation={navigation}
          isGameStarted={isGameStarted}
          setIsGameStarted={setIsGameStarted}
          selectedGameTime={selectedGameTime}
          setSelectedGameTime={setSelectedGameTime}
        />
      </BorderedView>
    );
  };

  return (
    <>
      {allPlayersWithRoles && (
        <>
          <CustomFlatList
            data={isGameStarted ? enabledLocations : allPlayersWithRoles}
            listLabel={(isGameStarted
              ? t("Gameplay.text.locations")
              : t("Gameplay.text.players")
            ).toUpperCase()}
            renderItem={isGameStarted ? renderLocations : renderPlayers}
            numColumns={isGameStarted ? 2 : 1}
          />
          {renderGameController()}
        </>
      )}

      {selectedPlayer && (
        <CustomModal
          show={showPlayerRoleModal}
          onClose={closePlayerRoleModalHandler}
        >
          <View style={{ flexDirection: "row" }}>
            <Text>{t("Gameplay.dialog.playerIdentity.player")}</Text>
            <Text style={{ fontWeight: "bold" }}>
              {selectedPlayer.playerName === ""
                ? t("Gameplay.dialog.playerIdentity.unnamedPlayer")
                : selectedPlayer.playerName}
            </Text>
          </View>

          {selectedPlayer.isSpy && (
            <FontAwesome5
              name="user-secret"
              size={40}
              color={COLORS.secondary}
            />
          )}
          {!selectedPlayer.isSpy && (
            <>
              <View style={{ flexDirection: "row" }}>
                <Text>{t("Gameplay.dialog.playerIdentity.location")}</Text>
                <Text style={{ fontWeight: "bold" }}>
                  {selectedPlayer.location.locationName}
                </Text>
              </View>

              {selectedPlayer.role !== "" && (
                <View style={{ flexDirection: "row" }}>
                  <Text>{t("Gameplay.dialog.playerIdentity.role")}</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {selectedPlayer.role}
                  </Text>
                </View>
              )}
            </>
          )}
        </CustomModal>
      )}
    </>
  );
}

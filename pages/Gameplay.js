import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import CustomButton from "../components/UI/CustomButton";
import CustomModal from "../components/UI/CustomModal";
import {
  COLORS,
  GAP_BETWEEN_LAYERS,
  LINE_HEIGHT,
} from "../constants/globalConstants";
import GameController from "../components/GameController";
import CustomFlatList from "../components/UI/CustomFlatList";
import Seperator from "../components/UI/Seperator";

export default function Gameplay({ navigation, route }) {
  const { numberOfSpy } = route.params;
  const players = useSelector((store) => store.players);
  const locations = useSelector((store) => store.locations.current);
  const enableRoles = useSelector((store) => store.locations.enableRoles);
  const [showPlayerRoleModal, setShowPlayerRoleModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [allPlayersWithRoles, setAllPlayersWithRoles] = useState(null);
  const [enableGameControllerButtons, setEnableGameControllerButtons] =
    useState(false);

  useEffect(() => {
    const enabledLocations = locations.filter((loc) => loc.enabled === true);
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
          marginBottom: GAP_BETWEEN_LAYERS,
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

  const renderGameController = (item) => {
    return (
      <>
        <Seperator style={{ marginBottom: GAP_BETWEEN_LAYERS }} />
        <GameController
          enableButtons={enableGameControllerButtons}
          location={
            allPlayersWithRoles[0].location
              ? allPlayersWithRoles[0].location.locationName
              : null
          }
          spies={getSpyNames()}
          navigation={navigation}
        />
      </>
    );
  };

  return (
    <>
      {allPlayersWithRoles && (
        <CustomFlatList
          data={allPlayersWithRoles}
          listLabel="OYUNCULAR"
          renderItem={renderPlayers}
          FooterComponent={renderGameController}
        />
      )}

      {selectedPlayer && (
        <CustomModal
          show={showPlayerRoleModal}
          onClose={closePlayerRoleModalHandler}
        >
          <View style={{ flexDirection: "row" }}>
            <Text>Oyuncu: </Text>
            <Text style={{ fontWeight: "bold" }}>
              {selectedPlayer.playerName}
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
                <Text>Konum: </Text>
                <Text style={{ fontWeight: "bold" }}>
                  {selectedPlayer.location.locationName}
                </Text>
              </View>

              {selectedPlayer.role !== "" && (
                <View style={{ flexDirection: "row" }}>
                  <Text>Rol: </Text>
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

const styles = StyleSheet.create({
  playerNameText: {
    color: COLORS.text,
  },
  playerNamePressable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

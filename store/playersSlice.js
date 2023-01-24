import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

import { STORE_ACTIVE_PLAYERS } from "../constants/globalConstants";

let initialState = [
  { playerName: "Hasan", id: 1 },
  { playerName: "Taha", id: 2 },
  { playerName: "Esro", id: 3 },
];

export const playerSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
    changePlayerName: (state, action) => {
      const player = state.find((p) => p.id === action.payload.id);
      player.playerName = action.payload.newPlayerName;
      savePlayers(state);
    },
    addNewPlayerSlot: (state, action) => {
      state.push(action.payload.newPlayer);
      savePlayers(state);
    },
    deletePlayer: (state, action) => {
      const result = state.filter(
        (player) => player.id !== action.payload.playerId
      );
      savePlayers(result);
      return result;
    },
    savePlayersToStorage: (state) => {
      savePlayers(state);
    },
  },
});

const savePlayers = async (state) => {
  try {
    const activePlayers = JSON.stringify(state);
    await AsyncStorage.setItem(STORE_ACTIVE_PLAYERS, activePlayers);
  } catch (err) {
    console.log(err);
  }
};

export const { changePlayerName, addNewPlayerSlot, deletePlayer } =
  playerSlice.actions;
export default playerSlice.reducer;

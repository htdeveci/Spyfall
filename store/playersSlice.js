import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

import { STORE_ACTIVE_PLAYERS } from "../constants/globalConstants";

let initialState = [
  { playerName: "1. Oyuncu", id: 1 },
  { playerName: "2. Oyuncu", id: 2 },
  { playerName: "3. Oyuncu", id: 3 },
];

export const playerSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
    initPlayers: (state, action) => {
      return action.payload.storedPlayers;
    },
    changePlayerName: (state, action) => {
      const player = state.find((p) => p.id === action.payload.id);
      player.playerName = action.payload.newPlayerName;
    },
    addNewPlayerSlot: (state, action) => {
      state.push(action.payload.newPlayer);
    },
    deletePlayer: (state, action) => {
      const result = state.filter(
        (player) => player.id !== action.payload.playerId
      );
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

export const {
  initPlayers,
  changePlayerName,
  addNewPlayerSlot,
  deletePlayer,
  savePlayersToStorage,
} = playerSlice.actions;
export default playerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { v1 as uuidv1 } from "uuid";

let initialState = [
  { playerName: "1. Oyuncu", id: uuidv1() },
  { playerName: "2. Oyuncu", id: uuidv1() },
  { playerName: "3. Oyuncu", id: uuidv1() },
];

export const playerSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
    changePlayerName: (state, action) => {
      const player = state.find((p) => p.id === action.payload.id);
      player.playerName = action.payload.newPlayerName;
    },
    addNewPlayerSlot: (state) => {
      state.push({ playerName: "", id: uuidv1() });
    },
    deletePlayer: (state, action) => {
      const result = state.filter(
        (player) => player.id !== action.payload.playerId
      );
      return result;
    },
  },
});

export const { changePlayerName, addNewPlayerSlot, deletePlayer } =
  playerSlice.actions;
export default playerSlice.reducer;

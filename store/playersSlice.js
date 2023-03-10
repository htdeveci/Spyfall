import { createSlice } from "@reduxjs/toolkit";

let initialState = [
  { playerName: "1. Oyuncu", id: 1 },
  { playerName: "2. Oyuncu", id: 2 },
  { playerName: "3. Oyuncu", id: 3 },
];

export const playerSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
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
  },
});

export const { changePlayerName, addNewPlayerSlot, deletePlayer } =
  playerSlice.actions;
export default playerSlice.reducer;

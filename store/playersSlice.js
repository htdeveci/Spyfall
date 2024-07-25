import { createSlice } from "@reduxjs/toolkit";
import { v1 as uuidv1 } from "uuid";

let initialState = [
  { playerName: "1. Oyuncu", id: uuidv1(), changed: false },
  { playerName: "2. Oyuncu", id: uuidv1(), changed: false },
  { playerName: "3. Oyuncu", id: uuidv1(), changed: false },
];

export const playerSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
    changePlayerName: (state, action) => {
      const player = state.find((p) => p.id === action.payload.id);
      player.changed =
        player.playerName !== action.payload.newPlayerName || player.changed;
      player.playerName = action.payload.newPlayerName;
    },
    addNewPlayerSlot: (state) => {
      state.push({ playerName: "", id: uuidv1(), changed: true });
    },
    deletePlayer: (state, action) => {
      const result = state.filter(
        (player) => player.id !== action.payload.playerId
      );
      return result;
    },
    translateAllPlayersName: (state, action) => {
      state.forEach((player) => {
        if (player.changed === undefined) {
          player.changed = !initialState.find(
            (obj) => obj.playerName === player.playerName
          );
        }

        if (!player.changed) {
          player.playerName = `${player.playerName.split(" ")[0]} ${
            action.payload.playerLocalName
          }`;
        }
      });
    },
  },
});

export const {
  changePlayerName,
  addNewPlayerSlot,
  deletePlayer,
  translateAllPlayersName,
} = playerSlice.actions;
export default playerSlice.reducer;

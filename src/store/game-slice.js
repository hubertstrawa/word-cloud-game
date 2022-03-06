import { createSlice } from '@reduxjs/toolkit';
import data from '../data';

const gameSlice = createSlice({
  name: 'game',
  initialState: { player: null, category: data[0], categories: data },
  reducers: {
    setPlayer(state, action) {
      state.player = action.payload;
    },
    chooseCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice;

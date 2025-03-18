// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isOpen: false, // Modal dastlab yopiq
// };

// const modalSlice = createSlice({
//   name: "modal",
//   initialState,
//   reducers: {
//     toggleModal: (state) => {
//       state.isOpen = !state.isOpen;
//     },
//   },
// });

// export const { toggleModal } = modalSlice.actions;
// export default modalSlice.reducer;
// 1. modal-slice.js faylini o'zgartiramiz
// 1. modal-slice.js faylini o'zgartiramiz
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  refreshData: false, // Yangi state qo'shamiz
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    triggerRefresh: (state) => {
      state.refreshData = !state.refreshData; // Refresh triggerini o'zgartiramiz
    },
  },
});

export const { toggleModal, triggerRefresh } = modalSlice.actions;
export default modalSlice.reducer;

// import { configureStore } from "@reduxjs/toolkit";
// import modalReducer from "./modal-clise"; // To'g'ri fayl nomini ishlatish kerak

// export const store = configureStore({
//   reducer: {
//     modalReducer,
//   },
// });

// export default store;
// 2. store.js faylini to'g'rilaymiz
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal-clise";

export const store = configureStore({
  reducer: modalReducer, // O'zgartirish qildik - nesting qilmasdan to'g'ridan-to'g'ri reducer beramiz
});

export default store;

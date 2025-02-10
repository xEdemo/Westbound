import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from "./slices/user/userSlice.js";
import registrationReducer from "./slices/user/registrationSlice.js";
import itemReducer from "./slices/item/itemSlice.js";
import enumReducer from "./slices/enum/enumSlice.js";

const store = configureStore({
	reducer: {
		user: userReducer,
		registration: registrationReducer,
		item: itemReducer,
		enum: enumReducer,
	},
});

setupListeners(store.dispatch);

export default store;
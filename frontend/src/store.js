import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from "./slices/user/userSlice.js";
import registrationReducer from "./slices/user/registrationSlice.js";

const store = configureStore({
	reducer: {
		user: userReducer,
		registration: registrationReducer,
	},
});

setupListeners(store.dispatch);

export default store;
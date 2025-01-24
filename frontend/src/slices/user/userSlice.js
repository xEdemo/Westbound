import { USER_URL } from "../rootRoutes.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
	"users/registerUser",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${USER_URL}`, credentials, {
				withCredentials: true,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	"users/loginUser",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${USER_URL}/auth`, credentials, {
				withCredentials: true,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const logoutUser = createAsyncThunk(
	"users/logoutUser",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${USER_URL}/logout`,
				{},
				{ withCredentials: true }
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const fetchUserInfo = createAsyncThunk(
	"users/fetchUserInfo",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${USER_URL}`, {
				withCredentials: true,
			});
			return response.data.user;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		isAuthenticated: false,
		loading: false,
		error: null,
	},
	reducers: {
		resetError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		// Login user
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginUser.fulfilled, (state) => {
				state.loading = false;
				state.isAuthenticated = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});

		// Logout user
		builder
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.isAuthenticated = false;
				state.user = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});

		// Fetch user info
		builder
			.addCase(fetchUserInfo.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUserInfo.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(fetchUserInfo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.isAuthenticated = false;
			});
	},
});

export const { resetError } = userSlice.actions;

export default userSlice.reducer;

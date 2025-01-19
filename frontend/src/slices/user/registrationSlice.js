import { USER_URL } from "../rootRoutes.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsernames = createAsyncThunk(
	"users/fetchUsernames",
	async () => {
		const response = await axios.get(`${USER_URL}/usernames`);
		return response.data.usernames;
	}
);

export const fetchEmails = createAsyncThunk("users/fetchEmails", async () => {
	const response = await axios.get(`${USER_URL}/emails`);
	return response.data.emails;
});

const registrationSlice = createSlice({
	name: "registration",
	initialState: {
		usernames: [],
		emails: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		// Fetch usernames
		builder
			.addCase(fetchUsernames.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUsernames.fulfilled, (state, action) => {
				state.loading = false;
				state.usernames = action.payload;
			})
			.addCase(fetchUsernames.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
		// Fetch emails
		builder
			.addCase(fetchEmails.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchEmails.fulfilled, (state, action) => {
				state.loading = false;
				state.emails = action.payload;
			})
			.addCase(fetchEmails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default registrationSlice.reducer;

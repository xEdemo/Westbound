import { ENUM_URL } from "../rootRoutes.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEnum = createAsyncThunk(
	"enums/fetchEnum",
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get(`${ENUM_URL}`, {
				withCredentials: true,
			});
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

const enumSlice = createSlice({
	name: "enum",
	initialState: {
		enums: null,
		categories: null,
		loading: null,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		// Fetch Enum
		builder
			.addCase(fetchEnum.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchEnum.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = action.payload.categories;
				state.enums = action.payload.enumerators;
			})
			.addCase(fetchEnum.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default enumSlice.reducer;

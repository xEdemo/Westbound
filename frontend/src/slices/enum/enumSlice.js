import { ENUM_URL } from "../rootRoutes.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEnums = createAsyncThunk(
	"enums/fetchEnums",
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

export const createEnum = createAsyncThunk(
	"enums/createEnum",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.post(`${ENUM_URL}`, data, {
				withCredentials: true,
			});		
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const updateEnum = createAsyncThunk(
	"enums/updateEnum",
	async ({ enumId, data }, { rejectWithValue }) => {
		try {
			const res = await axios.put(`${ENUM_URL}/${enumId}`, data, {
				withCredentials: true,
			});
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const deleteEnum = createAsyncThunk(
	"enums/deleteEnum",
	async (enumId, { rejectWithValue }) => {
		try {
			const res = await axios.delete(`${ENUM_URL}/${enumId}`, {
				withCredentials: true,
			});
			return { enumId, msg: res.data.msg };
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

const enumSlice = createSlice({
	name: "enum",
	initialState: {
		enums: null,
		loading: null,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		// Fetch Enum
		builder
			.addCase(fetchEnums.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchEnums.fulfilled, (state, action) => {
				state.loading = false;
				state.enums = action.payload.enumerators;
			})
			.addCase(fetchEnums.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});

		// Create Item
		builder
			.addCase(createEnum.pending, (state) => {
				state.loading = true;
			})
			.addCase(createEnum.fulfilled, (state, action) => {
				state.loading = false;
				// If enums are already an array, add the new item to it.
				// Otherwise, initialize enums as an array with the new item.
				if (state.enums) {
					state.enums.push(action.payload);
				} else {
					state.enums = [action.payload];
				}
			})
			.addCase(createEnum.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});

		// Update Item
		builder
			.addCase(updateEnum.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateEnum.fulfilled, (state, action) => {
				state.loading = false;
				// Find the index of the updated item and replace it in the array.
				if (state.enums) {
					const index = state.enums.findIndex(
						(e) => e._id === action.payload._id
					);
					if (index !== -1) {
						state.enums[index] = action.payload;
					}
				}
			})
			.addCase(updateEnum.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});

		// Delete Item
		builder
			.addCase(deleteEnum.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteEnum.fulfilled, (state, action) => {
				state.loading = false;
				// Remove the deleted item from the state.enums array
				state.enums = state.enums.filter(
					(e) => e._id !== action.payload.enumId
				);
			})
			.addCase(deleteEnum.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default enumSlice.reducer;

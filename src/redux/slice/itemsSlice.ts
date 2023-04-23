import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../models/itemModel";

interface ItemState {
  data: Item[];
  newData: Item[];
  editingId: number | null;
  updatedTitles: { [key: number]: string };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ItemState = {
  data: [],
  editingId: null,
  newData:[],
  updatedTitles: {},
  status: "idle",
  error: null,
};

interface FetchItemsParams {
  start: number;
  end: number;
}

export const fetchItems = createAsyncThunk("photos/fetchPhotos", async ({ start, end }: FetchItemsParams) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?&_start=${start}&_end=${end}`
  );
  const data = await response.json();
  return data;
});

 const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Item[]>) => {
      // state.data = [...state.data, ...action.payload];
      state.data = action.payload
    },
    setEditingId: (state, action: PayloadAction<number | null>) => {
      state.editingId = action.payload;
    },
   
    setUpdatedTitle: (state, action: PayloadAction<{ id: number; title: string }>) => {
      state.updatedTitles[action.payload.id] = action.payload.title;
    },
    resetUpdatedTitles: (state) => {
      state.updatedTitles = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data  = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Có lỗi";
      });
  },
});
export const { setData, setEditingId, setUpdatedTitle, resetUpdatedTitles,  } = itemSlice.actions;


export default itemSlice.reducer;
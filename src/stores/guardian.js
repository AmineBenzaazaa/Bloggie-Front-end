import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_KEY = "d4941de0-89b4-4401-829b-615f7779f497";
const _API_KEY = "33cabbe9-20be-4630-b3c2-0781f6a9db90"
const API_URL = `https://content.guardianapis.com/search?api-key=${_API_KEY}`;

export const getGuardianNews = createAsyncThunk('guardian/getNews', async (page = 1) => {
    const res = await axios.get(API_URL + `&page=${page}`);
    if (res && res.status === 200) {
        return res.data.response?.results;
    }
})

export const searchGuardian = createAsyncThunk('guardian/searchNews', async ({ param, page = 0 }) => {
    const res = await axios.get(API_URL + `&page=${page}&q=${param}`);
    if (res && res.status === 200)
        return res.data.response?.results;
})

export const filterGuardian = createAsyncThunk('guardian/filterNews', async ({ q, category }) => {
    let builder = '';
    if (q) builder += `&q=${q}`
    if (category) builder += `&tag=${category}`
    const res = await axios.get(API_URL + builder);
    console.log('guardian', res.data.response)
    if (res && res.status === 200) {
        return res.data.response?.results;
    }
})

export const guardianSlice = createSlice({
    name: "guardianNews",
    initialState: {
        data: [],
        filteredData: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getGuardianNews.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(searchGuardian.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(filterGuardian.fulfilled, (state, action) => {
                state.filteredData = action.payload
            })
    }
})

export default guardianSlice.reducer;
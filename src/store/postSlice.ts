import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Buku } from "../types";


interface PostState {
    items: Buku[]
}

const initialState: PostState = {
    items: [],
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<Buku[]>) {
            state.items = action.payload;
        },
        updatePost(state, action: PayloadAction<Buku>) {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        }
    }
});

export const { setPosts, updatePost } = postSlice.actions;
export default postSlice.reducer;
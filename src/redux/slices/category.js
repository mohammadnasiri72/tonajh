import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categorys: [],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategorys: (state, action) => {
            state.categorys = action.payload;
        },
       
    }
});

export const { setCategorys } = categorySlice.actions;
export default categorySlice.reducer; 
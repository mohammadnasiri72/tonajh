import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    menuData: [],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setMenuData: (state, action) => {
            state.menuData = action.payload;
        },
       
    }
});

export const { setMenuData } = categorySlice.actions;
export default categorySlice.reducer; 
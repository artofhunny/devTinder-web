import { createSlice } from "@reduxjs/toolkit";

const menuOpenSlice = createSlice({
    name: "menuOpen",
    initialState: {
        isMenuOpen: true,
        activeMenuItem: ""
    },
    reducers: {
        toggleMenu(state){
            return !state;
        }
    }
});

export const { toggleMenu } = menuOpenSlice.actions;
export default menuOpenSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import menuOpenReducer from "./menuOpenSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        menuOpen: menuOpenReducer,
        connection: connectionReducer,
        request: requestReducer,
    }
});

export default appStore;
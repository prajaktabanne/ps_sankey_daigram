import { createStore } from "redux";
import { countReducer } from "./Components/SankeyDaigram/reducer";

export const store = createStore(countReducer);

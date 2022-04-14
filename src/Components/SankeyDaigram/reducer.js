const initialState = {
  data: [],
};
export const countReducer = function (state = initialState, action) {
  let index;
  switch (action.type) {
    case "saveData":
      state.data.data[state.data.data.length] = [
        "5000",
        action.t[0],
        parseInt(action.t[1]),
      ];
      return {
        ...state,
      };
    case "editData":
      index = state.data.data.findIndex((x) => x[1] === action.t.name);
      state.data.data[index][2] = parseInt(action.t.amount);
      return {
        ...state,
      };
    case "deleteData":
      index = state.data.data.findIndex((x) => x[1] === action.t.name);
      state.data.data.splice(index);
      return {
        ...state,
      };
    case "getData":
      state.data = action.myJson;
      return { ...state };
    default:
      return state;
  }
};

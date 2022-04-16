const initialState = {
  data: [],
};
export const countReducer = function (state = initialState, action) {
  let index;
  switch (action.type) {
    case "saveData":
      state.data.data[state.data.data.length] = [
        action.t[0],
        action.t[1],
        parseInt(action.t[2]),
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
    case "addIncome":
      state.data.data[state.data.data.length] = action.t;
      return { ...state };
    default:
      return state;
  }
};

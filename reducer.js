const defaultState = {
  todo: [],
};

const todoReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      let temp = state.todo;
      temp.push(payload);
      return { ...state, todo: temp };
    case "DELETE":
      let temp1 = state.todo;
      let filteredTodo = temp1.filter((item) => item.id !== payload.id);
      return { ...state, todo: filteredTodo };
    default:
      return state;
  }
};

export default todoReducer;

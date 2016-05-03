export default function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INC':
      return state + 1;
    default:
      return state;
  }
}

export function reducer(state: State, action: Action): State {
  const newState = { ...state };
  switch (action.type) {
    case "SEND_MESSAGE":
      newState.messages.push({
        ...action.message,
      });
      break;
    case "GET_MESSAGES_LIST":
      newState.messages = action.messages;
      break;
    default:
      break;
  }
  return newState;
}

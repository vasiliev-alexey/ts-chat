import { Store } from "redux";
import { getMessagesList } from "./fireBaseMessagesAPI";

export async function loadMessage(store: Store): Promise<void> {
  const messages = await getMessagesList();
  store.dispatch({
    type: "GET_MESSAGES_LIST",
    messages,
  });
}

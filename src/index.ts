import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "redux";
import "./index.css";
import { loadMessage } from "./service/loadMessage";
import { reducer } from "./redux/reducer";
import {
  sendMessage,
  observeWithEventSource,
} from "./service/fireBaseMessagesAPI";
import { render } from "./render/render";

let userName: string;

if (!localStorage.getItem("userName")) {
  userName = prompt("Пожалуйста введите имя", " ") as string;
  localStorage.setItem("userName", JSON.stringify(userName));
} else {
  userName = JSON.parse(localStorage.getItem("userName") as string);
}

const state: State = { userName, messages: [] };

const store = createStore(reducer, state);

observeWithEventSource(async () => {
  await loadMessage(store);
});

const input: HTMLInputElement = document.querySelector(".form-control");
const button = document.querySelector(".sendButton");

store.subscribe(() => {
  render(store.getState());
});

if (button !== null) {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const messageText = input.value;
    const message = {
      name: userName,
      message: messageText,
      now: Date.now(),
    };
    await sendMessage(message);
    store.dispatch({
      type: "SEND_MESSAGE",
      message: { ...message },
    });
  });
}

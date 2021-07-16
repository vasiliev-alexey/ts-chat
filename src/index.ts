import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "redux";
import "./index.css";
import $ from "jquery";
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

$(document).ready(() => {
  const emoji = {
    ":)": "😃",
    ":(": "\u2639",
    "^^": "😊",
  };
  const reEscape = function (s: string) {
    return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  };
  $("input.form-control").keyup(function () {
    let text = $(this).val() as string;
    $.each(emoji, (plaintext, unicode) => {
      text = text.replace(new RegExp(reEscape(plaintext), "g"), unicode);
    });
    $(this).val(text);
  });
});

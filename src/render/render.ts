export function render(state: State): void {
  const messagesBlock = document.querySelector(".container");
  let renderString = "";

  state.messages.forEach((el) => {
    if (el.name === state.userName) {
      renderString += `<div class='userMessage'><p style='font-weight:bold'>${el.name}</p><span>${el.message}</span></div>\n`;
    } else {
      renderString += `<div class='messageIncoming'><p style='font-weight:bold'>${el.name}</p><span>${el.message}</span></span></div>\n`;
    }
  });
  messagesBlock.innerHTML = renderString;
}

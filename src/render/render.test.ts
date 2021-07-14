import { render } from "./render";

describe("render function test", () => {
  it("first render test", () => {
    document.body.innerHTML = `<div class='container'></div>`;

    const messages: Message[] = [
      {
        name: "Manchini",
        message: "Win Win Win!",
      },
      {
        name: "Belotti",
        message: "Forza Italia!",
      },
    ];

    const state = { userName: "Buffon", messages };
    const result = `<div class="messageIncoming"><p style="font-weight:bold">${messages[0].name}</p><span>${messages[0].message}</span></div>\n<div class="messageIncoming"><p style="font-weight:bold">${messages[1].name}</p><span>${messages[1].message}</span></div>\n`;
    render(state);
    expect(document.querySelector(".container").innerHTML).toEqual(result);
  });
});

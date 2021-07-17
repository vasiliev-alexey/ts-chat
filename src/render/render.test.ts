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
    render(state);
    expect(document.querySelector(".container")).toMatchSnapshot();
  });
});

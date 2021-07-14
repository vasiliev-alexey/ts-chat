import { createStore } from "redux";
import { loadMessage } from "./loadMessage";
import { reducer } from "../redux/reducer";

describe("loadMessage test", () => {
  it("first test load message", async () => {
    global.fetch = jest.fn();
    const state: State = {
      userName: "Buffon",
      messages: [],
    };
    const store = createStore(reducer, state);
    const messages = [
      {
        name: "Manchini",
        message: "Win Win Win!",
      },
      {
        name: "Belotti",
        message: "Forza Italia!",
      },
      {
        name: "Donnaruma",
        message: "i am the best goalkipper in the world",
      },
    ];

    (fetch as any).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ messages }),
      })
    );
    await loadMessage(store);
    expect(store.getState().userName).toEqual("Buffon");
    expect(store.getState().messages).toEqual([messages]);
  });
});

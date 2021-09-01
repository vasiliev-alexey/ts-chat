import { reducer } from "./reducer";

describe("test reducer", () => {
  it("first test reducer", () => {
    const state: State = {
      userName: "newUser",
      messages: [],
    };

    const message = {
      name: "Buffon",
      message: "glory Italy!!!",
    };
    const action1 = {
      type: "SEND_MESSAGE",
      message: { ...message },
    };

    expect(reducer(state, action1)).toEqual({
      messages: [{ message: "glory Italy!!!", name: "Buffon" }],
      userName: "newUser",
    });

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

    const action2 = {
      type: "GET_MESSAGES_LIST",
      messages,
    };
    expect(reducer(state, action2)).toEqual({
      messages: [
        { message: "Win Win Win!", name: "Manchini" },
        { message: "Forza Italia!", name: "Belotti" },
        { message: "i am the best goalkipper in the world", name: "Donnaruma" },
      ],
      userName: "newUser",
    });
  });

  test("issue #2 test case", () => {
    const state: State = {
      userName: "newUser",
      messages: [
        {
          name: "Bonucci",
          message: "glory Italy!!!",
        },
      ],
    };

    const message = {
      name: "Chiellini",
      message: "Chiellini",
    };
    const action1 = {
      type: "SEND_MESSAGE",
      message: { ...message },
    };

    const refBefore = state.messages[0];
    const newSate = reducer(state, action1);
    const refAfter = newSate.messages[0];
    expect(refBefore == refAfter).toBeFalsy();
  });
});

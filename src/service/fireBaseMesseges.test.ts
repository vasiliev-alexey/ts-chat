import { sendMessage, getMessagesList } from "./fireBaseMessagesAPI";

describe("test fireBaseMessagesApi", () => {
  global.fetch = jest.fn();
  const message = {
    name: "Buffon",
    message: "glory Italy!!!",
  };
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
  it("sendmessage test result resolve", async () => {
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ...message }),
      })
    );

    expect(await sendMessage(message)).toEqual({
      message: "glory Italy!!!",
      name: "Buffon",
    });
  });
  it("sendmessage test result reject", async () => {
    global.fetch = jest.fn(() => Promise.reject(Error()));
    global.alert = jest.fn(() => "error");
    expect(await sendMessage(message)).toEqual("error");
  });

  it("getmessageslist test result resolve", async () => {
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ messages }),
      })
    );

    expect(await getMessagesList()).toEqual([
      [
        { message: "Win Win Win!", name: "Manchini" },
        { message: "Forza Italia!", name: "Belotti" },
        { message: "i am the best goalkipper in the world", name: "Donnaruma" },
      ],
    ]);
  });

  it("sendmessageslist test result reject", async () => {
    global.fetch = jest.fn(() => Promise.reject(Error()));
    global.alert = jest.fn(() => "error");
    expect(await getMessagesList()).toEqual("error");
  });
});

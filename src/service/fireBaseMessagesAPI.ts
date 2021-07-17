const config = {
  firebaseBaseUrl: "https://otus-js-chat-4ed79-default-rtdb.firebaseio.com",
  firebaseCollection: "messages.json",
};

export async function getMessagesList(): Promise<Message[] | void> {
  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data: Message) => {
      const result = [] as any[];
      Object.values(data).forEach((el) => {
        result.push(el);
      });
      return result;
    })
    .catch(() => alert("error, not response"));
}

export async function sendMessage(data: Message): Promise<boolean> {
  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch(() => alert("error, not response.Try again!"));
}

export function observeWithEventSource(
  cb: (data: { name: string; message: string }) => void
): void {
  const evtSource = new EventSource(
    `${config.firebaseBaseUrl}/${config.firebaseCollection}`
  );
  function handler(ev: MessageEvent) {
    return cb(JSON.parse(ev.data).data);
  }
  evtSource.addEventListener("put", handler);
}

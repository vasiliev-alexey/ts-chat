interface Message {
  name: string;
  message: string;
  now?: number;
}

interface State {
  userName: string;
  messages: Message[];
}

interface Action {
  [key: string]: any;
  type: string;
}

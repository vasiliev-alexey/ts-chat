declare interface Message {
  name: string;
  message: string;
  now?: number;
}

declare interface State {
  userName: string;
  messages: Message[];
}

declare interface Action {
  [key: string]: any;
  type: string;
}

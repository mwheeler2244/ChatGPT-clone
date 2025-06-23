export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  isProcessing?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  model: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
}

export interface HistorySection {
  header: string;
  items: string[];
}

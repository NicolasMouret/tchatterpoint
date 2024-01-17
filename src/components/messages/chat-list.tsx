import { faker } from '@faker-js/faker';

interface Message {
  id: string;
  authorId: string;
  authorName: string;
  recipientId: string;
  recipientName: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Chat {
  id: string;
  createdAt: Date;
  messages: Message[];
}

const messages: Message[] = Array.from({length: 10}, () => ({
  id: faker.string.uuid(),
  authorId: faker.string.uuid(),
  authorName: faker.person.firstName(),
  recipientId: faker.string.uuid(),
  recipientName: faker.person.firstName(),
  content: faker.lorem.paragraph({min: 1, max: 4}),
  chatId: faker.string.uuid(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
}))

console.log(messages);

export default function ChatList() {
  return (
    <div>chat-list</div>
  )
}

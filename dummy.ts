export const users = [
  {
    id: "user1",
    name: "Paul-Henry",
  },
  {
    id: "user2",
    name: "Pavone",
  },
  {
    id: "user3",
    name: "Elizabeth Smith",
  },
  {
    id: "user4",
    name: "John Smith",
  },
];

export const conversations = [
  {
    id: "conversation1",
    users: [users[0], users[1]],
    messages: [
      {
        id: "message1",
        sender: users[0],
        receiver: users[1],
        content: "Bonjour !",
      },
      {
        id: "message2",
        sender: users[1],
        receiver: users[0],
        content: "Salut, ça va ?",
      },
    ],
  },
  {
    id: "conversation2",
    users: [users[0], users[2]],
    messages: [
      {
        id: "message3",
        sender: users[0],
        receiver: users[2],
        content: "Yooooo",
      },
      {
        id: "message4",
        sender: users[2],
        receiver: users[0],
        content: "Yo, ça va ?",
      },
    ],
  },
];

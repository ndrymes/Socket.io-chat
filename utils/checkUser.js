let users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  if (!username || !room) {
    return {
      error: "username and room required"
    };
  }
  const existingUser = users.find(user => {
    return user.username == username && user.room === room;
  });
  if (existingUser) {
    return {
      error: "you are already an existing user"
    };
  }
  const user = { id, username, room };

  users.push(user);
  return { user };
};
const removeUser = ({ id, username, room }) => {
  const index = users.findIndex(user => {
    return user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1);
  } else {
    return {
      error: "user not found"
    };
  }
};
const getUser = id => {
  const user = users.find(user => {
    return user.id === id;
  });
  if (!user) {
    return {
      error: "user not found"
    };
  }
  return user;
};

const getUserInRoom = room => {
  const user = users.find(user => {
    return user.room === room;
  });
  if (!user) {
    return {
      error: "user not found"
    };
  }
  return user;
};
module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserInRoom
};

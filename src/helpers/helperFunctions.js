export const isUserActive = (allUsers, theUser) => {
  const userObj = findUser(allUsers, theUser);
  return userObj.active_user;
};

export const findUser = (allUsers, theUser) => {
  return allUsers.find(user => user.id === theUser.user_id);
};

export const isChatroomInUserChatrooms = (userChatrooms, chatroom) => {
  return userChatrooms.find(room => room.id === chatroom.id);
};

export const getDMUser = (room, allUsers, currentUser) => {
  const users = room.users.map(userId =>
    allUsers.find(user => user.id === userId)
  );
  return currentUser ? users.find(user => user.id !== currentUser.id) : {}
};

export const formatDateTime = datetime => {
  const date = new Date(datetime);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  return `${date.getHours()}:${date.getMinutes()}${
    isToday
      ? ""
      : `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}}`
  }`;
};

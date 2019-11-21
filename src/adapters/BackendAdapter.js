const BASE_URL = "http://localhost:3000/api/v1";

const BASE_WS_URL = "ws://localhost:3000/cable";

const CHATROOMS_URL = `${BASE_URL}/chatrooms`;
const DM_URL = `${BASE_URL}/newdm`
const CURRENT_USERS_CHATROOMS_URL = `${BASE_URL}/uchatrooms`;
const USER_CHATROOMS_URL = `${BASE_URL}/user_chatrooms`;
const MESSAGES_URL = `${BASE_URL}/messages`;
const LOGIN_URL = `${BASE_URL}/login`;
const LOGOUT_URL = `${BASE_URL}/logout`;
const SIGNUP_URL = `${BASE_URL}/signup`;
const VALIDATE_URL = `${BASE_URL}/validate`;
const USERS_URL = `${BASE_URL}/users`;

const headers = (more = {}) => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  ...more
});

const resToJSON = res => res.json();

const get = url => {
  return fetch(url).then(resToJSON);
};

const postUserChatroom = chatroom => {
  const config = {
    credentials: 'include',
    headers: headers(),
    method: 'POST',
    body: JSON.stringify({chatroom})
  }
  return fetch(USER_CHATROOMS_URL, config).then(resToJSON)
}

const getUserChatrooms = () =>
  fetch(CURRENT_USERS_CHATROOMS_URL, {
    credentials: "include"
  })
    .then(handleServerResponse)
    .catch(handleError);

const handleError = () => {
  console.error("TODO: Handle error");
};

const post = (url, data) => {
  const config = {
    method: "POST",
    headers: headers(),
    credentials: 'include',
    body: JSON.stringify(data)
  };
  return fetch(url, config);
};

const login = userDetails =>
  fetch(LOGIN_URL, {
    method: "POST",
    credentials: "include",
    headers: headers(),
    body: JSON.stringify({ user: userDetails })
  })
    .then(handleServerResponse)
    .then(userDetails => {
      return userDetails.user || userDetails;
    })
    .catch(handleError);

const signup = userDetails =>
  fetch(SIGNUP_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ user: userDetails })
  })
    .then(handleServerResponse)
    .then(userDetails => {
      return userDetails.user || userDetails;
    })
    .catch(handleError);

const logout = () =>
  fetch(LOGOUT_URL, {
    method: "DELETE",
    credentials: "include"
  })
    .then(handleServerResponse)
    .catch(handleError);

const validateUser = () =>
  fetch(VALIDATE_URL, {
    method: "POST",
    headers: headers(),
    credentials: "include"
  })
    .then(handleServerResponse)
    .then(userDetails => {
      if (!userDetails) {
        return { errors: ["No user found "] };
      }
      return userDetails.user || userDetails;
    })
    .catch(handleError);

const handleServerResponse = res => {
  if (res.ok) {
    return res.text().then(text => {
      try {
        return JSON.parse(text);
      } catch (error) {
        return { staticPageContent: text };
      }
    });
  } else if (res.status === 503) {
    return { code: 503 };
  } else if (res.status === 500) {
    return { code: 500, error: "Server Error" };
  } else {
    return res.text().then(text => {
      try {
        return JSON.parse(text);
      } catch (error) {
        return res;
      }
    });
  }
};

const patch = (url, id, data) => {
  const config = {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(data)
  };
  return fetch(`${url}/${id}`, config);
};

const destroy = (url, id) => {
  const config = {
    method: "DELETE",
    headers: {
      Accept: "application/json"
    }
  };
  return fetch(`${url}/${id}`, config);
};

const deleteChatroom = id => destroy(CHATROOMS_URL, id);

const postMessage = data => {
  return post(MESSAGES_URL, data);
};
const postChatroom = data => {
  return post(CHATROOMS_URL, data);
};

const fetchAllUsers = () => {
  return get(USERS_URL)
}

const postDM = data => {
  const config = {
    method: 'POST',
    credentials: 'include',
    headers: headers(),
    body: JSON.stringify(data)
  }
  fetch(DM_URL, config)
}

export default {
  BASE_URL,
  BASE_WS_URL,
  CHATROOMS_URL,
  get,
  post,
  patch,
  destroy,
  postMessage,
  postChatroom,
  validateUser,
  login,
  logout,
  signup,
  deleteChatroom,
  getUserChatrooms,
  fetchAllUsers,
  postUserChatroom,
  postDM
};

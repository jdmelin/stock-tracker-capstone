const baseUrl = process.env.REACT_APP_BASE_URL;

const loginService = {
  logIn(payload) {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  },
};

export default loginService;

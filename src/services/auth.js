export const isBrowser = () => typeof window !== "undefined"


export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}


const setUser = user => window.localStorage.setItem("gatsbyUser", JSON.stringify(user))


export const handleLogin = async (formData) => {
    const makeReq = await fetch('https://fierce-tor-21242.herokuapp.com/auth/local', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const res = await makeReq.json();
    return setUser(res);
}

export const handleRegister = async (formData) => {
  const makeReq = await fetch('https://fierce-tor-21242.herokuapp.com/auth/local/register', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  });

  const res = await makeReq.json();
  return setUser(res);
}


export const isLoggedIn = () => {
  const user = getUser();
  return !!user.username;
}


export const logout = callback => {
  setUser({});
  callback();
}
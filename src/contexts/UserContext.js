import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userReservations, setUserReservations] = useState(null);

  const loggedInCheck = async () => {
    let loggedIn = await fetch("/api/v1/users/whoami");
    loggedIn = await loggedIn.json();
    loggedIn ? setLoggedInUser(loggedIn) : setLoggedInUser(null);
  };
  useEffect(() => loggedInCheck(), []);
  useEffect(() => {
    if (loggedInUser) {
      getAllReservationsForUser();
    }
  }, [loggedInUser]);

  useEffect(() => {}, [loggedInUser]);

  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLoginModal = () => setShowLogin(false);
  const handleShowLoginModal = () => setShowLogin(true);

  const register = async (userInformation) => {
    try {
      const response = await fetch(`/api/v1/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: userInformation.firstName,
          lastName: userInformation.lastName,
          phoneNumber: userInformation.phone,
          email: userInformation.email,
          password: userInformation.password,
        }),
      });

      if (response.status === 409) {
        return { status: response.status };
      }
      const data = await response.json();
      if (data.status === "error") {
        throw new Error();
      }
      if (data.status === "success") {
        setLoggedInUser(data.data);
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  const login = async (userInformation) => {
    const response = await fetch(`/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userInformation.email,
        password: userInformation.password,
      }),
    });
    const result = await response.json();

    if (result.status === "error") {
      return false;
    } else {
      setLoggedInUser(result.loggedInUser);
      return true;
    }
  };

  const logout = async () => {
    if (!loggedInUser) return;
    const { status } = await fetch("/api/v1/users/logout");
    if (status === 200) {
      setLoggedInUser(null);
      return true;
    }
  };

  const getAllReservationsForUser = async () => {
    let result = await fetch("/api/v1/reservations/user");
    result = await result.json();
    if (result.status !== "error") {
      setUserReservations(result);
    }
  };

  const userUpdate = async (userInformation) => {
    try {
      const response = await fetch(`/api/v1/users/${loggedInUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInformation),
      });
      if (response.status === 409) {
        return { status: response.status };
      }
      const data = await response.json();
      if (data.status === "error") {
        throw new Error();
      }
      if (data.status === "success") {
        loggedInCheck();
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        userReservations,
        setLoggedInUser,
        register,
        login,
        logout,
        getAllReservationsForUser,
        setShowLogin,
        showLogin,
        handleCloseLoginModal,
        handleShowLoginModal,
        userUpdate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

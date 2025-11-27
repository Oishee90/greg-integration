const getRole = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log("User data in getRole:", userData?.role);
  return userData ? userData.role : null;
};

export default getRole;

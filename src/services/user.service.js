import rootInstance from "./utilsService/rootInstance";

const getPublicContent = () => {
  return rootInstance.get("/all");
};

const getUserBoard = () => {
  return rootInstance.get("/user");
};

const getModeratorBoard = () => {
  return rootInstance.get("/mod");
};

const getAdminBoard = () => {
  return rootInstance.get("/admin");
};

const readUserProfile = (user) => {
  return rootInstance.post("/user/get-by-user", user);
};

const joinGroup = (groupId, userId) => {
  return rootInstance.post("/user/join-group", {groupId: groupId, userId: userId});
}

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  readUserProfile,  
  joinGroup
};

export default UserService;

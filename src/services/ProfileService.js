import rootInstance from "./utilsService/rootInstance";
const getProfile = async (userID) => {
    return await rootInstance.get("/profile/" + userID);
}

const createProfile = async (profile) => {
    return await rootInstance.post("/profile/add", profile);
}


const updateProfile = async (userID,profile) => {
    return await rootInstance.put("/profile/update/" + userID, profile);
}



const ProfileService = {
    getProfile,
    createProfile,
    updateProfile,
};
  
export default ProfileService;

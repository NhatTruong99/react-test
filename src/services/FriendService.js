import rootInstance from "./utilsService/rootInstance";

const getListFriend = async (userID) => {
    return await rootInstance.get("/friend/list-friend/" + userID);
}

//delete friendship 
const removeFriendShip = async (userId1,userId2) => {
    return await rootInstance.delete(`friend/delete-friendship/${userId1}/${userId2}`);
}

const FriendService = {
    getListFriend
};
export default FriendService;
import axios from 'axios';
// import { getAllUserProfile } from './UserProfileService';

//get list friend by id
export const getListFriendUserByID = async (userID) => {
    const data = await axios.get(`http://localhost:8080/api/friend/list-friend/${userID}`,)
                .then(response => response.data)
                .catch(error => alert(error))
    return data
}

//get list friendship by id
export const getListFriendShipByID = async (userID) => {
    const data = await axios.get(`http://localhost:8080/api/friend/list-friendship/${userID}`,)
                .then(response => response.data)
                .catch(error => alert(error))
    return data
}

//get list people add friend to user
export const getListRequester = async (userID) => {
    const data = await axios.get(`http://localhost:8080/api/friend/list-requester/${userID}`,)
                .then(response => response.data)
                .catch(error => alert(error))
    return data
}

//get list user add friend to order people
export const getListRequesting = async (userID) => {
    const data = await axios.get(`http://localhost:8080/api/friend/list-requesting/${userID}`,)
                .then(response => response.data)
                .catch(error => alert(error))
    return data
}

//post accept request

export const acceptRequest = async (userId1,userId2) => {
    const data = await axios.post(`http://localhost:8080/api/friend/accept-friend/${userId1}/${userId2}`,)
                .then(response => response.data)
                .catch(error => alert(error))
    return data
}

//post add request

export const addRequest = async (userId1,userId2) => {
    const data = await axios.post(`http://localhost:8080/api/friend/add-friend/${userId1}/${userId2}`,)
                .then(response => response.data)
                .catch(error => alert(error))
    return data
}

//delete friendship 
export const removeFriendShip = async (userId1,userId2) => {
    // await axios.delete(`http://localhost:8080/api/friend/delete-friendship/${userId1}/${userId2}`,)
    //             .catch(error => alert(error))
    await axios({
        method: "delete",
        url: `http://localhost:8080/api/friend/delete-friendship/${userId1}/${userId2}`,
        headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'}
    });
}

// //get list friendship with user have id
// export const getListNotFriend = async (userId) => {
//     const listUser = await getAllUserProfile();
//     const listFriendShip = await getListFriendShipByID(userId);
//     const listNotFriend = listUser.filter(({ userId: id1 }) => !listFriendShip.some(({ userId: id2 }) => id2 === id1));
//     return listNotFriend;

// }
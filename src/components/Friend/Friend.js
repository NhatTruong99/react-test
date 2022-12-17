import { useEffect, useState } from "react";
import {Form,Card,Button,Row,Col } from 'react-bootstrap'
import {getUserProfileByID} from '../feature/UserProfileService.js'
import {getListFriendUserByID,addRequest, acceptRequest, removeFriendShip} from '../feature/FriendService.js'
import UserAll from './UserAll.js'
import ListRequester from './RequesterList.js'
import ListRequesting from './RequestingList.js'
function Friend({userId}){

    const [listFriend,setListFriend] = useState()
    const [userProfile, setUserProfile] = useState()
    const [change,setChange] = useState(false)

    useEffect(() => {
        getUserProfileByID(userId).then(res => setUserProfile(res))
        getListFriendUserByID(userId).then(res => setListFriend(res))
    },[userId,change])

    console.log('render');
    const handleAcceptRequest = (userId1) => {
        acceptRequest(userId1,userId).then(() => setChange(!change))
    }

    const handleAddRequest = (userId1) => {
        addRequest(userId,userId1).then(() => setChange(!change))
    }

    const handleRemoveFriend = (userId1) => {
        removeFriendShip(userId1,userId).then(() => setChange(!change))
    }

    return (
        <div style={{ padding: 20 }}>
            {userProfile && 
                <Card style={{ width: '15rem',margin: '20px' }}>
                    <Card.Body >
                        <Card.Title>{userProfile.firstName + " " + userProfile.lastName}</Card.Title>
                        <Card.Text>{"User ID: " + userProfile.userId}</Card.Text>
                    </Card.Body>
                </Card>}
            
            <hr/>
            {userId && <ListRequester 
                            userId = {userId}
                            handle={handleAcceptRequest}
                            change={change}
                        />}
            <hr/>
            {userId && <ListRequesting 
                            userId = {userId}
                            change={change}
                        />}
            <hr/>
            {
            userId && <UserAll 
                        userId={userId}
                        handle = {handleAddRequest}
                        change={change}
                      />
            }
        </div>
    )
}

export default Friend
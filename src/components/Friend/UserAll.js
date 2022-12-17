import { useEffect, useState } from "react";
import {getAllUserProfile,getListFriendUserByID} from '../feature/UserProfileService.js'
import {Form,Card,Button,Row,Col } from 'react-bootstrap'
import {getListNotFriend} from '../feature/FriendService.js'
function UserAll(props){

    const [listNotFriend,setListNotFriend] = useState()

    useEffect(() =>{
        getListNotFriend(props.userId).then(res => setListNotFriend(res))
    },[props.userId,props.change])

    return (
        <div>
            <h1 style={{color: 'green'}}>Danh sách user</h1>
            <Row style={{display: 'flex',justifyContent: 'flex-start' }}>
                    {listNotFriend &&  listNotFriend.map((user) =>(
                        <Col key= {user.userProfileID} lg='3'>
                            <Card  
                                style={{ width: '15rem',marginTop: '20px' }}
                            >
                                <Card.Body >
                                    <Card.Title>{user.firstName + " " + user.lastName}</Card.Title>
                                    <Card.Text>{"User ID: " + user.userId}</Card.Text> 
                                    <button 
                                        className="btn btn-info"
                                        onClick={() => props.handle(user.userId)}
                                    >Add Friend</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))}
                    </Row >
        </div>
    )
}

export default UserAll
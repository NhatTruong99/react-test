import { useEffect, useState } from "react";
import {Form,Card,Button,Row,Col } from 'react-bootstrap'
import {getListRequester, acceptRequest} from '../feature/FriendService.js'
function RequesterList(props){

    const [listRequester, setListRequester] = useState()

    useEffect(() =>{
        getListRequester(props.userId).then(res => setListRequester(res))
    },[props.change,props.userId])
    
    return (
        <div>
            <h3>Danh sách người gửi kết bạn: </h3>
            <Row style={{display: 'flex',justifyContent: 'flex-start' }}>
            {listRequester && listRequester.map((user) =>(
                <Col key= {user.userProfileID} lg='3'>
                    <Card  
                        style={{ width: '15rem',marginTop: '20px' }}
                    >
                        <Card.Body >
                            <Card.Title>{user.firstName + " " + user.lastName}</Card.Title>
                            <Card.Text>{"User ID: " + user.userId}</Card.Text>
                            <button 
                                className="btn btn-primary"
                                onClick={() => props.handle(user.userId)}
                            >Accept Request</button>
                        </Card.Body>
                    </Card>
                    
                </Col>
            ))}
            </Row >
        </div>
    )
}

export default RequesterList;
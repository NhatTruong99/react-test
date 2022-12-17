import { useEffect, useState } from "react";
import {Form,Card,Button,Row,Col } from 'react-bootstrap'
import {getListRequesting} from '../feature/FriendService.js'
function RequestingList(props){

    const [listRequesting, setListRequesting] = useState()
    const [change,setChange] = useState(false)

    useEffect(() =>{
        getListRequesting(props.userId).then(res => setListRequesting(res))
    },[props.change,props.userId])
    
    return (
        <div>
            {listRequesting  &&  <div>
                <h3>Danh sách người mà user đang gửi kết bạn : </h3>
                <Row style={{display: 'flex',justifyContent: 'flex-start' }}>
                { listRequesting.map((user) =>(
                    <Col key= {user.userProfileID} lg='3'>
                        <Card  
                            style={{ width: '15rem',marginTop: '20px' }}
                        >
                            <Card.Body >
                                <Card.Title>{user.firstName + " " + user.lastName}</Card.Title>
                                <Card.Text>{"User ID: " + user.userId}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                </Row >
            </div>}
        </div>
    )
}

export default RequestingList;
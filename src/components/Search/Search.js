import { useEffect, useState} from "react";
import {Form,Card,Button,Row,Col } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import SearchService from "../../services/SearchService"
import {Link } from "react-router-dom";
function Search(){
    const [listSearch,setlistSearch] = useState()

    const {keyword} = useParams();

    console.log(keyword);

    useEffect(() => {
        SearchService.getSearchResult(keyword)
            .then(response => setlistSearch(response.data))
    },[keyword])

    console.log(listSearch);
    return (
        <div style={{ padding: 20 }}>
            {listSearch && <div className="result_search">
                <h4 >Kết quả tìm kiếm cho từ khóa: <span style={{color: "red"}}>{listSearch.keyword}</span></h4>
                <h1>Mọi người</h1>
                <Row style={{display: 'flex',justifyContent: 'flex-start' }}>
                {listSearch.userProfiles.map((user) =>(
                    <Col key= {user.userProfileID} lg='3'>
                        <Card  
                            style={{ width: '15rem',marginTop: '20px' }}
                        >
                            <Card.Body >
                            <img className="col-3" src={user.avatar}></img>
                            <Link to={"/profile/" + user.user.id}> 
                                <Card.Title>{user.firstName + " " + user.lastName}</Card.Title>
                            </Link>
                                <Card.Text>{user.about}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                </Row >
                <h1>Bài post</h1>
                <Row >
                {listSearch.posts.map((postWithUser) =>(
                    <Col lg='3'>
                        <Card 
                            style={{ width: '15rem',marginTop: '20px' }}
                        >
                            <Card.Body >
                                <Card.Title>{postWithUser.userProfile.firstName + " " + postWithUser.userProfile.lastName}</Card.Title>
                                <Card.Text>{postWithUser.post.content}</Card.Text>
                                <Card.Text>Ngày post: {postWithUser.post.publishedDate}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                </Row>
                <h1>Fanpage</h1>
            </div>}
            
        </div>
    )
}

export default Search
import React ,{useState ,useEffect,useRef} from 'react'
import ProfileService from '../../services/ProfileService';
import {useParams} from 'react-router-dom';
// import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled'
// import Button from '@atlaskit/button';
import Modal from 'react-bootstrap/Modal';
import TextareaAutosize from 'react-textarea-autosize';
import PostService from '../../services/post.service';
import CommentComponent from '../Comment/CommentComponent';
import ListFriend from '../Friend/ListFriend.js';
// import LikeIcon from '@atlaskit/icon/glyph/like'
// import CommentIcon from '@atlaskit/icon/glyph/comment'
import {storage} from '../../utils/firebaseConfig';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import FriendService from "../../services/FriendService"
import AuthService from "../../services/auth.service";
import ButtonFriend from '../Friend/ButtonFriend';
function ProfileComponent() {

    const [isCurrentProfile,setIsCurrentProfile] = useState()
    const currentUser = AuthService.getCurrentUser();

    const [userProfileID,setUserProfileID] = useState(0)
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [gender,setGender] = useState(0)
    const [dob,setDob] = useState("")
    const [avatar,setAvatar] = useState(null)
    const [background,setBackground] = useState(null)
    const [about,setAbout] = useState("")
    const [locationID,setLocationID] = useState(0)

    const {userID} = useParams();

    const [uploadAvatar,setUploadAvatar] = useState(null);
    const [uploadBackground,setUploadBackground] = useState(null);

    const [posts,setPosts] = useState([]);
    


    const OldImage = useRef(null);
    const OldBackground = useRef(null);



    useEffect(() => {
        ProfileService.getProfile(userID).then((response) => {
            setUserProfileID(response.data.userProfileID);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setAbout(response.data.about);
            setGender(response.data.gender);
            setDob(response.data.dateOfBirth);
            setLocationID(response.data.locationID);
            getImageFromFirebase(response.data.avatar,response.data.background)
        })
        getUserPost()
        checkCurrentUserProfile()
    },[userID])

   const checkCurrentUserProfile = () => {
    if (currentUser.id == userID){
      setIsCurrentProfile(true)
    } else{
      setIsCurrentProfile(false)
    }
   }



    const getImageFromFirebase=(avatar,background)=>{
      const avatarRef = ref(storage,`avatarImages/${avatar}`);
      getDownloadURL(avatarRef).then((url) => {
        setAvatar(url)
      }).catch((error) => {
        // Handle any errors
      });
      OldImage.current = avatar;

      const backgroundRef = ref(storage,`backGroundImages/${background}`);
      getDownloadURL(backgroundRef).then((url) => {
        setBackground(url)
      }).catch((error) => {
        // Handle any errors
      });
      OldBackground.current = background
    }
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      setUploadAvatar(null);
      setUploadBackground(null);
    }
    const handleShow = () => {
      setShow(true);

    }

    const [isReadonly, setIsReadonly] = useState(true);

    const handleUploadAvatar = (selectorFiles) => {
      if (selectorFiles) {
        setUploadAvatar(selectorFiles[0]);
      }
    };

    const handleUploadBackground = (selectorFiles) => {
      if (selectorFiles) {
        setUploadBackground(selectorFiles[0]);
      }
    };
    
    const handleUpdateProfile= ()=>{
        var avatar = "";
        var background = "";
        if(uploadAvatar===null){
          avatar = OldImage.current;
        }
        else{
        const avatarRef = ref(storage,`avatarImages/${uploadAvatar.name}`)
        uploadBytes(avatarRef,uploadAvatar)
        avatar = avatarRef.name
        }

        if(uploadBackground===null){
          background = OldBackground.current;

        }
        else{
        const backgroundRef = ref(storage,`backGroundImages/${uploadBackground.name}`)
        uploadBytes(backgroundRef,uploadBackground)
        background = backgroundRef.name;  
        }
        const updateDate = new Date().toISOString().slice(0, 10);;
        const dateOfBirth = dob;
          

      
        const profile = {userProfileID,firstName,lastName,gender,dateOfBirth,avatar,background,about,updateDate,locationID}

         
        ProfileService.updateProfile(userID,profile).then((res)=>{
            handleClose();
            getImageFromFirebase(avatar,background);
            alert("Update Sucess!")
          
        }).catch((err)=>{
            console.log(err)
        });
        
  }

   

    const getUserPost=()=>{
      PostService.getPostByUserID(userID).then((response)=>{
        setPosts(response.data)
    });
    }

    const formRef = useRef([]);
    const handlerOpenComment = function(idx) {
      return function(e)
      {
        
        const currentForm = formRef.current[idx];
        if (currentForm) {
    
         
          if (currentForm.style.display === "none" || currentForm.style.display === "") {
            currentForm.style.display = "block";
          } else {
            currentForm.style.display = "none";
          }
        }
      };
    
    } 
  return (
    <div>
  <div className="container">
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-lg-10 col-xl-10">
        <div className="card">
            <div>

            <div className="rounded-top text-white d-flex flex-row" style={{backgroundImage:`url(${background})`, 
          backgroundRepeat: 'no-repeat', 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
            , height:"300px"}}>
                
              
            </div>
         
          </div>
          <div className="d-flex justify-content-between" style={{backgroundColor: "#f8f9fa"}}>
            <div className="ms-4 mt-2 d-flex">
            <img src={avatar}  alt="Avatar" className="rounded-circle avatar shadow-4 img-thumbnail" style={{width: "150px"}}/>
            <div className="ms-3 align-self-end">
                <h5 className="text-title">{lastName} {firstName}</h5>
                <p className="text-title">New York</p>
            </div>
            </div>
        
            <div className="mb-2 me-2 align-self-end">
            <button
            onClick={handleShow}
                        appearance="primary"
                        // iconBefore={<EditFilledIcon label="" size="medium"></EditFilledIcon> }
                        >Edit Profile</button>
                    
            </div>
          
            </div>
          
          {!isCurrentProfile && <ButtonFriend userID = {userID} />}
          

          {/* //Render list friend */}
            <div className="card-body p-4 text-black">
              {userID && <ListFriend userID = {userID}/>}
            </div>


          <div className="card-body p-4 text-black">
            <div className="mb-5" style={{backgroundColor: "#f8f9fa"}}>
              <p className="lead fw-normal mb-1">About</p>
              <div className="p-4">
                <p className="font-italic mb-1">{about}</p>
              </div>
            </div>
            <div className="mb-4">
           
            <p className="lead fw-normal mb-0">Recent posts</p>
        

              <div>
              {
                 posts.map(
                  (post,index) =>
                 <div className="mt-3 " key={post.id}>
                     <div className="card">
                     <div className="card-body">
                         <div className="user-info d-flex">
                         <img src={avatar} className="rounded-circle avatar shadow-4" alt="Avatar" />

                         <div className="user-info-text align-self-center ms-3">
                             <h5 className="card-title">UserID: {post.user.id}</h5>
                             <h6 className="card-subtitle mb-2 text-muted">{post.publishedDate}</h6>
                         </div>
                         </div>
                        <div className="content-box">
                         <p className="card-text">{post.content}</p>

                         <img src="https://www.shutterstock.com/image-vector/new-post-vector-lettering-typography-260nw-1780835693.jpg"  alt="..."/>
                         </div>
                     </div>
                       <div className="feature-box d-flex ">
                     <button
                     appearance="subtle"
                    //  iconBefore={<LikeIcon label="" size="medium"></LikeIcon> }
                     shouldFitContainer></button>
                     <button 
                     appearance="subtle" 
                    //  iconBefore={<CommentIcon label="" size="medium" ></CommentIcon>}
                     shouldFitContainer
                     onClick={(e) => handlerOpenComment(index)(e)}
                     ></button>
                       </div>
                     </div>

                     <div id="comment-box" ref={el => formRef.current[index] = el}>
              <CommentComponent post={post}/>
              </div>
              </div>
             
             )
              }
              </div>
             
            </div>
          
         
          </div>
        </div>
      </div>
    </div>
  </div>
            </div>



            <Modal
            size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa trang cá nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
           <div className="d-flex justify-content-between">
            <p>Tên</p>
           </div>    
           <div className="ms-3 mb-2 d-flex flex-column">
            <span  className="align-self-start">Họ và tên đệm</span>
            <input      
            name="lastName" 
            placeholder="Họ và tên đệm"      
            value = {lastName}
            onChange= {(e)=> setLastName(e.target.value)}
            >
          </input>                
             </div>
             <div className="ms-3 mb-2 d-flex flex-column">
             <span className="align-self-start">Tên cuối</span>
                 <input        
                 name="firstName" 
                 placeholder="Tên cuối"      
                 value = {firstName}
                 onChange= {(e)=> setFirstName(e.target.value)}
                 >
                </input>                
             </div>  
          
           </div>
           <div className="text-center mb-3">
            <div className="d-flex justify-content-between mb-5">
            <p>Ảnh đại diện </p>
            <input
        accept="image/png, image/jpeg"
        type="file"
        name="uploadAvatar"
        onChange={(e) => handleUploadAvatar(e.target.files)}
        className="btn btn-primary"
      />
           </div>      
           
           
           {!uploadAvatar 
            ? <img src={(avatar)}  alt="Avatar" className="rounded-circle shadow-4 img-thumbnail" style={{width: "150px"}}/>
            : <img src={URL.createObjectURL(uploadAvatar)}  alt="Avatar" className="rounded-circle shadow-4 img-thumbnail" style={{width: "150px"}}/>
        
      }
           </div>
           <div className="text-center mb-3">
           <div className="d-flex justify-content-between mb-5">
           <p>Ảnh nền </p>
           <input
        accept="image/png, image/jpeg"
        type="file"
        name="uploadBackground"
        onChange={(e) => handleUploadBackground(e.target.files)}
        className="btn btn-primary"
      />
           </div>    

           {!uploadBackground 
            ? <img src={(background)}  alt="Background" className="shadow-4 img-fluid" style={{height: "200px"}}/>
            : <img src={URL.createObjectURL(uploadBackground)}  alt="Background" className="shadow-4 img-fluid" style={{height: "200px"}}/>
           }
           </div>
           <div className="text-center mb-3">
           <div className="d-flex justify-content-between">
            <p>Giới thiệu </p>
            <button
                        onClick={()=>setIsReadonly(prevState => !prevState)}
                        appearance="subtle"
                        // iconBefore={<EditFilledIcon label="" size="medium"></EditFilledIcon> }
                        >Chỉnh sửa                     
                        </button>
           </div>    
           

           <div className="form-group mb-2">

                 <TextareaAutosize        
                 id="TextAreaResizeable"
                 name="about" 
                 placeholder="Viết bình luận công khai..."      
                 value = {about}
                 onChange= {(e)=> setAbout(e.target.value)}
                 readOnly ={isReadonly}
                 >
                </TextareaAutosize>                
             </div>
           </div>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button variant="primary" onClick={() => handleUpdateProfile()}>Update</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProfileComponent;
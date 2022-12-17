import React ,{useState,useEffect,useRef} from 'react';
import styled from "styled-components";
import ReplyService from '../../services/ReplyService'
// import CrossIcon from '@atlaskit/icon/glyph/cross'
// import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled'
// import FeedbackIcon from '@atlaskit/icon/glyph/feedback'
// import Button from '@atlaskit/button';
import Form from 'react-bootstrap/Form';
import TextareaAutosize from 'react-textarea-autosize';
import AuthService from '../../services/auth.service'




const ReplyForm = styled(Form)`
   display:none;
`;

function ReplyComponent({comment,renderValue}){

    const [listReplies,setListReplies] = useState([]);
    const [inputReply,setInputReply] = useState("");

    const [isReadonly, setIsReadonly] = useState(true);
   
    const dateReply = new Date().toISOString().slice(0, 10);
    const user = AuthService.getCurrentUser();

    const formRef = useRef([]);
    const inputRef = useRef([]);

    useEffect(() => {
      getAllReplies();
    },[renderValue] );

    const getAllReplies =()=>{
      ReplyService.getReplies(comment.id).then((response) => {
          setListReplies(response.data);       
      });
    }

    
    const saveReply = (e,index)=>{
      e.preventDefault();
      var reply = inputReply;
      
      const temp = {reply,dateReply,user,comment}
  
      
      ReplyService.createReply(temp).then((res)=>{
        getAllReplies();
      }).catch((err)=>{
          console.log(err)
      });
      
      setInputReply("")
      const currentForm = formRef.current[index];
      currentForm.style.display = "none";
    }
  

    const updateComment = (inputUpdateReply,id)=>{
    
      var reply = inputUpdateReply;
      const temp = {reply,dateReply,user,comment}
  
      
      ReplyService.updateReply(id,temp).then((res)=>{
        alert("Update Sucess!")
      
    }).catch((err)=>{
        console.log(err)
    });
      
     
  
     
    }
    const deleteReply = ((id) =>{
      ReplyService.deleteReply(id).then((res)=>{
        getAllReplies();
        alert("Delete Sucess!")
  
    }).catch((err)=>{
        console.log(err)
    })
    });


    const handlerCreate = function(idx) {
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

    const handlerUpdate = function(idx) {
      return function(e,commentReplyID)
      {
        const currentInput = inputRef.current[idx];
        if (currentInput) {
          currentInput.focus()
          setIsReadonly(prevState => !prevState);

          
        if(currentInput.nextSibling.hasChildNodes()){
        
          if (isReadonly){
            e.target.style.backgroundColor = 'lightblue'
          }
          else{
            e.target.style.backgroundColor = 'transparent';
            
            if(window.confirm('Delete the item?')){
              const inputUpdateReply = currentInput.value ;
              
              updateComment(inputUpdateReply,commentReplyID);
            }
            else{
              getAllReplies();
            }
          }
      }
        }
      };  
    } 



    

    
  return (
    <div>
        {
            listReplies.map(
                (reply,index) =>
                <div key={reply.id}>    
                 <div className="ms-5 mt-4 user-info row col-12">
                 <div className="col-lg-1 col-2 align-self-center">
                  <img src="https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-cot-toc-ngau.jpg" className="rounded-circle avatar shadow-4" alt="Avatar" />
                  </div>
                  <div className="user-info-text col-lg-11 col-10 ">              
                  <h5 className="card-title">UserID: {reply.user.id}</h5>              

                 <TextareaAutosize
                    id="TextAreaResizeable"
                    cacheMeasurements
                    defaultValue = {reply.reply}
                    readOnly ={isReadonly}
                    ref={el => inputRef.current[index] = el} 

                    >         
                    </TextareaAutosize>   


                    <div className="d-flex">
                      <div className="feature border border-primary">
                      <span className='icon feedback-icon' onClick={(e) => handlerCreate(index)(e)}> 
                    {/* <FeedbackIcon primaryColor='#FF0000' >
                    </FeedbackIcon> */}
                     </span>
                      <span className='icon delete-icon ' onClick={()=> {if(window.confirm('Delete the item?')){deleteReply(reply.id)}}}> 
                    {/* <CrossIcon primaryColor='#FF0000'>
                    </CrossIcon> */}
                  </span>
                  <span className='icon edit-icon' onClick={(e) => handlerUpdate(index)(e,reply.id)}> 
                    {/* <EditFilledIcon primaryColor='#FF0000'  >
                    </EditFilledIcon> */}

                  </span>     
                        </div>
                  <p className="ms-3 card-text">{reply.dateReply}</p>
                  </div> 

                        </div>

                          <ReplyForm
                           ref={el => formRef.current[index] = el}> 
                                 
                      <div className="mt-4 user-info row col-12">
                      <div className="col-lg-1 col-2 align-self-center">
                        <img src="https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-cot-toc-ngau.jpg" className="rounded-circle avatar shadow-4" alt="Avatar" />
                      </div>
                      <div className="user-info-text col-lg-11 col-10 ">
                      <h5 className="card-title">UserID: {reply.user.id}</h5>                                         
                              <TextareaAutosize     
                              id="TextAreaResizeable"     
                              name="inputComment" 
                              placeholder="Viết phản hồi công khai..."     
                              value = {inputReply}
                              onChange= {(e)=> setInputReply(e.target.value)} 
                              >
                              </TextareaAutosize>                                          
                              <button isDisabled={!inputReply} className="float-end" onClick={(e) => saveReply(e,index)}>Bình luận</button>
                              </div>
                      </div>
                 
                        </ReplyForm>  
                   

                        </div>
            
                </div>
            )
        }
    </div>
  )
}

export default ReplyComponent;
import React ,{useState,useRef} from 'react';

// import Button from '@atlaskit/button';
import ReplyService from '../../services/ReplyService'
import TextareaAutosize from 'react-textarea-autosize';
import AuthService from '../../services/auth.service'




function AddReplyComponent({increaseRenderValue,comment}) {

    const [inputReply,setInputReply] = useState("");
    const dateReply = new Date().toISOString().slice(0, 10);
    const user = AuthService.getCurrentUser();
    const formRef = useRef([])
  
    
    const saveReply = (e)=>{
        e.preventDefault();
        var reply = inputReply;
        const temp = {reply,dateReply,user,comment}
        
        ReplyService.createReply(temp).then((res)=>{
            const currentForm = formRef.current;
            currentForm.style.display = "none"
            increaseRenderValue();  

        }).catch((err)=>{
            console.log(err)
        });
        

        setInputReply("")
      }
  return (
    <div>

             <div ref={formRef} className='reply-box'>
                      <div className="ms-5 mt-4 user-info row col-12">
                      <div className="col-lg-1 col-2 align-self-center">
                        <img src="https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-cot-toc-ngau.jpg" className="rounded-circle avatar shadow-4" alt="Avatar" />
                      </div>
                      <div className="user-info-text col-lg-11 col-10 ">
                      <h5 className="card-title">UserID: {user.id}</h5>              

                          <form>                             
                              <TextareaAutosize
                              id="TextAreaResizeable"
                              cacheMeasurements
                              name="inputComment" 
                              placeholder="Viết bình luận công khai..."      
                              value = {inputReply}
                              onChange= {(e)=> setInputReply(e.target.value)}
                              >
                              </TextareaAutosize>                                          
                              <button isDisabled={!inputReply} className="float-end" onClick={(e) => saveReply(e)}>Bình luận</button>
                        </form>  
                        </div>
                      </div>
                  </div>
    </div>
  )
}


export default AddReplyComponent;
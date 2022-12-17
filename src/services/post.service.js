import rootInstance from "./utilsService/rootInstance";

const readAllPosts = async () => {
    return await rootInstance.get("/post/all");
}


/* const readPostById = async (id) => {
    return await rootInstance.get("/post/" + id);
}
 */

const createPost = async (post) => {
    return await rootInstance.post("/post/add", post);
}

const deletePost = async (id) => {
    return await rootInstance.delete("/post/remove/" + id);
}

const updatePost = async (post) => {
    return await rootInstance.put("/post/update", post);
}

const getPostByUserID = async (userID) =>{
    return await rootInstance.get("/post/" + userID);
}

const PostService = {
    readAllPosts,
    getPostByUserID,
    createPost,
    updatePost,
    deletePost
};
  
export default PostService;
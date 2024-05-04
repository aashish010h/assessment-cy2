import Axios from "../utils/Axios";
//all the fucntion to call the api are listed here
export const loginUser = async () => {
    const response = await Axios.get(`auth/login`);
    return response.data;
};

export const getAllPostsFn = async () => {
    const response = await Axios.get(`user/posts`);

    return response.data;
};

export const createPostFn = async (formData) => {
    const response = await Axios.post(`user/posts/store`, formData);
    return response.data;
};

export const getCommentFn = async (id) => {
    if (id) {
        const response = await Axios.get(`user/comments/${id}`);
        return response.data;
    }
};

export const createCommentFn = async (formData) => {
    const response = await Axios.post(
        `user/comments/${formData.postId}`,
        formData
    );
    return response.data;
};

export const updateCommentFn = async (formData) => {
    const response = await Axios.post(`user/comments/update/${formData.id}`, {
        ...formData,
    });
    return response.data;
};

export const deleteCommentFn = async (id) => {
    const response = await Axios.delete(`comment/${id}`);
    return response.data;
};

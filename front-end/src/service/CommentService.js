import axios from "axios";

export const getCommentsByBookId = async (bookId) => {
  const response = await axios.get(`http://localhost:8888/api/v1/comments/get-all-comments/${bookId}`);
  return response.data.result;
};

export const createComment = async (data) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    console.log(data)
    const response = await axios.post(
      `http://localhost:8888/api/v1/comments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      }
    );
    console.log( response.data.result);
    return response.data.result;
  };
  export const deleteComment = async (commentId) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
  
    const response = await axios.delete(
      `http://localhost:8888/api/v1/comments/delete/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response.data;
  };
  
  
import axios from "axios";

export const getCommentsByBookId = async (bookId) => {
  const response = await axios.get(`http://localhost:8888/api/v1/comments/get-all-comments/${bookId}`);
  return response.data.result;
};

export const createComment = async (data) => {
    const token = localStorage.getItem("access_token"); // Lấy token từ localStorage
    console.log(data)
    const response = await axios.post(
      `http://localhost:8888/api/v1/comments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCb29rIE1pY3Jvc2VydmljZSIsInN1YiI6IjEiLCJleHAiOjE3NDQzNjc5NjAsImlhdCI6MTc0NDI4MTU2MCwianRpIjoiMmFjMjJkNDQtOGViMS00ZDBhLTg2YjItMzg1ODQwNDc2YmVhIiwic2NvcGUiOiJBRE1JTiJ9.uhm_rPiac4shqGWEEhUvXqBzf3PRExHefEhK0TkU7RITcS9cCqTgVNe1uWztRj0CYITzlBw_8f0NjgmdBbqyHA"}`, // Gửi token trong header
        },
      }
    );
    console.log( response.data.result);
    return response.data.result;
  };
  
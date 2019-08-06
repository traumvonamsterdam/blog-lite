import axios from "axios";
import "dotenv/config";

const PORT = process.env.PORT || 4000;

const fetchArticles = () =>
  axios(`http://localhost:${PORT}/api/articles`)
    .then(res => res.data.articles)
    .catch(err => {
      throw err;
    });

const deleteArticle = _id =>
  axios.delete(`http://localhost:${PORT}/api/articles/${_id}`).catch(err => {
    throw err;
  });

const submitArticle = newArticle =>
  axios.post(`http://localhost:${PORT}/api/articles`, newArticle).catch(err => {
    throw err;
  });

const editArticle = (articleToEdit, newArticle) =>
  axios
    .patch(
      `http://localhost:${PORT}/api/articles/${articleToEdit._id}`,
      newArticle
    )
    .catch(err => {
      throw err;
    });

export { fetchArticles, deleteArticle, submitArticle, editArticle };

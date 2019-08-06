import React, { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useGlobalState } from "../GlobalState/StateProvider";
import { Form } from "../../components/Article";

const Home = () => {
  const [{ articles }, dispatch] = useGlobalState();

  useEffect(() => {
    axios("http://localhost:4000/api/articles")
      .then(res =>
        dispatch({ type: "fetchArticles", articles: res.data.articles })
      )
      .catch(err => {
        throw err;
      });
  }, []);

  const handleDelete = id => {
    return axios
      .delete(`http://localhost:4000/api/articles/${id}`)
      .then(() => axios("http://localhost:4000/api/articles"))
      .then(res =>
        dispatch({ type: "fetchArticles", articles: res.data.articles })
      )
      .catch(err => {
        throw err;
      });
  };

  const articleDiv = article => (
    <div key={article._id} className="card my-3">
      <div className="card-header">{article.title}</div>
      <div className="card-body">
        {article.body}
        <p className="mt-5 text-muted">
          <b>{article.author}</b>{" "}
          {moment(new Date(article.createdAt)).fromNow()}
        </p>
      </div>
      <div className="card-footer">
        <div className="row">
          <button className="btn btn-primary mx-3">Edit</button>
          <button
            onClick={() => handleDelete(article._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">LightBlog</h1>
          </div>
          <Form />
        </div>
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            {articles.map(article => articleDiv(article))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

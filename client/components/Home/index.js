import React, { useEffect } from "react";
import moment from "moment";
import { fetchArticles, deleteArticle } from "../helpers/actions";
import { useGlobalState } from "../GlobalState/StateProvider";
import { Form } from "../../components/Article";

const Home = () => {
  const [{ articles, refetch }, dispatch] = useGlobalState();

  useEffect(() => {
    console.log({ refetch });
    if (refetch) {
      fetchArticles().then(articles =>
        dispatch({ type: "updateArticles", articles })
      );
    }
  }, [refetch]);

  const handleEdit = article => {
    dispatch({ type: "setEdit", articleToEdit: article });
  };

  const handleDelete = _id => {
    deleteArticle(_id)
      .then(fetchArticles)
      .then(articles => dispatch({ type: "updateArticles", articles }));
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
          <button
            onClick={() => handleEdit(article)}
            className="btn btn-primary mx-3"
          >
            Edit
          </button>
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
            <h1 className="text-center">BlogLite</h1>
          </div>
          <Form />
        </div>
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            {Array.isArray(articles)
              ? articles.map(article => articleDiv(article))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

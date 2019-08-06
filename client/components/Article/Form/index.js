import React, { useState } from "react";
import axios from "axios";
import { useGlobalState } from "../../GlobalState/StateProvider";

const Form = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const [{ articles }, dispatch] = useGlobalState();

  const handleChangeField = (key, event) => {
    const fields = {
      title: setTitle,
      body: setBody,
      author: setAuthor
    };
    fields[key](event.target.value);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/api/articles", {
        title,
        body,
        author
      })
      .then(res => axios("http://localhost:4000/api/articles"))
      .then(res =>
        dispatch({ type: "fetchArticles", articles: res.data.articles })
      )
      .catch(err => {
        throw err;
      });
  };

  return (
    <div className="col-12 col-lg-6 offset-lg-3">
      <input
        onChange={ev => handleChangeField("title", ev)}
        value={title}
        className="form-control my-3"
        placeholder="Article Title"
      />
      <textarea
        onChange={ev => handleChangeField("body", ev)}
        value={body}
        className="form-control my-3"
        placeholder="Article Body"
      />
      <input
        onChange={ev => handleChangeField("author", ev)}
        value={author}
        className="form-control my-3"
        placeholder="Article Author"
      />
      <button onClick={handleSubmit} className="btn btn-primary float-right">
        Submit
      </button>
    </div>
  );
};

export default Form;

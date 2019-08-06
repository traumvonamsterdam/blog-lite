import React, { useState, useEffect } from "react";
import {
  fetchArticles,
  submitArticle,
  editArticle
} from "../../helpers/actions";
import { useGlobalState } from "../../GlobalState/StateProvider";

const Form = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const emptyFields = () => {
    setTitle("");
    setBody("");
    setAuthor("");
  };

  const [{ articles, articleToEdit }, dispatch] = useGlobalState();

  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title);
      setBody(articleToEdit.body);
      setAuthor(articleToEdit.author);
    } else {
      emptyFields();
    }
  }, [JSON.stringify(articleToEdit)]);

  const handleChangeField = (key, event) => {
    const fields = {
      title: setTitle,
      body: setBody,
      author: setAuthor
    };
    fields[key](event.target.value);
  };

  const handleSubmit = () => {
    const newArticle = { title, body, author };
    if (!articleToEdit) {
      submitArticle(newArticle)
        .then(emptyFields)
        .then(fetchArticles)
        .then(articles => dispatch({ type: "updateArticles", articles }));
    } else {
      editArticle(articleToEdit, newArticle)
        .then(emptyFields)
        .then(fetchArticles)
        .then(articles => dispatch({ type: "updateArticles", articles }));
    }
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
        {articleToEdit ? "Update" : "Submit"}
      </button>
    </div>
  );
};

export default Form;

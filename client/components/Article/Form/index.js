import React, { useState, useEffect } from "react";
import { submitArticle, editArticle } from "../../helpers/actions";
import { useGlobalState } from "../../GlobalState/StateProvider";

const Form = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const [{ articleToEdit, submitting }, dispatch] = useGlobalState();

  const emptyFields = () => {
    setTitle("");
    setBody("");
    setAuthor("");
  };

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

  const handleCancel = () => {
    dispatch({ type: "finishEdit" });
  };

  const handleSubmit = () => {
    const newArticle = { title, body, author };
    if (!articleToEdit) {
      submitArticle(newArticle)
        .then(() => dispatch({ type: "refetchArticles" }))
        .then(() => dispatch({ type: "finishEdit" }));
    } else {
      editArticle(articleToEdit, newArticle)
        .then(() => dispatch({ type: "refetchArticles" }))
        .then(() => dispatch({ type: "finishEdit" }));
    }
  };

  return (
    <div className="col-12 col-lg-6 offset-lg-3">
      {submitting || articleToEdit ? (
        <>
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
          <button
            onClick={handleSubmit}
            className="btn btn-primary float-right"
          >
            {articleToEdit ? "Update" : "Submit"}
          </button>
          <button
            onClick={handleCancel}
            className="btn btn-default float-right"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => dispatch({ type: "submitStatus", submitting: true })}
          className="btn btn-primary float-right"
          style={{ float: "center" }}
        >
          New Article
        </button>
      )}
    </div>
  );
};

export default Form;

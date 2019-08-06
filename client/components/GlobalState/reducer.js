export default (state, action) => {
  const { type } = action;
  const reducerObj = {
    updateArticles: () => ({ ...state, articles: action.articles }),
    setEdit: () => ({ ...state, articleToEdit: action.articleToEdit }),
    finishEdit: () => ({ ...state, articleToEdit: null })
  };

  if (type in reducerObj) {
    return reducerObj[type]();
  } else {
    return state;
  }
};

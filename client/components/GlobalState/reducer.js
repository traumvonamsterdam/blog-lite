export default (state, action) => {
  const { type } = action;
  const reducerObj = {
    fetchArticles: { ...state, articles: action.articles },
    addArticle: { ...state, articles: [...state.articles, action.newArticle] }
  };

  if (type in reducerObj) {
    return reducerObj[type];
  } else {
    return state;
  }
};

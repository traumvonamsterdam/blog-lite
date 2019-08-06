export default (state, action) => {
  const reducerObj = {
    updateArticles: () => ({
      ...state,
      articles: action.articles,
      refetch: false
    }),
    refetchArticles: () => ({ ...state, refetch: true }),
    setEdit: () => ({ ...state, articleToEdit: action.articleToEdit }),
    finishEdit: () => ({ ...state, articleToEdit: null, submitting: false }),
    submitStatus: () => ({ ...state, submitting: action.submitting })
  };

  const { type } = action;
  if (type in reducerObj) {
    return reducerObj[type]();
  } else {
    return state;
  }
};

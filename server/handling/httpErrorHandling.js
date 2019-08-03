export default (app, isProduction) => {
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  if (!isProduction) {
    app.use((err, req, res) => {
      res.status(err.status || 500);

      res.json({
        errors: {
          message: err.message,
          error: err
        }
      });
    });
  }

  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: {}
      }
    });
  });
};

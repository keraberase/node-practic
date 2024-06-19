export const errorHandler = (err, req, res) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};

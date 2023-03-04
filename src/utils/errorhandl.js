export const handleerror = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      return next(new Error(err.message, { cause: 500 }));
    });
  };
};
export const global_error = (err, req, res, next) => {
  if (err) {
    return res.status(err.cause || 500).json({ message: err.message });
  }
  return res.json({ message: "error" });
};

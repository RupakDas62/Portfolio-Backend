export const verifyAdmin = (req, res, next) => {
  const isAdmin = req.headers["x-admin"];

  if (isAdmin === "true") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

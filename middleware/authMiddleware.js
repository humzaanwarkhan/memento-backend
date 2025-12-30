import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(401).json({ msg: "Token invalid" });
  }
};

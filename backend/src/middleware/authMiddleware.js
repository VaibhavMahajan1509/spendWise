import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // ✅ FIX

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // ✅ better than userId only

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
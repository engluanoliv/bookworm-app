import jwt from "jsonwebtoken";
import User from "../models/User.js";

// example of authentication been passed in the header of the request
// const response = await fetch(`http://localhost:3000/api/books`, {
//     method: 'POST',
//     body: JSON.stringify({
//         title,
//         caption
//     }),
//     headers: {Authorization: `Bearer ${token}`}
// })

const protectRoute = async (req, res, next) => {
  try {
    //get the token
    const { token } = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res
        .status(401)
        .json({ message: "No athentication token, access denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "Token is not valid" });

    req.user = user;
    next();
  } catch (error) {
    console.log("Authentication error: ", error.message);
    res.status(401).json({ message: "Token is no valid" });
  }
};

export default protectRoute;

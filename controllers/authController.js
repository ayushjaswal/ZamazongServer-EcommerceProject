import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import user from "../models/User.js";

export const getLogin = (req, res) => {
  try {
    // console.log(req.cookies.token)
    if (req.cookies?.token) {
      const values = jwtDecode(req.cookies.token);
      return res.json(values);
    } else {
      return res.json(null);
    }
  } catch (err) {
    return res.json(err);
  }
};
export const login = async (req, res) => {
  try {
    const { token } = req.body;
    if (req.cookies?.token) {
      const values = jwtDecode(req.cookies.token);
      return res.json(values);
    }
    if (token) {
      const decodedToken = jwtDecode(token);
      const values = {
        email: decodedToken.email,
        name: decodedToken.name,
        profile: decodedToken.picture,
      };
      const createUser = await user.create(values);
      if (createUser) {
        var loginToken = jwt.sign(values, process.env.JWT_SECRET, {});
        res.cookie("token", loginToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        });
        return res.status(201).json(values);
      } else {
        return res.status(401).json(false);
      }
    }
  } catch (err) {
    return res.status(501).json(err);
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    console.log(req)
    if(!req.cookies?.token){
      return res.status(201).json(true);
    }
    else{
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
  }
};

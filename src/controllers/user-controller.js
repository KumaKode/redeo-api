const { StatusCodes } = require("http-status-codes");
const { UserService, OTPService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { ServerConfig } = require("../config");
const axios = require("axios");

async function socialSiginin(req, res) {
  try {
    const profile = await getLinkedinProfile(req.body.code);
    if (!profile.error) {
      profile.socialLogin = "Linkedin";
    }

    const response = await UserService.signin({
      sub: profile.error ? req.body.sub : profile.sub,
      fullName: profile.given_name || req.body.given_name,
      email: profile.email || req.body.email,
      socialLogin: profile.socialLogin || "Google",
      profilePicture: profile.picture || req.body.picture,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function signup(req, res) {
  try {
    const user = await UserService.signup({
      fullName: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function signin(req, res) {
  try {
    const response = await UserService.signin({
      email: req.body.email,
      password: req.body.password,
    });

    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getLinkedinProfile(code) {
  try {
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.NODE_ENV
          ? process.env.PROD_LINKEDIN_CALL_BACK_URI
          : ServerConfig.LINKEDIN_CALL_BACK_URL,
        client_id: process.env.LINKEDIN_KEY,
        client_secret: process.env.LINKEDIN_SECRET,
        scope: "profile email openid",
      })
    );
    const access_token = response.data.access_token;
    const url = "https://api.linkedin.com/v2/userinfo";

    const userprofile = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return userprofile.data;
  } catch (error) {
    //console.log(error);
    return error.response.data;
  }
}

async function updateUser(req, res) {
  try {
    const user = await UserService.updateUser(req.body.id, req.body.data);
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function verifyEmail(req, res) {
  try {
    const user = await UserService.verifyEmail({
      id: req.user.id,
      otp: req.body.otp,
    });
    SuccessResponse.data = user;
    SuccessResponse.message = "Email verified successfully!";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function resendOTP(req, res) {
  try {
    const otp = await OTPService.resendOTP({
      userId: req.user.id,
      name: req.body.name,
      email: req.body.email,
    });
    SuccessResponse.data = otp;
    SuccessResponse.message = "Email resent successfully!";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  socialSiginin,
  signup,
  signin,
  updateUser,
  verifyEmail,
  resendOTP,
};
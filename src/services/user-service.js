const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const { otpGen } = require("otp-gen-agent");

const { UserRepository, TypeRepository } = require("../repositories");

const AppError = require("../utils/errors/app-error");
const { Auth } = require("../utils/common");
const otpService = require("./otp-service");
const { createTemplate } = require("../utils/helpers/email-template");
const { ServerConfig } = require("../config");

const userRepository = new UserRepository();
const typeRepository = new TypeRepository();

async function signup(data) {
  try {
    let user = await userRepository.getUserByEmail(data.email);

    if (user) {
      if (user.emailVerified) {
        throw new AppError(
          "User with this email already exists",
          { explanation: "" },
          StatusCodes.CONFLICT
        );
      }
      await otpService.resendOTP({
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
      });
      const jwt = Auth.createToken({ id: user.id, email: user.email });
      return jwt;
    }

    if (data.socialLogin === "Linkedin" || data.socialLogin === "Google") {
      user = await userRepository.create({
        fullName: data.fullName,
        email: data.email,
        password: bcrypt.hashSync(data.sub, +ServerConfig.SALT_ROUNDS),
        emailVerified: true,
        socialLogin: data.socialLogin,
        profilePicture: data.profilePicture,
      });
      return user;
    } else {
      user = await userRepository.create(data);
    }

    const type = await typeRepository.getTypeByName("jobSeeker");
    user.addType(type);

    const otp = await otpService.createOTP({
      userId: user.id,
      otp: await otpGen(),
    });

    const template = createTemplate({ name: user.name, otp: otp.otp });

    await otpService.sendOTP({
      email: user.email,
      template: template,
    });

    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Cannot create new user",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function addTypeToUser(id, type) {
  try {
    const user = await userRepository.get(id);
    if (!user) {
      throw new AppError(
        "The requested user not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    const type = await typeRepository.getTypeByName("jobSeeker");
    if (!type) {
      throw new AppError(
        "The requested user type not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    user.addType(type);
    return user;
  } catch (error) {
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signin(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);

    if (!user) {
      if (data.sub === undefined) {
        throw new AppError(
          "Invalid Email or Password",
          { explanation: "" },
          StatusCodes.NOT_FOUND
        );
      }
      const newUser = await signup(data);
      const jwt = Auth.createToken({ id: newUser.id, email: newUser.email });
      return jwt;
    }

    if (data.sub !== undefined) {
      await user.update({
        name: data.name,
        profilePicture: data.profilePicture,
        socialLogin: data.socialLogin,
      });
      const jwt = Auth.createToken({ id: user.id, email: user.email });
      return jwt;
    }

    const password = Auth.matchPassword(data.password, user.password);
    if (!password) {
      throw new AppError(
        "Invalid Email or Password",
        { explanation: "" },
        StatusCodes.BAD_REQUEST
      );
    }

    await user.update({ socialLogin: "Local" });

    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getUser(id) {
  try {
    const user = await userRepository.get(id);
    return user;
  } catch (error) {
    console.log(error);
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError("The requested user not found", error.StatusCode);
    }
  }
}

async function updateUser(id, data) {
  try {
    const user = await userRepository.update(id, data);
    return user;
  } catch (error) {
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError("The requested user not found", error.StatusCode);
    }
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// async function isAuthenticated(token) {
//   try {
//     if (!token) {
//       throw new AppError("No JWT token found", StatusCodes.BAD_REQUEST);
//     }
//     const response = Auth.verifyToken(token);
//     console.log(response);
//     const user = await userRepository.get(response.id);
//     if (!user) {
//       throw new AppError("No user found", StatusCodes.BAD_REQUEST);
//     }
//     return user.id;
//   } catch (error) {
//     console.log(error);
//     if (error instanceof AppError) throw error;
//     if (error.name === "JsonWebTokenError") {
//       throw new AppError("Invalid JWT Token", StatusCodes.BAD_REQUEST);
//     }
//     if (error.name === "TokenExpiredError") {
//       throw new AppError("JWT Token Expired", StatusCodes.BAD_REQUEST);
//     }
//     throw new AppError(
//       "Something went wrong",
//       StatusCodes.INTERNAL_SERVER_ERROR
//     );
//   }
// }

async function isAdmin(id) {
  try {
    const user = await userRepository.get(id);

    if (!user) {
      throw new AppError(
        "No user found for the given id",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    const admin = await typeRepository.getTypeByName("admin");

    if (!admin) {
      throw new AppError(
        "No user found for the given role",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return user.hasRole(admin);
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isEmployer(id) {
  try {
    const user = await userRepository.get(id);

    if (!user) {
      throw new AppError(
        "No user found for the given id",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    const employer = await typeRepository.getTypeByName("employer");

    if (!employer) {
      throw new AppError(
        "No user found for the given roles",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    const admin = await isAdmin(id);
    const emp = await user.hasRole(employer);

    return [admin, emp];
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function verifyEmail(data) {
  try {
    const user = await userRepository.get(data.id);
    if (!user) {
      throw new AppError(
        "The requested user not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }
    const otp = await otpService.getOTP(data.otp);
    if (!otp) {
      throw new AppError(
        "The requested user not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    const createdTime = new Date(otp.createdAt);
    const currentTime = new Date();

    if (currentTime - createdTime > 600000) {
      //10 mintues
      throw new AppError(
        "OTP Expired!",
        { explanation: "" },
        StatusCodes.BAD_REQUEST
      );
    }

    await user.update({ emailVerified: true });
    return user;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  signup,
  signin,
  getUser,
  updateUser,
  // isAuthenticated,
  isAdmin,
  isEmployer,
  verifyEmail,
};

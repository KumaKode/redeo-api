const { StatusCodes } = require("http-status-codes");
const { otpGen } = require("otp-gen-agent");
const { OTPRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { EmailConfig, ServerConfig } = require("../config");
const { createTemplate } = require("../utils/helpers/email-template");

const otpRepository = new OTPRepository();

async function createOTP(data) {
  try {
    const otp = await otpRepository.create(data);
    return otp;
  } catch (error) {
    throw new AppError(
      "Cannot Create a new otp Object!",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getOTP(otp) {
  try {
    const response = await otpRepository.getOTP(otp);
    if (!response) {
      throw new AppError(
        "Invalid OTP!",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyOTP(id) {
  try {
    const response = await otpRepository.destroy(id);
    return response;
  } catch (error) {
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError(
        "The requested otp not found",
        { explanation: "" },
        error.StatusCode
      );
    }
    throw new AppError(
      "Something went wromg!",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function sendOTP(data) {
  try {
    const response = await EmailConfig.transporter.sendMail({
      from: ServerConfig.GMAIL,
      to: data.email,
      subject: "Email Verification",
      html: data.template,
    });

    return response;
  } catch (error) {
    throw new AppError(
      "Cannot send OTP",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function resendOTP(data) {
  try {
    let otp = await otpRepository.getOTPByUserId(data.userId);
    if (!otp) {
      otp = await createOTP({ userId: data.userId, otp: await otpGen() });
    }
    await otp.update({ otp: await otpGen() });
    const template = createTemplate({ name: data.name, otp: otp.otp });
    const newOTP = await sendOTP({
      email: data.email,
      template: template,
    });

    return newOTP;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Cannot resend OTP",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteOldOTPs() {
  try {
    const time = new Date(Date.now() - 600000); // time 10 mins ago
    const response = await otpRepository.deleteOldOTPs(time);

    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createOTP,
  getOTP,
  destroyOTP,
  sendOTP,
  resendOTP,
  deleteOldOTPs,
};

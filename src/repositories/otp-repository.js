const CrudRepository = require("./crud-repository");
const { OTP } = require("../models");
const { Op } = require("sequelize");

class OTPRepository extends CrudRepository {
  constructor() {
    super(OTP);
  }

  async getOTP(otp) {
    const response = await OTP.findOne({ where: { otp: otp } });
    return response;
  }

  async getOTPByUserId(userId) {
    const response = await OTP.findOne({ where: { userId: userId } });
    return response;
  }

  async deleteOldOTPs(time) {
    const response = await OTP.destroy({
      where: { createdAt: { [Op.lt]: time } },
    });
    return response;
  }
}

module.exports = OTPRepository;

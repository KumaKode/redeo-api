const cron = require("node-cron");

const { OTPService } = require("../../services");

function scheduleCrons() {
  cron.schedule("*/10 * * * *", async () => {
    await OTPService.deleteOldOTPs();
  });
}

module.exports = scheduleCrons;

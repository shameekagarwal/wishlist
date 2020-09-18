const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("../emails/emailOptions");

const resetPassword = async (req, res) => {
  try {
    const passresetlink = req.params.link;
    const user = await User.findOne({ passresetlink });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Not requested for password" });
    }
    const elapsed = Date.now() - user.passresettime;
    if (elapsed > 3600000) {
      return res.status(500).json({ success: false, error: "Expired link" });
    }
    const { newpassword } = req.body;
    user.password = newpassword;
    await user.save();
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: "Error reseting password" });
  }
};

const resetShareableLink = async (req, res) => {
  try {
    const { user } = req.body;
    user.shareablelink = user._id + crypto.randomBytes(20).toString("hex");
    await user.save();
    res.json({ success: true });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, error: "Error reseting shareablelink" });
  }
};

const resetPasswordLink = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect username" });
    }
    user.passresetlink = user._id + crypto.randomBytes(20).toString("hex");
    user.passresettime = Date.now();
    await user.save();
    await sendEmail(
      email,
      "Reset Password",
      `
	  <!DOCTYPE html>
	  <html>
	  
		  <div>
			  <div style="background-color: #5d2299;color: white; margin: 5px; padding: 5px; font-family: Arial; text-align: center;">
				  <h1 style=>oursitename</h1>
				  <hr />
				  <h3>
					  We believe you requested for a password change.<br />
					  <b><a style="color: white; text-decoration: none" href=sitekanaam/${user.passresetlink} >Click here</a></b> to
					  reset your password.
				  </h3>
				  <i><p>If it wasn't you, please ignore the message above.</p></i>
			  </div>
		  </div>
	  </html>

	  `
    );
    res.json({ success: true });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, error: "Error reseting passwordlink" });
  }
};

module.exports = { resetPassword, resetPasswordLink, resetShareableLink };
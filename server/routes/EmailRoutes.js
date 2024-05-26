const express = require("express");
const router = express.Router();
const { Resend } = require("resend");
const { RESEND_RENTIFY_API_KEY } = process.env;

/**
 * @description API endpoint to send email to seller/buyer accordingly
 */
router.post("/send", async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const resend = new Resend(RESEND_RENTIFY_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Roomrent <onboarding@resend.dev>",
      to,
      subject,
      html: body,
    });

    if (error) {
      throw new Error(error);
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error("Error sending email:", err);
    res
      .status(500)
      .json({ message: "Error sending email", error: err.message });
  }
});

module.exports = router;

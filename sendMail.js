import nodeMailer from "nodemailer";

export const sendMail = async (email, name, givesTo) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "franskoder@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const giftList = givesTo.join(", ");
  const currentYear = new Date().getFullYear();

  const options = {
    from: "franskoder@gmail.com",
    to: email,
    subject: `🎄 Gaveutveksling ${currentYear}`,
    text: `Hei ${name}! Du skal gi gaver til: ${giftList}`,
    html: `
      <h2>🎄 Gaveutveksling ${currentYear}</h2>
      <p>Hei ${name}!</p>
      <p>I år skal du gi gaver til:</p>
      <ul>
        ${givesTo
          .map((person) => `<li><strong>${person}</strong></li>`)
          .join("")}
      </ul>
      <p>God juleshopping! 🎁</p>
    `,
  };

  try {
    await transporter.sendMail(options);
    console.log(`✓ Email sent to ${name} (${email})`);
    return "OK";
  } catch (err) {
    console.error(`✗ Failed to send email to ${name}:`, err.message);
    throw err;
  }
};

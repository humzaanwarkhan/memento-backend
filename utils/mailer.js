import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetEmail = async (to, link) => {
  await resend.emails.send({
    from: "Memento <onboarding@resend.dev>",
    to,
    subject: "Reset your Memento password",
    html: `
      <h2>Password Reset</h2>
      <p>Click below to reset your password:</p>
      <a href="${link}">${link}</a>
    `,
  });
};

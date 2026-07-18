import { escapeHtml, formatSubmissionTime } from "@/utils/email";

export type ContactNotificationEmailProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt?: Date;
};

/**
 * Professional HTML email for new portfolio contact submissions.
 */
export function renderContactNotificationEmail({
  name,
  email,
  subject,
  message,
  submittedAt = new Date(),
}: ContactNotificationEmailProps): { subject: string; html: string; text: string } {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const submitted = escapeHtml(formatSubmissionTime(submittedAt));

  const emailSubject = "New Portfolio Contact Request";

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${emailSubject}</title>
  </head>
  <body style="margin:0;padding:0;background:#0b1220;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#e8eef8;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b1220;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111a2b;border:1px solid #1e2a40;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 12px 28px;background:linear-gradient(135deg,#0f766e 0%,#0284c7 100%);">
                <p style="margin:0 0 6px 0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.85);">
                  Portfolio Contact
                </p>
                <h1 style="margin:0;font-size:22px;line-height:1.3;font-weight:700;color:#ffffff;">
                  New message received
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:#b8c4d8;">
                  Someone submitted the contact form on your portfolio.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #1e2a40;">
                      <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7f8ea3;">Sender Name</p>
                      <p style="margin:0;font-size:15px;font-weight:600;color:#e8eef8;">${safeName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #1e2a40;">
                      <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7f8ea3;">Sender Email</p>
                      <p style="margin:0;font-size:15px;font-weight:600;">
                        <a href="mailto:${safeEmail}" style="color:#38bdf8;text-decoration:none;">${safeEmail}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #1e2a40;">
                      <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7f8ea3;">Subject</p>
                      <p style="margin:0;font-size:15px;font-weight:600;color:#e8eef8;">${safeSubject}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #1e2a40;">
                      <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7f8ea3;">Submission Time</p>
                      <p style="margin:0;font-size:15px;color:#e8eef8;">${submitted}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 0 0 0;">
                      <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7f8ea3;">Message</p>
                      <div style="padding:16px;border-radius:12px;background:#0b1220;border:1px solid #1e2a40;font-size:14px;line-height:1.7;color:#d5deec;">
                        ${safeMessage}
                      </div>
                    </td>
                  </tr>
                </table>

                <p style="margin:24px 0 0 0;font-size:12px;line-height:1.5;color:#7f8ea3;">
                  Reply directly to this email to respond to ${safeName}.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    emailSubject,
    "",
    `Sender Name: ${name}`,
    `Sender Email: ${email}`,
    `Subject: ${subject}`,
    `Submission Time: ${formatSubmissionTime(submittedAt)}`,
    "",
    "Message:",
    message,
  ].join("\n");

  return { subject: emailSubject, html, text };
}

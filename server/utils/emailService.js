const nodemailer = require('nodemailer');

const toBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return false;
};

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: toBoolean(process.env.SMTP_SECURE),
    auth: {
      user,
      pass,
    },
  });
};

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const sendContactNotificationEmail = async ({ name, email, subject, message, createdAt }) => {
  const transporter = getTransporter();

  if (!transporter) {
    return { sent: false, reason: 'SMTP_NOT_CONFIGURED' };
  }

  const recipient = process.env.CONTACT_NOTIFY_EMAIL || 'srabonahmed2002@gmail.com';
  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;
  const subjectLine = `New portfolio message from ${name}`;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || 'No subject');
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');
  const submittedAt = createdAt ? new Date(createdAt).toISOString() : new Date().toISOString();

  await transporter.sendMail({
    from: `Portfolio Contact <${fromAddress}>`,
    to: recipient,
    replyTo: email,
    subject: subjectLine,
    text: [
      'You received a new portfolio contact message:',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject || 'No subject'}`,
      `Submitted At: ${submittedAt}`,
      '',
      message,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #0f172a;">
        <h2 style="margin: 0 0 12px;">New Portfolio Contact Message</h2>
        <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
        <p style="margin: 0 0 8px;"><strong>Subject:</strong> ${safeSubject}</p>
        <p style="margin: 0 0 8px;"><strong>Submitted At:</strong> ${escapeHtml(submittedAt)}</p>
        <hr style="margin: 14px 0; border: none; border-top: 1px solid #e2e8f0;" />
        <p style="margin: 0;"><strong>Message:</strong></p>
        <p style="margin: 8px 0 0; white-space: pre-wrap;">${safeMessage}</p>
      </div>
    `,
  });

  return { sent: true };
};

module.exports = {
  sendContactNotificationEmail,
};

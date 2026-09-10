// api/contact.js
//
// Vercel Serverless Function (Node.js runtime).
// Receives the contact form submission, validates it server-side
// (never trust client-side validation alone), and sends the enquiry
// by email via the Resend API (https://resend.com).
//
// Only ONE environment variable is required to make this live:
//
//   RESEND_API_KEY     Your Resend API key (starts with "re_").
//                       Set in Vercel -> Project -> Settings ->
//                       Environment Variables -- NEVER commit this
//                       to the repo.
//
// Two more are optional, with working defaults baked in:
//
//   CONTACT_TO_EMAIL    Defaults to mahendran.cbe90@gmail.com.
//                       Only set this if you ever want enquiries
//                       delivered somewhere else.
//   CONTACT_FROM_EMAIL  Defaults to "onboarding@resend.dev" (Resend's
//                       shared test domain, which works immediately).
//                       Once you verify your own domain in Resend,
//                       set this to an address on it for a fully
//                       branded "from" address.
//
// No npm package is required: this calls Resend's HTTP API directly
// with fetch, which is available natively in Vercel's Node runtime.

export const config = {
  api: {
    bodyParser: true,
  },
};

const DEFAULT_TO_EMAIL = 'mahendran.cbe90@gmail.com';
const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  // This endpoint is only ever called from the site's own contact page
  // via a relative fetch('/api/contact') -- same-origin, so no CORS
  // headers are required for normal operation. We still guard the
  // method explicitly.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Missing required environment variable: RESEND_API_KEY');
    return res.status(500).json({ ok: false, message: 'Something went wrong. Please try again.' });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;

  const body = req.body || {};
  const {
    name = '',
    email = '',
    company = '',
    projectType = '',
    budget = '',
    message = '',
    website = '', // honeypot field -- real users never fill this in
  } = body;

  // ---- Honeypot spam check ----
  // The form includes a hidden field named "website" that's invisible
  // and untouched by real visitors. Bots that blindly fill every field
  // will populate it. Respond as if successful (don't tip off the bot)
  // but skip actually sending the email.
  if (website && String(website).trim() !== '') {
    return res.status(200).json({ ok: true, message: 'Thank you! Your enquiry has been submitted successfully.' });
  }

  // ---- Server-side validation (mirrors the client-side rules) ----
  const errors = [];
  const trimmedName = String(name).trim();
  const trimmedEmail = String(email).trim();
  const trimmedMessage = String(message).trim();
  const trimmedProjectType = String(projectType).trim();

  if (trimmedName.length < 2) errors.push('Name must be at least 2 characters.');
  if (!isValidEmail(trimmedEmail)) errors.push('A valid email address is required.');
  if (!trimmedProjectType) errors.push('Project type is required.');
  if (trimmedMessage.length < 10) errors.push('Project details must be at least 10 characters.');

  if (errors.length) {
    return res.status(400).json({ ok: false, message: 'Something went wrong. Please try again.', errors });
  }

  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });
  const websiteUrl = `https://${req.headers.host || 'mahendran-portfolio.vercel.app'}`;
  const trimmedCompany = String(company).trim() || 'Not provided';
  const trimmedBudget = String(budget).trim() || 'Not specified';

  const subject = `New Project Enquiry – ${trimmedProjectType}`;

  const textBody = [
    'New Website Project Enquiry',
    '',
    'Name:',
    trimmedName,
    '',
    'Email:',
    trimmedEmail,
    '',
    'Company:',
    trimmedCompany,
    '',
    'Project Type:',
    trimmedProjectType,
    '',
    'Budget Range:',
    trimmedBudget,
    '',
    'Project Details:',
    trimmedMessage,
    '',
    'Submitted Date & Time:',
    submittedAt,
    '',
    'Website:',
    websiteUrl,
  ].join('\n');

  const htmlBody = `
    <div style="font-family:sans-serif; font-size:15px; line-height:1.6; color:#111;">
      <h2 style="margin:0 0 16px;">New Website Project Enquiry</h2>
      <p><strong>Name:</strong><br>${escapeHtml(trimmedName)}</p>
      <p><strong>Email:</strong><br>${escapeHtml(trimmedEmail)}</p>
      <p><strong>Company:</strong><br>${escapeHtml(trimmedCompany)}</p>
      <p><strong>Project Type:</strong><br>${escapeHtml(trimmedProjectType)}</p>
      <p><strong>Budget Range:</strong><br>${escapeHtml(trimmedBudget)}</p>
      <p><strong>Project Details:</strong><br>${escapeHtml(trimmedMessage).replace(/\n/g, '<br>')}</p>
      <p><strong>Submitted Date &amp; Time:</strong><br>${escapeHtml(submittedAt)}</p>
      <p><strong>Website:</strong><br>${escapeHtml(websiteUrl)}</p>
    </div>
  `;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: trimmedEmail,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text().catch(() => '');
      console.error('Resend API error:', resendResponse.status, errText);
      return res.status(502).json({ ok: false, message: 'Something went wrong. Please try again.' });
    }

    return res.status(200).json({ ok: true, message: 'Thank you! Your enquiry has been submitted successfully.' });
  } catch (err) {
    console.error('Contact form send failed:', err);
    return res.status(500).json({ ok: false, message: 'Something went wrong. Please try again.' });
  }
}

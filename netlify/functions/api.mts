import nodemailer from 'nodemailer';

declare const Netlify: {
  env: {
    get(key: string): string | undefined;
  };
};

interface CommissionRequest {
  name: string;
  email: string;
  type: string;
  message: string;
}

function getEnv(key: string): string | undefined {
  if (typeof Netlify !== 'undefined' && Netlify?.env?.get) {
    return Netlify.env.get(key);
  }
  return process.env[key];
}

async function createTransporter() {
  const smtpUser = getEnv('SMTP_USER');
  const smtpPass = getEnv('SMTP_PASS');

  if (smtpUser && smtpPass) {
    return nodemailer.createTransport({
      host: getEnv('SMTP_HOST') || 'smtp.gmail.com',
      port: Number(getEnv('SMTP_PORT')) || 587,
      secure: getEnv('SMTP_SECURE') === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export default async (req: Request) => {
  const url = new URL(req.url);

  // GET /api/health
  if (req.method === 'GET' && url.pathname.endsWith('/health')) {
    return Response.json({
      status: 'ok',
      service: 'ShyRe Creations Mailer API (Netlify Functions)',
    });
  }

  // POST /api/commission
  if (req.method === 'POST' && url.pathname.endsWith('/commission')) {
    try {
      const { name, email, type, message } = (await req.json()) as CommissionRequest;

      if (!name || !email || !type || !message) {
        return Response.json(
          {
            success: false,
            error: 'Missing required fields: name, email, type, or message.',
          },
          { status: 400 },
        );
      }

      const transporter = await createTransporter();
      const recipientEmail = getEnv('COMMISSION_RECEIVER_EMAIL') || 'sureshforuin@gmail.com';

      const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #FAF8F5; border: 1px solid #E8E8E5; border-radius: 12px; overflow: hidden; color: #171717;">
          <div style="background: #171717; padding: 28px 24px; text-align: center;">
            <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; letter-spacing: 1px; font-weight: 600;">ShyRe Creations</h1>
            <p style="margin: 6px 0 0; color: #C23363; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">New Atelier Commission Inquiry</p>
          </div>
          
          <div style="padding: 32px 28px; background: #FFFFFF;">
            <h2 style="font-size: 18px; margin-top: 0; color: #171717; border-bottom: 2px solid #FAF8F5; padding-bottom: 12px;">Client Commission Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #706B64; width: 140px; font-size: 14px;">Client Name:</td>
                <td style="padding: 10px 0; color: #171717; font-size: 15px; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #706B64; font-size: 14px;">Client Email:</td>
                <td style="padding: 10px 0; color: #C23363; font-size: 15px; font-weight: 500;"><a href="mailto:${email}" style="color: #C23363; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #706B64; font-size: 14px;">Occasion / Type:</td>
                <td style="padding: 10px 0; color: #171717; font-size: 15px; font-weight: 600;">
                  <span style="background: #FAF8F5; border: 1px solid #E8E8E5; padding: 4px 10px; border-radius: 999px; display: inline-block;">${type}</span>
                </td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 18px; background: #FAF8F5; border-left: 4px solid #C23363; border-radius: 6px;">
              <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #706B64;">Client's Vision & Timeline:</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #171717; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 32px; text-align: center;">
              <a href="mailto:${email}?subject=Regarding Your Commission with ShyRe Creations" style="display: inline-block; background: #171717; color: #FFFFFF; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-size: 14px; font-weight: 600;">Reply to ${name}</a>
            </div>
          </div>

          <div style="background: #FAF8F5; padding: 18px; text-align: center; border-top: 1px solid #E8E8E5; font-size: 12px; color: #706B64;">
            ShyRe Creations • Crafted with love, preserved forever.
          </div>
        </div>
      `;

      const info = await transporter.sendMail({
        from: `"ShyRe Atelier" <${getEnv('SMTP_USER') || 'no-reply@shyrecreations.com'}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `[New Commission] ${type} - ${name}`,
        text: `New Commission Request from ${name} (${email})\nOccasion: ${type}\n\nVision:\n${message}`,
        html: htmlContent,
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);

      return Response.json({
        success: true,
        message: 'Inquiry received and email dispatched successfully!',
        messageId: info.messageId,
        previewUrl: previewUrl || null,
      });
    } catch (error: any) {
      console.error('❌ Error sending commission email:', error);
      return Response.json(
        {
          success: false,
          error: 'Failed to process inquiry and dispatch email.',
          details: error.message,
        },
        { status: 500 },
      );
    }
  }

  return Response.json({ error: 'Not Found' }, { status: 404 });
};

export const config = {
  path: ['/api/health', '/api/commission'],
};


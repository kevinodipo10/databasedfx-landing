import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Send email via Resend
    // NOTE: Free Resend accounts using 'onboarding@resend.dev' can only send to 
    // the registered account owner (kevinodipo25@gmail.com).
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['kevinodipo25@gmail.com'],
      subject: `🔥 NEW APPLICATION: ${data.name || 'Applicant'} (${data.tier || 'Mentorship'})`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #05070B; color: #ffffff; padding: 25px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #00F2FE;">
          <h2 style="color: #00F2FE; border-bottom: 2px solid #00F2FE; padding-bottom: 8px; margin-top: 0;">🔥 New Mentorship Application Received</h2>
          
          <p style="font-size: 16px;"><strong>Selected Mentorship Tier:</strong> <span style="color: #FFD700; font-weight: bold;">${data.tier}</span></p>
          
          <h3 style="color: #00F2FE; margin-top: 25px; border-bottom: 1px solid #333; padding-bottom: 5px;">👤 Applicant Contact Information</h3>
          <ul style="line-height: 2; font-size: 14px; list-style: none; padding-left: 0;">
            <li><strong>Full Name:</strong> ${data.name}</li>
            <li><strong>WhatsApp Number:</strong> <a href="https://wa.me/${(data.phone || '').replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none; font-weight: bold;">${data.phone} (Click to Chat)</a></li>
            <li><strong>Email Address:</strong> ${data.email}</li>
            <li><strong>Preferred Call Date:</strong> <span style="color: #00F2FE; font-weight: bold;">${data.date}</span></li>
          </ul>

          <h3 style="color: #00F2FE; margin-top: 25px; border-bottom: 1px solid #333; padding-bottom: 5px;">📊 Questionnaire Responses</h3>
          <table style="width: 100%; text-align: left; border-collapse: collapse; margin-top: 10px; font-size: 13px;">
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 10px 4px; font-weight: bold; color: #94a3b8; width: 40%;">1. Employment:</td>
              <td style="padding: 10px 4px; color: #fff;">${data.step1}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 10px 4px; font-weight: bold; color: #94a3b8;">2. Experience Level:</td>
              <td style="padding: 10px 4px; color: #fff;">${data.step2}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 10px 4px; font-weight: bold; color: #94a3b8;">3. Trading Goal:</td>
              <td style="padding: 10px 4px; color: #fff;">${data.step3}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 10px 4px; font-weight: bold; color: #94a3b8;">4. Income Needed:</td>
              <td style="padding: 10px 4px; color: #fff;">${data.step4}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 10px 4px; font-weight: bold; color: #94a3b8;">5. Biggest Struggle:</td>
              <td style="padding: 10px 4px; color: #fff;">${data.step5}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 10px 4px; font-weight: bold; color: #94a3b8;">6. Trading Capital:</td>
              <td style="padding: 10px 4px; color: #fff;">${data.step6}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 10px 4px; font-weight: bold; color: #94a3b8;">7. Mentorship Choice:</td>
              <td style="padding: 10px 4px; color: #fff;">${data.step7}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 10px 4px; font-weight: bold; color: #94a3b8;">7b. Specific Amount (USD):</td>
              <td style="padding: 10px 4px; color: #00F2FE; font-weight: bold; font-size: 15px;">${data.specificAmount}</td>
            </tr>
          </table>

          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #333; text-align: center; font-size: 11px; color: #64748b;">
            Data-Based FX Systematic Lead System • ${new Date().toLocaleString()}
          </div>
        </div>
      `
    });

    if (emailResult.error) {
      console.error('Resend Error:', emailResult.error);
      return res.status(400).json({ success: false, error: emailResult.error.message });
    }

    return res.status(200).json({ success: true, id: emailResult.data?.id });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

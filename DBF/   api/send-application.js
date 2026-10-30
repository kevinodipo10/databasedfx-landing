import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['kevinodipo25@gmail.com', 'kevinodipo27@gmail.com'],
      subject: `🔥 NEW APPLICATION: ${data.name} (${data.tier})`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #05070B; color: #ffffff; padding: 25px; border-radius: 12px;">
          <h2 style="color: #00F2FE; border-bottom: 2px solid #00F2FE; padding-bottom: 8px;">🔥 New 1-on-1 Mentorship Application</h2>
          
          <p><strong>Selected Tier:</strong> <span style="color: #FFD700; font-weight: bold;">${data.tier}</span></p>
          
          <h3 style="color: #00F2FE; margin-top: 20px;">Contact Details</h3>
          <ul style="line-height: 1.8;">
            <li><strong>Full Name:</strong> ${data.name}</li>
            <li><strong>WhatsApp Number:</strong> ${data.phone}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Preferred Call Date:</strong> ${data.date}</li>
          </ul>

          <h3 style="color: #00F2FE; margin-top: 20px;">Questionnaire Responses</h3>
          <table style="width: 100%; text-align: left; border-collapse: collapse; margin-top: 10px;">
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 8px; font-weight: bold;">1. Employment:</td>
              <td style="padding: 8px;">${data.step1}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 8px; font-weight: bold;">2. Trading Experience:</td>
              <td style="padding: 8px;">${data.step2}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 8px; font-weight: bold;">3. Goal:</td>
              <td style="padding: 8px;">${data.step3}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 8px; font-weight: bold;">4. Income Replacement:</td>
              <td style="padding: 8px;">${data.step4}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 8px; font-weight: bold;">5. Biggest Struggle:</td>
              <td style="padding: 8px;">${data.step5}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 8px; font-weight: bold;">6. Planned Capital:</td>
              <td style="padding: 8px;">${data.step6}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 8px; font-weight: bold;">7. Investment Choice:</td>
              <td style="padding: 8px;">${data.step7}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 8px; font-weight: bold;">7b. Specific USD Amount:</td>
              <td style="padding: 8px; color: #00F2FE; font-weight: bold;">${data.specificAmount}</td>
            </tr>
          </table>
        </div>
      `
    });

    return res.status(200).json({ success: true, message: 'Application sent successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

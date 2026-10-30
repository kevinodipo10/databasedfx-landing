import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS headers if submitted from your custom domain
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
    // Note: If using testing domain 'onboarding@resend.dev', Resend requires the recipient 
    // to match your Resend account email (kevinodipo25@gmail.com).
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

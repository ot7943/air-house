import fetch from 'node-fetch';
import dotenv from 'dotenv';

// تحميل المتغيرات من .env
dotenv.config();

async function testCloudflareRendering() {
  try {
    console.log('Testing Cloudflare Browser Rendering API...');

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/browser-rendering/content`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'https://www.airhouse.shop',
          options: {
            waitUntil: 'networkidle0',
            timeout: 30000,
            viewport: {
              width: 1200,
              height: 800,
            },
            userAgent: 'Mozilla/5.0 (compatible; CloudflareBot/1.0)',
            javascript: true,
            images: true,
            css: true,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Cloudflare rendering successful!');
    console.log('Title:', result.title);
    console.log('HTML length:', result.html?.length || 0);
    console.log('Screenshot available:', !!result.screenshot);

  } catch (error) {
    console.error('❌ Cloudflare rendering failed:', error.message);
  }
}

testCloudflareRendering();

import https from 'node:https';

const options = {
  hostname: '45.77.115.176',
  port: 443,
  path: '/',
  method: 'GET',
  headers: { 'Host': 'loucalimpa.com' },
  servername: 'loucalimpa.com',
  rejectUnauthorized: false
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const gaMatch = data.match(/G-[A-Z0-9]+/g);
    const gtmMatch = data.match(/GTM-[A-Z0-9]+/g);
    const metaVerification = data.match(/<meta[^>]+google-site-verification[^>]+>/gi);
    
    console.log('Google Analytics (GA4):', gaMatch ? [...new Set(gaMatch)] : 'Nenhum');
    console.log('Google Tag Manager (GTM):', gtmMatch ? [...new Set(gtmMatch)] : 'Nenhum');
    console.log('Site Verification:', metaVerification || 'Nenhum');

    // Se tiver scripts do googletagmanager
    const gtags = data.match(/https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=([A-Z0-9\-]+)/gi);
    console.log('gtag.js scripts:', gtags ? [...new Set(gtags)] : 'Nenhum');
  });
}).on('error', (err) => console.error(err));

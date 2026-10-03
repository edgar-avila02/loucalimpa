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
    const idx = data.indexOf('GT-WV3PJ9JW');
    if (idx !== -1) {
      console.log('Snippet do Google Tag / Site Kit encontrado:');
      console.log(data.substring(idx - 150, idx + 400));
    }
  });
}).on('error', (err) => console.error(err));

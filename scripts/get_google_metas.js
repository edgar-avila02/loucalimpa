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
    const head = data.substring(0, data.indexOf('</head>'));
    const metas = head.match(/<meta[^>]+>/gi) || [];
    metas.forEach(m => {
      if (m.includes('google') || m.includes('verification')) {
        console.log('Meta encontrada:', m);
      }
    });
  });
}).on('error', (err) => console.error(err));

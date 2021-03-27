const express = require('express');
const config = {
  'port': 8080
};

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.all('*', function(req, res) {
  res.redirect('index.html');
});

app.listen(config.port, function listenHandler() {
  console.info('Running on xxxxx  %O', config);
});

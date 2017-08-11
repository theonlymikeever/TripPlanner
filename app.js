//requires
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const models = require('./models');
const bodyParser = require('body-parser');

//instance & config
const app = express();
nunjucks.configure('views', { noCache: false });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use(bodyParser.urlencoded({
  extended: false
}));

//middlware
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'))

//index view
app.get('/', (req, res, next) => {
  res.render('index');
});

//error handling
app.use((req, res, next) => {
  const error = new Error('page not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', { error: err });
});

//port and listen
const port = process.env.PORT || 3000;
models.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });

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
app.use(bodyParser.json());

//middlware
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(morgan('dev'))



//index view
app.get('/', (req, res, next) => {
  let findAllHotels = models.Hotel.findAll();
  let findAllPlaces = models.Place.findAll();
  let findAllRestuarants = models.Restaurant.findAll();
  let findAllActivities = models.Activity.findAll();

  Promise.all([
    findAllHotels,
    findAllPlaces,
    findAllRestuarants,
    findAllActivities
    ])
    .then(([_hotels, _places, _restaurants, _activities]) => {
      res.render('index', {hotels: _hotels, places: _places, restaurants: _restaurants, activities: _activities})
    })
    .catch(next);
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
models.db.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });

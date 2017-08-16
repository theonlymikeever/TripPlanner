const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const Foo = conn.define('foo', {});

const sync = () => {
  return conn.sync({ force: true });
};

//model definition
const Place = conn.define('place', {
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
  type: Sequelize.ARRAY(Sequelize.FLOAT),
  allowNull: false
  }
});

const Hotel = conn.define('hotel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  num_stars: {
    type: Sequelize.RANGE(Sequelize.DECIMAL),
    allowNull: false
  },
  amenities : {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Activity = conn.define('activity', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age_range: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Restaurant = conn.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cuisine: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.RANGE(Sequelize.INTEGER),
    allowNull: false
  }
});


//Associations
Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);
Place.hasMany(Activity);
Place.hasMany(Hotel);
Place.hasMany(Restaurant);


module.exports = {
  sync,
  models: {
    Place,
    Hotel,
    Activity,
    Restaurant
  }
};


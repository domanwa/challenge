/*initialize constants */

const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const BCRYPT_SALT_ROUNDS = 12;
const cors = require('cors');
const cookieParser = require('cookie-parser');

/* Add JWT variables */
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
require('dotenv').config(); //Store secret key
jwtOptions.secretOrKey = process.env.SECRET_KEY; //read secret key from .env


/* create jwt strategy */
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  const personnel = getPersonnel({ personnel_phone: jwt_payload.id });
  if (personnel) {
    next(null, personnel);
  } else {
    next(null, false);
  }
});


/* use the strategy */

passport.use(strategy);

/*Initialize express app*/
const app = express();


app.use(cors());
app.use(cors({ credentials: true }))
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//parse cookie-parser to express
app.use(cookieParser());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// create sequalize instance
const sequelize = new Sequelize({
  database: 'personnel',
  username: 'root',
  password: 'root',
  dialect: 'mysql',
});


sequelize
  .authenticate()
  .then(() => console.log('Connection successful'))
  .catch(err => console.error('Failed to connect to mysql db. Error: ', err));

app.get('/', function (req, res) {
  res.json({ message: 'Express is running successfully' });
});

// start the app
app.listen(3000, function () {
  console.log('Express is up and running.....');
});


// initialize personnel model from ./models/personnel definition
const PersonnelModel = require('./models/personnel')
const Personnel = PersonnelModel(sequelize, Sequelize)


const getPersonnel = async obj => {
  return await Personnel.findOne({
    where: obj,
  });
};


// Get all personnel
const getAllPersonnel = async () => {
  return await Personnel.findAll();
};


// Routes to get personnel 
app.get('/personnel', function (req, res) {
  getAllPersonnel().then(personnel => res.json(personnel));
});

//Add personnel login route for authentication
app.post('/personnel/login', async function (req, res, next) {
  const { phone, password } = req.body
  const postPhone = req.body.personnel_phone
  const postPassword = req.body.personnel_password

  console.log('Looking up personnel with credentials phone: ' + postPhone + ' and password: '+ postPassword);

  if (postPhone && postPassword) {
    const personnel = await Personnel.findOne({

      where: {
        personnel_phone: postPhone
      }

    });

    console.log('Personnel found. Authenticating..........')
    if (!personnel) {
      res.status(401).json({ message: 'Personnel not found in db... Confirm correct phone number' });
    }

    bcrypt.compare(postPassword, personnel.personnel_password).then(response => {
      if (response !== true) {
        console.log('Passwords do not match..... check credentials and try again')
        return done(null, false, { message: 'passwords do not match' });
      }
      console.log('Personnel found & authenticated. Sending jwt token....');
      // return jwt
      const payload = { id: personnel.personnel_phone };
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ msg: 'ok', token: token });
    });

  }

});


// initialize task model from ./models/task definition
const TaskModel = require('./models/task')
const Task = TaskModel(sequelize, Sequelize)

// get personnel assigned tasks
app.get('/tasks/assigned', passport.authenticate('jwt', { session: false }), function (req, res) {
  const { page, limit, order, orderMethod } = req.query;
  getAllTasks(req.query.page, req.query.limit, req.query.order, req.query.orderMethod

  ).then(task => res.json(task));;

});


// Get all personnel
async function getAllTasks(page, limit, orderField, orderMethod) {
  var limit = parseInt(limit, 10)
  var page = parseInt(page, 10)
  return await Task.findAll({


    page: page,
    limit: limit,
    order: [['created', 'DESC']]



  })
};

// start app with port 8081
app.listen(8081, function() {
  console.log('Express is running');
});


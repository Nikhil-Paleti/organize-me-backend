const express = require("express");
const cors = require("cors");

const app = express();

var whitelist = ['http://localhost:8081', 'https://nikhil-paleti.github.io', 'https://main--melodious-basbousa-5b3584.netlify.app']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
.connect(`mongodb+srv://Aravind1721:Aravind1721@cluster0.uhyeytm.mongodb.net/authDB?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./app/routes/auth.routes")(app);
require('./app/routes/product.routes')(app);
require('./app/routes/order.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const ROLES = ["user", "ceo", "manager", "admin", "production", "qc"];

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      ROLES.forEach(role => {
        new Role({
          name: role
        }).save(err => {
          if (err) {
            console.log("error", err);
          }

          console.log(`added '${role}' to roles collection`);
        });
      });
    }
  });
}


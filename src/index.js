const express = require ('express');
const path = require ('path');
const morgan = require ('morgan');


//const config = require ('./config');

//Alustuksen Tunnistautuminen tai Initializations
const app = express();

//const port = 3000;
//app.listen(port, () => console.log("Serveri toimii --> localhost: ${port}"));

// Serverin asetukset tai Settings
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Väliohjelmistoja tai Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Reitit tai Routes
app.use(require('./routes/entries.routes'));
// entiiä tarviiko --> app.use(express.static(path.join(__dirname, "public")));

// Errorin käsittely --> 404 handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

//Aloitetaan sovellus tai Starting the App
app.listen(app.get('port'), () => {
  console.log("Server Works / Serveri toimii --> localhost: ", app.get('port'))
});

// global variables
//app.use((req, res, next) => {
//  console.log(config.APPID)
//  app.locals.APPID = config.APPID;
//  next();
// });

//export default app;

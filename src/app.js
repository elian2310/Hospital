const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session')
const sucesosRoutes = require('./routes/sucesos');

const app = express();
app.set('port', 4000);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
   extname: '.hbs' 
}));
app.set('view engine', 'hbs');

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'dbhosp'
}, 'single'));



app.listen(app.get('port'), () => {
    console.log('Oyendo en puerto ', app.get('port'));
});

app.use('/', sucesosRoutes);

app.get('/', (req, res) => {
    res.render('home', {layout: 'main.hbs'});
});
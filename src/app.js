const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session')
const sucesosRoutes = require('./routes/sucesos');
const loginRoutes = require('./routes/login');
const personalRoutes = require('./routes/personal');
const userRoutes = require('./routes/usuarios');
const ambRoutes = require('./routes/ambientes')

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

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.listen(app.get('port'), () => {
    console.log('Oyendo en puerto ', app.get('port'));
});

app.use('/', sucesosRoutes);
app.use('/', loginRoutes);
app.use('/', personalRoutes);
app.use('/', userRoutes);
app.use('/', ambRoutes);


app.get('/', (req, res) => {
    if(req.session.loggedin != true){
        res.render('home', { layout: 'main.hbs'});
    } else {
        res.redirect('/sucesos', { layout: 'employee.hbs'});
    }
});
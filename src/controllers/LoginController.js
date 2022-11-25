const bcrypt = require('bcrypt');

function login(req, res) {
    if(req.session.loggedin != true){
        res.render('login/index', { layout: 'main.hbs'});
    } else {
        res.redirect('/sucesos');
    }
    
}

function auth(req, res) {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM personal WHERE ciPersonal = ?', [data.ciPersonal], (err, persdata) => {
            if(persdata.length > 0){
                persdata.forEach(element => {
                    bcrypt.compare(data.password, element.password, (err, isMatch) => {
                    
                        if(!isMatch){
                            res.render('login/index', { layout: 'main.hbs', error: 'Error: Contraseña incorrecta'});
                        }else{
                            req.session.loggedin = true;
                            req.session.name = element.nombre;
                            res.redirect('/sucesos');
                        }

                    });
                    
                });

            } else {
                res.render('login/index', { layout: 'main.hbs', error: 'Error: Personal no resgistrado'});
            }
        });
    });

}

function logout(req, res){
    if (req.session.loggedin == true) {
        req.session.destroy();

    }
    res.redirect('/login');
    
}

module.exports = {
    login: login,
    auth: auth,
    logout: logout,
}
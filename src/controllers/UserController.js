const bcrypt = require('bcrypt');

function index(req, res){
    if(req.session.loggedin){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM usuario', (err, usuarios) => {
                if(err) {
                    res.json(err);
                }
                res.render('usuarios/showusr', { layout: 'employee.hbs', usuarios: usuarios });
            });
        });
    }else{
        res.redirect('/login');
    }
    
    
}


function destroy(req, res){
    const ciUsuario = req.body.ciUsuario;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM usuario WHERE ciUsuario = ?', [ciUsuario], (err, rows) => {
            res.redirect('/usuarios/index');
        });
    })
}

function edit(req, res){
    const ciUsuario = req.params.ciUsuario;
    if(req.session.loggedin){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM usuario WHERE ciUsuario = ?',[ciUsuario], (err, usuarios) => {
                if(err) {
                    res.json(err);
                }
                res.render('usuarios/editauser', { Usuarios: usuarios, layout: 'employee.hbs' });
            });
        });
    }else{
        res.redirect('/login');
    }
    
    
}

function registrar(req, res){
    if(req.session.loggedin){
        req.getConnection((err, conn) => {
        
        
            res.render('usuarios/regisuser', { layout: 'employee.hbs'});
        });
    }else{
        res.redirect('/login');
    }
    
    
}

function store(req, res){
    const datos = req.body;
    bcrypt.hash(datos.password, 12).then(hash => {
        datos.password = hash;
        req.getConnection((err, conn) => {
            conn.query('INSERT INTO usuario SET ?', [datos], (err, rows) => {
                res.redirect('/usuarios/index')
            });    
        });
    });

    
}

function update(req, res) {
    const ciUsuario = req.params.ciUsuario;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE suceso SET ? WHERE ciUsuario = ?', [data, ciUsuario], (err, rows) => {
            res.redirect('/usuarios/index');
        });
    });
}

module.exports = {
    index: index,
    destroy: destroy,
    edit: edit,
    registrar: registrar,
    store: store,
    update: update,
}
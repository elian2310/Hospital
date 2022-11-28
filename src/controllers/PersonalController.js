const bcrypt = require('bcrypt');

function index(req, res){
    if(req.session.loggedin){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM personal', (err, personal) => {
                if(err) {
                    res.json(err);
                }
                res.render('personal/index', { layout: 'employee.hbs', personal: personal });
            });
        });

    }else{
        res.redirect('/login');
    }
    
    
}

function registrar(req, res){
    if(req.session.loggedin){
        req.getConnection((err, conn) => {
       
            res.render('personal/registrar', { layout: 'employee.hbs' });
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
            conn.query('INSERT INTO personal SET ?', [datos], (err, rows) => {
                res.redirect('/personal')
            });    
        });

    });
    
}

function destroy(req, res){
    const ciPersonal = req.body.ciPersonal;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM personal WHERE ciPersonal = ?', [ciPersonal], (err, rows) => {
            res.redirect('/personal');
        });
    })
}

function edit(req, res){
    const ciPersonal = req.params.ciPersonal;
    if(req.session.loggedin){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM personal WHERE ciPersonal = ?',[ciPersonal], (err, personal) => {
                if(err) {
                    res.json(err);
                }
                res.render('personal/edit', { personal: personal, layout: 'employee.hbs' });
            });
        });

    }else{
        res.redirect('/login');
    }
    
    
    
}

function update(req, res) {
    const ciPersonal = req.params.ciPersonal;
    const data = req.body;
    bcrypt.hash(data.password, 12).then(hash => {
        data.password = hash;
        req.getConnection((err, conn) => {
            conn.query('UPDATE personal SET ? WHERE ciPersonal = ?', [data, ciPersonal], (err, rows) => {
                res.redirect('/personal');
            });
        });
    });
    
}

module.exports = {
    index: index,
    registrar: registrar,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,
}
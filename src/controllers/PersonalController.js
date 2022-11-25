const bcrypt = require('bcrypt');

function index(req, res){
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM personal', (err, personal) => {
            if(err) {
                res.json(err);
            }
            res.render('personal/index', { layout: 'employee.hbs', sucesos: personal });
        });
    });
    
}

function registrar(req, res){
    req.getConnection((err, conn) => {
       
        res.render('personal/registrar', { layout: 'employee.hbs' });
    });
    
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
    const idSuceso = req.body.idSuceso;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM suceso WHERE idSuceso = ?', [idSuceso], (err, rows) => {
            res.redirect('/personal');
        });
    })
}

function edit(req, res){
    const idSuceso = req.params.idSuceso;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM suceso WHERE ciPersonal = ?',[idSuceso], (err, personal) => {
            if(err) {
                res.json(err);
            }
            res.render('personal/edit', { personal: personal, layout: 'employee.hbs' });
        });
    });
    
}

function update(req, res) {
    const id = req.params.id;
    const data = req.body;
    bcrypt.hash(datos.password, 12).then(hash => {
        data.password = hash;
        req.getConnection((err, conn) => {
            conn.query('UPDATE personal SET ? WHERE ciPersonal = ?', [data, id], (err, rows) => {
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
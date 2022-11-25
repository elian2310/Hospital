function index(req, res){
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM suceso', (err, sucesos) => {
            if(err) {
                res.json(err);
            }
            res.render('sucesos/index', { layout: 'employee.hbs', sucesos: sucesos });
        });
    });
    
}

function registrar(req, res){
    req.getConnection((err, conn) => {
        var d_personal = null;
        var d_ambientes = null;
        var d_usuarios = null;
        conn.query('SELECT ciPersonal, nombre, apellidoPrincipal  FROM personal', (err1, personal) => {
            if(err1) {
                res.json(err1);
            }
            d_personal = personal;
        });
        conn.query('SELECT idAmbiente, nombre FROM ambiente', (err2, ambientes) => {
            if(err2) {
                res.json(err2);
            }
            d_ambientes = ambientes;
        });
        conn.query('SELECT ciUsuario, nombre, apellidoPrincipal FROM usuario', (err3, usuarios) => {
            if(err3) {
                res.json(err3);
            }
            d_usuarios = usuarios;
        });
        res.render('sucesos/registrar', { layout: 'employee.hbs', data_personal : d_personal, data_ambientes : d_ambientes, data_usuarios : d_usuarios });
    });
    
}




function store(req, res){
    console.log(req.body);
    const datos = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO suceso SET ?', [datos], (err, rows) => {
            res.redirect('/sucesos')
        });    
    });
}

function destroy(req, res){
    const idSuceso = req.body.idSuceso;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM suceso WHERE idSuceso = ?', [idSuceso], (err, rows) => {
            res.redirect('/sucesos');
        });
    })
}

function edit(req, res){
    const idSuceso = req.params.idSuceso;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM suceso WHERE idSuceso = ?',[idSuceso], (err, sucesos) => {
            if(err) {
                res.json(err);
            }
            res.render('sucesos/edit', { sucesos: sucesos, layout: 'employee.hbs' });
        });
    });
    
}

function update(req, res) {
    const id = req.params.id;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE suceso SET ? WHERE idSuceso = ?', [data, id], (err, rows) => {
            res.redirect('/sucesos');
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
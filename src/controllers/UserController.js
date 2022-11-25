

function index(req, res){
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuario', (err, usuarios) => {
            if(err) {
                res.json(err);
            }
            res.render('usuarios/showusr', { layout: 'employee.hbs', usuarios: usuarios });
        });
    });
    
}


function destroy(req, res){
    const idSuceso = req.body.idSuceso;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM usuario WHERE ciUsuario = ?', [ciUsuario], (err, rows) => {
            res.redirect('/usuarios');
        });
    })
}

function edit(req, res){
    const idSuceso = req.params.idSuceso;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM suceso WHERE ciUsuario = ?',[ciUsuario], (err, sucesos) => {
            if(err) {
                res.json(err);
            }
            res.render('/usuarios', { usuarios });
        });
    });
    
}

function registrar(req, res){
    req.getConnection((err, conn) => {
        
        
        res.render('usuarios/regisuser', { layout: 'employee.hbs'});
    });
    
}

function store(req, res){
    console.log(req.body);
    const datos = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO suceso SET ?', [datos], (err, rows) => {
            res.redirect('/usuarios')
        });    
    });
}

function update(req, res) {
    const id = req.params.id;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE suceso SET ? WHERE ciUsuario = ?', [data, id], (err, rows) => {
            res.redirect('/usuarios');
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
function index(req, res){
    if(req.session.loggedin){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM suceso', (err, sucesos) => {
                if(err) {
                    res.json(err);
                }
                res.render('sucesos/index', { layout: 'employee.hbs', sucesos: sucesos });
            });
        });
    }else{
        res.redirect('/login');
    }
}

function registrar(req, res){
    if(req.session.loggedin){
        req.getConnection((err, conn) => {
            
            conn.query('SELECT ciPersonal, nombre, apellidoPrincipal  FROM personal', (err1, personal) => {
                if(err1) {
                    res.json(err1);
                }
                conn.query('SELECT idAmbiente, nombre FROM ambiente', (err2, ambientes) => {
                    if(err2) {
                        res.json(err2);
                    }
                    conn.query('SELECT ciUsuario, nombre, apellidoPrincipal FROM usuario', (err3, usuarios) => {
                        if(err3) {
                            res.json(err3);
                        }
                        res.render('sucesos/registrar', { layout: 'employee.hbs', data_personal : personal, data_ambientes : ambientes, data_usuarios : usuarios });
                    });
                });
            });
        });

    }else{
        res.redirect('/login');
    }
    
    
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
    if(req.session.loggedin == true){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM suceso WHERE idSuceso = ?',[idSuceso], (err, sucesos) => {
                if(err) {
                    res.json(err);
                }
                conn.query('SELECT ciPersonal, nombre, apellidoPrincipal  FROM personal', (err1, personal) => {
                    if(err1) {
                        res.json(err1);
                    }
                    conn.query('SELECT idAmbiente, nombre FROM ambiente', (err2, ambientes) => {
                        if(err2) {
                            res.json(err2);
                        }
                        conn.query('SELECT ciUsuario, nombre, apellidoPrincipal FROM usuario', (err3, usuarios) => {
                            if(err3) {
                                res.json(err3);
                            }
                            res.render('sucesos/edit', { layout: 'employee.hbs', data_personal : personal, data_ambientes : ambientes, data_usuarios : usuarios, sucesos: sucesos });
                        });
                    });
                });
            });
        });

    }else{
        res.redirect('/login');
    }
    
    
}

function update(req, res) {
    const id = req.params.idSuceso;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE suceso SET ? WHERE idSuceso = ?', [data, idSucesos], (err, rows) => {
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
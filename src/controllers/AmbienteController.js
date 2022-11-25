function index(req, res){
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM ambiente', (err, ambientes) => {
            if(err) {
                res.json(err);
            }
            res.render('ambientes/showamb', { layout: 'employee.hbs', ambientes: ambientes });
        });
    });
    
}

function destroy(req, res){
    const idSuceso = req.body.idSuceso;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM usuario WHERE idAmbiente = ?', [idAmbiente], (err, rows) => {
            res.redirect('/ambientes');
        });
    })
}



function edit(req, res){
    const idSuceso = req.params.idSuceso;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM suceso WHERE idAmbiente = ?',[idAmbiente], (err, sucesos) => {
            if(err) {
                res.json(err);
            }
            res.render('/ambientes', { ambientes });
        });
    });
    
}

function registrar(req, res){
    req.getConnection((err, conn) => {
        
        
        res.render('ambientes/regisamb', { layout: 'employee.hbs'});
    });
    
}

function store(req, res){
    console.log(req.body);
    const datos = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO suceso SET ?', [datos], (err, rows) => {
            res.redirect('/ambientes')
        });    
    });
}

function update(req, res) {
    const id = req.params.id;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE suceso SET ? WHERE idAmbiente = ?', [data, id], (err, rows) => {
            res.redirect('/ambientes');
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
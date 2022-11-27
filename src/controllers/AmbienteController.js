function index(req, res){
    if(req.session.loggedin){
        req.getConnection((err, conn) => {
            conn.query("SELECT idAmbiente, nombre, CASE WHEN disponible = 1 THEN 'Disponible' ELSE 'No Disponible' END AS disponible FROM ambiente", (err, ambientes) => {
                if(err) {
                    res.json(err);
                }
                res.render('ambientes/showamb', { layout: 'employee.hbs', ambientes: ambientes });
            });
        });

    }else{
        res.redirect('/login');
    }
    
    
}
function indexUsr(req, res){
    
    req.getConnection((err, conn) => {
        conn.query("SELECT idAmbiente, nombre, CASE WHEN disponible = 1 THEN 'Disponible' ELSE 'No Disponible' END AS disponible FROM ambiente", (err, ambientes) => {
            if(err) {
                res.json(err);
            }
            res.render('ambientes/showambusr', { layout: 'main.hbs', ambientes: ambientes });
        });
    });
    
    
    
}

function destroy(req, res){
    const idAmbiente = req.body.idAmbiente;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM ambiente WHERE idAmbiente = ?', [idAmbiente], (err, rows) => {
            res.redirect('/ambientes/index');
        });
    })
}



function edit(req, res){
    const idAmbiente = req.params.idAmbiente;
    if(req.session.loggedin){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM ambiente WHERE idAmbiente = ?',[idAmbiente], (err, ambientes) => {
                if(err) {
                    res.json(err);
                }
                res.render('ambientes/editamb', { layout: 'employee.hbs',ambientes: ambientes });
            });
        });
    }else{
        res.redirect('/login');
    }
    
    
}

function registrar(req, res){
    
    if (req.session.loggedin){
        req.getConnection((err, conn) => {
        
        
            res.render('ambientes/regisamb', { layout: 'employee.hbs'});
        });
    }else{
        res.redirect('/login')
    }   
}

function store(req, res){
    console.log(req.body);
    const datos = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO ambiente SET ?', [datos], (err, rows) => {
            res.redirect('/ambientes/index')
        });    
    });
}

function update(req, res) {
    const idAmbiente = req.params.idAmbiente;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE ambiente SET ? WHERE idAmbiente = ?', [data, idAmbiente], (err, rows) => {
            res.redirect('/ambientes/index');
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
    indexUsr: indexUsr,
}
const PDF = require('pdfkit-construct');
const fs = require('fs');



function index(req, res){
    if(req.session.loggedin){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM suceso', (error1, sucesos) => {
                if(error1) {
                    res.json(error1);
                }
                
                res.render('sucesos/index', { layout: 'employee.hbs', sucesos: sucesos });
            });
        });
    }else{
        res.redirect('/login');
    }
}
function pdfSearch(req, res){
    if(req.session.loggedin){
        const doc = new PDF({bufferPage: true});
        const filename = `Busqueda${Date.now()}.pdf`;
        
        const stream =  res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-disposition': `attachment;filename=${filename}`
        });
        doc.on('data', (data) => {stream.write(data)});
        doc.on('end', () => {stream.end()});

        const datareq = req.query.datos
        
        const datos = datareq.map( (suceso) => {
            const dato = {
                idSuceso: suceso.idSuceso,
                tipo: suceso.tipo,
                idAmbiente: suceso.idAmbiente,
                ciPersonal: suceso.ciPersonal,
                ciUsuario: suceso.ciUsuario,
                fecha: suceso.fecha,
                resultado: suceso.resultado
            }
            return dato;
        });

        doc.setDocumentHeader({
            height: '16'
        }, () => {
            doc.fontSize(15).text(`Busqueda ${Date.now()}`, {
                width: 420,
                align: 'center'
            });
        })

        doc.addTable([
            {key: 'idSuceso', label: 'ID', align: 'center'},
            {key: 'tipo', label: 'Tipo', align: 'center'},
            {key: 'idAmbiente', label: 'Ambiente', align: 'center'},
            {key: 'ciPersonal', label: 'Encargado', align: 'center'},
            {key: 'ciUsuario', label: 'Paciente', align: 'center'},
            {key: 'fecha', label: 'Fecha', align: 'center'},
            {key: 'resultado', label: 'Resultado', align: 'center'}

        ], datos, {
            border: null,
            width: "fill-body",
            striped: true,
            stripedColors: ["#f6f6f6", "#d6c4dd"],
            cellsPadding: 10,
            marginLeft: 45,
            marginRight: 45,
            headAllign: 'center'
        })

        doc.end();        
    }else{
        res.redirect('/login');
    }
}

function search(req, res){
    if(req.session.loggedin){
        const idSuceso = req.query.idSuceso;
        const tipo = req.query.tipo;
        const idAmbiente = req.query.idAmbiente;
        const ciPersonal = req.query.ciPersonal;
        const ciUsuario = req.query.ciUsuario;
        const desde = req.query.desde;
        const hasta = req.query.hasta;
        const resultado = req.query.resultado;

        var query = "SELECT * from suceso WHERE idSuceso LIKE '%" + idSuceso + "' AND tipo LIKE '%" + tipo + "' AND idAmbiente LIKE '%" + idAmbiente + "' AND ciPersonal LIKE '%" + ciPersonal + "' AND ciUsuario LIKE '%" + ciUsuario + "' AND resultado LIKE '%" + resultado + "'";

        if((desde != "") && (hasta != "")){
            var qfecha = " AND fecha BETWEEN '" + desde + "' AND '" + hasta + "'";
            query = query.concat(qfecha);
        }

        req.getConnection((err, conn) => {
            conn.query(query, (error1, sucesos) => {
                if(error1) {
                    res.json(error1);
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
    const idSuceso = req.params.idSuceso;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE suceso SET ? WHERE idSuceso = ?', [data, idSuceso], (err, rows) => {
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
    search: search,
    pdfSearch: pdfSearch,
}
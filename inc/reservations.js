var conn = require("./db");
module.exports = {

  render(req, res, error, success){

    res.render('reservations', {
      title: 'Reservas - Restaurante Saboroso!',
      background: 'images/img_bg_2.jpg',
      h1: 'Reserve uma mesa!',
      body: req.body,
      error,
      success
  });



  },
  save(fields){

    return new Promise((resolve, reject) =>{

      let date = fields.date.split('/');

      // alternativa date.split('/').reverse().join('-');

      //template string para correção da data na hora de salvar no banco

      fields.date = `${date[2]}-${date[1]}-${date[0]}`;
    
      conn.query(`
      INSERT INTO tb_reservations (name, email, people, date, time)
      VALUES(?, ?, ?, ?, ?)
      `, [
        fields.name,
        fields.email,
        fields.people,
        fields.date,
        fields.time
      ], (err, results) => {
        if(err){
          reject(err);

        }else{

          resolve(results);
        }

    });

   
 });

 }


};
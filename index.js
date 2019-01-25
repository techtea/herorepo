const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/travel', (req, res) => res.send(showTravel()))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
        client.release();
    } 
    catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  showTravel = () => {
    try {
      var client2 = await pool.connect()
      var result2 = await client2.query('SELECT * FROM test_table');
      var results2 = { 'results': (result2) ? result2.rows : null};
      res.render('pages/travel', results2 );
        client2.release();
    } 
    catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
  }

    
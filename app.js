const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const mysql = require('mysql');
const bodyParser = require('body-parser')
const ejs = require('ejs')



const app = express();
const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database:'library',
    password:'root'
})

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('Database Connected!!')
    }
})

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.listen(3000, ()=> {
    console.log('Server started at port 3000');
    console.log('Database Connected')
})

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) =>{
      res.render('home.ejs')
})


app.get('/book/:id',(req,res)=>{
    const bookId = req.params.id;
    let sql = `SELECT * FROM library.books WHERE id = ${bookId}`
    db.query(sql,(err, result)=>{
        if (err){
            console.log('Error!!!')
        }else {
            res.render('book.ejs',{books: result[0]})
        }
    })
})
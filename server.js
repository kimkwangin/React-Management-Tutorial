//File에 접근할 수 있는 라이브러리
const fs = require('fs'); 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000

//서버와 클라이언트 모듈통신시 사용되는 데이터 포맷
//지정된  데이터를 넣어주면 자동으로 json파일 포맷으로 변형해서 보내줌
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//DB설정파일을 로드
const data = fs.readFileSync('./database.json');

//DB설정구분을 파싱
const conf = JSON.parse(data);

//Mysql라이브러리 로드
const mysql = require('mysql');

//DB 커넥션 연결  객체 초기화
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

//파일 처리를 위한 multer객체
const multer = require('multer');

//사용자가 업로드한  파일이 저장되는곳
const upload = multer({dest:'./upload'})

app.get('/api/hello',(req,res) => {
    res.send({message: 'Hello Express!'});
});

//데이터는 클라이언트에서 가지고 있는것이 아니라
//서버단 모듈에서 가지고 있고
//클라이언트 요청시 반환하는게 일반적인 프로그램임
app.get('/api/customers',(req,res) => {
    console.log('get....');
    /*
    res.send([
        {
            'id':1,
            'image':'https://placeimg.com/64/64/1',
            'name':'족발',
            'birthday':'961222',
            'gender':'남자',
            'job':'직장인'
          },
          {
            'id':2,
            'image':'https://placeimg.com/64/64/2',
            'name':'문어발',
            'birthday':'971121',
            'gender':'남자',
            'job':'대학생'
          },
          {
            'id':3,
            'image':'https://placeimg.com/64/64/3',
            'name':'오리발',
            'birthday':'950212',
            'gender':'여자',
            'job':'중학생'
          }
    ]);
    */

    connection.query(
        "select * from CUSTOMER",
        (err,rows,fields) => {
            res.send(rows);
        }
    );
});

//사용자가 업로드 폴더 참조
//이미지 폴더에서 사용자 업로드와 매핑
app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    console.log('post....');

    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
 
    //multer라이브러리가 filename이 중복되지 않게 지정해 주어 서버에 저장이 된다
    let image = '';
    req.file ? image = '/image/' + req.file.filename : '';
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];

    //Debug
    console.log(name);
    console.log(image);
    console.log(birthday);
    console.log(gender);
    console.log(job);

    connection.query(sql, params,
    (err, rows, fields) => {
        res.send(rows);

        console.log(err);
        console.log(rows);
    })
});

app.listen(port, () => console.log(`Listengin on port ${port}`));


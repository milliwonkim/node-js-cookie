const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', 'views');

// ----------------------------------------------

let favorite, visitors;

app.get('/', (req, res) => {
  visitors = req.cookies.visitors || 0;
  visitors++;
  res.cookie('visitors', visitors, {
    maxAge: 5000
  });

  res.render('index', {
    visitors: req.cookies.visitors,
    favorite: req.cookies.favorite
  });
});

app.post('/', (req, res) => {
  favorite = req.body.favorite;
  res.cookie('favorite', favorite, {
    maxAge: 5000
  });
  res.redirect('/');
});

// ----------------------------------------------

app.listen(3000, () => {
  console.log('3000 port');
});
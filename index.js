const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// multer setup
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});

// pug setup
const pug = require('pug');
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));


app.get('/', (req, res) => {
   res.render('index');
});

app.post('/', upload.single('file'), (req, res) => {
    console.log(req);
    const file = req.file;
    delete file.buffer;
    delete file.fieldname;
    res.json({file});
})

app.listen(PORT, (err) =>{
    if (err) console.error(err);
    console.log(`Server is running on port ${PORT}`);
});
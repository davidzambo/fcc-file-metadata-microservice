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
    if (req.file.size > 10000000)
        return res.json({error: 'File size exceedes the 10Mb limit.'});
    return res.json({size: req.file.size});
})

app.listen(PORT, (err) =>{
    if (err) console.error(err);
    console.log(`Server is running on port ${PORT}`);
});
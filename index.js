import express from 'express';
import multer from 'multer'; // For handling file uploads
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from 'path';
// import bodyParser from "body-parser";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs');
app.use(express.json());

// Configure multer to handle file uploads
const storage = multer.diskStorage({
    destination: __dirname + "/public/images",
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    console.log(req.file);
    res.render('index.ejs', { imageURL: "", topTextValue: "", bottomTextValue: "" });
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

// Handle form submission
app.post('/generate', upload.single('image'), (req, res) => {
    const topText = req.body.topText;
    const bottomText = req.body.bottomText;

    // Check if an image was uploaded
    if (req.file) {
        res.render('index.ejs', { imageURL: "images/" + req.file.filename, topTextValue: topText, bottomTextValue: bottomText });
    } else {
        // Handle the case where no image was uploaded
        res.render('index.ejs', { topTextValue: topText, bottomTextValue: bottomText });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

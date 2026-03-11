const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
// --- SERVER START ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
  cloud_name: 'dfqooquqw',
  api_key: '214291713635552',
  api_secret: '6Sy7xYdGpkKC_1susyrJcZgZtxw'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Atif_Videos',
    resource_type: 'video',
  },
});
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

app.post('/upload', upload.single('video'), async (req, res) => {
    try {
        // Yeh link ab Cloudinary se aa raha hai aur permanent hai
        const permanentLink = req.file.path; 

        // Agar aap MongoDB use kar rahe hain toh yahan save karein:
        // await Video.create({ url: permanentLink });

        res.send(`Video Upload Ho Gayi! Link: ${permanentLink}`);
    } catch (err) {
        console.log(err);
        res.status(500).send("Upload fail!");
    }
});


// Database setup (Default videos list)
db.defaults({ videos: [] }).write();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// --- YAHAN APNA PASSWORD SET KAREIN ---
const ADMIN_PASSWORD = "atif123"; 

// Upload Route
app.post('/upload', (req, res) => {
    const { title, link, password } = req.body;

    // Password Check
    if (password !== ADMIN_PASSWORD) {
        return res.send("<h1>Ghalat Password!</h1><p>Wapis jayein aur sahi password dalein.</p>");
    }

    // Save to Database
    db.get('videos').push({ title, link }).write();
    
    // Upload hone ke baad home page par bhej dega
    res.redirect('/');
});

// API to get videos (Home page par dikhane ke liye)
app.get('/api/videos', (req, res) => {
    const videos = db.get('videos').value();
    res.json(videos);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



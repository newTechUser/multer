const express = require("express");
const multer = require("multer");
const path = require("path"); // Yeni eklenen satır

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = file.mimetype.split("/")[0];
    if (ext === "image") {
      cb(null, path.join(__dirname, "uploads/images")); // Dosya yolu güncellendi
    } else {
      cb(null, path.join(__dirname, "uploads/others")); // Dosya yolu güncellendi
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: multerStorage });
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to API");
});

app.post("/upload", upload.single("myFile"), (req, res) => {
  console.log("Body: ", req.body);
  console.log("File: ", req.file);
  res.send("File successfully uploaded.");
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8080;
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // อนุญาตให้แค่ที่อยู่นี้เข้าถึง
}));

// อ่านข้อมูลจากไฟล์ JSON สำหรับคอมเมนต์
const getCommentsData = () => {
  const filePath = path.join(__dirname, 'server', 'Post.json'); // ระบุพาทของไฟล์ JSON
  const rawData = fs.readFileSync(filePath); // อ่านข้อมูลจากไฟล์
  return JSON.parse(rawData); // แปลงข้อมูลเป็น JSON
};
const getCardsData = () => {
  const filePath = path.join(__dirname, 'server', 'cards.json'); 
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData); 
};

app.get("/api/v1/comments", (req, res) => {
  try {
    const comments = getCommentsData();  
    const sortedComments = comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json({ comments: sortedComments }); 
  } catch (error) {
    res.status(500).json({ message: "Error reading the comments data." });
  }
});
app.post("/api/v1/comments", (req, res) => {
  const { name, comment } = req.body;

  if (!name || !comment) {
    return res.status(400).json({ message: "ชื่อและคอมเมนต์ต้องไม่ว่าง" });
  }

  const filePath = path.join(__dirname, "server", "Post.json");

  // อ่านข้อมูลเก่า ถ้ายังไม่มีให้ใช้ []
  let comments = [];
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    comments = JSON.parse(rawData);
  }

  // เพิ่มคอมเมนต์ใหม่
  const newComment = {
    name,
    comment,
    timestamp: new Date().toISOString(),
  };
  comments.push(newComment);

  // เขียนข้อมูลกลับลงไฟล์
  try {
    fs.writeFileSync(filePath, JSON.stringify(comments, null, 2), "utf8");
    res.status(200).json({ message: "บันทึกความคิดเห็นสำเร็จ", success: true });
  } catch (err) {
    console.error("❌ เขียนไฟล์ผิดพลาด:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
  }
});

// รับคำขอที่ /api/v1/cards
app.get("/api/v1/cards", (req, res) => {
  try {
    const tarotCards = getCardsData(); // ดึงข้อมูลไพ่จากไฟล์ JSON
    res.json({ cards: tarotCards });
  } catch (error) {
    res.status(500).json({ message: "Error reading the cards data." });
  }
});

app.post("/api/v1/cards/random", (req, res) => {
  try {
    const tarotCards = getCardsData();  // ดึงข้อมูลทั้งหมดจากไฟล์ JSON
    console.log(tarotCards);  // ดูข้อมูลทั้งหมดที่โหลดจากไฟล์ JSON

    if (!tarotCards || tarotCards.length === 0) {
      return res.status(400).json({ message: "No cards available." });
    }

    // เลือกการ์ดแบบสุ่ม
    const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];

    res.json({ card: randomCard }); // ส่งการ์ดที่สุ่มออกมา
  } catch (error) {
    console.error("POST /cards/random error:", error);  // แสดงข้อผิดพลาด
    res.status(500).json({ message: "Error processing the request." });
  }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8080;

// ใช้ middleware สำหรับ JSON parsing
app.use(express.json());

// อ่านข้อมูลจากไฟล์ JSON
const getCardsData = () => {
  const filePath = path.join(__dirname, 'server', 'cards.json'); // ระบุพาทของไฟล์ JSON
  const rawData = fs.readFileSync(filePath); // อ่านข้อมูลจากไฟล์
  return JSON.parse(rawData); // แปลงข้อมูลเป็น JSON
};

// รับคำขอที่ /api/v1/cards
app.get("/api/v1/cards", (req, res) => {
  try {
    const tarotCards = getCardsData(); // ดึงข้อมูลไพ่จากไฟล์ JSON
    res.json({ cards: tarotCards });
  } catch (error) {
    res.status(500).json({ message: "Error reading the cards data." });
  }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors()); // Biar frontend Kakak bisa ngobrol sama backend ini
app.use(express.json());

// Masukin API Key Rahasia Kakak di sini ya! Sssst, jangan kasih tau siapa-siapa! ><
const genAI = new GoogleGenerativeAI("AIzaSyCqRpwfXI8sH4-pDxUMPKB8eH_fyalqtMo");

// Ini rute buat nerima pertanyaan dari web Kakak
app.post('/tanya-ai', async (req, res) => {
    try {
        // Kita pakai model gemini yang paling gesit!
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const kodeKakak = req.body.kode; // Ini kode yang Kakak ketik di web
        
        // Perintah khusus buat AI-nya (Bisa Kakak ubah sesuka hati lho!)
        const prompt = "Tolong periksa, perbaiki, dan jelaskan kode berikut seperti asisten yang ramah: \n\n" + kodeKakak;

        // Proses nanya ke Gemini...
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // Kirim jawabannya ke web Kakak
        res.json({ jawaban: response.text() });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ jawaban: "Aduh Kak, servernya lagi pusing nih... ada yang eror 🥺" });
    }
});

// Biar otomatis ngikutin port dari panel Kakak
const port = process.env.PORT || 3301; 

app.listen(port, async () => {
    console.log(`Yeay! Server AI Raphtalia udah nyala di port ${port}! ✨🚀`);
    
    // Trik rahasia ngecek IP Publik panelnya Kak Kyno!
    try {
        // Kita nanya ke layanan pencatat IP
        const responIP = await fetch('https://api.ipify.org?format=json');
        const dataIP = await responIP.json();
        
        console.log(`🌸 Pssst, Kak Kyno! IP Publik panelnya adalah: ${dataIP.ip}`);
        console.log(`🌸 Nanti di index.html, alamatnya diubah jadi: http://${dataIP.ip}:${port}/tanya-ai`);
    } catch (err) {
        console.log("Aduh Kak, Raphtalia gagal ngintip IP-nya nih... 🥺");
    }
});

const { generateChatResponse } = require("../service/geminiService");

const chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Thiếu tin nhắn" });

    const reply = await generateChatResponse(message);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Error when processing chat AI" });
  }
};

module.exports = { chat };

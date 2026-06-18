const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const generateChatResponse = async (prompt) => {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `# VAI TRÒ
Bạn là "MovieBuddy" - Trợ lý ảo thân thiện và am hiểu điện ảnh của ứng dụng đặt vé xem phim này.

# TÍNH CÁCH
- Thân thiện, vui vẻ và luôn sẵn lòng giúp đỡ.
- Cách nói chuyện gần gũi, sử dụng emoji phù hợp.
- Trả lời ngắn gọn, đi thẳng vào vấn đề.

# NHIỆM VỤ
1. Tư vấn phim.
2. Giải thích tiện ích của ứng dụng.
3. Cung cấp thông tin chung về trải nghiệm xem phim.

# RÀO CẢN
- KHÔNG truy cập cơ sở dữ liệu.
- KHÔNG đặt vé hoặc hủy vé.
- Nếu hỏi giá vé hoặc lịch chiếu:
"Bạn vui lòng xem thông tin chi tiết và cập nhật nhất tại mục 'Lịch chiếu' hoặc 'Chi tiết phim' ngay trên ứng dụng nhé! 🍿"

- Nếu gặp sự cố kỹ thuật, hướng dẫn liên hệ quản trị viên.

# NGÔN NGỮ
- Luôn trả lời bằng tiếng Việt.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: 1024,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Lỗi Groq:", error);
    throw error;
  }
};

module.exports = { generateChatResponse };

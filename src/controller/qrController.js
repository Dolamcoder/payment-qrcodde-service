const QRCode = require("qrcode");
const signatureService=require('../service/signatureService')
const generateQrcode=async(req, res)=>{
    try {
        const { billId, endTime, count} = req.body;
        console.log("check data ", billId, endTime)
        const signature = signatureService.generateSignature(billId, endTime);
        const qrData = {
            billId,
            endTime,
            count,
            signature,
        };
        const qrString = JSON.stringify(qrData);
        const qrImage = await QRCode.toDataURL(qrString);
        console.log("data", qrImage)
        res.status(201).json({
            success: true,
            qrData,
            qrImage, 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const verifyQrcode = async (req, res) => {
    try {
        const { billId, endTime, count, signature } = req.body;

        const expectedSignature = signatureService.generateSignature(
            billId,
            endTime
        );

        if (expectedSignature !== signature) {
            return res.status(400).json({
                valid: false,
                message: "QR giả hoặc bị sửa",
            });
        }

        const now = Date.now();
        const threeHour = 3*60 * 60 * 1000;

        // Vé đã hết hạn
        if (now >= endTime) {
            return res.status(400).json({
                valid: false,
                message: "Vé đã hết hạn",
            });
        }

        // Chỉ được quét trong vòng 1 giờ trước khi phim kết thúc
        if (endTime - now > threeHour) {
            return res.status(200).json({
                valid: true,
                message: "Chưa đến thời gian sử dụng vé",
                count
            });
        }

        return res.status(200).json({
            valid: true,
            message: "QR hợp lệ",
            count,
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
module.exports={generateQrcode, verifyQrcode}
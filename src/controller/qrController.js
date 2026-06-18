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
const vertifyQrcode = async (req, res) => {
    try {
        const { billId, endTime, count, signature } = req.body;
        console.log("data",  billId, endTime, count, signature );
        const expectedSignature = signatureService.generateSignature(billId, endTime);
        console.log("exx",expectedSignature );
        if (expectedSignature !== signature) {
            return res.status(400).json({
                valid: false,
                message: "QR giả hoặc bị sửa",
            });
        }

        if (Date.now() >= endTime) {
            return res.status(400).json({
                valid: false,
                message: "Vé đã hết hạn",
            });
        }

        return res.status(200).json({
            valid: true,
            message: "QR hợp lệ",
            count: count
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
module.exports={generateQrcode, vertifyQrcode}
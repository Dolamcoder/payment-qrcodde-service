const QRCode = require("qrcode");
const signatureService=require('../service/signatureService')
const generateQrcode=async(req, res)=>{
    try {
        const { billId, endTime} = req.body;
        console.log("check data ", billId, endTime)
        const signature = signatureService.generateSignature(billId, endTime);
        const qrData = {
            billId,
            endTime,
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
const vertifyQrcode=async(req, res)=>{
     try {
        const { billId, endTime, signature } = req.body;
        console.log("check data ", billId, endTime, signature )
        const expectedSignature = signatureService.generateSignature(billId, endTime);
        if (expectedSignature !== signature) {
            console.log("qr giả")
            return res.status(400).json({
                error: "QR giả hoặc bị sửa",
            });
        }
         if (Date.now() >= endTime) {
            console.log("Quá hạn")
            return res.status(400).json({
                valid: false,
                message: "Vé đã hết hạn",
            });
        }
        console.log("Thành công")
        res.status(200).json({
            valid: true,
            message: "QR hợp lệ",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports={generateQrcode, vertifyQrcode}
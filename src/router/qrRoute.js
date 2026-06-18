const express=require('express')
const router=express.Router()
const qrController=require('../controller/qrController')
router.post('/generate-qr', qrController.generateQrcode)
router.post('/verify-qr', qrController.verifyQrcode)
module.exports=router

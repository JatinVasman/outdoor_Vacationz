"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enquiryRouter = void 0;
const express_1 = require("express");
const enquiryController_1 = require("../controllers/enquiryController");
const router = (0, express_1.Router)();
exports.enquiryRouter = router;
router.get('/status', enquiryController_1.getResendStatus);
router.post('/', enquiryController_1.createEnquiry);

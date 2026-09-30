import { Router } from 'express';
import { createEnquiry, getResendStatus } from '../controllers/enquiryController';

const router = Router();

router.get('/status', getResendStatus);
router.post('/', createEnquiry);

export { router as enquiryRouter };

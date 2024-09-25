// routes/invoiceRoutes.js

import { Router } from 'express';
import {getInvoice} from '../controllers/invoiceController.js';
const router = Router();
// GET invoice by reservation_id
router.get('/:reservation_id', getInvoice);

export default router;

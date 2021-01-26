import { Router } from 'express';
import { getMore, loadProds } from '../controllers/orders.controller';

const router = Router();

router.route('/').get(loadProds);
router.route('/more').get(getMore);

export default router;

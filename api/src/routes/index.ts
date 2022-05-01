import { Router } from 'express';
import { market } from '../controllers/market.controller';
import { nft } from '../controllers/nft.controller';

export const router = Router();

router.get('/nft', nft);
router.get('/market', market);

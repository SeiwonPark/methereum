import { Router } from 'express';
import { nft } from 'controllers/nft.controller';
import { market } from 'controllers/market.controller';

export const router = Router();

router.get('/nft', nft);
router.get('/market', market);

import { Request, Response } from 'express';
import { abis } from '../../../contract/abi';

export const market = (req: Request, res: Response) => {
  res.send({ result: abis.MARKET_ABI });
};

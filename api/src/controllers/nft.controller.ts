import { Request, Response } from 'express';
import { abis } from '../../../contract/abi';

export const nft = (req: Request, res: Response) => {
  res.send({ result: abis.NFT_ABI });
};

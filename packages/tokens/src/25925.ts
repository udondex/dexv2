import { ChainId, ERC20Token, KKUB } from '@pancakeswap/sdk'
export const bkcTokens = {
  // kkub: KKUB[ChainId.BKC],
  kkub: new ERC20Token(ChainId.BKC, '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5', 18, 'KKUB', 'Wrapped KUB (KKUB)'),
  kusdt: new ERC20Token(ChainId.BKC, '0x7d984C24d2499D840eB3b7016077164e15E5faA6', 18, 'KUSDT', 'Bitkub-Peg USDT'),
  kusdc: new ERC20Token(ChainId.BKC, '0x77071ad51ca93fc90e77BCdECE5aa6F1B40fcb21', 18, 'KUSDC', 'Bitkub-Peg USDC'),
}

import { ChainId, ERC20Token, KKUB } from '@pancakeswap/sdk'
export const bkcTestnetTokens = {
  kkub: KKUB[ChainId.BKC_TESTNET],
  usdt: new ERC20Token(
    ChainId.BKC_TESTNET,
    '0x866553520e991Ec3DD9750ace65Fe6E102bb1bAb',
    18,
    'USDT',
    'Tether USD',
  ),
  moodeng: new ERC20Token(
    ChainId.BKC_TESTNET,
    '0x0eb2200fa7fb5416cb453a44c3dc29cf974df131',
    18,
    'MOODENG',
    'Moodeng',
  ),
}


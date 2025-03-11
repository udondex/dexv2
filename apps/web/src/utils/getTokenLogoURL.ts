import { getAddress } from '@ethersproject/address'
import memoize from 'lodash/memoize'
import { ChainId, Token } from '@pancakeswap/sdk'

const mapping = {
  [ChainId.BSC]: 'smartchain',
  [ChainId.ETHEREUM]: 'ethereum',
  [ChainId.BKC]: 'bitkubchain',
}

const getTokenLogoURL = memoize(
  (token?: Token) => {
    if (token && mapping[token.chainId]) {
      return `https://udonswap.io/images/tokens/${token.address}.png`
    }
    return null
  },
  (t) => `${t.chainId}#${t.address}`,
)

export default getTokenLogoURL

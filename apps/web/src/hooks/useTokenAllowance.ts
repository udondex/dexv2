import { Token, CurrencyAmount } from '@pancakeswap/sdk'
import { useMemo } from 'react'

import { useKUSDTContract, useTokenContract } from './useContract'
import { useSingleCallResult } from '../state/multicall/hooks'

function useTokenAllowance(token?: Token, owner?: string, spender?: string): CurrencyAmount<Token> | undefined {
  const isKUSDT = token?.symbol === 'KUSDT'
  const contract = isKUSDT 
    ? useKUSDTContract(token?.address, false)
    : useTokenContract(token?.address, false)

  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = useSingleCallResult(contract, isKUSDT ? 'allowances' : 'allowance', inputs).result
  
  if (isKUSDT && process.env.NODE_ENV !== 'production') {
    console.log('allowance -> ', allowance)
  }

  return useMemo(
    () => (token && allowance ? CurrencyAmount.fromRawAmount(token, allowance.toString()) : undefined),
    [token, allowance],
  )
}

export default useTokenAllowance

import { Currency, Pair } from '@pancakeswap/sdk'
import { Button, ChevronDownIcon, Text, useModal, Flex, Box, NumericalInput, CopyButton } from '@pancakeswap/uikit'
import styled, { css } from 'styled-components'
import { isAddress } from 'utils'
import { useTranslation } from '@pancakeswap/localization'
import { WrappedTokenInfo } from '@pancakeswap/token-lists'

import { useBUSDCurrencyAmount } from 'hooks/useBUSDPrice'
import { formatNumber } from '@pancakeswap/utils/formatBalance'
import { StablePair } from 'views/AddLiquidity/AddStableLiquidity/hooks/useStableLPDerivedMintInfo'

import { useAccount } from 'wagmi'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

import AddToWalletButton from '../AddToWallet/AddToWalletButton'

import Image from 'next/image'

///////////////
import { ChainId, ERC20Token, KKUB } from '@pancakeswap/sdk'
// const usdt = new ERC20Token(ChainId.BKC_TESTNET, '0x866553520e991Ec3DD9750ace65Fe6E102bb1bAb', 18, 'USDT', 'Tether USD')
const kkub = new ERC20Token(ChainId.BKC, '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5', 18, 'KKUB', 'KKUB')

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })<{ zapStyle?: ZapStyle }>`
  border-radius: 18px;
  height: 37px;
  padding: 0px 10px;
  outline: none;
  border: 1px solid transparent;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
  backdrop-filter: blur(4px);
  opacity: 1;
  ${({ zapStyle, theme }) =>
    zapStyle &&
    css`
      padding: 8px;
      background: ${theme.colors.background};
      border: 1px solid ${theme.colors.cardBorder};
      border-radius: ${zapStyle === 'zap' ? '0px' : '8px'} 8px 0px 0px;
      height: auto;
    `};
`
const InputText = styled.div`
  font-size: 30px;
  color: rgb(223, 223, 233);
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem=;
  line-height: 1rem;
`
const InputPanel = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 30px
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 17px 20px 18px;
  gap: 17px;
  box-shadow: 0 0 6px #0000000d, 0 6px 10px #0000000a, 0 4px 10px #00000003;
`
const PercentageContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`
const ButtonPercentage = styled.div`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-transform: none;
  font-family: Inter, sans-serif;
  font-weight: 600;
  min-width: 64px;
  color: ${({ theme }) => theme.colors.textSubtle};
  width: 100%;
  line-height: 1.65;
  font-size: 13px;
  outline: 0px;
  margin: 0px;
  text-decoration: none;
  padding: 3px 9px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.lightGray};
  border-image: initial;
  border-radius: 12px;
`
// const InputPanel = styled.div`
//   display: flex;
//   flex-flow: column nowrap;
//   position: relative;
//   background-color: ${({ theme }) => theme.colors.backgroundAlt};
//   z-index: 1;
//   gap: 50px;
//   padding: 25px 0px;
// `

const Container = styled.div<{ zapStyle?: ZapStyle; error?: boolean }>`
  border-radius: 16px;
  // background-color: ${({ theme }) => theme.colors.input};
  // box-shadow: ${({ theme, error }) => theme.shadows[error ? 'warning' : 'inset']};
  ${({ zapStyle }) =>
    !!zapStyle &&
    css`
      border-radius: 0px 16px 16px 16px;
    `};
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 17px;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.6;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

type ZapStyle = 'noZap' | 'zap'

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onInputBlur?: () => void
  onPercentInput?: (percent: number) => void
  onMax?: () => void
  showQuickInputButton?: boolean
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | StablePair | null
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  commonBasesType?: string
  zapStyle?: ZapStyle
  beforeButton?: React.ReactNode
  disabled?: boolean
  error?: boolean
  showBUSD?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onInputBlur,
  onPercentInput,
  onMax,
  showQuickInputButton = false,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  zapStyle,
  beforeButton,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
  commonBasesType,
  disabled,
  error,
  showBUSD,
}: CurrencyInputPanelProps) {
  const { address: account } = useAccount()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()

  const token = pair ? pair.liquidityToken : currency?.isToken ? currency : null
  const tokenAddress = token ? isAddress(token.address) : null

  const amountInDollar = useBUSDCurrencyAmount(
    showBUSD ? currency : undefined,
    Number.isFinite(+value) ? +value : undefined,
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
      commonBasesType={commonBasesType}
    />,
  )

  return (
    <Box position="relative" id={id}>
      <Flex alignItems="center" justifyContent="space-between">
        {/* Balance */}
        {/* {account && (
          <Text
            onClick={!disabled && onMax}
            color="textSubtle"
            fontSize="14px"
            style={{ display: 'inline', cursor: 'pointer' }}
          >
            {!hideBalance && !!currency
              ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
              : ' -'}
          </Text>
        )} */}
      </Flex>
      {/* Input amount */}
      <InputPanel>
        <Container as="label" zapStyle={zapStyle} error={error}>
          <Flex alignItems="center" justifyContent="space-between">
            {label !== 'To' ? <p>From</p> : <p>To</p>}
            <Flex alignItems="center" style={{ gap: '10px' }}>
              <div
                onClick={() => console.log('Clicked! KUB')}
                style={{
                  borderRadius: '50%',
                  border: '4px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <img src="/KUB.png" alt="Share" width={22} height={22} className="rounded-full" />
              </div>
              <div
                onClick={() => {
                  onCurrencySelect(kkub)
                  console.log('Clicked! KKUB')
                }}
                style={{
                  borderRadius: '50%',
                  border: '4px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <img src="/KKUB.png" alt="Share" width={22} height={22} className="rounded-full" />
              </div>
              <div
                onClick={() => console.log('Clicked! KUBSC')}
                style={{
                  borderRadius: '50%',
                  border: '4px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <Image src="/KUSDC.png" alt="Share" width={22} height={22} className="rounded-full" />
              </div>
              <div
                onClick={() => console.log('Clicked! KUSDT')}
                style={{
                  borderRadius: '50%',
                  border: '4px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <Image src="/KUSDT.png" alt="Share" width={22} height={22} className="rounded-full" />
              </div>
            </Flex>
          </Flex>
          <LabelRow>
            <NumericalInput
              error={error}
              disabled={disabled}
              className="token-amount-input"
              align="left"
              fontSize="lg"
              value={value}
              onBlur={onInputBlur}
              onUserInput={(val) => {
                onUserInput(val)
              }}
            />
            {/* Select Token */}
            <Flex>
              <>
                {beforeButton}
                <CurrencySelectButton
                  zapStyle={zapStyle}
                  className="open-currency-select-button"
                  selected={!!currency}
                  onClick={() => {
                    if (!disableCurrencySelect) {
                      onPresentCurrencyModal()
                    }
                  }}
                >
                  <Flex alignItems="center" justifyContent="space-between">
                    {pair ? (
                      <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
                    ) : currency ? (
                      <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
                    ) : null}
                    {pair ? (
                      <Text id="pair" bold>
                        {pair?.token0.symbol}:{pair?.token1.symbol}
                      </Text>
                    ) : (
                      <Text id="pair" bold>
                        {(currency && currency.symbol && currency.symbol.length > 20
                          ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                              currency.symbol.length - 5,
                              currency.symbol.length,
                            )}`
                          : currency?.symbol) || t('Select a currency')}
                      </Text>
                    )}
                    {!disableCurrencySelect && <ChevronDownIcon />}
                  </Flex>
                </CurrencySelectButton>
                {token && tokenAddress ? (
                  <Flex style={{ gap: '6px' }} ml="10px" alignItems="center">
                    <CopyButton
                      width="16px"
                      buttonColor="textSubtle"
                      text={tokenAddress}
                      tooltipMessage={t('Token address copied')}
                      tooltipTop={-20}
                      tooltipRight={40}
                      tooltipFontSize={12}
                    />
                    <AddToWalletButton
                      variant="text"
                      p="0"
                      height="auto"
                      width="fit-content"
                      tokenAddress={tokenAddress}
                      tokenSymbol={token.symbol}
                      tokenDecimals={token.decimals}
                      tokenLogo={token instanceof WrappedTokenInfo ? token.logoURI : undefined}
                    />
                  </Flex>
                ) : null}
              </>
            </Flex>
          </LabelRow>
          {/* Balance */}
          <div>
            {account && (
              <Flex justifyContent="flex-end" marginBottom={`12px`}>
                <Text
                  onClick={!disabled && onMax}
                  color="textSubtle"
                  fontSize="14px"
                  style={{ display: 'inline', cursor: 'pointer' }}
                >
                  {!hideBalance && !!currency
                    ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
                    : ' -'}
                </Text>
              </Flex>
            )}
            <InputRow selected={disableCurrencySelect}>
              {/* {!!currency && showBUSD && Number.isFinite(amountInDollar) && (
              <Text fontSize="12px" color="textSubtle" mr="12px">
                ~{formatNumber(amountInDollar)} USD
              </Text>
            )} */}
              {account && currency && selectedCurrencyBalance?.greaterThan(0) && !disabled && label !== 'To' && (
                <PercentageContainer>
                  {showQuickInputButton &&
                    onPercentInput &&
                    [25, 50, 75, 100].map((percent) => (
                      <ButtonPercentage
                        onClick={() => {
                          onPercentInput(percent)
                        }}
                      >
                        {percent}%
                      </ButtonPercentage>
                    ))}
                </PercentageContainer>
              )}
            </InputRow>
          </div>
        </Container>
        {disabled && <Overlay />}
      </InputPanel>
    </Box>
  )
}

import styled from 'styled-components'
import useLastTruthy from 'hooks/useLast'
import { AdvancedSwapDetails, AdvancedSwapDetailsProps } from './AdvancedSwapDetails'

// const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
//   display: flex;
//   align-items: center;
//   box-sizing: border-box;
//   cursor: pointer;
//   vertical-align: middle;
//   appearance: none;
//   text-transform: none;
//   font-weight: 500;
//   font-size: 0.875rem;
//   line-height: 1.75;
//   min-width: 64px;
//   color: rgb(82, 78, 191);
//   width: 100%;
//   min-height: 36px;
//   outline: 0px;
//   border-width: 0px;
//   border-style: initial;
//   border-color: initial;
//   border-image: initial;
//   margin: 0px;
//   text-decoration: none;
//   border-radius: 1rem;
//   background: rgba(255, 255, 255, 0.7);
//   padding: 16px 20px;
// `
// background-color: ${({ theme }) => theme.colors.invertedContrast};

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  // margin-top: ${({ show }) => (show ? '16px' : 0)};
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.invertedContrast};

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
`

export default function AdvancedSwapDetailsDropdown({ trade, ...rest }: AdvancedSwapDetailsProps) {
  const lastTrade = useLastTruthy(trade)

  return (
    <>
      <AdvancedSwapDetails {...rest} trade={trade ?? lastTrade ?? undefined} />
    </>
  )
}

import {
  ChartDisableIcon,
  ChartIcon,
  Swap,
  Flex,
  HistoryIcon,
  IconButton,
  NotificationDot,
  useModal,
} from '@pancakeswap/uikit'
import TransactionsModal from 'components/App/Transactions/TransactionsModal'
import GlobalSettings from 'components/Menu/GlobalSettings'
import RefreshIcon from 'components/Svg/RefreshIcon'
import { ReactElement, useCallback, useContext } from 'react'
import { useExpertModeManager } from 'state/user/hooks'
import styled from 'styled-components'
import { SettingsMode } from '../../../components/Menu/GlobalSettings/types'
import { SwapFeaturesContext } from '../SwapFeaturesContext'

interface Props {
  title: string | ReactElement
  subtitle: string
  noConfig?: boolean
  setIsChartDisplayed?: React.Dispatch<React.SetStateAction<boolean>>
  isChartDisplayed?: boolean
  hasAmount: boolean
  onRefreshPrice: () => void
}

const ColoredIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.textSubtle};
`

const settingBar = styled.div`
  background-color: ${({ theme }) => `${theme.colors.failure33}`};
  display: flex;
  align-items: center;
  width: 100%;
  padding: ;
`

const CurrencyInputHeader: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  subtitle,
  hasAmount,
  onRefreshPrice,
}) => {
  const { isChartSupported, isChartDisplayed, setIsChartDisplayed } = useContext(SwapFeaturesContext)
  const [expertMode] = useExpertModeManager()
  const toggleChartDisplayed = () => {
    setIsChartDisplayed((currentIsChartDisplayed) => !currentIsChartDisplayed)
  }
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  const handleOnClick = useCallback(() => onRefreshPrice?.(), [onRefreshPrice])

  return (
    <>
      <>
        {title}
        {subtitle}
      </>
      <Flex justifyContent="flex-end">
        <IconButton variant="text" scale="sm" onClick={handleOnClick}>
          <RefreshIcon disabled={!hasAmount} color="textSubtle" width="27px" />
        </IconButton>
        <NotificationDot show={expertMode}>
          <GlobalSettings color="textSubtle" mr="0" mode={SettingsMode.SWAP_LIQUIDITY} />
        </NotificationDot>
      </Flex>
    </>
  )
}

export default CurrencyInputHeader

import { useCallback, useState, useRef, useEffect } from 'react'
import { Currency, Token } from '@pancakeswap/sdk'
import {
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBackButton,
  ModalCloseButton,
  ModalBody,
  InjectedModalProps,
  Heading,
  Button,
  useMatchBreakpoints,
  MODAL_SWIPE_TO_CLOSE_VELOCITY,
} from '@pancakeswap/uikit'
import styled from 'styled-components'
import { usePreviousValue } from '@pancakeswap/hooks'
import { TokenList } from '@uniswap/token-lists'
import { useTranslation } from '@pancakeswap/localization'
import CurrencySearch from './CurrencySearch'
import ImportToken from './ImportToken'
import Manage from './Manage'
import ImportList from './ImportList'
import { CurrencyModalView } from './types'

import Column, { AutoColumn } from '../Layout/Column'
import { AutoRow } from '../Layout/Row'

const Footer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  text-align: center;
`
const StyledModalContainer = styled(ModalContainer)`
  width: 100%;
  min-width: 320px;
  max-width: 488px !important;
  min-height: calc(var(--vh, 1vh) * 80);
  ${({ theme }) => theme.mediaQueries.md} {
    min-height: auto;
  }
`

const StyledModalBody = styled(ModalBody)`
  padding: 24px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export interface CurrencySearchModalProps extends InjectedModalProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  commonBasesType?: string
}

export default function CurrencySearchModal({
  onDismiss = () => null,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases = true,
  commonBasesType,
}: CurrencySearchModalProps) {
  const [modalView, setModalView] = useState<CurrencyModalView>(CurrencyModalView.search)

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onDismiss?.()
      onCurrencySelect(currency)
      console.log('2')
      console.log(currency)
    },
    [onDismiss, onCurrencySelect],
  )

  // for token import view
  const prevView = usePreviousValue(modalView)

  // used for import token flow
  const [importToken, setImportToken] = useState<Token | undefined>()

  // used for import list
  const [importList, setImportList] = useState<TokenList | undefined>()
  const [listURL, setListUrl] = useState<string | undefined>()

  const { t } = useTranslation()

  const config = {
    [CurrencyModalView.search]: { title: t('Select a Token'), onBack: undefined },
    [CurrencyModalView.manage]: { title: t('Manage'), onBack: () => setModalView(CurrencyModalView.search) },
    [CurrencyModalView.importToken]: {
      title: t('Import Tokens'),
      onBack: () =>
        setModalView(prevView && prevView !== CurrencyModalView.importToken ? prevView : CurrencyModalView.search),
    },
    [CurrencyModalView.importList]: { title: t('Import List'), onBack: () => setModalView(CurrencyModalView.search) },
  }
  const { isMobile } = useMatchBreakpoints()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(undefined)
  useEffect(() => {
    if (!wrapperRef.current) return
    setHeight(wrapperRef.current.offsetHeight - 330)
  }, [])

  return (
    <StyledModalContainer
      drag={isMobile ? 'y' : false}
      dragConstraints={{ top: 0, bottom: 600 }}
      dragElastic={{ top: 0 }}
      dragSnapToOrigin
      onDragStart={() => {
        if (wrapperRef.current) wrapperRef.current.style.animation = 'none'
      }}
      // @ts-ignore
      onDragEnd={(e, info) => {
        if (info.velocity.y > MODAL_SWIPE_TO_CLOSE_VELOCITY && onDismiss) onDismiss()
      }}
      ref={wrapperRef}
    >
      <ModalHeader>
        <AutoColumn style={{ width: '100%' }}>
          <AutoRow style={{ padding: '12px 8px 0px 8px', backgroundColor: 'white' }}>
            <ModalTitle style={{ padding: '0px 0px 0px 14px' }}>
              {config[modalView].onBack && <ModalBackButton onBack={config[modalView].onBack} />}
              <Heading>{config[modalView].title}</Heading>
            </ModalTitle>
            <ModalCloseButton onDismiss={onDismiss} />
          </AutoRow>
          <CurrencySearch
            onCurrencySelect={handleCurrencySelect}
            selectedCurrency={selectedCurrency}
            otherSelectedCurrency={otherSelectedCurrency}
            showCommonBases={showCommonBases}
            commonBasesType={commonBasesType}
            showImportView={() => setModalView(CurrencyModalView.importToken)}
            setImportToken={setImportToken}
            height={height}
          />
        </AutoColumn>
      </ModalHeader>
      {/* <StyledModalBody>
        {modalView === CurrencyModalView.search && (
          <Footer>
            <Button
              scale="sm"
              variant="text"
              onClick={() => setModalView(CurrencyModalView.manage)}
              className="list-token-manage-button"
            >
              {t('Manage Tokens')}
            </Button>
          </Footer>
        )}
      </StyledModalBody> */}
    </StyledModalContainer>
  )
}

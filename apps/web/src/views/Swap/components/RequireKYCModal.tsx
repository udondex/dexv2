import NiceModal from '@ebay/nice-modal-react'
import { useTranslation } from '@pancakeswap/localization'
import { Box, Flex, Modal, Text } from '@pancakeswap/uikit'
import QRCode from 'qrcode.react'
import { useCallback } from 'react'
import styled from 'styled-components'

const StyledModalBody = styled(Flex)`
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  max-width: 100%;
`

const StyledBox = styled(Box)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  padding: 16px;
`

const QRCodeWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
  padding: 16px;
  background: white;
  border-radius: 16px;
`

export const RequireKYCModal = NiceModal.create(() => {
  const modal = NiceModal.useModal()
  const { t } = useTranslation()

  const handleDismiss = useCallback(() => {
    modal.hide()
  }, [modal])

  return (
    <Modal title={t('Verification Required')} onDismiss={handleDismiss} headerBackground="gradientCardHeader">
      <StyledModalBody>
        <Text>
          {t('To proceed with this transaction, you need to complete the verification process on Bitkub Chain.')}
        </Text>

        <StyledBox>
          <Text color="warning" bold mb="8px">
            {t('Important Notice')}
          </Text>
          <Text fontSize="14px">
            {t('Please scan the QR code with your mobile device to complete the verification process.')}
          </Text>
        </StyledBox>

        <QRCodeWrapper>
          <QRCode value="https://kkub-otp.bitkubchain.com" size={200} level="H" includeMargin renderAs="svg" />
          <Text textAlign="center" small color="textSubtle">
            {t('Scan this QR code with your mobile device')}
          </Text>
        </QRCodeWrapper>
      </StyledModalBody>
    </Modal>
  )
})

// Helper function to show the modal
export const showRequireKYCModal = () => {
  return NiceModal.show(RequireKYCModal)
}

export default RequireKYCModal

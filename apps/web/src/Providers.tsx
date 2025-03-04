import { LanguageProvider } from '@pancakeswap/localization'
import { light, ModalProvider, UIKitProvider } from '@pancakeswap/uikit'
import { WagmiProvider } from '@pancakeswap/wagmi'
import { Store } from '@reduxjs/toolkit'
import { HistoryManagerProvider } from 'contexts/HistoryContext'
import { fetchStatusMiddleware } from 'hooks/useSWRContract'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'
import { client } from 'utils/wagmi'
import NiceModal from '@ebay/nice-modal-react'

const StyledUIKitProvider: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
  return (
    <UIKitProvider theme={light} {...props}>
      {children}
    </UIKitProvider>
  )
}

const Providers: React.FC<React.PropsWithChildren<{ store: Store; children: React.ReactNode }>> = ({
  children,
  store,
}) => {
  return (
    <WagmiProvider client={client}>
      <Provider store={store}>
        <NextThemeProvider defaultTheme="light" attribute="data-theme">
          <StyledUIKitProvider>
            <LanguageProvider>
              <SWRConfig
                value={{
                  use: [fetchStatusMiddleware],
                }}
              >
                <HistoryManagerProvider>
                  <NiceModal.Provider>
                    <ModalProvider>{children}</ModalProvider>
                  </NiceModal.Provider>
                </HistoryManagerProvider>
              </SWRConfig>
            </LanguageProvider>
          </StyledUIKitProvider>
        </NextThemeProvider>
      </Provider>
    </WagmiProvider>
  )
}

export default Providers

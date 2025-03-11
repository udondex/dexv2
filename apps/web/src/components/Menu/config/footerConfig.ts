import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        // NOTED: Update this to the correct URL
        href: 'https://docs.pancakeswap.finance/contact-us',
      },
      {
        label: t('Udon Community'),
        // NOTED: Update this to the correct URL
        href: 'https://docs.pancakeswap.finance/contact-us',
      },
    ],
  },
  {
    label: t('Ecosystem'),
    items: [
      {
        label: t('Swap'),
        // NOTED: Update this to the correct URL
        href: 'https://docs.pancakeswap.finance/contact-us/customer-support',
      },
      {
        label: t('Liquidity'),
        // NOTED: Update this to the correct URL
        href: 'https://docs.pancakeswap.finance/help/troubleshooting',
      },
      {
        label: t('Info'),
        // NOTED: Update this to the correct URL
        href: 'https://docs.pancakeswap.finance/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        // NOTED: Update this to the correct URL
        href: 'https://github.com/pancakeswap',
      },
      {
        label: t('Documentation'),
        // NOTED: Update this to the correct URL
        href: 'https://docs.pancakeswap.finance',
      },
      {
        label: t('Audits'),
        // NOTED: Update this to the correct URL
        href: 'https://docs.pancakeswap.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited',
      },
    ],
  },
]

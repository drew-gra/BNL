import './globals.css'

export const metadata = {
  title: 'Bread & Law: Earned-First PR',
  description: 'Earned-First Public Relations',
  openGraph: {
    title: 'Bread & Law: Earned-First PR',
    description: 'Earned-First Public Relations',
    url: 'https://www.breadandlaw.com',
    siteName: 'Bread & Law',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Bread & Law: Earned-First PR',
    description: 'Earned-First Public Relations',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
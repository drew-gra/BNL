import './globals.css'

export const metadata = {
  title: 'Bread & Law: Earned-First PR',
  description: 'Brooklyn-based earned-first public relations. We measure what matters: open rates, response rates, and real access to media.',
  openGraph: {
    title: 'Bread & Law: Earned-First PR',
    description: 'Brooklyn-based earned-first public relations. We measure what matters: open rates, response rates, and real access to media.',
    url: 'https://www.breadandlaw.com',
    siteName: 'Bread & Law',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Bread & Law: Earned-First PR',
    description: 'Brooklyn-based earned-first public relations. We measure what matters: open rates, response rates, and real access to media.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
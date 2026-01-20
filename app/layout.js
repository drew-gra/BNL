import './globals.css'

export const metadata = {
  title: 'Bread & Law',
  description: 'Earned-First Public Relations',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Bread & Law',
    description: 'Earned-First Public Relations',
    type: 'website',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Bread & Law',
    description: 'Earned-First Public Relations',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  )
}
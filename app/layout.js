export const metadata = {
  title: 'Best Neighborhoods to Stay',
  description: 'Find the perfect neighborhood for your trip',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

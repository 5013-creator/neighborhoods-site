export const metadata = {
  title: 'Best Neighborhoods to Stay',
  description: 'Find the perfect neighborhood for your trip',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>

        <header style={{
          borderBottom: '1px solid #e0e0e0',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff'
        }}>
          <a href="/" style={{
            fontWeight: '700',
            fontSize: '1.2rem',
            textDecoration: 'none',
            color: '#111'
          }}>
            NeighborhoodStay
          </a>
          <nav>
            {/* City links added here once cities go live */}
          </nav>
        </header>

        <main>
          {children}
        </main>

        <footer style={{
          borderTop: '1px solid #e0e0e0',
          padding: '24px',
          marginTop: '48px',
          backgroundColor: '#fafafa',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#666'
        }}>
          <p style={{ margin: '0 0 8px 0' }}>
            This site contains affiliate links. We may earn a commission at no extra cost to you.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <a href="/privacy-policy" style={{ color: '#444', textDecoration: 'underline' }}>
              Privacy Policy
            </a>
          </p>
          <p style={{ margin: 0 }}>© 2026 neighborhoodstay.com</p>
        </footer>

      </body>
    </html>
  )
}

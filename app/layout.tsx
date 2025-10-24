import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Generatore Prompt Analisi di Mercato',
  description: 'Crea un prompt completo per analisi di mercato in italiano',
  metadataBase: new URL('https://agentic-560d9451.vercel.app')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return (
    <html>
    <head>
      <link rel="icon" type="image/png" href="/favicon.svg" />
      {/* Другие глобальные мета-теги */}
    </head>
    <body>{children}</body>
    </html>
  );
}
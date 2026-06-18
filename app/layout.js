import "./globals.css";

export const metadata = {
  title: "Analise de Dividas Bancarias",
  description:
    "Plataforma de triagem preliminar, captacao qualificada e orientacao inicial em direito bancario e relacao consumerista."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

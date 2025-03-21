import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CalculadoraIR from './Calculadora_IR_2025-2026';

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        {/* Título da página */}
        <title>Calculadora IRPF 2026 - Compare o Imposto de Renda</title>

        {/* Descrição do site */}
        <meta name="description" content="Use nossa Calculadora de Imposto de Renda 2026 para comparar quanto você pagaria na nova tabela do IR. Simples, rápido e gratuito!" />

        {/* Palavras-chave para indexação */}
        <meta name="keywords" content="Imposto de Renda, IRPF 2026, cálculo IR, tabela IR 2026, economia IRPF, quanto pagar de imposto" />

        {/* Indexação pelo Google */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph para redes sociais */}
        <meta property="og:title" content="Calculadora IRPF 2026 - Compare o Imposto de Renda" />
        <meta property="og:description" content="Veja quanto imposto de renda você pagaria na nova tabela de 2026. Simule agora!" />
        <meta property="og:image" content="https://seu-site.com/imagem-irpf.jpg" />
        <meta property="og:url" content="https://seu-site.vercel.app/" />
      </Helmet>
      <CalculadoraIR />
    </HelmetProvider>
  );
};

export default App;

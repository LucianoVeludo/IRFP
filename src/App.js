import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CalculadoraIR from './Calculadora_IR_2025-2026';

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        {/* Código de verificação do Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-431303169883797"
          crossOrigin="anonymous"></script>
      </Helmet>
      <CalculadoraIR />
    </HelmetProvider>
  );
};

export default App;

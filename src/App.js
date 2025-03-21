import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CalculadoraIR from './Calculadora_IR_2025-2026';

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Calculadora IRPF 2026</title>
      </Helmet>
      <CalculadoraIR />
    </HelmetProvider>
  );
};

export default App;

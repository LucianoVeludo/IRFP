import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CalculadoraIR from './Calculadora_IR_2025-2026';
import CalculadoraFerias from './components/CalculadoraFerias';
import CalculadoraRescisao from './components/CalculadoraRescisao';
import CalculadoraDecimoTerceiro from './components/CalculadoraDecimoTerceiro';
import CalculadoraHorasExtras from './components/CalculadoraHorasExtras';
import SimuladorSalarioLiquido from './components/SimuladorSalarioLiquido';
import CalculadoraIRHistorica from './components/CalculadoraIRHistorica';
import Layout from './components/Layout';
import './styles/App.css';

const App = () => {
  const [calculadoraAtiva, setCalculadoraAtiva] = useState('ir-historica');

  const renderCalculadora = () => {
    switch (calculadoraAtiva) {
      case 'ir':
        return <CalculadoraIR />;
      case 'ir-historica':
        return <CalculadoraIRHistorica />;
      case 'ferias':
        return <CalculadoraFerias />;
      case 'rescisao':
        return <CalculadoraRescisao />;
      case 'decimoTerceiro':
        return <CalculadoraDecimoTerceiro />;
      case 'horasExtras':
        return <CalculadoraHorasExtras />;
      case 'salarioLiquido':
        return <SimuladorSalarioLiquido />;
      default:
        return <CalculadoraIRHistorica />;
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Calculadoras Trabalhistas - Imposto de Renda, Férias, 13º e mais</title>
        <meta name="description" content="Calculadoras trabalhistas gratuitas: Imposto de Renda, Férias, Rescisão, 13º Salário, Horas Extras e Salário Líquido. Simples, rápido e atualizado!" />
        <meta name="keywords" content="Calculadora trabalhista, IRPF, férias, rescisão, 13º salário, horas extras, salário líquido, CLT" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Calculadoras Trabalhistas - Imposto de Renda, Férias, 13º e mais" />
        <meta property="og:description" content="Calculadoras trabalhistas gratuitas para trabalhadores CLT. Simule agora!" />
        <meta property="og:image" content="https://seu-site.com/imagem-calculadoras.jpg" />
        <meta property="og:url" content="https://irfp.vercel.app/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <div className="app-container">
        <header className="app-header">
          <h1>Calculadoras Trabalhistas</h1>
          <p className="app-subtitle">Ferramentas gratuitas para trabalhadores CLT</p>
        </header>
        
        <nav className="calculadoras-nav">
          <button 
            className={`nav-button ${calculadoraAtiva === 'ir-historica' ? 'active' : ''}`}
            onClick={() => setCalculadoraAtiva('ir-historica')}
          >
            IR Histórico
          </button>
          <button 
            className={`nav-button ${calculadoraAtiva === 'ir' ? 'active' : ''}`}
            onClick={() => setCalculadoraAtiva('ir')}
          >
            IR 2025-2026
          </button>
          <button 
            className={`nav-button ${calculadoraAtiva === 'ferias' ? 'active' : ''}`}
            onClick={() => setCalculadoraAtiva('ferias')}
          >
            Férias
          </button>
          <button 
            className={`nav-button ${calculadoraAtiva === 'rescisao' ? 'active' : ''}`}
            onClick={() => setCalculadoraAtiva('rescisao')}
          >
            Rescisão
          </button>
          <button 
            className={`nav-button ${calculadoraAtiva === 'decimoTerceiro' ? 'active' : ''}`}
            onClick={() => setCalculadoraAtiva('decimoTerceiro')}
          >
            13º Salário
          </button>
          <button 
            className={`nav-button ${calculadoraAtiva === 'horasExtras' ? 'active' : ''}`}
            onClick={() => setCalculadoraAtiva('horasExtras')}
          >
            Horas Extras
          </button>
          <button 
            className={`nav-button ${calculadoraAtiva === 'salarioLiquido' ? 'active' : ''}`}
            onClick={() => setCalculadoraAtiva('salarioLiquido')}
          >
            Salário Líquido
          </button>
        </nav>
        
        <Layout>
          <div className="calculadora-container">
            {renderCalculadora()}
          </div>
        </Layout>
        
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Calculadoras Trabalhistas. Todos os direitos reservados.</p>
          <p>Desenvolvido por <a href="https://github.com/LucianoVeludo" target="_blank" rel="noopener noreferrer">Luciano Veludo</a>.</p>
          <p className="disclaimer">Esta ferramenta é apenas para fins informativos e não substitui a consulta a um profissional.</p>
        </footer>
      </div>
    </HelmetProvider>
  );
};

export default App;

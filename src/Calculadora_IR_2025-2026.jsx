import React, { useState } from 'react';

const CalculadoraIR = () => {
  const [salario, setSalario] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularImpostoAtual = (salario) => {
    if (salario <= 2259.20) return 0;
    if (salario <= 2826.65) return salario * 0.075 - 169.44;
    if (salario <= 3751.05) return salario * 0.15 - 381.44;
    if (salario <= 4664.68) return salario * 0.225 - 662.77;
    return salario * 0.275 - 896;
  };

  const calcularImpostoNovo = (salario) => {
    if (salario <= 5000) return 0;
    if (salario <= 7000) return (salario - 5000) * 0.075;
    if (salario <= 10000) return (salario - 7000) * 0.15 + 150;
    if (salario <= 15000) return (salario - 10000) * 0.225 + 600;
    if (salario <= 50000) return (salario - 15000) * 0.275 + 1710;
    return (salario - 50000) * 0.30 + 11385;
  };

  const compararImpostos = () => {
    const salarioNumero = Number(salario);
    const impostoAtual = calcularImpostoAtual(salarioNumero);
    const impostoNovo = calcularImpostoNovo(salarioNumero);
    const diferenca = impostoAtual - impostoNovo;

    setResultado({
      atual: impostoAtual,
      novo: impostoNovo,
      diferenca: diferenca,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-white shadow-md py-6 px-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Calculadora IR 2026</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg">
          Calcule Agora
        </button>
      </header>

      {/* Seção Hero (Destaque) */}
      <div className="relative bg-blue-500 text-white text-center py-20 px-6">
        <h2 className="text-5xl font-extrabold mb-4">Descubra quanto você pode economizar</h2>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Compare os impostos da tabela atual e a nova proposta para 2026 de forma simples e rápida.
        </p>
      </div>

      {/* Seção de Cálculo */}
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="bg-white shadow-lg p-10 rounded-xl w-full max-w-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Faça seu cálculo</h2>

          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            placeholder="Digite seu salário"
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
          <button
            onClick={compararImpostos}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Calcular
          </button>

          {resultado && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-700">
                📌 <strong>Imposto Atual (2024):</strong>{' '}
                <span className="text-red-600 font-semibold">R$ {resultado.atual.toFixed(2)}</span>
              </p>
              <p className="text-xl text-gray-700">
                📌 <strong>Novo Imposto (2026):</strong>{' '}
                <span className="text-green-600 font-semibold">R$ {resultado.novo.toFixed(2)}</span>
              </p>
              <p className="mt-5 text-2xl font-bold text-blue-600">
                {resultado.diferenca > 0 ? '🎉 Economia:' : '⚠️ Custo Adicional:'}{' '}
                R$ {Math.abs(resultado.diferenca).toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        <p>&copy; 2024 Calculadora IR. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default CalculadoraIR;

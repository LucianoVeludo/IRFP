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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Calculadora de Imposto de Renda
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Informe seu salário (R$)
          </label>
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            placeholder="Exemplo: 5000"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={compararImpostos}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Calcular
        </button>

        {resultado && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg">
              <span className="font-bold text-gray-700">📌 Imposto Atual (2024):</span>{' '}
              <span className="text-red-600 font-semibold">R$ {resultado.atual.toFixed(2)}</span>
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-700">📌 Novo Imposto (2026):</span>{' '}
              <span className="text-green-600 font-semibold">R$ {resultado.novo.toFixed(2)}</span>
            </p>
            <p className="text-lg font-bold mt-3 text-gray-900">
              {resultado.diferenca > 0 ? '🎉 Você vai economizar:' : '⚠️ Você vai pagar mais:'}{' '}
              <span className="text-blue-600">R$ {Math.abs(resultado.diferenca).toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculadoraIR;

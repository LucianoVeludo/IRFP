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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-10 bg-white shadow-lg rounded-xl text-center">
        {/* Imagem relacionada ao imposto */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/2266/2266400.png"
          alt="Imposto de Renda"
          className="mx-auto w-24 mb-4"
        />

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
          Calculadora de Imposto de Renda
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Compare quanto você pagaria de imposto na tabela atual e na proposta para 2026.
        </p>

        {/* Campo de entrada */}
        <div className="flex justify-center items-center space-x-4">
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            placeholder="Digite seu salário"
            className="w-1/2 p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none transition-all"
          />
          <button
            onClick={compararImpostos}
            className="px-6 py-4 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all"
          >
            Calcular
          </button>
        </div>

        {resultado && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-xl font-medium text-gray-700">
              📌 <strong>Imposto Atual (2024):</strong>{' '}
              <span className="text-red-600 font-semibold">R$ {resultado.atual.toFixed(2)}</span>
            </p>
            <p className="text-xl font-medium text-gray-700">
              📌 <strong>Novo Imposto (2026):</strong>{' '}
              <span className="text-green-600 font-semibold">R$ {resultado.novo.toFixed(2)}</span>
            </p>
            <p className="mt-5 text-2xl font-bold">
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

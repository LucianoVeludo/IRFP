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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {/* Título */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Calculadora de Imposto de Renda
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Compare quanto você pagaria de imposto na tabela atual e na proposta para 2026.
      </p>

      {/* Caixa de Cálculo */}
      <div className="bg-white shadow-lg p-10 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Faça seu cálculo</h2>

        {/* Entrada com "R$" antes do campo */}
        <div className="flex items-center border border-gray-300 rounded-lg p-3 text-lg">
          <span className="mr-2 text-gray-700">R$</span>
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            placeholder="0,00"
            className="w-full text-lg focus:outline-none"
          />
        </div>

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

      {/* Rodapé com GitHub */}
      <footer className="text-gray-500 text-sm mt-10">
        &copy; {new Date().getFullYear()} Calculadora IR. Todos os direitos reservados.
        <br />
        Desenvolvido por <a href="https://github.com/LucianoVeludo" className="text-blue-600 hover:underline">Luciano Veludo</a>.
      </footer>
    </div>
  );
};

export default CalculadoraIR;

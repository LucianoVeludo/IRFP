import React, { useState } from 'react';

const CalculadoraIR = () => {
  const [salario, setSalario] = useState('');

  // Função para formatar o valor em "###.###,##"
  const formatarValor = (valor) => {
    const numeroLimpo = valor.replace(/\D/g, '');
    const numeroFormatado = Number(numeroLimpo) / 100;
    return numeroFormatado.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const handleSalarioChange = (e) => {
    const valorFormatado = formatarValor(e.target.value);
    setSalario(valorFormatado);
  };

  const [resultado, setResultado] = useState(null);

  const calcularImpostoAtual = (salario) => {
    const salarioNum = Number(salario.replace(/\./g, '').replace(',', '.'));
    if (salarioNum <= 2259.20) return 0;
    if (salarioNum <= 2826.65) return salarioNum * 0.075 - 169.44;
    if (salarioNum <= 3751.05) return salarioNum * 0.15 - 381.44;
    if (salarioNum <= 4664.68) return salarioNum * 0.225 - 662.77;
    return salarioNum * 0.275 - 896;
  };

  const calcularImpostoNovo = (salario) => {
    const salarioNum = Number(salario.replace(/\./g, '').replace(',', '.'));
    if (salarioNum <= 5000) return 0;
    if (salarioNum <= 7000) return (salarioNum - 5000) * 0.075;
    if (salarioNum <= 10000) return (salarioNum - 7000) * 0.15 + 150;
    if (salarioNum <= 15000) return (salarioNum - 10000) * 0.225 + 600;
    if (salarioNum <= 50000) return (salarioNum - 15000) * 0.275 + 1710;
    return (salarioNum - 50000) * 0.30 + 11385;
  };

  const compararImpostos = () => {
    const impostoAtual = calcularImpostoAtual(salario);
    const impostoNovo = calcularImpostoNovo(salario);
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
        <div className="flex items-center space-x-3">
          <span className="text-lg font-medium text-gray-700">Salário em R$</span>
          <input
            type="text"
            value={salario}
            onChange={handleSalarioChange}
            placeholder="0,00"
            className="w-40 p-3 text-lg border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
          <button
            onClick={compararImpostos}
            className="ml-3 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Calcular
          </button>
        </div>

        {resultado && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-700">
              📌 <strong>Imposto Atual (2025):</strong>{' '}
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

      {/* Espaçamento extra antes do rodapé */}
      <div className="mt-12"></div>

      {/* Rodapé com GitHub */}
      <footer className="text-gray-500 text-xs text-center">
        &copy; {new Date().getFullYear()} Calculadora IR. Todos os direitos reservados.
        <br />
        Desenvolvido por <a href="https://github.com/LucianoVeludo" className="text-blue-600 hover:underline">Luciano Veludo</a>.
      </footer>
    </div>
  );
};

export default CalculadoraIR;

import React, { useState } from 'react';

const CalculadoraDecimoTerceiro = () => {
  const [salarioBruto, setSalarioBruto] = useState('');
  const [mesesTrabalhados, setMesesTrabalhados] = useState(12);
  const [resultado, setResultado] = useState(null);

  // Função para formatar o valor em "###.###,##"
  const formatarValor = (valor) => {
    const numeroLimpo = valor.replace(/\D/g, '');
    const numeroFormatado = Number(numeroLimpo) / 100;
    return numeroFormatado.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const handleSalarioChange = (e) => {
    const valorFormatado = formatarValor(e.target.value);
    setSalarioBruto(valorFormatado);
  };

  const calcularDecimoTerceiro = () => {
    // Converte o salário para número
    const salarioNum = Number(salarioBruto.replace(/\./g, '').replace(',', '.'));
    
    // Cálculo do 13º proporcional
    const valorDecimoTerceiro = (salarioNum / 12) * mesesTrabalhados;
    
    // Cálculo do INSS sobre o 13º
    let descontoINSS = 0;
    
    if (valorDecimoTerceiro <= 1412.00) {
      descontoINSS = valorDecimoTerceiro * 0.075;
    } else if (valorDecimoTerceiro <= 2666.68) {
      descontoINSS = valorDecimoTerceiro * 0.09 - 21.18;
    } else if (valorDecimoTerceiro <= 4000.03) {
      descontoINSS = valorDecimoTerceiro * 0.12 - 101.18;
    } else if (valorDecimoTerceiro <= 7786.02) {
      descontoINSS = valorDecimoTerceiro * 0.14 - 181.18;
    } else {
      descontoINSS = 908.86; // Teto do INSS em 2024
    }
    
    // Cálculo do IRRF sobre o 13º
    const baseIRRF = valorDecimoTerceiro - descontoINSS;
    let descontoIRRF = 0;
    
    if (baseIRRF <= 2259.20) {
      descontoIRRF = 0;
    } else if (baseIRRF <= 2826.65) {
      descontoIRRF = baseIRRF * 0.075 - 169.44;
    } else if (baseIRRF <= 3751.05) {
      descontoIRRF = baseIRRF * 0.15 - 381.44;
    } else if (baseIRRF <= 4664.68) {
      descontoIRRF = baseIRRF * 0.225 - 662.77;
    } else {
      descontoIRRF = baseIRRF * 0.275 - 896.00;
    }
    
    // Valor líquido do 13º
    const valorLiquido = valorDecimoTerceiro - descontoINSS - descontoIRRF;
    
    // Primeira parcela (50% do valor bruto, paga até 30/11)
    const primeiraParcela = valorDecimoTerceiro * 0.5;
    
    // Segunda parcela (valor líquido - primeira parcela, paga até 20/12)
    const segundaParcela = valorLiquido - primeiraParcela;
    
    setResultado({
      valorDecimoTerceiro,
      descontoINSS,
      descontoIRRF,
      valorLiquido,
      primeiraParcela,
      segundaParcela
    });
  };

  return (
    <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Calculadora de 13º Salário</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Salário Bruto (R$)</label>
          <input
            type="text"
            value={salarioBruto}
            onChange={handleSalarioChange}
            placeholder="0,00"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Meses Trabalhados no Ano</label>
          <select
            value={mesesTrabalhados}
            onChange={(e) => setMesesTrabalhados(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? 'mês' : 'meses'}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={calcularDecimoTerceiro}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Calcular 13º Salário
        </button>
      </div>
      
      {resultado && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Resultado</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">13º Bruto:</span>
            <span className="text-right font-medium">R$ {resultado.valorDecimoTerceiro.toFixed(2)}</span>
            
            <span className="text-gray-600">Desconto INSS:</span>
            <span className="text-right font-medium text-red-600">- R$ {resultado.descontoINSS.toFixed(2)}</span>
            
            <span className="text-gray-600">Desconto IRRF:</span>
            <span className="text-right font-medium text-red-600">- R$ {resultado.descontoIRRF.toFixed(2)}</span>
            
            <span className="text-gray-600 font-semibold">13º Líquido:</span>
            <span className="text-right font-bold text-green-600">R$ {resultado.valorLiquido.toFixed(2)}</span>
            
            <div className="col-span-2 border-t border-gray-300 my-2"></div>
            
            <span className="text-gray-600">1ª Parcela (até 30/11):</span>
            <span className="text-right font-medium">R$ {resultado.primeiraParcela.toFixed(2)}</span>
            
            <span className="text-gray-600">2ª Parcela (até 20/12):</span>
            <span className="text-right font-medium">R$ {resultado.segundaParcela.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculadoraDecimoTerceiro;

import React, { useState } from 'react';

const CalculadoraFerias = () => {
  const [salarioBruto, setSalarioBruto] = useState('');
  const [diasFerias, setDiasFerias] = useState(30);
  const [comAbono, setComAbono] = useState(false);
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

  const calcularFerias = () => {
    // Converte o salário para número
    const salarioNum = Number(salarioBruto.replace(/\./g, '').replace(',', '.'));
    
    // Cálculo do valor base das férias (proporcional aos dias)
    const valorBaseFeriasMes = salarioNum;
    const valorBaseFeriasDia = valorBaseFeriasMes / 30;
    const valorBaseFerias = valorBaseFeriasDia * diasFerias;
    
    // Adicional de 1/3 sobre o valor das férias
    const adicionalTerco = valorBaseFerias / 3;
    
    // Valor do abono pecuniário (se solicitado)
    const diasAbono = comAbono ? 10 : 0;
    const valorAbono = valorBaseFeriasDia * diasAbono;
    const adicionalTercoAbono = valorAbono / 3;
    
    // Cálculo do INSS sobre férias + 1/3
    const baseINSS = valorBaseFerias + adicionalTerco;
    let descontoINSS = 0;
    
    if (baseINSS <= 1412.00) {
      descontoINSS = baseINSS * 0.075;
    } else if (baseINSS <= 2666.68) {
      descontoINSS = baseINSS * 0.09 - 21.18;
    } else if (baseINSS <= 4000.03) {
      descontoINSS = baseINSS * 0.12 - 101.18;
    } else if (baseINSS <= 7786.02) {
      descontoINSS = baseINSS * 0.14 - 181.18;
    } else {
      descontoINSS = 908.86; // Teto do INSS em 2024
    }
    
    // Cálculo do IRRF sobre férias
    const baseIRRF = baseINSS - descontoINSS;
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
    
    // Valor líquido das férias
    const valorLiquidoFerias = baseINSS - descontoINSS - descontoIRRF;
    
    // Valor total a receber (férias + abono, se houver)
    const valorTotal = valorLiquidoFerias + valorAbono + adicionalTercoAbono;
    
    setResultado({
      valorBaseFerias,
      adicionalTerco,
      valorAbono,
      adicionalTercoAbono,
      descontoINSS,
      descontoIRRF,
      valorLiquidoFerias,
      valorTotal
    });
  };

  return (
    <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Calculadora de Férias</h2>
      
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
          <label className="block text-gray-700 mb-2">Dias de Férias</label>
          <select
            value={diasFerias}
            onChange={(e) => setDiasFerias(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value={30}>30 dias</option>
            <option value={20}>20 dias</option>
            <option value={15}>15 dias</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="abono"
            checked={comAbono}
            onChange={(e) => setComAbono(e.target.checked)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-400"
          />
          <label htmlFor="abono" className="ml-2 text-gray-700">
            Vender 10 dias (Abono Pecuniário)
          </label>
        </div>
        
        <button
          onClick={calcularFerias}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Calcular Férias
        </button>
      </div>
      
      {resultado && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Resultado</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Férias:</span>
            <span className="text-right font-medium">R$ {resultado.valorBaseFerias.toFixed(2)}</span>
            
            <span className="text-gray-600">1/3 Constitucional:</span>
            <span className="text-right font-medium">R$ {resultado.adicionalTerco.toFixed(2)}</span>
            
            {comAbono && (
              <>
                <span className="text-gray-600">Abono Pecuniário:</span>
                <span className="text-right font-medium">R$ {resultado.valorAbono.toFixed(2)}</span>
                
                <span className="text-gray-600">1/3 sobre Abono:</span>
                <span className="text-right font-medium">R$ {resultado.adicionalTercoAbono.toFixed(2)}</span>
              </>
            )}
            
            <span className="text-gray-600">Desconto INSS:</span>
            <span className="text-right font-medium text-red-600">- R$ {resultado.descontoINSS.toFixed(2)}</span>
            
            <span className="text-gray-600">Desconto IRRF:</span>
            <span className="text-right font-medium text-red-600">- R$ {resultado.descontoIRRF.toFixed(2)}</span>
            
            <span className="text-gray-600 font-semibold">Valor Líquido:</span>
            <span className="text-right font-bold text-green-600">R$ {resultado.valorTotal.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculadoraFerias;

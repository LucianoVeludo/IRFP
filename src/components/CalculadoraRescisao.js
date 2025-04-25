import React, { useState } from 'react';

const CalculadoraRescisao = () => {
  const [salarioBruto, setSalarioBruto] = useState('');
  const [tipoRescisao, setTipoRescisao] = useState('semJustaCausa');
  const [tempoServico, setTempoServico] = useState({ anos: 0, meses: 0, dias: 0 });
  const [avisoTrabalhado, setAvisoTrabalhado] = useState(false);
  const [feriasVencidas, setFeriasVencidas] = useState(false);
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

  const handleTempoServicoChange = (campo, valor) => {
    setTempoServico({
      ...tempoServico,
      [campo]: parseInt(valor) || 0
    });
  };

  const calcularRescisao = () => {
    // Converte o salário para número
    const salarioNum = Number(salarioBruto.replace(/\./g, '').replace(',', '.'));
    
    // Calcula o tempo total de serviço em dias
    const diasTotais = (tempoServico.anos * 365) + (tempoServico.meses * 30) + tempoServico.dias;
    
    // Saldo de salário (proporcional aos dias trabalhados no mês)
    const diasNoMes = 30; // Considerando mês comercial
    const diasTrabalhados = Math.min(diasNoMes, tempoServico.dias);
    const saldoSalario = (salarioNum / diasNoMes) * diasTrabalhados;
    
    // 13º proporcional
    const mesesTrabalhados = Math.floor(diasTotais / 30) % 12;
    const decimoTerceiroProporcional = (salarioNum / 12) * mesesTrabalhados;
    
    // Férias proporcionais
    const feriasProporcional = (salarioNum / 12) * mesesTrabalhados;
    const adicionalTercoFerias = feriasProporcional / 3;
    
    // Férias vencidas (se aplicável)
    const feriasVencidasValor = feriasVencidas ? salarioNum : 0;
    const adicionalTercoFeriasVencidas = feriasVencidas ? salarioNum / 3 : 0;
    
    // Aviso prévio
    let avisoPrevio = 0;
    if (tipoRescisao === 'semJustaCausa' && !avisoTrabalhado) {
      avisoPrevio = salarioNum;
      
      // Adicional de 3 dias por ano trabalhado (limitado a 90 dias)
      const anosCompletos = Math.floor(diasTotais / 365);
      const diasAdicionais = Math.min(anosCompletos * 3, 90);
      avisoPrevio += (salarioNum / 30) * diasAdicionais;
    }
    
    // FGTS
    let fgts = 0;
    let multaFGTS = 0;
    
    // Saldo do FGTS (8% sobre o salário durante o tempo de serviço)
    const mesesTotais = Math.floor(diasTotais / 30);
    fgts = (salarioNum * 0.08) * mesesTotais;
    
    // Multa do FGTS (40% para demissão sem justa causa)
    if (tipoRescisao === 'semJustaCausa') {
      multaFGTS = fgts * 0.4;
    }
    
    // Cálculo do INSS sobre saldo de salário + 13º
    const baseINSS = saldoSalario + decimoTerceiroProporcional;
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
    
    // Cálculo do IRRF
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
    
    // Total de proventos
    const totalProventos = saldoSalario + decimoTerceiroProporcional + 
                          feriasProporcional + adicionalTercoFerias + 
                          feriasVencidasValor + adicionalTercoFeriasVencidas + 
                          avisoPrevio + multaFGTS;
    
    // Total de descontos
    const totalDescontos = descontoINSS + descontoIRRF;
    
    // Valor líquido
    const valorLiquido = totalProventos - totalDescontos;
    
    setResultado({
      saldoSalario,
      decimoTerceiroProporcional,
      feriasProporcional,
      adicionalTercoFerias,
      feriasVencidasValor,
      adicionalTercoFeriasVencidas,
      avisoPrevio,
      fgts,
      multaFGTS,
      descontoINSS,
      descontoIRRF,
      totalProventos,
      totalDescontos,
      valorLiquido
    });
  };

  return (
    <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Calculadora de Rescisão</h2>
      
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
          <label className="block text-gray-700 mb-2">Tipo de Rescisão</label>
          <select
            value={tipoRescisao}
            onChange={(e) => setTipoRescisao(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="semJustaCausa">Demissão sem Justa Causa</option>
            <option value="comJustaCausa">Demissão com Justa Causa</option>
            <option value="pedidoDemissao">Pedido de Demissão</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Tempo de Serviço</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <input
                type="number"
                min="0"
                value={tempoServico.anos}
                onChange={(e) => handleTempoServicoChange('anos', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <span className="text-sm text-gray-500">Anos</span>
            </div>
            <div>
              <input
                type="number"
                min="0"
                max="11"
                value={tempoServico.meses}
                onChange={(e) => handleTempoServicoChange('meses', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <span className="text-sm text-gray-500">Meses</span>
            </div>
            <div>
              <input
                type="number"
                min="0"
                max="30"
                value={tempoServico.dias}
                onChange={(e) => handleTempoServicoChange('dias', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <span className="text-sm text-gray-500">Dias</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="avisoTrabalhado"
            checked={avisoTrabalhado}
            onChange={(e) => setAvisoTrabalhado(e.target.checked)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-400"
          />
          <label htmlFor="avisoTrabalhado" className="ml-2 text-gray-700">
            Aviso Prévio Trabalhado
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="feriasVencidas"
            checked={feriasVencidas}
            onChange={(e) => setFeriasVencidas(e.target.checked)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-400"
          />
          <label htmlFor="feriasVencidas" className="ml-2 text-gray-700">
            Possui Férias Vencidas
          </label>
        </div>
        
        <button
          onClick={calcularRescisao}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Calcular Rescisão
        </button>
      </div>
      
      {resultado && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Resultado</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-600">Saldo de Salário:</span>
            <span className="text-right font-medium">R$ {resultado.saldoSalario.toFixed(2)}</span>
            
            <span className="text-gray-600">13º Proporcional:</span>
            <span className="text-right font-medium">R$ {resultado.decimoTerceiroProporcional.toFixed(2)}</span>
            
            <span className="text-gray-600">Férias Proporcionais:</span>
            <span className="text-right font-medium">R$ {resultado.feriasProporcional.toFixed(2)}</span>
            
            <span className="text-gray-600">1/3 sobre Férias:</span>
            <span className="text-right font-medium">R$ {resultado.adicionalTercoFerias.toFixed(2)}</span>
            
            {feriasVencidas && (
              <>
                <span className="text-gray-600">Férias Vencidas:</span>
                <span className="text-right font-medium">R$ {resultado.feriasVencidasValor.toFixed(2)}</span>
                
                <span className="text-gray-600">1/3 sobre Férias Vencidas:</span>
                <span className="text-right font-medium">R$ {resultado.adicionalTercoFeriasVencidas.toFixed(2)}</span>
              </>
            )}
            
            {resultado.avisoPrevio > 0 && (
              <>
                <span className="text-gray-600">Aviso Prévio:</span>
                <span className="text-right font-medium">R$ {resultado.avisoPrevio.toFixed(2)}</span>
              </>
            )}
            
            {resultado.multaFGTS > 0 && (
              <>
                <span className="text-gray-600">Multa FGTS (40%):</span>
                <span className="text-right font-medium">R$ {resultado.multaFGTS.toFixed(2)}</span>
              </>
            )}
            
            <span className="text-gray-600">Desconto INSS:</span>
            <span className="text-right font-medium text-red-600">- R$ {resultado.descontoINSS.toFixed(2)}</span>
            
            <span className="text-gray-600">Desconto IRRF:</span>
            <span className="text-right font-medium text-red-600">- R$ {resultado.descontoIRRF.toFixed(2)}</span>
            
            <span className="text-gray-600 font-semibold">Total Proventos:</span>
            <span className="text-right font-bold">R$ {resultado.totalProventos.toFixed(2)}</span>
            
            <span className="text-gray-600 font-semibold">Total Descontos:</span>
            <span className="text-right font-bold text-red-600">R$ {resultado.totalDescontos.toFixed(2)}</span>
            
            <span className="text-gray-600 font-semibold">Valor Líquido:</span>
            <span className="text-right font-bold text-green-600">R$ {resultado.valorLiquido.toFixed(2)}</span>
            
            <span className="text-gray-600">FGTS Depositado:</span>
            <span className="text-right font-medium text-blue-600">R$ {resultado.fgts.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculadoraRescisao;

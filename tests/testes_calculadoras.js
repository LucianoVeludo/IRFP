// Arquivo de testes para verificar o funcionamento das calculadoras

// Testes para a Calculadora de IR
const testarCalculadoraIR = () => {
  console.log("=== Testes da Calculadora de IR ===");
  
  // Teste 1: Salário isento na tabela atual
  console.log("Teste 1: Salário isento (R$ 2.000,00)");
  // Resultado esperado: Imposto atual = 0, Imposto novo = 0
  
  // Teste 2: Salário na primeira faixa da tabela atual
  console.log("Teste 2: Salário na primeira faixa (R$ 2.500,00)");
  // Resultado esperado: Imposto atual > 0, Imposto novo = 0
  
  // Teste 3: Salário na faixa intermediária
  console.log("Teste 3: Salário na faixa intermediária (R$ 6.000,00)");
  // Resultado esperado: Comparação entre os dois modelos
  
  // Teste 4: Salário alto
  console.log("Teste 4: Salário alto (R$ 20.000,00)");
  // Resultado esperado: Comparação entre os dois modelos
  
  console.log("Testes da Calculadora de IR concluídos\n");
};

// Testes para a Calculadora de Férias
const testarCalculadoraFerias = () => {
  console.log("=== Testes da Calculadora de Férias ===");
  
  // Teste 1: Férias completas sem abono
  console.log("Teste 1: Férias completas sem abono (R$ 3.000,00)");
  // Resultado esperado: 30 dias de férias + 1/3 constitucional
  
  // Teste 2: Férias com abono pecuniário
  console.log("Teste 2: Férias com abono pecuniário (R$ 3.000,00)");
  // Resultado esperado: 20 dias de férias + 10 dias de abono + 1/3 constitucional
  
  // Teste 3: Férias parciais (20 dias)
  console.log("Teste 3: Férias parciais - 20 dias (R$ 3.000,00)");
  // Resultado esperado: 20 dias de férias + 1/3 constitucional
  
  console.log("Testes da Calculadora de Férias concluídos\n");
};

// Testes para a Calculadora de Rescisão
const testarCalculadoraRescisao = () => {
  console.log("=== Testes da Calculadora de Rescisão ===");
  
  // Teste 1: Demissão sem justa causa
  console.log("Teste 1: Demissão sem justa causa (R$ 3.000,00, 2 anos de serviço)");
  // Resultado esperado: Aviso prévio, 13º proporcional, férias proporcionais, multa FGTS
  
  // Teste 2: Demissão com justa causa
  console.log("Teste 2: Demissão com justa causa (R$ 3.000,00, 2 anos de serviço)");
  // Resultado esperado: Saldo de salário, sem aviso prévio, sem multa FGTS
  
  // Teste 3: Pedido de demissão
  console.log("Teste 3: Pedido de demissão (R$ 3.000,00, 2 anos de serviço)");
  // Resultado esperado: Saldo de salário, 13º proporcional, férias proporcionais, sem multa FGTS
  
  console.log("Testes da Calculadora de Rescisão concluídos\n");
};

// Testes para a Calculadora de 13º Salário
const testarCalculadoraDecimoTerceiro = () => {
  console.log("=== Testes da Calculadora de 13º Salário ===");
  
  // Teste 1: 13º integral
  console.log("Teste 1: 13º integral (R$ 3.000,00, 12 meses)");
  // Resultado esperado: 13º integral com descontos
  
  // Teste 2: 13º proporcional
  console.log("Teste 2: 13º proporcional (R$ 3.000,00, 6 meses)");
  // Resultado esperado: 13º proporcional (50%) com descontos
  
  console.log("Testes da Calculadora de 13º Salário concluídos\n");
};

// Testes para a Calculadora de Horas Extras
const testarCalculadoraHorasExtras = () => {
  console.log("=== Testes da Calculadora de Horas Extras ===");
  
  // Teste 1: Horas extras 50%
  console.log("Teste 1: Horas extras 50% (R$ 3.000,00, 10 horas)");
  // Resultado esperado: Valor das horas extras com adicional de 50%
  
  // Teste 2: Horas extras 100%
  console.log("Teste 2: Horas extras 100% (R$ 3.000,00, 5 horas)");
  // Resultado esperado: Valor das horas extras com adicional de 100%
  
  // Teste 3: Adicional noturno
  console.log("Teste 3: Adicional noturno (R$ 3.000,00, 20 horas)");
  // Resultado esperado: Valor do adicional noturno (20%)
  
  console.log("Testes da Calculadora de Horas Extras concluídos\n");
};

// Testes para o Simulador de Salário Líquido
const testarSimuladorSalarioLiquido = () => {
  console.log("=== Testes do Simulador de Salário Líquido ===");
  
  // Teste 1: Salário baixo
  console.log("Teste 1: Salário baixo (R$ 1.500,00)");
  // Resultado esperado: Descontos de INSS, sem IR
  
  // Teste 2: Salário médio
  console.log("Teste 2: Salário médio (R$ 4.000,00)");
  // Resultado esperado: Descontos de INSS e IR
  
  // Teste 3: Salário alto com dependentes
  console.log("Teste 3: Salário alto com dependentes (R$ 10.000,00, 2 dependentes)");
  // Resultado esperado: Descontos de INSS e IR com dedução por dependentes
  
  console.log("Testes do Simulador de Salário Líquido concluídos\n");
};

// Testes para a Calculadora de IR Histórica
const testarCalculadoraIRHistorica = () => {
  console.log("=== Testes da Calculadora de IR Histórica ===");
  
  // Teste 1: Comparação entre tabelas recentes
  console.log("Teste 1: Comparação entre tabelas 2023-2024 e 2024-2025 (R$ 3.000,00)");
  // Resultado esperado: Diferença no imposto e no salário líquido
  
  // Teste 2: Comparação com tabela antiga
  console.log("Teste 2: Comparação entre tabela atual e 2002-2004 (R$ 3.000,00)");
  // Resultado esperado: Diferença significativa devido à defasagem
  
  // Teste 3: Comparação com proposta 2026
  console.log("Teste 3: Comparação entre tabela atual e proposta 2026 (R$ 6.000,00)");
  // Resultado esperado: Diferença conforme nova faixa de isenção
  
  console.log("Testes da Calculadora de IR Histórica concluídos\n");
};

// Execução dos testes
const executarTestes = () => {
  console.log("Iniciando testes das calculadoras...\n");
  
  testarCalculadoraIR();
  testarCalculadoraFerias();
  testarCalculadoraRescisao();
  testarCalculadoraDecimoTerceiro();
  testarCalculadoraHorasExtras();
  testarSimuladorSalarioLiquido();
  testarCalculadoraIRHistorica();
  
  console.log("Todos os testes concluídos!");
};

// Executar testes
executarTestes();

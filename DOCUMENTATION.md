# Documentação do Projeto IRFP

## Visão Geral
Este projeto é um conjunto de calculadoras trabalhistas para trabalhadores CLT, com foco especial na calculadora de Imposto de Renda. O sistema permite aos usuários calcular diversos aspectos trabalhistas, incluindo imposto de renda com tabelas históricas, férias, rescisão, 13º salário, horas extras e salário líquido.

## Estrutura do Projeto
O projeto segue uma arquitetura baseada em componentes React, organizada da seguinte forma:

```
IRFP/
├── src/
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── AdBanner.js     # Componente para banners de anúncios horizontais
│   │   ├── AdSidebar.js    # Componente para anúncios na barra lateral
│   │   ├── Layout.js       # Componente de layout responsivo
│   │   ├── ResponsiveContainer.js # Container responsivo
│   │   ├── CalculadoraFerias.js   # Calculadora de férias
│   │   ├── CalculadoraRescisao.js # Calculadora de rescisão
│   │   ├── CalculadoraDecimoTerceiro.js # Calculadora de 13º salário
│   │   ├── CalculadoraHorasExtras.js    # Calculadora de horas extras
│   │   ├── SimuladorSalarioLiquido.js   # Simulador de salário líquido
│   │   └── CalculadoraIRHistorica.js    # Calculadora de IR com tabelas históricas
│   ├── data/
│   │   └── tabelasIRPF.js  # Dados históricos das tabelas de IRPF
│   ├── styles/
│   │   └── App.css         # Estilos CSS para o aplicativo
│   ├── App.js              # Componente principal que integra todas as calculadoras
│   ├── Calculadora_IR_2025-2026.jsx # Calculadora original de IR
│   ├── index.css           # Estilos globais
│   └── index.js            # Ponto de entrada do React
├── public/                 # Arquivos públicos
├── tests/                  # Testes para as calculadoras
│   └── testes_calculadoras.js # Testes para verificar o funcionamento
└── index.html              # Arquivo HTML principal com código AdSense
```

## Funcionalidades Implementadas

### 1. Calculadora de IR Histórica
- Permite selecionar entre todas as tabelas de IRPF desde 1996 até 2025
- Inclui a proposta para 2026
- Permite comparar resultados entre diferentes anos
- Calcula imposto, alíquota efetiva e salário líquido

### 2. Calculadora de Férias
- Calcula férias com ou sem abono pecuniário
- Considera 1/3 constitucional
- Calcula descontos de INSS e IRRF
- Permite selecionar diferentes períodos de férias (30, 20 ou 15 dias)

### 3. Calculadora de Rescisão
- Suporta diferentes tipos de rescisão:
  - Demissão sem justa causa
  - Demissão com justa causa
  - Pedido de demissão
- Calcula aviso prévio, 13º proporcional, férias proporcionais
- Considera multa do FGTS quando aplicável
- Calcula descontos de INSS e IRRF

### 4. Calculadora de 13º Salário
- Calcula 13º salário proporcional aos meses trabalhados
- Calcula descontos de INSS e IRRF
- Mostra valores da primeira e segunda parcela

### 5. Calculadora de Horas Extras
- Calcula horas extras com adicional de 50% e 100%
- Calcula adicional noturno (20%)
- Considera reflexo no DSR (Descanso Semanal Remunerado)
- Suporta diferentes jornadas mensais

### 6. Simulador de Salário Líquido
- Calcula salário líquido com todos os descontos
- Considera dependentes para dedução do IR
- Calcula INSS, IRRF e outros descontos personalizados
- Mostra alíquota efetiva e valor do FGTS

## Implementação do AdSense
O projeto implementa o Google AdSense em três locais estratégicos:
1. Banner superior (acima do conteúdo)
2. Barra lateral (apenas em desktop)
3. Banner inferior (abaixo do conteúdo)

Os componentes `AdBanner.js` e `AdSidebar.js` encapsulam a funcionalidade do AdSense, permitindo fácil inserção de anúncios em diferentes partes do site.

## Layout Responsivo
O layout é totalmente responsivo, adaptando-se a diferentes tamanhos de tela:
- Em dispositivos desktop, exibe conteúdo principal e barra lateral com anúncios
- Em dispositivos móveis, reorganiza o conteúdo em uma única coluna
- Menu de navegação se adapta a diferentes tamanhos de tela

## Tabelas Históricas de IRPF
O sistema inclui dados históricos das tabelas de IRPF desde 1996 até 2025, incluindo:
- Faixas de valores
- Alíquotas
- Deduções
- Valores de dedução por dependente

Estes dados estão estruturados no arquivo `tabelasIRPF.js` e são utilizados pela calculadora de IR histórica.

## Testes
O projeto inclui testes para verificar o funcionamento de todas as calculadoras em diferentes cenários. Os testes estão no arquivo `testes_calculadoras.js`.

## Instruções para Desenvolvimento
1. Clone o repositório
2. Instale as dependências com `npm install`
3. Execute o projeto localmente com `npm start`
4. Para construir a versão de produção, use `npm run build`

## Tecnologias Utilizadas
- React.js para o frontend
- CSS para estilos
- JavaScript ES6+
- Google AdSense para monetização

## Futuras Melhorias
- Adicionar mais calculadoras trabalhistas
- Implementar tradução para outros idiomas
- Adicionar gráficos comparativos para as tabelas de IR
- Melhorar a acessibilidade do site

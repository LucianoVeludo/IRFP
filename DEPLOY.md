# Instruções para Deploy na Vercel

Este documento contém instruções para fazer o deploy do projeto IRFP na plataforma Vercel.

## Pré-requisitos
- Conta na Vercel (https://vercel.com)
- Git instalado localmente
- Node.js e npm instalados

## Passos para Deploy

### 1. Preparar o Projeto

Antes de fazer o deploy, certifique-se de que o projeto está pronto:

```bash
# Instalar dependências
npm install

# Executar testes
node tests/testes_calculadoras.js

# Verificar se o build funciona localmente
npm run build
```

### 2. Configurar a Vercel CLI (opcional)

Se preferir usar a linha de comando:

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Fazer login na Vercel
vercel login
```

### 3. Deploy via Git

O método mais simples é conectar seu repositório GitHub à Vercel:

1. Faça login na [Vercel](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório GitHub
4. Configure as opções de build:
   - Framework Preset: React
   - Build Command: `npm run build`
   - Output Directory: `build`
5. Clique em "Deploy"

### 4. Deploy via Vercel CLI

Alternativamente, você pode fazer deploy diretamente da linha de comando:

```bash
# Na pasta raiz do projeto
vercel
```

Siga as instruções na tela para completar o processo.

### 5. Configurações Adicionais

Após o deploy inicial, você pode configurar:

- Domínio personalizado
- Variáveis de ambiente
- Integrações com outros serviços

### 6. Verificação Pós-Deploy

Após o deploy, verifique:

- Se todas as calculadoras estão funcionando corretamente
- Se o layout está responsivo em diferentes dispositivos
- Se os anúncios do AdSense estão sendo exibidos corretamente
- Se as tabelas históricas de IRPF estão disponíveis

## Atualizações Futuras

Para atualizar o site após fazer alterações:

1. Faça commit das alterações no repositório Git
2. Se configurado com integração contínua, a Vercel fará o deploy automaticamente
3. Caso contrário, execute `vercel` novamente para fazer um novo deploy

## Solução de Problemas

Se encontrar problemas durante o deploy:

- Verifique os logs de build na Vercel
- Certifique-se de que todas as dependências estão listadas no package.json
- Verifique se há erros no console do navegador após o deploy
- Teste o build localmente antes de fazer o deploy

## Recursos Adicionais

- [Documentação da Vercel](https://vercel.com/docs)
- [Guia de Deploy do React](https://create-react-app.dev/docs/deployment/)

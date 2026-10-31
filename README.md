# LembraFarma
Esse nosso Projeto FrontEnd
Lembrafarma é um projeto para gerencimento de medicamentos recorrentes para clientes

## Aplicação React

A página inicial, Contato, Login/Cadastro e as ferramentas usam React e React
Router. O `index.html` da raiz permanece como ponto de entrada do Vite; os
conteúdos das páginas são componentes JSX em `src/pages/` e carregados sob
demanda conforme a rota acessada.

Para executar localmente, instale as dependências e inicie o Vite:

```bash
npm.cmd install
npm.cmd run dev
```

Para gerar os arquivos de produção:

```bash
npm.cmd run build
```

O resultado fica na pasta `dist/`.

Rotas principais:

- `/`: início
- `/funcionalidades`: seção de funcionalidades
- `/planos`: seção de planos
- `/pages/Contato.html`: contato
- `/pages/lembrafarma_auth.html`: login e cadastro
- `/Ferrementas - Crie aqui/<página>.html`: páginas das ferramentas

Os caminhos existentes em `/Ferramentas - Crie aqui/` também são aceitos para
compatibilidade. Em produção, configure o servidor para encaminhar as rotas da
aplicação para `index.html`, permitindo abrir e atualizar diretamente cada URL.

O Dashboard reúne os atalhos das ferramentas, a contagem de clientes e as
recompras previstas nos próximos sete dias, usando os dados locais do navegador.
Os indicadores de mensagens ficam indisponíveis até a integração com WhatsApp.

## Estrutura

- `index.html`: página inicial.
- `src/`: aplicação React.
- `src/App.jsx`: define as rotas da aplicação.
- `src/pages/`: páginas React, incluindo `Ferrementas/` para as ferramentas.
- `src/components/`: seções reutilizáveis.
- `src/data/`: conteúdo estático de funcionalidades, planos e depoimentos.
- `js/`: lógica compartilhada de medicamentos.
- `css/`: folhas de estilo.
- `assets/`: imagens e outros recursos estáticos.

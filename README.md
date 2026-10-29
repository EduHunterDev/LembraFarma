# LembraFarma
Esse nosso Projeto FrontEnd
Lembrafarma é um projeto para gerencimento de medicamentos recorrentes para clientes

## Página inicial em React

A página inicial usa React e React Router. As páginas de Contato, Login e as
demais ferramentas continuam em HTML.

Para executar localmente, instale as dependências e inicie o Vite:

```bash
npm.cmd install
npm.cmd run dev
```

Para gerar os arquivos de produção, incluindo as páginas HTML existentes:

```bash
npm.cmd run build
```

O resultado fica na pasta `dist/`.

Rotas da página inicial:

- `/`: início
- `/funcionalidades`: seção de funcionalidades
- `/planos`: seção de planos

Em produção, configure o servidor para encaminhar essas três rotas para
`index.html`, permitindo que o React Router carregue a página ao abrir ou
atualizar uma rota diretamente.

## Estrutura

- `index.html`: página inicial.
- `pages/`: páginas do site e autenticação.
- `css/`: folhas de estilo.
- `assets/`: imagens e outros recursos estáticos.

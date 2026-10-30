# Conversa: tela de cadastro de clientes (LembraFarma)

Registro do que foi pedido e feito na branch `feat/cadastro-cliente`, na ordem em que aconteceu.

## 1. Como validar CPF com regex

A regex só valida o **formato** (11 dígitos, com ou sem pontuação). Os dígitos verificadores exigem um cálculo, então usamos regex + algoritmo.

```js
// formato
/^\d{3}\.\d{3}\.\d{3}-\d{2}$/
```

O algoritmo rejeita sequências repetidas (`111.111.111-11`) e confere os dois dígitos verificadores.

## 2. Onde colocar a função

A tela é React (`src/App.jsx`). A lógica foi separada em `src/utils/` para ser testável sem o React:

- `src/utils/cpf.js`: `mascararCPF` e `validarCPF`
- `tests/cpf.test.js`: testes da função

No campo CPF: máscara `000.000.000-00` ao digitar, e mensagem "CPF inválido" ao sair do campo ou ao salvar (campo vazio é aceito).

## 3. Problema de layout (tela sem estilo)

Após os ajustes, a página apareceu sem estilo ("Cadastrar cliente" em HTML puro).

- **Causa provável:** um `git stash` / `git stash pop` feito durante a verificação deixou o arquivo no disco como `app.jsx` (minúsculo), enquanto o `main.jsx` importa `./App.jsx`.
- **Correção:** arquivo renomeado de volta para `src/App.jsx`. Depois disso, reiniciar o `npm run dev` e dar refresh forçado (Cmd+Shift+R).

Problemas que já existiam e não foram mexidos:

- `npm test` falha porque `tests/medicamentos-core.test.js` usa `require` com `"type": "module"` no `package.json`.
- `npx vite build` falha por HTML malformado em `Index.html` (`<head>` duplicado) e por `lembrafarma_auth.html` carregar `auth.js` sem `type="module"`.

## 4. Painel de endereço

Criado abaixo do painel de dados do cliente, com os campos: CEP, nome da rua, número, cidade e estado. O estilo de título (`.page-heading`) foi estendido para `h2`.

## 5. Preenchimento automático pelo CEP

Ao digitar um CEP completo, rua e cidade são preenchidas via **ViaCEP**.

- Máscara `00000-000` no CEP.
- Mostra "Buscando endereço..." durante a busca.
- Cancela a busca anterior se o CEP mudar.
- CEP inexistente ou falha da API: mensagem de erro e rua/cidade limpas.
- O estado **não** é preenchido pelo CEP (será usado de outra forma).
- Arquivo: `src/utils/cep.js`.

## 6. Estado como select (API do IBGE)

O campo Estado virou um `select` com os 27 estados, carregados da **API de Localidades do IBGE**. A opção mostra o nome e guarda a sigla (`SP`). Enquanto carrega aparece "Carregando..."; se falhar, aparece mensagem de erro. Arquivo: `src/utils/estados.js`.

Análise da API: pública, sem chave, CORS liberado, retorna 27 estados.

## 7. Máscara de telefone

Formato `(99) 99999-9999` enquanto digita. Também trata fixo de 10 dígitos: `(99) 9999-9999`. Arquivo: `src/utils/telefone.js`.

## 8. Botões Limpar e Salvar

Movidos para depois do painel de endereço, no canto direito. Um único `<form>` agora envolve os dois painéis. O Limpar zera também os campos controlados pelo React. Foi adicionado espaçamento de 24px entre os painéis (`.page-panel + .page-panel`).

## 9. Campo Complemento

Novo campo depois do Número (texto livre, até 60 caracteres).

## 10. Salvar cliente (sem banco de dados)

Como ainda não há banco, o Salvar apenas monta um JSON e o imprime no console do navegador:

```json
{
  "nome": "Maria Silva",
  "cpf": "529.982.247-25",
  "telefone": "(11) 98765-4321",
  "email": "maria@email.com",
  "endereco": {
    "cep": "01310-100",
    "rua": "Avenida Paulista",
    "numero": "1000",
    "complemento": "Apto 12",
    "cidade": "São Paulo",
    "estado": "SP"
  }
}
```

## APIs utilizadas

| API | Uso | Endereço |
|---|---|---|
| ViaCEP | Rua e cidade a partir do CEP | `https://viacep.com.br/ws/{cep}/json/` |
| IBGE Localidades | Lista de estados do select | `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome` |

Ambas são públicas, sem chave de acesso, e chamadas direto do navegador.

## Arquivos criados ou alterados

- `src/App.jsx` (formulário, painéis, estados, envio)
- `src/utils/cpf.js`, `src/utils/cep.js`, `src/utils/estados.js`, `src/utils/telefone.js`
- `tests/cpf.test.js`
- `css/style.css` (título `h2` e espaçamento entre painéis)
- `package.json` (script `test` inclui o teste de CPF)

Nada foi commitado.

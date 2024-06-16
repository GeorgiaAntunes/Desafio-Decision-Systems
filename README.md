# Desafio Decision Systems 


## 🚀 Objetivo:
Desenvolver uma sistema de criação de um cadastro genérico de usuários.

## 📖 Requisitos:

## Cada usuário deve possuir:
- Nome: (string, de 10 a 100 caracteres)
- Senha de login: (string, de 10 a 30 caracteres) (dado sensível não recuperável)
- Data de nascimento: (data) validação: não pode ser superior a hoje
- Nome da mãe: (string, de 10 a 100 caracteres) (dado sensível recuperável)
## Observações:
- Desenvolver o layout (cores, fonte, estilo, distribuição dos campos, etc conforme
preferência do candidato. Sem regras referentes a layout).
- O campo Senha deve contar a funcionalidade de esconder conteúdo no Front.
- Todos os campos são obrigatórios e devem ser validados.
- Deve ser feito um formulário em ReactJS utilizando as seguintes biblioteca:
final-form, yup, material-ui
- O formulário pode funcionar em uma única rota.
- O formulário deve ser responsivo
/usuario/criar
- tela de criação, inicialmente os campos devem estar zerados;
- botão de criação, ao criar leva para rota de edição;
/usuario/:id
- Default dos campos será demonstrar o conteúdo existente no usuário;
- botão para salvar, ao salvar recarregar o formulário;
- botão de exclusão, que vai remover o registro e levar para a tela de criação;

## 🚀 Local Setup:
Clone the repository
Install dependencies with npm install
Start the server with npm start/ npm run dev

## 🛠️ Technologies Used:
React.js
Typescript
React-final-form
yup
material-ui
Node.js
Express.js

## 📝 Pontos a melhorar:
- Dados sensiveis como nome da mae não deveria aparecer em modo de edição?
- Acredito que algumas consultas no backend poderiam estar mais desacopladas, fazer um arquivo models para organizar melhor talvez?
- Criação de testes
- Utilizar React Hook Form para uma melhor manipulacao de formularios e validacoes, incluindo mensagens de erro
- Faltou a parte de criacao do container em Docker
  
 

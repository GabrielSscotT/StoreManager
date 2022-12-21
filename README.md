<h1 align="center">Store Manager</h1>

**Ferramentas utilizadas**: Javascript, MySQL, Node.js, chai, sinon.

<h2 align="center">Descrição</h2>

<p align="justify">Essa aplicação foi realizada com base na arquitetura MSC: model, service e controller, onde cada camada tem o objetivo de organizar e permitir atualziações e testes mais acertivos ao realizar o CRUD: criar, ver, mudar e apagar uma estrutura de dados de uma loja fictícia que tem em seu controle produtos e vendas.</p>

<p align="justify">A camada model tem como objetivo fazer as requisições para um banco de dados MySQL estabelecendo o intermedio com a aplicação pela camada service, que tem como serne ligar a model e a controller, se utilizando de middleweres e outras ferramentas para realizar as validações necessárias e normalizar os dados. Já a controler é a camada de interação com o agente externo, que realiza as requisições para a API e exibe as respostas.</p>

<p align="justify">Foi o meu primeiro projeto de backend que utilizei da arquitetura MSC sendo um grande desafio no início, mas seus benefícios foram facilmente vistos ao longo do desenvolvimento, criando um ambiente de fácil modificação e crescimento organizado para o código, além de facilitar toda a criação e estruturação de testes da aplicação</p>

<h2 align="center">Projeto Trybe</h2>

<p align="justify">Um projeto Trybe é um projeto o qual eu tenha feito durante minha estadia como aluno da Trybe. Este é um curso 100% online focado em desenvolvimento web, mas que tange partes de outras áreas, tentando prover mais ferramentas.</p>
  <p align="justify">Tais projetos são feitos ao fim de blocos ao longo do curso, com o objetivo de solidificar o conhecimento nele adquirido. Estes projetos são feitos a partir de requisitos os quais devem ser atendidos, os quais buscam imitar requisições feitas para o profissional no mercado de trabalho. Esses requisitos precisam ser implementados, e isso é testado através de testes automáticos fornecidos pela própria Trybe ao longo do desenvolvimento.</p>
  <p align="justify">Entretanto, apesar de estes fornecerem uma estrutura básica para o desenvolvimento e teste do que eles requerem, o código relativo à funcionalidade deste projeto foi desenvolvido por alunos.</p>

<h2 align="center">Como Instalar</h2>

<p align="justify">Para realizar o uso desta API em seu computador, você precisará ter instalado o Node.js e o servidor de banco de dados MySQL, tendo-os funcionando corretamente. Preencha as variáveis de sistema no .env, retirando o .exemple, tornando-as assim ativas através da biblioteca dotenv pelo projeto. Antes de iniciar o projeto, instale as dependências com "npm install" e em seguida utilize o comando padrão "npm start". </p>

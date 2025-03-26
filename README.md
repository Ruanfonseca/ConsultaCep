Gestão de Usuários

Esta API foi criada para facilitar o gerenciamento de usuários em um sistema.
Ela possibilita a execução de operações essenciais, como criação, consulta, atualização e remoção dos dados dos usuários.
Cada usuário é identificado por um conjunto de informações fundamentais, como: id, nome, CPF, CEP, logradouro, bairro, cidade e estado. 
A API oferece uma interface prática e eficiente para manipular esses dados, assegurando a segurança e a integridade das informações.

Principais Funcionalidades:
Cadastro de usuários: Inserir novos usuários com todas as informações descritas no PDF.
Consulta de dados: Buscar os dados de um usuário específico ou de uma lista de usuários. 
Atualização de dados: Alterar as informações de um usuário já existente. 
Remoção de dados: Excluir um usuário do sistema. 
A API foi desenvolvida com foco na praticidade, segurança e flexibilidade, proporcionando fácil integração com outros sistemas ou interfaces.

Tecnologias Utilizadas
Backend

Spring Boot: Framework Java usado para desenvolver a API de maneira ágil e eficiente. Oferece uma estrutura sólida para criar aplicações escaláveis e de fácil manutenção.
Spring Data JPA: Ferramenta que facilita o acesso ao banco de dados, tornando as operações como CRUD (Create, Read, Update, Delete) mais simples e implementando a comunicação com o banco de dados Mysql de forma otimizada.
Spring Validation: Tecnologia para validar os dados de entrada, garantindo que as informações recebidas pela API atendam aos critérios necessários antes de serem processadas.
Lombok: Biblioteca Java que facilita a escrita de código, eliminando a necessidade de criar métodos como getters, setters, toString(), equals() e hashCode() manualmente.  
Groovy: Linguagem de programação que complementa o código Java, proporcionando mais flexibilidade e concisão.

Frontend

React: Biblioteca JavaScript usada para construir a interface do usuário, permitindo a criação de componentes reutilizáveis e interativos.
React Query: Ferramenta que facilita o gerenciamento do estado da aplicação em relação às requisições HTTP, ajudando no controle de dados assíncronos e melhorando o desempenho.
React Router DOM: Biblioteca para gerenciar a navegação entre diferentes páginas da aplicação, proporcionando uma navegação dinâmica e baseada em rotas.
Shadcn UI: Conjunto de componentes UI para React que oferece uma interface moderna e acessível, otimizada para fácil uso e personalização.
React Hook Form: Biblioteca que facilita o gerenciamento de formulários no React, garantindo validação de campos e envio seguro de dados.
Axios: Biblioteca para fazer requisições HTTP de forma simples e eficiente, facilitando a comunicação com o backend.
Vite: Ferramenta de build para desenvolvimento rápido e eficiente de aplicações front-end, otimizando a experiência de desenvolvimento.

Infraestrutura

Docker: Ferramenta que possibilita a criação de contêineres para empacotar a aplicação junto com suas dependências, garantindo a execução consistente em diferentes ambientes. É utilizada para facilitar o deploy e a configuração do sistema.
CI/CD: Com a utilização do GitHub Actions, foi implementado um pipeline de CI/CD para atualizar automaticamente a imagem Docker do backend no Docker Hub e a build do frontend na Vercel a cada commit na branch principal.
Vercel: Plataforma onde o frontend está hospedado.
Render: Plataforma onde o backend está hospedado.
Hostinger: O banco de dados está hospedado na nuvem da Hostinger.

Banco de Dados

MySQL: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar as informações dos usuários de maneira segura e escalável.

Essas tecnologias, integradas, proporcionam uma solução poderosa para o gerenciamento de usuários, com uma API otimizada no backend, uma interface interativa e responsiva no frontend, e um banco de dados relacional de alto desempenho, garantindo eficiência e escalabilidade.

Como Rodar o Projeto Localmente
Para rodar o projeto localmente é necessario utilizar ou instalar o java na versão 
![image](https://github.com/user-attachments/assets/2182e6ba-ce48-4575-bc49-591776b63ba9)

e o groovy na versão 
![image](https://github.com/user-attachments/assets/2691b0c8-4235-4156-87b1-1caf61b3cbdb)

e clone o backend em sua maquina , durante o desenvolvimento foi utilizado o intellij como IDE.

Para utilizar a imagem do backend basta fazer um 

1)docker pull (docker pull ruanfonseca2023/consulta-cep:bea5380f8cfdddaa682b39ee4022b8d51c198093) 

2)docker build -t nome-da-imagem .

3)docker run -d -p 8080:8080 nome-da-imagem




Para rodar o frontend , necessário utilizar o "react": "^19.0.0", clone o frontend , digite npm install para instalação das dependências e altere em(api.ts e auth.ts) 
a url da api para usar a local.



Como utilizar o projeto em produção 
clique no link -> https://consulta-cep-rosy-mu.vercel.app
login de acesso -> email : solutionsti@gmail.com / senha:Ttecnico2025


Sobre o Desenvolvedor

Este sistema foi criado por Ruan Soares da Silva Fonseca como parte do desafio técnico para a Solution.

Para entrar em contato, você pode me enviar um e-mail para: whitelook22@outlook.com

Licença

Este projeto está licenciado sob a licença MIT.



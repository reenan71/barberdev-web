
# ✨ BarberPRO

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui

![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iuricode/README-template?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/iuricode/README-template?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/iuricode/README-template?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/iuricode/README-template?style=for-the-badge)

<img src="exemplo-image.png" alt="exemplo imagem">--->

Este repositório contém um Sistema Para Barbearias, onde é possível agendar os cortes e os modelos de cortes dos clientes, com base no plano do usuário.

<p class="center-div">
  <div style="display: inline_block"><br>
   <img align="center" alt="Ts" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg">
   <img align="center" alt="React" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
   <img align="center" alt="Next" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" />
   <img align="center" alt="Node" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
   <img align="center" alt="Postgres" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
</div>
</p>

<br>

<a href="https://picasion.com/"><img src="https://i.picasion.com/pic92/97b31868a705706004bb703270689315.gif" width="450" height="360" border="0" alt="https://picasion.com/" /></a><br /><a href="https://picasion.com/"></a>
## 📋 Pré-requisitos

Para rodar a aplicação é necessário ter instalado na sua máquina:

- node v16.17.0 ou mais recente, link em:
```
https://nodejs.org/en
```

- PostgreSQL:

```
https://www.postgresql.org/download/
```

## 🚀 Rodando a aplicação

Para iniciar o projeto, clone o repositório:

```
git clone https://github.com/victormarques1/barberpro.git
```

Entre no diretório do repositório local:

```
cd barberpro
```

Instale as dependência do projeto:

```
npm install
```

Crie o banco de dados 

```
# Abra o pgAdmin ou outra ferramenta de administração do PostgreSQL.
# Faça login com suas credenciais de administrador.
# No painel de navegação, clique com o botão direito em "Databases" e selecione "Create" (Criar).
# Digite um nome para a database e salve
```
Depois de criar a database no PostgreSQL, você precisará configurar a string de conexão, portanto navegue para o diretorio <strong>backend</strong>  

```
cd backend
```

Crie o arquivo .env 

```
#para Windows
echo "" > .env 

#para Linux ou macOS
touch .env
```

Defina as seguintes variavéis de ambientes no arquivo <strong>.env</strong> criado:

```
# ----------------------------------------------------------------------------
# Banco de dados
# ----------------------------------------------------------------------------

# definir a URL de conexão com o banco de dados
# substitua 'senha' pela sua senha de admnistrador e 'nomedatabase' pelo que foi criado na sua database

DATABASE_URL="postgresql://postgres:senha@localhost:5432/nomedatabase?schema=public"

# ----------------------------------------------------------------------------
# Json Web Token (JWT)
# ----------------------------------------------------------------------------

# definir as chaves para os tokens de autenticação JWT
# caso necessário use um gerador https://www.md5hashgenerator.com/

JWT_USUARIO=
```

Agora será necessário criar as migrações no banco de dados, portanto execute o seguinte comando no terminal: 

```
npx prisma migrate dev
```

Rodar backend:

```
npm run dev
```

Abrir um novo terminal e rodar o frontend:

```
cd frontend -> npm run dev
```

Pronto! A aplicação está no ar!

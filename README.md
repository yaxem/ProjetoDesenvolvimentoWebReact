# Documentação

**Autores:**  
- Gabriel Fontes Bay
- Gustavo Burgath  
- Ricardo Santolaia  

**Requisitos técnicos:**
- Node.js v18.17.0 (ou superior)
- React 18.3.1 (ou superior)
- PostgreSQL

**Requisitos de software:**
- Cada filme possui um id, nome, descricao, data e o poster. Segue exemplo de do corpo de uma requisição em json:
```exemplo do jogador:
{
  "nome": "claudio",
  "email": "claudio@gmail.com",
  "datanasc": "221198"
}
```
- Cada pagamento possui um id, ano, mês e o id do jogador a quem pertence o pagamento. Segue exemplo:
```
{
    "ano": 2023,
    "mes": 10,
    "valor": 100.0,
    "jogador": {
        "codJogador": 1
    }
}
```

Create a Database and use this SQL

```

CREATE TABLE filmes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  data DATE,
  poster VARCHAR(255)
);


```

## Descrição da API

### Filmes

#### GET
```/filmes``` obter todos os jogadores, e seus respectivos pagamentos

#### POST

```/filmes``` cadastrar novo jogador

#### PUT

```/filmes/:id``` editar um jogador por id

#### DELETE

```/filmes/:id``` deletar um jogador por id
  

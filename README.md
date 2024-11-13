# Documentação

**Autores:**  
- Gabriel Fontes Bay
- Gustavo Burgath  
- Ricardo Santolaia  

**Requisitos técnicos:**
- Java 21 (ou superior)
- PostgreSQL
- Spring Boot 3 (Spring Web MVC, Spring Data JPA, Developer Tools, PostgreSQL Driver)
- Maven 3.8 (ou superior)

**Requisitos de software:**
- Cada jogador possui um id, título, e-mail e data de nascimento. Segue exemplo de do corpo de uma requisição em json:
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

## Descrição da API

### Jogadores

#### GET
```/filmes``` obter todos os jogadores, e seus respectivos pagamentos

#### POST

```/filmes``` cadastrar novo jogador

#### PUT

```/filmes/:id``` editar um jogador por id

#### DELETE

```/filmes/:id``` deletar um jogador por id
  

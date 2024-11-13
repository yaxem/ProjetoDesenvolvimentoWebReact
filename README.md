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
- Cada filme possui um id, nome, descricao, data e o poster. Segue exemplo de um filme a ser adicionado:

Nome:
```
Iron Man
```

Descrição:
```
Superhero Movie
```

Data:
```
6/10/2010
```

Poster:
```
https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/3421528F5E3679CEA7D89FE51BE6DE6904289364AD148688A2E236A340144BF6/scale?width=1200&aspectRatio=1.78&format=webp
```



Crie umaa Database e use esse SQL

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
  

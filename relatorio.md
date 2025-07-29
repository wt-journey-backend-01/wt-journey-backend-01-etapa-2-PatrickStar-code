<sup>Suas cotas de feedback AI acabaram, o sistema de feedback voltou ao padrão.</sup>

# 🧪 Relatório de Avaliação – Journey Levty Etapa 1 - PatrickStar-code

**Data:** 29/07/2025 18:36

**Nota Final:** `76.37/100`
**Status:** ✅ Aprovado

---
## ✅ Requisitos Obrigatórios
- Foram encontrados `7` problemas nos requisitos obrigatórios. Veja abaixo os testes que falharam:
  - ⚠️ **Falhou no teste**: `CREATE: Cria casos corretamente`
    - **Melhoria sugerida**: A criação de casos (`POST /casos`) não está como o esperado. O teste esperava um status `201 Created` e os dados do caso no corpo da resposta. Revise a lógica da sua rota de criação de casos.
  - ⚠️ **Falhou no teste**: `Lista todos os casos corretamente`
    - **Melhoria sugerida**: A listagem de casos (`GET /casos`) não está correta. O teste esperava um status `200 OK` e um array de casos. Certifique-se de que sua rota está buscando e retornando todos os casos de forma adequada.
  - ⚠️ **Falhou no teste**: `READ: Busca caso por ID corretamente`
    - **Melhoria sugerida**: A busca de caso por ID (`GET /casos/:id`) falhou. O teste esperava um status `200 OK` e o objeto do caso correspondente ao ID. Verifique a lógica de busca e o tratamento de IDs na sua rota.
  - ⚠️ **Falhou no teste**: `UPDATE: Atualiza dados de um caso com por completo (com PUT) corretamente`
    - **Melhoria sugerida**: A atualização completa de casos (`PUT /casos/:id`) não funcionou. O teste esperava um status `200 OK` e o caso com os dados atualizados. Verifique se sua rota está recebendo o payload completo e substituindo os dados existentes corretamente.
  - ⚠️ **Falhou no teste**: `UPDATE: Atualiza dados de um caso parcialmente (com PATCH) corretamente`
    - **Melhoria sugerida**: A atualização parcial de casos (`PATCH /casos/:id`) falhou. O teste esperava um status `200 OK` e o caso com os dados parcialmente atualizados. Verifique se sua rota está recebendo o payload parcial e aplicando as mudanças sem sobrescrever o objeto inteiro.
  - ⚠️ **Falhou no teste**: `DELETE: Deleta dados de um caso corretamente`
    - **Melhoria sugerida**: A exclusão de caso (`DELETE /casos/:id`) não funcionou como esperado. O teste esperava um status `204 No Content` e que o caso fosse realmente removido. Verifique a lógica de exclusão na sua rota.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 400 ao tentar atualizar um caso por completo com método PUT com payload em formato incorreto`
    - **Melhoria sugerida**: Sua rota de atualização completa de casos (`PUT /casos/:id`) não está retornando `400 Bad Request` para payloads inválidos. Garanta que a validação de dados ocorra antes da tentativa de atualização.

## ⭐ Itens de Destaque (recupera até 40 pontos)
- Você conquistou `1` bônus! Excelente trabalho nos detalhes adicionais!
  - 🌟 **Testes bônus passados**: `Simple Filtering: Estudante implementou endpoint de filtragem de casos por keywords no título e/ou descrição`
    - Excelente! Você implementou a busca por palavras-chave (`GET /casos?q=...`) no título e/ou descrição dos casos. Essa funcionalidade de busca livre é um grande diferencial para a usabilidade da API.

## ❌ Problemas Detectados (Descontos de até 100 pontos)
- Foram encontrados `1` problemas que acarretam descontos. Veja abaixo os testes penalizados:
  - ⚠️ **Falhou no teste de penalidade**: `Validation: ID utilizado para casos não é UUID`
    - **Correção sugerida**: **Penalidade:** O ID gerado para casos **não é um UUID**. É crucial que os IDs sejam UUIDs para garantir unicidade global e evitar colisões. Ajuste a forma como os IDs são gerados para seguir o padrão UUID.

---
Continue praticando e caprichando no código. Cada detalhe conta! 💪
Se precisar de ajuda, não hesite em perguntar nos canais da guilda. Estamos aqui para ajudar! 🤝

---
<sup>Made By the Autograder Team.</sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Carvalho](https://github.com/ArthurCRodrigues)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Drumond](https://github.com/drumondpucminas)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Gabriel Resende](https://github.com/gnvr29)</sup></sup>
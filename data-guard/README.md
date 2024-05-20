# Regras de Negócio para Validação

## TODO ✓
- [x] Validadção de Objects.
- [ ] Validadção de Arrays.
  - [ ] Validadção de Arrays de Objects.

## Adição de Itens ao Esquema

- **Adicionar Item Obrigatório** 
  - Deve ser possível adicionar um item obrigatório ao esquema passando um objeto com as propriedades `type` e `required`.
  - Exemplo: `{ type: 'string', required: true }`.

- **Adicionar Item Opcional** ✅
  - Deve ser possível adicionar um item opcional ao esquema passando apenas o tipo ou um objeto com a propriedade `type`.
  - Exemplo: `'string'` ou `{ type: 'string' }`.

## Validação dos Dados com Base no Esquema
- **Item Opcional Não Presente no Data** ✅
  - Se um item no esquema não for obrigatório e não estiver presente nos dados fornecidos, ele deve ser ignorado no retorno.

- **Item Opcional Presente no Data** ✅
  - Se um item no esquema não for obrigatório, mas estiver presente nos dados fornecidos, apenas o tipo deve ser validado.

- **Item Obrigatório Não Presente no Data** ✅
  - Se um item no esquema for obrigatório e não estiver presente nos dados fornecidos, deve ser emitido um erro indicando que o item é obrigatório.

- **Item Obrigatório Presente no Data** ✅
  - Se um item no esquema for obrigatório e estiver presente nos dados fornecidos, o tipo deve ser validado.

## Resultado da Validação
- **Retorno de Itens Válidos** ✅
  - Em caso de sucesso em todas as validações, deve ser retornado um objeto contendo apenas os itens válidos.

- **Item Não Existente no Esquema**: ⏳ Em Progresso.
  - Se nos dados fornecidos houver um item que não existe no esquema, deve ser emitido um erro indicando que o item não é reconhecida.

## Exemplos de Uso
- **Esquema e Dados**
  ```javascript
  const schema = {
    name: { type: 'string', required: true },
    age: { type: 'number' },
    email: 'string',
  };

  const data = {
    name: 'John Doe',
    age: 30,
    address: '123 Main St',
  };
  ```

### Resultado Esperado:
  Deve retornar um erro devido à chave ```address``` não estar no esquema.

  Se address fosse removido, deve retornar ```{ name: 'John Doe', age: 30 }```.

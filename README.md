# README - Projeto Clínica Vitalis

## Sobre o Projeto

O projeto Clínica Vitalis tem como objetivo oferecer uma plataforma para gestão de serviços na área da saúde, incluindo atendimento psicológico, nutricional, agendamento de consultas médicas e outros serviços relacionados.

## Como Rodar o Projeto

1. Após clonar o repositório, abra o terminal e entre na raiz do projeto:
   ```sh
   cd `/src-clinicavitalis-access
   ```
2. Instale as dependências do projeto na raiz:
   ```sh
   npm install
   ```
3. Entre na pasta `/src/client` e instale as dependências:
   ```sh
   cd src/client
   npm install
   ```
4. Para iniciar o projeto, execute o comando:
   ```sh
   npm run dev
   ```
5. Acesse o projeto no navegador:
   ```
   http://localhost:5173
   ```

## Estrutura do Projeto
- O que é o projeto.
- Linguagem usada no projeto: Vuejs.3
- Tecnologias utilizadas:
  - Cypress
  - Vitest
  - Configuração de variáveis de ambiente (.env)
- Metodologia ágil adotada: **Kanban**.

## Padrão de Commits (Conventional Commits)

Todos os commits devem seguir o padrão de **Conventional Commits**. A validação é feita automaticamente pelo Husky nos hooks `commit-msg` e `pre-push`.

### Formato
```
<tipo>: <mensagem>
```

### Tipos Válidos
- `feat` - Nova funcionalidade
- `fix` - Correção de bug
- `chore` - Tarefas rotineiras (dependências, configurações)
- `build` - Mudanças no sistema de build
- `ci` - Mudanças em CI/CD
- `docs` - Documentação
- `style` - Formatação de código (não afeta lógica)
- `refactor` - Refatoração sem mudança de funcionalidade
- `perf` - Otimização de performance
- `test` - Adição ou modificação de testes
- `revert` - Revert de um commit anterior
- `init` - Commit inicial
- `merge` - Merge de branches
- `wip` - Trabalho em progresso

### Regras
- ✅ **Máximo 100 caracteres** na primeira linha (tipo + dois-pontos + mensagem)
- ✅ **Tipo obrigatório** antes dos dois-pontos
- ✅ **Mensagem clara e descritiva**

### Exemplos ✅
```
feat: adjust styles on component
fix: correct user authentication flow
chore: update dependencies
test: add unit tests for auth service
docs: update installation guide
style: format code with prettier
refactor: simplify api request handler
perf: optimize image loading
```

### Exemplos ❌
```
Updated stuff                           (sem tipo)
feat: this is a very long message that exceeds one hundred characters here (muito longo)
feat adjust styles                      (sem dois-pontos)
random: do something                    (tipo inválido)
```

### O que Acontece ao Violar o Padrão?
- ❌ O commit será **rejeitado** com mensagem de erro
- ❌ O push será **bloqueado** se houver commits que não seguem o padrão

Colaboradores:
Thiago - Desenvolvedor
Jonatas - Desenvolvedor
Thony - Desenvolvedor
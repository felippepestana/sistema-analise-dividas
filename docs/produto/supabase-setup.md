# Supabase Setup
## Estrutura inicial de banco para a plataforma

## Objetivo

Preparar a evolucao da persistencia local para uma base real em Supabase, mantendo simplicidade no MVP e espaco para escalar atendimento, eventos e operacao.

## Tabelas iniciais

### `leads`

Armazena os dados principais da triagem:

- nome
- estado
- renda
- parcelas
- despesas essenciais
- quantidade de contratos
- tipos de divida
- sinais de agravamento
- consentimento
- classificacao
- urgencia
- status operacional

### `lead_events`

Tabela historica para registrar eventos relevantes:

- criacao da triagem
- clique em WhatsApp
- agendamento
- mudanca de status
- observacoes automatizadas futuras

### `lead_notes`

Armazena notas internas do atendimento e da operacao comercial.

## Arquivo de migracao

- `supabase/migrations/20260618_initial_schema.sql`
- `supabase/migrations/20260618_add_lead_notes.sql`
- `docs/produto/modelagem-dados.md`

## Variaveis necessarias

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Estrategia de implantacao

1. Criar o projeto no Supabase.
2. Rodar a migracao inicial.
3. Preencher as variaveis de ambiente no projeto.
4. Validar se a API de leads passa a gravar em Supabase.
5. Manter fallback local apenas para desenvolvimento.

## Comportamento atual do projeto

- sem credenciais do Supabase: grava localmente em arquivo
- com credenciais preenchidas: passa a usar Supabase para leads e eventos

## Evolucoes recomendadas

- tabela de atendimentos
- tabela de agendamentos
- tabela de usuarios internos
- auditoria de alteracao de status
- storage para documentos, quando houver necessidade real

# Deploy Vercel
## Primeira versao publicada da plataforma

## Objetivo

Publicar rapidamente a aplicacao Next.js com o menor atrito operacional, mantendo ambiente simples para o MVP.

## Requisitos

- repositorio atualizado no GitHub
- projeto criado na Vercel
- variaveis de ambiente preenchidas

## Variaveis necessarias

- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_CALENDAR_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Passo a passo

1. Importar o repositorio `sistema-analise-dividas` na Vercel.
2. Confirmar framework `Next.js`.
3. Preencher as variaveis de ambiente.
4. Publicar.
5. Validar rota principal, painel interno, FAQ, agendamento e API de leads.

## Checklist de validacao

- landing page abre corretamente
- simulador gera classificacao
- API de leads responde
- painel interno exige autenticacao
- Supabase registra lead e nota
- links de WhatsApp e agenda estao corretos

## Cuidados

- nunca usar placeholders em producao
- proteger o painel interno com credenciais fortes
- revisar politica de privacidade antes da divulgacao publica

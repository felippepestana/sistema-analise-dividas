# PRD
## Plataforma de Analise de Dividas Bancarias

## 1. Visao geral

Construir uma plataforma digital orientada a captacao qualificada, educacao juridica e triagem inicial de consumidores com dividas bancarias, comprometimento excessivo da renda e potencial necessidade de assessoria especializada em direito bancario e relacao consumerista.

## 2. Problema

Pessoas com dividas bancarias frequentemente:

- nao sabem organizar suas informacoes financeiras e contratuais
- nao distinguem renegociacao util de solucao apenas aparente
- nao sabem quando a situacao pode exigir leitura juridica
- chegam ao atendimento humano desorganizadas, o que reduz eficiencia comercial e tecnica

## 3. Objetivos do produto

### Objetivo principal

Converter trafego informativo em leads qualificados para atendimento juridico especializado.

### Objetivos secundarios

- educar o usuario sem prometer resultado
- classificar o nivel preliminar de urgencia do caso
- reduzir atrito no primeiro contato
- padronizar a triagem inicial
- permitir expansao operacional nacional

## 4. Publico-alvo

### Primario

- pessoa fisica com dividas bancarias
- renda comprometida por cartao, emprestimo, consignado ou refinanciamentos
- consumidores dos estados de Rondonia, Acre e Amazonas no inicio da operacao

### Secundario

- consumidores de outros estados com perfil semelhante

## 5. Proposta de valor

"Ajudar o usuario a compreender sua situacao de dividas em poucos minutos, com uma leitura preliminar segura e proximo passo claro para atendimento especializado."

## 6. Escopo do MVP

- landing page principal
- simulador preliminar com formulario
- classificacao automatica em tres niveis
- resultado com checklist documental
- CTA para WhatsApp
- integracao com agenda por link
- pagina de apoio com FAQ e materiais

## 7. Fora do escopo do MVP

- analise automatica de documentos por IA
- login do usuario final
- painel completo multiusuario
- integracao nativa com CRM proprietario
- automacoes juridicas profundas de backoffice

## 8. Fluxo principal

1. Usuario chega pela landing page.
2. Entende a proposta da ferramenta.
3. Inicia simulacao.
4. Informa renda, despesas, contratos e sinais de agravamento.
5. Recebe classificacao preliminar.
6. Ve checklist e proximo passo.
7. Segue para WhatsApp e agendamento.

## 9. Requisitos funcionais

### RF01
Exibir proposta da ferramenta e ressalva de que o resultado nao substitui consulta juridica.

### RF02
Capturar dados essenciais para a triagem inicial.

### RF03
Aplicar regras de classificacao configuraveis.

### RF04
Exibir resultado com nivel de urgencia, leitura orientativa, documentos e CTA.

### RF05
Gerar mensagem preformatada para WhatsApp.

### RF06
Permitir evolucao futura para salvar lead e simulacao em banco de dados.

### RF07
Disponibilizar links para eBook, FAQ e materiais correlatos.

## 10. Requisitos nao funcionais

- mobile first
- tempo de carregamento leve
- linguagem simples
- visual profissional e confiavel
- arquitetura apta para SEO
- adequacao basica a LGPD, com consentimento inicial e minimizacao de dados

## 11. Regras de negocio iniciais

- comprometimento da renda elevado aumenta score
- ausencia de folga apos despesas essenciais aumenta score
- renegociacoes sucessivas aumentam score
- desconto em folha aumenta prioridade
- multiplicidade de contratos e tipos de divida agrava leitura

## 12. Conteudo obrigatorio

- politica de privacidade
- termo de uso informativo
- descricao clara da finalidade da ferramenta
- CTA para atendimento humano
- FAQ

## 13. Metricas

- visitas na landing page
- inicio do simulador
- conclusao do simulador
- clique no WhatsApp
- agendamentos
- contratos por origem
- taxa de conversao por estado

## 14. Riscos

- parecer ferramenta oficial do governo
- exagero em promessas de resultado
- coleta excessiva de dados no primeiro contato
- baixa qualidade de leads sem boa triagem

## 15. Dependencias

- numero oficial de WhatsApp
- agenda online
- identidade institucional
- textos juridicamente revisados
- politica de privacidade
- credenciais do painel interno
- projeto Supabase para persistencia real

## 16. Critérios de aceite do MVP

- simulador funcional em desktop e mobile
- classificacao coerente com as regras definidas
- CTA para WhatsApp funcionando
- materiais de apoio acessiveis
- texto final com ressalvas adequadas

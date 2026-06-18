export const requiredDocuments = [
  "Documento pessoal e comprovante de residencia",
  "Comprovantes de renda recentes",
  "Extratos bancarios dos ultimos meses",
  "Contratos, faturas e boletos",
  "Historico de renegociacoes",
  "Comprovantes de descontos em folha ou debitos automaticos"
];

export function classifyDebtScenario({
  income,
  installments,
  essentials,
  contracts,
  debtTypes,
  negative,
  renegotiations,
  payroll
}) {
  const commitment = income > 0 ? installments / income : 0;
  const freeCash = income - installments - essentials;

  let score = 0;
  if (commitment >= 0.3) score += 1;
  if (commitment >= 0.45) score += 2;
  if (commitment >= 0.6) score += 3;
  if (freeCash < 0) score += 3;
  if (freeCash >= 0 && freeCash < income * 0.1) score += 1;
  if (contracts >= 3) score += 1;
  if (contracts >= 5) score += 1;
  if (negative === "sim") score += 1;
  if (renegotiations === "sim") score += 2;
  if (payroll === "sim") score += 1;
  if (debtTypes.length >= 3) score += 1;

  if (score >= 8) {
    return {
      key: "superendividamento",
      title: "Cenario com indicios de superendividamento",
      urgency: "Alta",
      summary:
        "Os dados sugerem comprometimento relevante da renda e sinais de que a reorganizacao da divida pode exigir analise juridica individual.",
      guidance:
        "A prioridade e preservar despesas essenciais, evitar novas contratacoes precipitadas e organizar os contratos para leitura tecnica completa.",
      nextStep:
        "Encaminhar o lead para atendimento humano com triagem prioritaria e proposta de agendamento."
    };
  }

  if (score >= 4) {
    return {
      key: "alerta",
      title: "Cenario de alerta",
      urgency: "Media",
      summary:
        "Ha pressao financeira relevante. O caso pode exigir analise mais cuidadosa antes de qualquer nova renegociacao.",
      guidance:
        "Vale mapear contratos pesados, custo total e historico de refinanciamentos para decidir entre medida administrativa e leitura juridica mais profunda.",
      nextStep:
        "Conduzir o lead para checklist documental e atendimento qualificado."
    };
  }

  return {
    key: "administravel",
    title: "Cenario administravel",
    urgency: "Baixa",
    summary:
      "Os dados iniciais nao indicam, por si so, um quadro mais grave, mas a organizacao preventiva continua importante.",
    guidance:
      "A recomendacao e revisar contratos, monitorar a evolucao do orcamento e evitar novas obrigacoes assumidas no impulso.",
    nextStep:
      "Manter monitoramento e oferecer material educativo com opcao de consulta individual."
  };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value || 0);
}

export function buildWhatsappMessage(payload, classification) {
  const commitment = payload.income > 0 ? payload.installments / payload.income : 0;
  const freeCash = payload.income - payload.installments - payload.essentials;
  const debtLabel = payload.debtTypes.length ? payload.debtTypes.join(", ") : "Nao informado";

  return [
    "Ola, acabei de usar a ferramenta de analise preliminar.",
    `Nome: ${payload.name || "Nao informado"}`,
    `Estado: ${payload.state}`,
    `Classificacao: ${classification.title}`,
    `Renda mensal aproximada: ${formatCurrency(payload.income)}`,
    `Parcelas mensais: ${formatCurrency(payload.installments)}`,
    `Despesas essenciais: ${formatCurrency(payload.essentials)}`,
    `Comprometimento estimado: ${(commitment * 100).toFixed(1)}%`,
    `Folga apos despesas: ${formatCurrency(freeCash)}`,
    `Contratos ativos: ${payload.contracts}`,
    `Principais dividas: ${debtLabel}`,
    `Negativacao: ${payload.negative}`,
    `Renegociacoes sucessivas: ${payload.renegotiations}`,
    `Desconto em folha: ${payload.payroll}`,
    `Tentativa administrativa: ${payload.adminAttempt}`,
    `Principal preocupacao: ${payload.mainConcern || "Nao informado"}`
  ].join("\n");
}

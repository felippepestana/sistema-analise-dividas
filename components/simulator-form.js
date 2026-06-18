"use client";

import { useState } from "react";
import {
  buildWhatsappMessage,
  classifyDebtScenario,
  formatCurrency,
  requiredDocuments
} from "@/lib/simulator";

const initialState = {
  name: "",
  state: "RO",
  income: "",
  installments: "",
  essentials: "",
  contracts: "",
  debtTypes: [],
  negative: "nao",
  renegotiations: "nao",
  payroll: "nao",
  adminAttempt: "nao",
  consent: false,
  mainConcern: ""
};

const debtOptions = [
  "Cartao de credito",
  "Emprestimo pessoal",
  "Consignado",
  "Cheque especial",
  "Financiamento"
];

function parseNumber(value) {
  return Number(value || 0);
}

export default function SimulatorForm() {
  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState(null);
  const [submissionState, setSubmissionState] = useState("idle");

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleDebt(value) {
    setForm((current) => {
      const exists = current.debtTypes.includes(value);
      return {
        ...current,
        debtTypes: exists
          ? current.debtTypes.filter((item) => item !== value)
          : [...current.debtTypes, value]
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmissionState("submitting");

    const payload = {
      ...form,
      income: parseNumber(form.income),
      installments: parseNumber(form.installments),
      essentials: parseNumber(form.essentials),
      contracts: parseNumber(form.contracts)
    };

    const classification = classifyDebtScenario(payload);
    const commitment = payload.income > 0 ? payload.installments / payload.income : 0;
    const freeCash = payload.income - payload.installments - payload.essentials;
    const message = buildWhatsappMessage(payload, classification);
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5500000000000";

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...payload,
          classification: classification.key,
          urgency: classification.urgency,
          consent: Boolean(payload.consent)
        })
      });
      setSubmissionState("saved");
    } catch (error) {
      setSubmissionState("error");
    }

    setResult({
      classification,
      commitment,
      freeCash,
      whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    });
  }

  function resetForm() {
    setForm(initialState);
    setResult(null);
    setSubmissionState("idle");
  }

  return (
    <>
      <form className="simulator-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-card">
            <span>Nome</span>
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Seu nome"
            />
          </label>
          <label className="form-card">
            <span>Estado prioritario</span>
            <select value={form.state} onChange={(event) => updateField("state", event.target.value)}>
              <option value="RO">Rondonia</option>
              <option value="AC">Acre</option>
              <option value="AM">Amazonas</option>
              <option value="OUTRO">Outro estado</option>
            </select>
          </label>
          <label className="form-card">
            <span>Renda mensal aproximada</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.income}
              onChange={(event) => updateField("income", event.target.value)}
              required
            />
          </label>
          <label className="form-card">
            <span>Total mensal das parcelas</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.installments}
              onChange={(event) => updateField("installments", event.target.value)}
              required
            />
          </label>
          <label className="form-card">
            <span>Despesas essenciais mensais</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.essentials}
              onChange={(event) => updateField("essentials", event.target.value)}
              required
            />
          </label>
          <label className="form-card">
            <span>Quantidade de contratos ativos</span>
            <input
              type="number"
              min="0"
              step="1"
              value={form.contracts}
              onChange={(event) => updateField("contracts", event.target.value)}
              required
            />
          </label>
        </div>

        <div className="checkbox-card">
          <h3>Quais dividas hoje mais pesam no seu orcamento?</h3>
          {debtOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={form.debtTypes.includes(option)}
                onChange={() => toggleDebt(option)}
              />{" "}
              {option}
            </label>
          ))}
        </div>

        <div className="toggle-grid">
          <label className="toggle-card">
            <span>Existe negativacao hoje?</span>
            <select value={form.negative} onChange={(event) => updateField("negative", event.target.value)}>
              <option value="nao">Nao</option>
              <option value="sim">Sim</option>
            </select>
          </label>
          <label className="toggle-card">
            <span>Houve renegociacoes sucessivas?</span>
            <select
              value={form.renegotiations}
              onChange={(event) => updateField("renegotiations", event.target.value)}
            >
              <option value="nao">Nao</option>
              <option value="sim">Sim</option>
            </select>
          </label>
          <label className="toggle-card">
            <span>Existe desconto em folha?</span>
            <select value={form.payroll} onChange={(event) => updateField("payroll", event.target.value)}>
              <option value="nao">Nao</option>
              <option value="sim">Sim</option>
            </select>
          </label>
          <label className="toggle-card">
            <span>Ja houve tentativa administrativa?</span>
            <select
              value={form.adminAttempt}
              onChange={(event) => updateField("adminAttempt", event.target.value)}
            >
              <option value="nao">Nao</option>
              <option value="sim">Sim</option>
            </select>
          </label>
        </div>

        <label className="message-card">
          <span>Principal preocupacao hoje</span>
          <textarea
            value={form.mainConcern}
            onChange={(event) => updateField("mainConcern", event.target.value)}
            placeholder="Ex.: minhas parcelas ja tomaram o espaco das despesas da casa."
          />
        </label>

        <label className="form-card">
          <span>Consentimento inicial</span>
          <div>
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => updateField("consent", event.target.checked)}
            />{" "}
            Concordo com o uso dos dados para triagem inicial e eventual contato sobre meu atendimento.
          </div>
        </label>

        <div className="hero-actions">
          <button className="primary-link" type="submit">
            Gerar leitura preliminar
          </button>
          <button className="secondary-link" type="button" onClick={resetForm}>
            Limpar dados
          </button>
        </div>

        {submissionState === "saved" ? (
          <p>Os dados da triagem foram preparados para a esteira de atendimento.</p>
        ) : null}
        {submissionState === "error" ? (
          <p>A leitura foi gerada normalmente, mas a captura do lead ainda precisa de persistencia configurada.</p>
        ) : null}
      </form>

      <div className="disclaimer-band">
        O resultado tem carater informativo e nao substitui consulta juridica individual. Evite tomar
        decisoes definitivas apenas com base nesta triagem automatizada.
      </div>

      {result ? (
        <section className="result-panel" aria-live="polite">
          <p className="eyebrow">Resultado</p>
          <h3 className="result-title">{result.classification.title}</h3>
          <p>{result.classification.summary}</p>

          <div className="result-metrics">
            <article className="metric">
              <span>Comprometimento</span>
              <strong>{(result.commitment * 100).toFixed(1)}%</strong>
            </article>
            <article className="metric">
              <span>Folga apos despesas</span>
              <strong>{formatCurrency(result.freeCash)}</strong>
            </article>
            <article className="metric">
              <span>Nivel de urgencia</span>
              <strong>{result.classification.urgency}</strong>
            </article>
          </div>

          <div className="result-guidance">
            <article>
              <h4>Leitura orientativa</h4>
              <p>{result.classification.guidance}</p>
            </article>
            <article>
              <h4>Documentos para separar</h4>
              <ul>
                {requiredDocuments.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h4>Proximo passo sugerido</h4>
              <p>{result.classification.nextStep}</p>
            </article>
          </div>

          <div className="result-actions">
            <a className="primary-link" href={result.whatsappUrl} target="_blank" rel="noreferrer">
              Continuar no WhatsApp
            </a>
            <a className="secondary-link" href="#materiais">
              Ver materiais de apoio
            </a>
          </div>
        </section>
      ) : null}
    </>
  );
}

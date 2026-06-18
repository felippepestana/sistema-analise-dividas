import Link from "next/link";
import { notFound } from "next/navigation";
import { readLeadEvents, readLeadNotes, readLeads } from "@/lib/lead-store";
import { formatCurrency } from "@/lib/simulator";

function labelForClassification(value) {
  if (value === "superendividamento") return "Indicios de superendividamento";
  if (value === "alerta") return "Cenario de alerta";
  return "Cenario administravel";
}

function labelForEvent(eventType) {
  const labels = {
    lead_created: "Triagem criada",
    status_updated: "Status atualizado",
    note_created: "Nota interna registrada"
  };

  return labels[eventType] || eventType;
}

export default async function LeadDetailPage({ params }) {
  const resolvedParams = await params;
  const leads = await readLeads();
  const lead = leads.find((item) => item.id === resolvedParams.id);

  if (!lead) {
    notFound();
  }

  const [events, notes] = await Promise.all([
    readLeadEvents(lead.id),
    readLeadNotes(lead.id)
  ]);

  return (
    <main className="page-shell">
      <section className="section-panel">
        <p className="eyebrow">Lead</p>
        <h1 className="section-title">{lead.name || "Lead sem nome informado"}</h1>
        <p>
          {labelForClassification(lead.classification)} • Urgencia {lead.urgency} • Estado {lead.state}
        </p>
        <div className="hero-actions">
          <Link className="secondary-link" href="/admin/leads">
            Voltar para a fila
          </Link>
        </div>
      </section>

      <section className="info-grid" style={{ marginTop: 20 }}>
        <article className="section-panel">
          <p className="eyebrow">Resumo financeiro</p>
          <p>
            <strong>Renda:</strong> {formatCurrency(lead.income)}
          </p>
          <p>
            <strong>Parcelas:</strong> {formatCurrency(lead.installments)}
          </p>
          <p>
            <strong>Despesas essenciais:</strong> {formatCurrency(lead.essentials)}
          </p>
          <p>
            <strong>Contratos:</strong> {lead.contracts}
          </p>
        </article>

        <article className="section-panel">
          <p className="eyebrow">Sinais do caso</p>
          <p>
            <strong>Negativacao:</strong> {lead.negative}
          </p>
          <p>
            <strong>Renegociacoes:</strong> {lead.renegotiations}
          </p>
          <p>
            <strong>Desconto em folha:</strong> {lead.payroll}
          </p>
          <p>
            <strong>Tentativa administrativa:</strong> {lead.adminAttempt}
          </p>
        </article>
      </section>

      <section className="section-panel" style={{ marginTop: 20 }}>
        <p className="eyebrow">Contexto</p>
        <p>
          <strong>Principais dividas:</strong>{" "}
          {lead.debtTypes?.length ? lead.debtTypes.join(", ") : "Nao informado"}
        </p>
        <p>
          <strong>Preocupacao principal:</strong> {lead.mainConcern || "Nao informada"}
        </p>
        <p>
          <strong>Status operacional:</strong> {lead.status}
        </p>
        <p>
          <strong>Origem:</strong> {lead.source || "landing-page"}
        </p>
      </section>

      <section className="info-grid" style={{ marginTop: 20 }}>
        <article className="section-panel">
          <p className="eyebrow">Notas internas</p>
          <div style={{ display: "grid", gap: 12 }}>
            {notes.length === 0 ? <p>Ainda nao ha notas internas.</p> : null}
            {notes.map((note) => (
              <article key={note.id} className="support-card">
                <strong>{note.author_name || "operador"}</strong>
                <p>{note.content}</p>
                <small>{new Date(note.created_at).toLocaleString("pt-BR")}</small>
              </article>
            ))}
          </div>
        </article>

        <article className="section-panel">
          <p className="eyebrow">Timeline operacional</p>
          <div style={{ display: "grid", gap: 12 }}>
            {events.length === 0 ? <p>Ainda nao ha eventos registrados.</p> : null}
            {events.map((event) => (
              <article key={event.id} className="support-card">
                <strong>{labelForEvent(event.event_type)}</strong>
                <p>{JSON.stringify(event.payload)}</p>
                <small>{new Date(event.created_at).toLocaleString("pt-BR")}</small>
              </article>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

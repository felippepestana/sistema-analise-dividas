import { classifyDebtScenario } from "@/lib/simulator";
import { createLead, readLeads } from "@/lib/lead-store";

export async function GET() {
  const leads = await readLeads();

  return Response.json({
    ok: true,
    total: leads.length,
    leads
  });
}

export async function POST(request) {
  const payload = await request.json();

  const normalized = {
    name: payload.name || "",
    state: payload.state || "OUTRO",
    income: Number(payload.income || 0),
    installments: Number(payload.installments || 0),
    essentials: Number(payload.essentials || 0),
    contracts: Number(payload.contracts || 0),
    debtTypes: Array.isArray(payload.debtTypes) ? payload.debtTypes : [],
    negative: payload.negative || "nao",
    renegotiations: payload.renegotiations || "nao",
    payroll: payload.payroll || "nao",
    adminAttempt: payload.adminAttempt || "nao",
    consent: Boolean(payload.consent),
    mainConcern: payload.mainConcern || ""
  };

  const classification = classifyDebtScenario(normalized);
  const storedLead = await createLead({
    ...normalized,
    source: payload.source || "landing-page",
    classification: classification.key,
    urgency: classification.urgency,
    capturedAt: new Date().toISOString(),
    status: "novo"
  });

  return Response.json({
    ok: true,
    lead: storedLead
  });
}

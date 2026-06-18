import SimulatorForm from "@/components/simulator-form";

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="top-nav">
        <div className="brand">
          <span className="brand-kicker">Direito bancario e relacao consumerista</span>
          <h1 className="brand-name">Analise de Dividas Bancarias</h1>
        </div>
        <div className="nav-actions">
          <a className="ghost-link" href="/sobre">
            Sobre
          </a>
          <a className="ghost-link" href="#materiais">
            Materiais de apoio
          </a>
          <a className="ghost-link" href="/admin/leads">
            Painel interno
          </a>
          <a className="primary-link" href="#simulador">
            Iniciar triagem
          </a>
        </div>
      </header>

      <section className="hero-grid">
        <article className="hero-copy">
          <p className="eyebrow">Triagem digital com saida humanizada</p>
          <h2 className="hero-title">
            Entenda se o seu cenario parece administravel, preocupante ou juridicamente sensivel.
          </h2>
          <p className="hero-lead">
            A plataforma foi pensada para captar, orientar e qualificar pessoas com dividas bancarias,
            comprometimento excessivo da renda e necessidade de apoio especializado.
          </p>

          <ul className="hero-list">
            <li>Simulador preliminar com classificacao por nivel de urgencia.</li>
            <li>Encaminhamento direto para atendimento no WhatsApp.</li>
            <li>Base educativa com eBook, FAQ, artigos e conteudo de apoio.</li>
            <li>Arquitetura pronta para evolucao nacional com foco inicial em RO, AC e AM.</li>
          </ul>

          <div className="hero-actions">
            <a className="primary-link" href="#simulador">
              Comecar analise
            </a>
            <a className="secondary-link" href="#ebook">
              Ver estrutura do eBook
            </a>
          </div>

          <div className="hero-stats">
            <article>
              <strong>Entrada</strong>
              <span>Landing page + simulador + WhatsApp</span>
            </article>
            <article>
              <strong>Publico</strong>
              <span>Consumidores com dividas bancarias e pressao de renda</span>
            </article>
            <article>
              <strong>Saida</strong>
              <span>Triagem, qualificacao e agendamento</span>
            </article>
          </div>
        </article>

        <section id="simulador" className="hero-tool">
          <div className="tool-header">
            <div>
              <p className="eyebrow">Versao Next.js</p>
              <h2 className="section-title">Simulador preliminar com conversao</h2>
            </div>
            <span className="tag">Leitura informativa</span>
          </div>

          <SimulatorForm />
        </section>
      </section>

      <section className="support-grid">
        <article className="support-card">
          <p className="eyebrow">Aquisicao</p>
          <h3>Conteudo que atrai sem prometer</h3>
          <p>
            Reels, artigos, carrosseis, lives e eBook trabalham o problema com linguagem informativa,
            compatível com publicidade jurídica responsavel.
          </p>
        </article>
        <article className="support-card">
          <p className="eyebrow">Conversao</p>
          <h3>Triagem com dados minimos e continuidade humana</h3>
          <p>
            O usuario entende o proprio cenario, recebe um norte inicial e segue para atendimento por
            WhatsApp com roteiro de qualificação.
          </p>
        </article>
        <article className="support-card">
          <p className="eyebrow">Operacao</p>
          <h3>Base pronta para CRM, agenda e painel interno</h3>
          <p>
            A solução foi organizada para evoluir sem refazer o fluxo central: captar, classificar,
            priorizar e converter.
          </p>
        </article>
      </section>

      <section className="info-grid" id="materiais">
        <article className="section-panel" id="ebook">
          <p className="eyebrow">Frente editorial</p>
          <h2 className="section-title">EBook quase pronto para diagramação</h2>
          <p>
            A versão expandida cobre conceito de superendividamento, sinais de alerta, checklist,
            exemplos didaticos, perguntas frequentes e chamada etica para avaliacao preliminar.
          </p>
          <ul>
            <li>Foco em linguagem simples, segura e acolhedora.</li>
            <li>Estrutura pensada para isca digital ou material mais robusto.</li>
            <li>Compatível com a esteira de conteúdo e com a landing page.</li>
          </ul>
          <div className="hero-actions">
            <a className="primary-link" href="../docs/ebook/ebook-completo-superendividamento.md">
              Abrir eBook completo
            </a>
            <a className="secondary-link" href="/faq">
              Abrir FAQ da plataforma
            </a>
          </div>
        </article>

        <article className="section-panel">
          <p className="eyebrow">Produto e atendimento</p>
          <h2 className="section-title">Conversao preparada para escala</h2>
          <p>
            A esteira foi pensada para levar o visitante da informacao ao contato, do contato ao
            agendamento e do agendamento a proposta comercial mais adequada ao tipo de caso.
          </p>
          <ul>
            <li>Consentimento inicial e captação enxuta.</li>
            <li>Resultado automatico com ressalva de leitura preliminar.</li>
            <li>Encaminhamento direto ao WhatsApp.</li>
            <li>Base documental para CRM, painel e agenda.</li>
          </ul>
          <div className="hero-actions">
            <a className="primary-link" href="../docs/comercial/script-atendimento-whatsapp.md">
              Abrir script de atendimento
            </a>
            <a className="secondary-link" href="/agendamento">
              Ir para agendamento
            </a>
          </div>
        </article>
      </section>

      <section className="footer-grid">
        <article className="footer-card">
          <p className="eyebrow">Entrega tecnica</p>
          <h2 className="section-title">Estrutura pronta para desenvolvimento assistido por IA</h2>
          <p>
            O repositório agora tem base de produto, marketing, comercial e frontend para que agentes
            como Codex, Claude Code e ferramentas semelhantes avancem com implementacao incremental.
          </p>
        </article>

        <article className="footer-card">
          <p className="eyebrow">Importante</p>
          <ul>
            <li>Substituir o numero placeholder do WhatsApp antes da publicacao.</li>
            <li>Adicionar politica de privacidade e termos de uso.</li>
            <li>Revisar a linguagem final conforme posicionamento profissional do escritorio.</li>
            <li>Conectar persistencia real no endpoint de leads.</li>
            <li>Proteger a rota interna de leads antes da publicacao externa.</li>
          </ul>
          <div className="hero-actions">
            <a className="secondary-link" href="/privacidade">
              Privacidade
            </a>
            <a className="secondary-link" href="/termos">
              Termos
            </a>
            <a className="secondary-link" href="/contato">
              Contato
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}

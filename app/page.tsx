"use client";
import { useMemo, useState } from 'react';

type Form = {
  industry: string;
  market: string;
  product: string;
  target: string;
  goals: string;
  competitors: string;
  channels: string;
  budget: string;
  timeline: string;
  kpis: string;
  constraints: string;
  tone: string;
  outputs: string;
  language: string;
  company: string;
};

const defaults: Form = {
  industry: "SaaS B2B",
  market: "Italia ed Europa Occidentale",
  product: "Piattaforma di automazione marketing per PMI",
  target: "Founder, Marketing Manager di PMI (10-200 dip.)",
  goals: "Mappare dimensione mercato, segmenti prioritari, pricing e GTM nei prossimi 6 mesi",
  competitors: "HubSpot, Mailchimp, ActiveCampaign, Brevo",
  channels: "Inbound, partner, outbound mirato, marketplace SaaS",
  budget: "€100k-250k primo anno",
  timeline: "Quarter-by-quarter (12 mesi)",
  kpis: "MRR, CAC, LTV, Payback, Conversioni funnel",
  constraints: "Team ridotto, brand emergente, limitazioni GDPR",
  tone: "Professionale, data-driven, italiano formale",
  outputs: "Report strutturato, tabelle (CSV-like), roadmap azionabile, ipotesi test",
  language: "Italiano",
  company: "Startup Series A, 30 persone, ARR €2M"
};

function buildPrompt(f: Form): string {
  return [
    `Agisci come un analista di mercato senior e consulente go-to-market. Redigi una ANALISI DI MERCATO COMPLETA e operativa in ${f.language}.`,
    '',
    'CONTESTO AZIENDALE:',
    `- Azienda/Prodotto: ${f.product}`,
    `- Settore/Industria: ${f.industry}`,
    `- Mercato/Geografie: ${f.market}`,
    `- Target/Personas: ${f.target}`,
    `- Competitor principali: ${f.competitors}`,
    `- Canali attuali o previsti: ${f.channels}`,
    `- Obiettivi: ${f.goals}`,
    `- Budget/risorse: ${f.budget}`,
    `- Timeline: ${f.timeline}`,
    `- KPI: ${f.kpis}`,
    `- Vincoli: ${f.constraints}`,
    `- Contesto aziendale: ${f.company}`,
    '',
    'REQUISITI DI ANALISI (copri in sezioni chiare):',
    '1) Dimensione mercato e domanda: TAM/SAM/SOM con ipotesi e fonti; trend, crescita, stagionalità, driver e barriere. Tabelle con intervalli e range di confidenza.',
    '2) Segmentazione e Personas: cluster prioritari, bisogni (JTBD), criteri di priorità (dimensione, accessibilità, margini).',
    '3) Analisi competitiva: mappa posizionamento, feature parity, pricing packaging, canali; vantaggi/svantaggi per categoria; matrice strategica.',
    '4) PESTLE + Cinque Forze di Porter: fattori macro e intensità competitiva con implicazioni operative.',
    '5) SWOT focalizzata: 5-7 punti per quadrante, implicazioni go-to-market.',
    '6) Pricing e monetizzazione: value metric, willingness-to-pay, scontistica, bundling; scenari con sensibilità.',
    '7) Canali e GTM: priorità canali (ICE score), funnel con benchmark tasso conversione e CPA attesi; piano test sperimentazioni.',
    '8) Messaggio e posizionamento: proposta di valore, proof points, differenziatori; esempi di headline/copy per 3 segmenti.',
    '9) Piano operativo e roadmap: iniziative trimestrali, owner, effort, dipendenze, rischi, milestone e metriche.',
    '10) KPI e modello economico: unit economics (CAC, LTV, payback), coorti e sensitività principali.',
    '11) Rischi e assunzioni critiche: come testarle velocemente (design degli esperimenti).',
    '12) Raccomandazioni finali: 5-10 azioni prioritarie “no-regret” e 3 scommesse misurabili.',
    '',
    'FORMATO DI USCITA:',
    '- Struttura con titoli numerati, sottosezioni e punti elenco sintetici.',
    '- Tabelle in formato markdown o CSV-like per dati e benchmark.',
    '- Per ogni stima, indica ipotesi, metodo e fonte (link quando possibile).',
    '- Evidenzia le implicazioni pratiche per marketing, vendite, prodotto.',
    '- Chiudi ogni sezione con “Cosa fare adesso” (3-5 azioni).',
    '',
    'REGOLE DI QUALITÀ:',
    '- Essere specifico, con numeri, intervalli e riferimenti.',
    '- Esplicita assunzioni e limiti; non inventare se mancano dati: proponi come stimarli.',
    '- Mantieni tono professionale e data-driven; evita generalità.',
    '- Se utile, proponi 2-3 alternative con trade-off.',
    '',
    'SE QUALCHE CAMPO È VUOTO:',
    '- Formula ipotesi ragionevoli e segnala chiaramente dove servono conferme.',
  ].join('\n');
}

export default function Page() {
  const [form, setForm] = useState<Form>(defaults);
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => buildPrompt(form), [form]);

  const onChange = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => setForm(defaults);

  return (
    <main className="grid" style={{ gap: 16 }}>
      <div className="header">
        <div className="row">
          <span className="badge">ITA</span>
          <div className="title">Generatore Prompt • Analisi di Mercato</div>
        </div>
        <div className="actions">
          <button className="button ghost" onClick={reset}>Reset</button>
          <button className="button" onClick={copy}>{copied ? 'Copiato!' : 'Copia Prompt'}</button>
        </div>
      </div>

      <section className="card">
        <div className="grid">
          <div>
            <div className="label">Settore / Industria</div>
            <input className="input" value={form.industry} onChange={onChange('industry')} placeholder="Es. SaaS B2B, Retail, Fintech" />
          </div>
          <div>
            <div className="label">Mercato / Geografie</div>
            <input className="input" value={form.market} onChange={onChange('market')} placeholder="Es. Italia, DACH, globale" />
          </div>
          <div>
            <div className="label">Prodotto / Servizio</div>
            <input className="input" value={form.product} onChange={onChange('product')} placeholder="Descrizione sintetica" />
          </div>
          <div>
            <div className="label">Target / Personas</div>
            <input className="input" value={form.target} onChange={onChange('target')} placeholder="Chi decide, chi usa" />
          </div>
          <div>
            <div className="label">Obiettivi dell’analisi</div>
            <input className="input" value={form.goals} onChange={onChange('goals')} placeholder="Cosa vuoi ottenere" />
          </div>
          <div>
            <div className="label">Competitor principali</div>
            <input className="input" value={form.competitors} onChange={onChange('competitors')} placeholder="Elenco separato da virgole" />
          </div>
          <div>
            <div className="label">Canali vendita / distribuzione</div>
            <input className="input" value={form.channels} onChange={onChange('channels')} placeholder="Es. inbound, outbound, partner" />
          </div>
          <div>
            <div className="label">Budget / Risorse</div>
            <input className="input" value={form.budget} onChange={onChange('budget')} placeholder="Es. €50k-200k" />
          </div>
          <div>
            <div className="label">Timeline</div>
            <input className="input" value={form.timeline} onChange={onChange('timeline')} placeholder="Es. 3-6 mesi" />
          </div>
          <div>
            <div className="label">KPI principali</div>
            <input className="input" value={form.kpis} onChange={onChange('kpis')} placeholder="Es. MRR, CAC, LTV" />
          </div>
          <div>
            <div className="label">Vincoli / Regole</div>
            <input className="input" value={form.constraints} onChange={onChange('constraints')} placeholder="Es. normative, brand, risorse" />
          </div>
          <div>
            <div className="label">Tono / Stile</div>
            <input className="input" value={form.tone} onChange={onChange('tone')} placeholder="Es. professionale, tecnico" />
          </div>
          <div>
            <div className="label">Output desiderati</div>
            <input className="input" value={form.outputs} onChange={onChange('outputs')} placeholder="Es. report, tabelle, roadmap" />
          </div>
          <div>
            <div className="label">Lingua</div>
            <input className="input" value={form.language} onChange={onChange('language')} placeholder="Italiano" />
          </div>
          <div>
            <div className="label">Contesto aziendale</div>
            <input className="input" value={form.company} onChange={onChange('company')} placeholder="Dimensione, fase, metriche chiave" />
          </div>
        </div>
        <div className="footer" style={{ marginTop: 10 }}>Compila i campi per personalizzare il prompt. Poi clicca "Copia Prompt".</div>
      </section>

      <section className="card">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="label">Anteprima Prompt</div>
          <div className="actions">
            <button className="button secondary" onClick={copy}>{copied ? 'Copiato!' : 'Copia'}</button>
          </div>
        </div>
        <div className="preview">{prompt}</div>
        <div className="hint" style={{ marginTop: 8 }}>Suggerimento: incolla il prompt in un modello GPT per ottenere un report strutturato.</div>
      </section>
    </main>
  );
}

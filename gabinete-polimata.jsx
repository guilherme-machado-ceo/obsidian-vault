import React, { useState, useMemo, useCallback } from "react";
import { LexicoPoligraficoPanel } from "./lexico-poligrafico-excerpts.jsx";

// ─── Dados dos nós ────────────────────────────────────────────────────────────
const nodes = {
  einSofAur:{ label:"EIN SOF AUR", glyph:"★", sublabel:"The Script of All and Everything · documento fundante",
    desc:"Documento mais antigo do ecossistema. Paradigma epistemológico que: (1) converge conhecimentos de todas as áreas; (2) processa dados em 7000+ línguas; (3) interface via sensores mecatrônicos (TI+TA); (4) integra todas as linguagens. IDE como 'cérebro ciborgue cibernético'. GENEALOGIA: Ein Sof → Beit Or · 'Script of All' → Semiografia/Poligrafia · IDE → codeiOgraph · sensores → stack analógica-digital · convergência → Segunda Escola de Toledo.",
    accent:"#d4af37", dim:"#1a1200"},
  deepHub:{ label:"DEEP HUB PAPER", glyph:"◎", sublabel:"4 campos, raízes semíticas, 7 níveis · versão zero da GuruDev",
    desc:"Segundo documento mais antigo. Formula os 4 campos do conhecimento (Filosofias, Tradições Espirituais, Ciências, Artes), raízes semânticas (modelo semítico), 7 níveis de interpretação, 3 relações de concordância. GENEALOGIA: 4 campos → 5 instâncias do IMIP · raízes semíticas → Morfologia Harmônica · 7 níveis → GuruDev TTM · 'Deep Hub' → Hubstry Deep Tech.",
    accent:"#b8860b", dim:"#120a00"},
  motoPerpetuo:{ label:"MOTO PERPÉTUO", glyph:"∞", sublabel:"Princípio autoral gerador",
    desc:"Inflexão do pensamento humano incidindo sobre o conjunto universo dos fenômenos, em interseção com stacks tecnológicas analógicas e digitais, instanciando-se em paralelo ou série em múltiplas áreas do conhecimento como na tradição pancrônica dos polimatas, em comparação e contraste sistemáticos operada pela analogia — heurística, funcional ou homologia —, em um fluxo contínuo de pesquisa, estudo, criação, ensino e produção econômica.",
    accent:"#c9a84c", dim:"#2a1f05"},
  reineSprache:{ label:"REINE SPRACHE", glyph:"λ", sublabel:"Basso ostinato universal · Benjamin",
    desc:"A linguagem da natureza — física e metafísica — da qual toda escrita humana é tradução. Princípio transversal que sustenta Naturaglia, Hierourgia e Poligrafia como variações sobre um ostinato comum.",
    accent:"#9b7a1a", dim:"#1a1204"},
  imip:{ label:"IMIP", glyph:"Ψ", sublabel:"Instância Múltipla Integrada do Pensamento",
    desc:"O sujeito cognitivo opera em cinco instâncias: científica (→Semiografia) · artística (→Marcabrü Aiara) · espiritual universalista — modo Ramakrishna, não sincretismo (→Teografia) · filosófica (→Naturaglia) · empreendedora — start-up mode como ignição, não dogma (→Hubstry). Heterônimos como artefatos cognitivos externos (Clark) e protocolo endógeno de risco psicossocial (Dejours/NR-1).",
    accent:"#4a9e6e", dim:"#051409"},
  beitOr:{ label:"BEIT OR EIN SOF", glyph:"✦", sublabel:"בֵּית אוֹר אֵין סוֹף · دَارُ نُورِ الأَزَل",
    desc:"Meta-projeto civilizacional conduzido por Ezra ben Sefarad (tradição hebraico-sefardita/cabalística) e Ra'uf ibn Hadi al-Andalusí (tradição árabe-islâmica/Ikhwan al-Safa). Locus: Toledo. Produz: Poligrafia · Segunda Escola de Toledo · Sprachlehre · Léxico Poligráfico · Genealogia Gerativa.",
    accent:"#7070dd", dim:"#05050f"},
  semiografia:{ label:"SEMIOGRAFIA", glyph:"σ", sublabel:"Duas versões: manifesto (fev/2026) + sistema axiomático (abr/2026, 441p)",
    desc:"VERSÃO I (fev/2026, DOI 10.5281/zenodo.18802603): Gesto dual de inventário pancrônico e prospecção. VERSÃO II (abr/2026, 441p): Sistema axiomático sobre matrizes n-dimensionais. 7 axiomas: Corporificação · Operabilidade · Tríade · Vazio Posicional · Extensibilidade por Frame · Não-Trivialidade Paraconsistente · Analogia Operativa. Operador Ψ = formalização matemática do Moto Perpétuo. Axioma Ziette: signo 7-Z.",
    accent:"#c87040", dim:"#140802"},
  morfossemiografia:{ label:"MORFOSSEMIOGRAFIA", glyph:"μ", sublabel:"O Morfema Afixal como Operador Epistemológico · DOI 10.5281/zenodo.19184886",
    desc:"Primeiro desdobramento da Semiografia. Morfema afixal como operador epistemológico. Cinco limiares de cristalização: territorial · memorial · ritual · identitário · institucional. Protocolo de 5 passos. Bachelard (obstáculo epistemológico morfológico), Greenberg/Comrie (universal relativo), Milton Santos (técnica como território). Framework computacional em 3 camadas.",
    accent:"#c87040", dim:"#140802"},
  poligrafia:{ label:"POLIGRAFIA", glyph:"П", sublabel:"Gênero da escrita autoral",
    desc:"Literatura multilíngue e simultânea em múltiplas camadas de materialidade. Opera por interseção (teoria dos conjuntos), ritornello (D&G) e translação interepistêmica (reine Sprache). Output do Beit Or Ein Sof. Designa o gênero formal de todo o ecossistema.",
    accent:"#7070dd", dim:"#05050f"},
  segundaEscola:{ label:"SEGUNDA ESCOLA DE TOLEDO", glyph:"⚖", sublabel:"Arquitetura institucional · 10 cadeiras civilizacionais",
    desc:"Direito · Guerra · História · Filosofia · Artes & Ofícios · Ciências · Gramática & Ciências da Linguagem · Comércio & Economia · Tradições Espirituais/Teografia · Educação & Formação.",
    accent:"#7070dd", dim:"#05050f"},
  sprachlehre:{ label:"SPRACHLEHRE → TTM", glyph:"∂", sublabel:"Doutrina da Língua · DOI 10.5281/zenodo.19056387",
    desc:"Teoria Tridimensional do Morfema: largura (combinatório-derivacional) · profundidade (hermenêutico-semântico) · altura gráfica (suprassegmental-escritural). Corpus: árabe, hebraico, sânscrito, mandarim, russo, tupi. Hermenêuticas: PaRDeS, Quadriga, Ẓāhir/Bāṭin, Saptavidha.",
    accent:"#7070dd", dim:"#05050f"},
  naturaglia:{ label:"NATURAGLIA", glyph:"Ω", sublabel:"Horizonte ontológico + Projeto filosófico do IMIP · DOI 10.5281/zenodo.18888646",
    desc:"Papel duplo: (1) horizonte ontológico de fundo — cinco Naturabilia como condição de possibilidade de qualquer pesquisa; (2) instância filosófica do IMIP. Reunificação: ciência natural · filosofia natural · história natural · direito natural · teologia natural. Forma: passacaglia. Genealogia: Fílon · Ikhwan al-Safa · Maimônides · Tomás · Jung · Morin.",
    accent:"#3a9a5a", dim:"#021008"},
  grammath:{ label:"GRAMMATH", glyph:"Γ", sublabel:"Universal Grammar of Experience · framework transmodal",
    desc:"Gramática universal da experiência: organiza fenômenos tal como comparecem aos sentidos humanos, sensores de máquinas, intuição, razão, imaginação e processos computacionais. Universalidade aristotélica. Papel duplo: (1) fundamento epistemológico; (2) projeto científico do IMIP. Naturaglia fornece a ontologia; Grammath fornece a epistemologia operacional.",
    accent:"#5a9ab0", dim:"#02080e"},
  hpg:{ label:"HPG 1.0", glyph:"≋", sublabel:"Harmonic Protocol Grid · DOI 10.5281/zenodo.18652888",
    desc:"Framework de comunicação multicanal para sistemas embarcados baseado em subdivisões racionais irredutíveis de f₀. Omnigrid Harmônico 2D com 97 canais únicos (totiente de Euler, N=16). Harmonic Security Layer (HSL). Convergência: música das esferas (Naturaglia) ↔ stack analógica-digital (Arduino, embarcados, Hubstry).",
    accent:"#3a9a5a", dim:"#021008"},
  teografia:{ label:"TEOGRAFIA", glyph:"θ", sublabel:"Campo: literaturas espirituais · esboço 8/jan/2026",
    desc:"Iniciativa epistemológica de pesquisa, estudo, criação e ensino das literaturas espirituais da humanidade — escritas, orais, rituais e performativas. Universalismo crítico. Equivalência oral/escrito. Nona cadeira da Segunda Escola de Toledo.",
    accent:"#a060c0", dim:"#0a0412"},
  hierourgia:{ label:"HIEROURGIA", glyph:"ℌ", sublabel:"Primeira obra teográfica sistemática",
    desc:"ἱερός + ἔργον — a obra que faz a obra sagrada: descreve e produz o logos operativo sacro simultaneamente. Seis valências: teurgia · demiurgia · taumaturgia · dramaturgia · magia natural · magia cerimonial. Corpora: PGM, Picatrix, Jâmblico, Agrippa, patrística, homilética.",
    accent:"#a060c0", dim:"#0a0412"},
  urgias:{ label:"AS SEIS VALÊNCIAS", glyph:"⬡", sublabel:"Hexágono operativo da Hierourgia",
    desc:"Teurgia (θεός+ἔργον) · Demiurgia (δήμιος+ἔργον) · Taumaturgia (θαῦμα+ἔργον) · Dramaturgia (δράμα+ἔργον) · Magia Natural (simpatias ocultas, Ficino/Porta) · Magia Cerimonial (PGM, Picatrix, Clavicula). Invariante pancrônico: a enunciação eficaz.",
    accent:"#a060c0", dim:"#0a0412"},
  marcabru:{ label:"MARCABRÜ AIARA", glyph:"✒", sublabel:"Heterônimo artístico-literário · desde 2017",
    desc:"Identidade artístico-literária exclusiva: dramaturgia hospitalar (Platéias Hospitalares/Doutores da Alegria 2014–16) · poesia · música original · teoria musical · IA em música. Indústria criativa — sexta maior indústria mundial. Rio de Janeiro como locus territorial.",
    accent:"#cc5050", dim:"#100202"},
  grauZero:{ label:"GRAU ZERO / IMT", glyph:"⌀", sublabel:"Semiótica do manuscrito · DOIs .18652564 / .19431553",
    desc:"Grau Zero do Traço: manuscrito em estado liminar anterior a qualquer codificação — modo autônomo de produção semiótica (Peirce, Barthes, Morin). Instância Mínima Tripla: um único gesto cursivo instancia ⟨2⟩, ⟨l⟩ e ⟨h⟩ — 'polissemia constitutiva emergente'. Extensão C-DDTF criptográfica.",
    accent:"#cc5050", dim:"#100202"},
  gurudev:{ label:"GURUDEV®", glyph:"⌘", sublabel:"Ontolinguagem · github.com/marcabru-tech · Hubstry/Lexiograph",
    desc:"'Computar é, antes de tudo, interpretar.' // ONTOLINGUAGEM: não representa o ser — co-institui mundos computáveis. // PROCESSADOR SEMÂNTICO TRIDIMENSIONAL: pensamento analógico × semiose peirceana × hermenêutica N1–N7. 6 relações semânticas. GURUMATRIX[i][j][k][t][l] 5D. MVP: 25 testes, GuruDVM, CLI, EBNF. Validações: GitHub Education, Microsoft for Startups, Google Gemini, Santander Explorer, Artemisia.",
    accent:"#cc5050", dim:"#100202"},
  morfHarmonica:{ label:"MORFOLOGIA HARMÔNICA", glyph:"♫", sublabel:"Campo fundado 22/jan/2026 · Manifesto v1.0 Zenodo",
    desc:"Campo cujo objeto é a estrutura morfológica universal em domínios distintos: linguístico, musical, geométrico, mineral, vegetal e animal. Quatro fontes: morfologia semítica · teoria harmônica · 23 definições dos Elementos de Euclides · morfometria geométrica (Kendall shape space, Procrustes). 13 postulados com critérios de falseabilidade. Hipótese: shape space (Kendall) ↔ chord space (Tymoczko) via funtor.",
    accent:"#e8a030", dim:"#180e00"},
  codeiOgraph:{ label:"codeiOgraph", glyph:"⎈", sublabel:"Plataforma de hermenêutica computacional",
    desc:"O código-fonte é texto semiótico-normativo que objetiva pensamento analógico. Interpretar código é reconstruir o pensamento — Savigny: Rekonstruktion des im Gesetz enthaltenen Gedankens. AGI é antes de tudo um problema hermenêutico. Arquitetura: (1) Grid semiótico do código; (2) Motor de analogia transdomínio; (3) Savigny Engine; (4) Grafo de pensamento. Ambiente nativo do GuruDev®.",
    accent:"#50a0d0", dim:"#020c14"},
  vvvGrid:{ label:"GRID VERBI–VOCO–VISUAL", glyph:"β", sublabel:"Semiose tridimensional da língua natural",
    desc:"Axioma: L = ⟨verbi, voco, visual⟩. Três dimensões coorigininárias: verbi (logos, inteligibilidade) · voco (corporeidade, embodied cognition de Varela/Merleau-Ponty) · visual (espacialização, escrita). Valor zero estrutural (∅). Isomorfismo com TTM e com processador semântico do GuruDev.",
    accent:"#a080d0", dim:"#08040e"},
  inoffshore:{ label:"IN||OFF SHORE", glyph:"‖", sublabel:"Plataforma de exploração de dados · produto Hubstry",
    desc:"Plataforma de coleta, descoberta, exploração, mineração e tratamento de dados — análoga à exploração de petróleo offshore. O operador || vem do OR lógico de JavaScript: In (onshore, superficial) || Off (offshore, profundo). Analogia: sísmica ↔ scraping · perfuração ↔ extração estruturada · refino ↔ ETL.",
    accent:"#2060a0", dim:"#010608"},
  solomon:{ label:"SOLOMON BUSINESS", glyph:"◆", sublabel:"Startup · reposicionamento digital de heritage",
    desc:"Missão: (re)posicionar negócios locais e tradicionais no mundo digital e contemporâneo, preservando com rigor e reverência seus valores fundadores. Morfossemiografia aplicada a negócios: reativar a intensidade semiótica latente do ato fundador. B2B para PMEs com história e heritage. Cadeira 8 da Segunda Escola de Toledo.",
    accent:"#906020", dim:"#0e0800"},
  almanaque:{ label:"ALMANAQUE GURUDEV", glyph:"⊙", sublabel:"Formato editorial · Polyograph Press · versão impressa do Gabinete",
    desc:"Inspirado nos almanaques do início do séc. XX — repositório heterogêneo com navegação não-linear, ótica polímata e poliglota. Formato editorial Polyograph Press / Lexiograph. Gabinete do Polímata = versão digital viva do Almanaque. DODECÁLOGO: 12 campos de formação integral — cadeira 10 da Segunda Escola de Toledo.",
    accent:"#c0a030", dim:"#120e00"},
  lexicoPoligrafico:{ label:"LÉXICO POLIGRÁFICO", glyph:"Λ", sublabel:"Neologismos constitutivos do ecossistema · Polyograph Press",
    desc:"Repositório de neologismos constitutivos do ecossistema. Verbetes publicados: ONTOLINGUAGEM · HIEROURGIA · ZIETTE. Verbetes previstos: paleobibliofilia · paleolexicosofia · morfossemiografia · semiografia · naturaglia · teografia. DOI Zenodo previsto para v1.0. Clique para ver o painel completo.",
    accent:"#d4af37", dim:"#1a1200"},
  lexiograph:{ label:"LEXIOGRAPH", glyph:"Λ", sublabel:"Startup pré-seed · fundada 2023 · faixa formal-computacional",
    desc:"Startup pré-seed fundada em 2023. Entidade institucional da faixa formal-computacional do ecossistema. Abriga: Semiografia v.0 · codeiOgraph · GuruDev® · Grammath. 'Lexiograph Deep Design' — o design do léxico, da linguagem e dos sistemas formais como produto.",
    accent:"#70a070", dim:"#041004"},
  institutoPCIH:{ label:"INSTITUTO PCIHᶟ", glyph:"◈", sublabel:"Polymath Cyborg Intelligence Hub · braço ICT",
    desc:"Vocação ICT/pública para acesso a financiamento institucional e pesquisa. Interface do ecossistema com o sistema nacional de CT&I. Cláusula ética inegociável: sem licenciamento para armas autônomas de IA ou vigilância de cidadãos.",
    accent:"#4080b0", dim:"#020810"},
  hubstry:{ label:"HUBSTRY · TRADEFLOW", glyph:"⚙", sublabel:"Produção econômica · fundado 2023",
    desc:"Hubstry Deep Tech (2023): CaaS em Rust para ECA Digital (Lei 15.211/2025), Fly.io GRU. TradeFlow: automação de comércio exterior. Agência Laos: design + IoT (stack analógica-digital). Produção econômica como dimensão constitutiva — não separada — do moto perpétuo.",
    accent:"#4080b0", dim:"#020810"},
  om3:{ label:"OM³", glyph:"✕", sublabel:"Ordem Mundial Mercante Multimodal · cadeira 8 da Segunda Escola",
    desc:"Ordem Mundial Mercante Multimodal. Empresa global de serviços estratégicos com vocação multinacional. Missão: comércio como instituição civilizatória. Modais: marítimo, fluvial, rodoviário, ferroviário e aéreo. Logo: X duplo em círculo bronzeado — X como interseção, multiplicação, operação e negação.",
    accent:"#b8860b", dim:"#120a00"},
  vvvServices:{ label:"VVV MICROSERVICES", glyph:"β", sublabel:"Três microserviços em Go · um por dimensão do grid",
    desc:"Implementação do Grid Verbi–Voco–Visual como três microserviços em Go: verbi-service (NLP/semântica) · voco-service (áudio/prosódia) · visual-service (imagem/OCR/gesto). Gateway: codeiOgraph. Runtime: GuruDev®. Infra: Fly.io GRU.",
    accent:"#a080d0", dim:"#08040e"},
  axioma:{ label:"AXIOMA DA GURUDEV", glyph:"Ψ", sublabel:"Princípio fundacional · dualidade infinito contextual / computacional",
    desc:"⟦ℓ⟧ = Ψ(Φ_ctx, Φ_comp). Linha mínima ℓ = expressão atômica com efeito observável não decomponível sem perda de intenção. Isomórfica com ponto euclidiano ('aquilo de que nada é parte') e jaculatória ('ato de fala eficaz mínimo'). Oito espaços ε: euclidiano · Hilbert · Fourier · métrico · Sobolev · Minkowski · fractal · curvas elípticas. AGI = problema de acoplamento dinâmico entre Φ_ctx e Φ_comp.",
    accent:"#d060a0", dim:"#120008"},
};

// ─── Arestas ──────────────────────────────────────────────────────────────────
const edges = [
  ["einSofAur","deepHub"],["einSofAur","motoPerpetuo"],["einSofAur","beitOr"],
  ["einSofAur","codeiOgraph"],["einSofAur","segundaEscola"],["einSofAur","morfHarmonica"],["einSofAur","semiografia"],
  ["deepHub","motoPerpetuo"],["deepHub","imip"],["deepHub","gurudev"],["deepHub","morfHarmonica"],
  ["deepHub","semiografia"],["deepHub","hubstry"],
  ["motoPerpetuo","reineSprache"],["motoPerpetuo","imip"],["motoPerpetuo","beitOr"],
  ["motoPerpetuo","semiografia"],["motoPerpetuo","naturaglia"],["motoPerpetuo","teografia"],
  ["motoPerpetuo","marcabru"],["motoPerpetuo","institutoPCIH"],["motoPerpetuo","hubstry"],
  ["motoPerpetuo","lexiograph"],["motoPerpetuo","grammath"],
  ["reineSprache","naturaglia"],["reineSprache","hierourgia"],["reineSprache","poligrafia"],
  ["beitOr","poligrafia"],["beitOr","segundaEscola"],["beitOr","sprachlehre"],
  ["beitOr","imip"],["beitOr","almanaque"],["beitOr","lexicoPoligrafico"],["beitOr","solomon"],
  ["semiografia","morfossemiografia"],["semiografia","grauZero"],["semiografia","gurudev"],
  ["semiografia","axioma"],["semiografia","vvvGrid"],["semiografia","lexicoPoligrafico"],
  ["imip","marcabru"],["imip","gurudev"],["imip","naturaglia"],["imip","grammath"],["imip","beitOr"],
  ["naturaglia","hpg"],["naturaglia","hierourgia"],["naturaglia","gurudev"],
  ["grammath","codeiOgraph"],["grammath","vvvGrid"],["grammath","axioma"],["grammath","inoffshore"],
  ["segundaEscola","teografia"],["segundaEscola","solomon"],["segundaEscola","almanaque"],["segundaEscola","om3"],
  ["sprachlehre","morfHarmonica"],["sprachlehre","vvvGrid"],
  ["morfossemiografia","hierourgia"],["morfossemiografia","codeiOgraph"],
  ["morfossemiografia","solomon"],["morfossemiografia","almanaque"],["morfossemiografia","lexicoPoligrafico"],
  ["teografia","hierourgia"],["teografia","gurudev"],
  ["hierourgia","urgias"],["hierourgia","axioma"],
  ["marcabru","grauZero"],["marcabru","gurudev"],
  ["gurudev","morfHarmonica"],["gurudev","codeiOgraph"],["gurudev","axioma"],
  ["gurudev","vvvGrid"],["gurudev","almanaque"],["gurudev","institutoPCIH"],["gurudev","lexicoPoligrafico"],
  ["morfHarmonica","axioma"],["morfHarmonica","grammath"],
  ["hpg","morfHarmonica"],
  ["hubstry","hpg"],["hubstry","inoffshore"],["hubstry","solomon"],
  ["hubstry","codeiOgraph"],["hubstry","axioma"],["hubstry","vvvServices"],["hubstry","om3"],
  ["lexiograph","semiografia"],["lexiograph","gurudev"],["lexiograph","codeiOgraph"],
  ["lexiograph","grammath"],["lexiograph","almanaque"],["lexiograph","lexicoPoligrafico"],["lexiograph","inoffshore"],
  ["institutoPCIH","hubstry"],
  ["vvvGrid","vvvServices"],["vvvGrid","codeiOgraph"],
  ["lexicoPoligrafico","almanaque"],
];

// ─── Posições (coordenadas centro dos nós no SVG) ─────────────────────────────
const POS = {
  einSofAur:{x:400,y:60},    deepHub:{x:800,y:60},
  motoPerpetuo:{x:600,y:160},
  reineSprache:{x:250,y:260}, imip:{x:600,y:260}, beitOr:{x:950,y:260},
  semiografia:{x:100,y:360},  poligrafia:{x:300,y:360}, segundaEscola:{x:500,y:360},
  naturaglia:{x:700,y:360},   grammath:{x:900,y:360},   teografia:{x:1100,y:360},
  marcabru:{x:200,y:425},     lexiograph:{x:400,y:425}, institutoPCIH:{x:600,y:425},
  hubstry:{x:800,y:425},      om3:{x:1000,y:425},
  morfossemiografia:{x:90,y:530},  sprachlehre:{x:260,y:530}, hpg:{x:430,y:530},
  hierourgia:{x:600,y:530},        grauZero:{x:770,y:530},    gurudev:{x:940,y:530},
  morfHarmonica:{x:1110,y:530},
  codeiOgraph:{x:100,y:595},  vvvGrid:{x:300,y:595},    inoffshore:{x:500,y:595},
  solomon:{x:700,y:595},      almanaque:{x:900,y:595},   lexicoPoligrafico:{x:1100,y:595},
  urgias:{x:600,y:700},
  axioma:{x:600,y:800},
  vvvServices:{x:600,y:900},
};

const TIER_LABELS = [
  {label:"GÊNESE · DOCUMENTOS FUNDANTES",             y:22,  color:"#d4af37"},
  {label:"PRINCÍPIO GERADOR",                          y:128, color:"#c9a84c"},
  {label:"FUNDAMENTOS",                                y:228, color:"#9b7a1a"},
  {label:"MÉTODOS · CAMPOS · HETERÔNIMOS · INSTITUIÇÕES", y:328, color:"#c87040"},
  {label:"FERRAMENTAS · OBRAS · PROJETOS",             y:498, color:"#3a9a5a"},
  {label:"OBJETO DA OBRA MAIOR",                       y:668, color:"#a060c0"},
  {label:"PRINCÍPIO FUNDACIONAL COMPUTACIONAL",        y:768, color:"#d060a0"},
  {label:"IMPLEMENTAÇÕES",                             y:868, color:"#a080d0"},
];

const TIMELINE = [
  { label:"GÊNESE", color:"#d4af37", items:[
      "Ein Sof Aur — paradigma epistemológico fundante",
      "Deep Hub Paper — 4 campos, modelo semítico, 7 níveis",
  ]},
  { label:"FASE 1 · 2014–2022", color:"#9b7a1a", items:[
      "Dramaturgia hospitalar · Doutores da Alegria (2014–16)",
      "Marcabrü Aiara — heterônimo literário desde 2017",
      "Primeiros conceitos: IMIP · Reine Sprache · Naturaglia",
  ]},
  { label:"FASE 2 · 2023–2025", color:"#c87040", items:[
      "Hubstry Deep Tech · Lexiograph (2023)",
      "GuruDev® — início do desenvolvimento",
      "HPG 1.0 · codeiOgraph · Instituto PCIHᶟ",
  ]},
  { label:"FASE 3 · jan–fev 2026", color:"#3a9a5a", items:[
      "Morfologia Harmônica — campo fundado 22/jan/2026",
      "Semiografia v.0 — DOI 10.5281/zenodo.18802603 (fev/2026)",
      "Naturaglia · Teografia · Sprachlehre TTM",
  ]},
  { label:"FASE 4 · abr 2026", color:"#7070dd", items:[
      "Semiografia v.II — sistema axiomático (441p)",
      "Morfossemiografia — DOI 10.5281/zenodo.19184886",
      "Léxico Poligráfico · Almanaque GuruDev · VVV Grid",
  ]},
];

const GW = 1200, GH = 940, NW = 88, NH = 38;

// ─── Componente principal ─────────────────────────────────────────────────────
export default function GabinetePolimata() {
  const [active, setActive] = useState(null);
  const [showLexico, setShowLexico] = useState(false);

  const connected = useMemo(() => {
    if (!active) return new Set();
    const s = new Set();
    edges.forEach(([a,b]) => {
      if (a === active) s.add(b);
      if (b === active) s.add(a);
    });
    return s;
  }, [active]);

  const toggle = useCallback(id => {
    if (id === "lexicoPoligrafico") setShowLexico(true);
    setActive(p => p === id ? null : id);
  }, []);

  const opacity = id => {
    if (!active) return 1;
    if (id === active || connected.has(id)) return 1;
    return 0.12;
  };

  const an = active ? nodes[active] : null;

  return (
    <div style={{display:"flex",height:"100vh",background:"#060504",
                 fontFamily:"Palatino Linotype, Palatino, Georgia, serif",
                 color:"#e8e0d0",overflow:"hidden"}}>

      <style>{`
        @keyframes nodePulse {
          0%,100%{box-shadow:0 0 6px rgba(201,168,76,.3);}
          50%{box-shadow:0 0 18px rgba(201,168,76,.75);}
        }
        @keyframes activeGlow {
          0%,100%{box-shadow:0 0 10px rgba(201,168,76,.5),inset 0 0 6px rgba(201,168,76,.12);}
          50%{box-shadow:0 0 22px rgba(201,168,76,.9),inset 0 0 10px rgba(201,168,76,.2);}
        }
        .gp-node{cursor:pointer;transition:opacity .3s,border-color .25s,background .25s;}
        .gp-node:hover{filter:brightness(1.25);}
      `}</style>

      {/* Área principal — rolável */}
      <div style={{flex:1,overflow:"auto",padding:"28px 32px"}}>
        <h1 style={{color:"#c9a84c",fontSize:"26px",letterSpacing:"0.15em",
                    textTransform:"uppercase",margin:"0 0 6px",fontWeight:"normal"}}>
          Gabinete do Polímata
        </h1>
        <p style={{color:"#5a4e30",fontSize:"11px",margin:"0 0 28px",letterSpacing:"0.05em"}}>
          Ecossistema intelectual autoral · Guilherme Gonçalves Machado · Rio de Janeiro · ORCID 0009-0008-1083-0784
        </p>

        {/* Grafo */}
        <div style={{position:"relative",width:GW,height:GH}}>

          {/* Bandas de fundo */}
          {[{y:10,h:90,c:"#d4af37"},{y:115,h:76,c:"#c9a84c"},{y:205,h:84,c:"#9b7a1a"},
            {y:303,h:157,c:"#c87040"},{y:475,h:152,c:"#3a9a5a"},{y:642,h:84,c:"#a060c0"},
            {y:742,h:84,c:"#d060a0"},{y:842,h:84,c:"#a080d0"}].map(({y,h,c},i) => (
            <div key={i} style={{position:"absolute",left:0,top:y,width:GW,height:h,
                                  borderTop:`1px solid ${c}18`,background:`${c}04`}}/>
          ))}

          {/* Rótulos dos tiers */}
          {TIER_LABELS.map(t => (
            <div key={t.label} style={{position:"absolute",left:0,top:t.y,fontSize:"8px",
                                        color:t.color,letterSpacing:"0.18em",
                                        textTransform:"uppercase",opacity:.65}}>
              {t.label}
            </div>
          ))}

          {/* SVG — arestas */}
          <svg style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none"}}
               viewBox={`0 0 ${GW} ${GH}`}>
            {edges.map(([a,b],i) => {
              const pa=POS[a], pb=POS[b];
              if (!pa||!pb) return null;
              const hot = a===active||b===active;
              return (
                <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                  stroke={hot?(nodes[a]?.accent||"#c9a84c"):"#c9a84c"}
                  strokeWidth={hot?1.4:.4}
                  strokeOpacity={active?(hot?.72:.05):.17}/>
              );
            })}
          </svg>

          {/* Nós */}
          {Object.entries(POS).map(([id,pos]) => {
            const n = nodes[id]; if(!n) return null;
            const isAct = id===active;
            const isConn = connected.has(id);
            return (
              <div key={id} className="gp-node" onClick={()=>toggle(id)} title={n.sublabel}
                style={{
                  position:"absolute",
                  left:pos.x-NW/2, top:pos.y-NH/2,
                  width:NW, height:NH,
                  border:`1px solid ${isAct?n.accent:isConn?n.accent+"bb":n.accent+"44"}`,
                  background:isAct?n.dim:isConn?n.dim+"aa":"#0c0a08",
                  borderRadius:"3px",
                  display:"flex",flexDirection:"column",
                  alignItems:"center",justifyContent:"center",
                  opacity:opacity(id),
                  animation:isAct?"activeGlow 2s ease-in-out infinite"
                           :isConn?"nodePulse 1.6s ease-in-out infinite":"none",
                  zIndex:isAct?10:1,
                  padding:"2px 4px",overflow:"hidden",
                }}>
                <span style={{fontSize:"13px",lineHeight:1}}>{n.glyph}</span>
                <span style={{fontSize:"6.5px",color:n.accent,letterSpacing:"0.04em",
                              textAlign:"center",whiteSpace:"nowrap",
                              overflow:"hidden",textOverflow:"ellipsis",
                              maxWidth:NW-8,display:"block"}}>
                  {n.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Léxico Poligráfico expandido */}
        {showLexico && (
          <div style={{marginTop:32,maxWidth:GW}}>
            <LexicoPoligraficoPanel onClose={()=>setShowLexico(false)}/>
          </div>
        )}

        {/* Linha do tempo */}
        <div style={{marginTop:showLexico?32:60,paddingBottom:48}}>
          <div style={{fontSize:"10px",color:"#c9a84c",letterSpacing:"0.2em",
                       textTransform:"uppercase",marginBottom:20}}>
            Linha do Tempo Gerativa
          </div>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            {TIMELINE.map(ph => (
              <div key={ph.label} style={{flex:"1 1 160px",borderLeft:`2px solid ${ph.color}`,paddingLeft:12}}>
                <div style={{color:ph.color,fontSize:"9px",letterSpacing:"0.2em",
                             textTransform:"uppercase",marginBottom:8}}>
                  {ph.label}
                </div>
                {ph.items.map((item,i)=>(
                  <div key={i} style={{color:"#7a6840",fontSize:"10px",marginBottom:4,lineHeight:1.5}}>
                    · {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Painel lateral — 360px */}
      <div style={{width:360,minWidth:360,background:"#0c0a08",
                   borderLeft:"1px solid #1e1a12",padding:"24px 20px",overflow:"auto"}}>

        {/* Legenda */}
        <div style={{marginBottom:20}}>
          <div style={{color:"#c9a84c",fontSize:"9px",letterSpacing:"0.2em",
                       textTransform:"uppercase",marginBottom:10}}>Categorias</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"6px 14px"}}>
            {[["#d4af37","Gênese"],["#c9a84c","Princípio"],["#7070dd","Beit Or / Segunda Escola"],
              ["#4a9e6e","IMIP"],["#c87040","Semiografia"],["#3a9a5a","Naturaglia / HPG"],
              ["#5a9ab0","Grammath"],["#a060c0","Teografia / Hierourgia"],["#cc5050","Marcabrü / GuruDev"],
              ["#e8a030","Morf. Harmônica"],["#50a0d0","codeiOgraph"],["#a080d0","VVV Grid"],
              ["#2060a0","In||Off Shore"],["#906020","Solomon"],["#c0a030","Almanaque"],
              ["#70a070","Lexiograph"],["#4080b0","Hubstry / Instituto"],["#b8860b","OM³"],
              ["#d060a0","Axioma"]].map(([c,l])=>(
              <div key={c} style={{display:"flex",alignItems:"center",gap:4}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:c,flexShrink:0}}/>
                <span style={{color:"#4a4030",fontSize:"9px"}}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{height:1,background:"#1e1a12",margin:"0 0 20px"}}/>

        {/* Detalhe do nó ativo */}
        {an ? (
          <div>
            <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:14}}>
              <span style={{fontSize:"26px",lineHeight:1,flexShrink:0}}>{an.glyph}</span>
              <div>
                <div style={{color:an.accent,fontSize:"13px",letterSpacing:"0.1em",
                             textTransform:"uppercase",lineHeight:1.3}}>
                  {an.label}
                </div>
                <div style={{color:"#5a5040",fontSize:"9.5px",marginTop:3,lineHeight:1.4}}>
                  {an.sublabel}
                </div>
              </div>
            </div>
            <div style={{color:"#a09070",fontSize:"11.5px",lineHeight:1.78}}>
              {an.desc}
            </div>
            {connected.size>0 && (
              <div style={{marginTop:18}}>
                <div style={{color:"#4a4030",fontSize:"8px",letterSpacing:"0.2em",
                             textTransform:"uppercase",marginBottom:8}}>
                  Conectado a ({connected.size})
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                  {[...connected].map(cid=>(
                    <button key={cid} onClick={()=>toggle(cid)} style={{
                      background:"transparent",
                      border:`1px solid ${nodes[cid]?.accent||"#c9a84c"}55`,
                      color:nodes[cid]?.accent||"#c9a84c",
                      borderRadius:2,padding:"2px 7px",fontSize:"9px",cursor:"pointer",
                      fontFamily:"Palatino Linotype, Palatino, Georgia, serif",lineHeight:1.5,
                    }}>
                      {nodes[cid]?.glyph} {nodes[cid]?.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div style={{color:"#3a3020",fontSize:"12px",lineHeight:1.8,marginBottom:14}}>
              ← Clique em qualquer nó para explorar o ecossistema
            </div>
            <div style={{color:"#2a2010",fontSize:"10px",lineHeight:1.8}}>
              O grafo mapeia o ecossistema intelectual autoral de Guilherme Gonçalves Machado —
              polímata, pesquisador, empreendedor e criador baseado no Rio de Janeiro.
              ORCID 0009-0008-1083-0784.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

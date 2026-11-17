export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  accentColor: string;
  metrics: { label: string; value: string }[];
  url: string;
  year: string;
  client: string;
  previewType: 'neural' | 'webgl' | 'telemetry' | 'shader' | 'audio';
  details?: {
    scope: string;
    highlights: string[];
    author: string;
  };
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface CreatorProfile {
  name: string;
  role: string;
  discipline: string;
  education: string;
  location: string;
  email?: string;
  phone?: string;
  bio: string;
  achievements: string[];
  skills: string[];
}

export const MODEL_PATHS = {
  monitor: '/models/monitor.glb',
  laptop: '/models/laptop.glb',
  desk: '/models/desk.glb',
} as const;

export const CREATORS: { kabilan: CreatorProfile; praga: CreatorProfile } = {
  kabilan: {
    name: 'Kabilan B',
    role: 'Lead AI Engineer & Published Researcher',
    discipline: 'Artificial Intelligence, Deep Learning & Full-Stack Systems',
    education:
      'B.Tech Artificial Intelligence and Data Science (2022–2026) | Bannari Amman Institute of Technology (CGPA: 8.32 / 10.0)',
    location: 'Vedaranyam, Tamil Nadu, India',
    email: 'kabilanbalaraman7@gmail.com',
    phone: '+91 9789344764',
    bio: 'AI & Data Science engineer with proven expertise in Computer Vision, LLMs, RAG, BioBERT, and scalable full-stack architectures. First Prize winner at BRICS-FS-26 International AI Competition and published author in the Journal of Medical Imaging.',
    achievements: [
      'BRICS-FS-26 First Prize Winner (2025) – International AI Computer Vision Innovation',
      'Smart India Hackathon Finalist (2025) – EOG-PILL Glaucoma Monitoring Solution',
      'Satwa 36-Hour Hackathon Finalist (2024 & 2025) – Mental Health & Waste Management',
      'Journal of Medical Imaging Publication (Feb 2024) – Dual-View Pyramid Pooling Neural Networks',
    ],
    skills: [
      'Python',
      'TensorFlow',
      'PyTorch',
      'OpenCV',
      'BioBERT',
      'LangChain',
      'LangGraph',
      'RAG & LLM Agents',
      'React',
      'Next.js',
      'FastAPI',
      'Streamlit',
      'Firebase',
      'Docker',
    ],
  },
  praga: {
    name: 'Pragadeeshwaran S S',
    role: 'Product Architect & Growth Strategist',
    discipline: 'Biotechnology, AI Product Building, Web Development & Storytelling',
    education: 'Biotechnology & Computational Applications',
    location: 'Tamil Nadu, India',
    email: 'mskgaap@gmail.com',
    phone: '+91 8760724777',
    bio: 'Multi-disciplinary technologist and entrepreneur bridging applied biotechnology, machine learning, and creative brand storytelling. Creator of PS AI Studios, founder of Etal Digitals, and architect of data-driven products across health, sports, and green energy.',
    achievements: [
      'Founder, Etal Digitals – Full-Service Digital Marketing & Web Agency (etaldigitals.com)',
      'Creator, Arusuvai AI Tech – Personalized Nutrition & Meal Planning (arusuvaitech.in)',
      'Lead Researcher, Superr Cricket Insight – IPL Predictive Analytics (superr-cricket-insight-epjs.vercel.app)',
      'Founder, PS AI Studios – Generative Visual Storytelling (instagram.com/ps_ai.studios)',
      'Praveena Saree Pre-Pleating Campaign – 70+ Client Acquisitions in 30 Days & 3X ROI',
      'Biogas Generation & STP ML Optimization – Predictive Energy Models Targeting 1,000 kWh/day',
    ],
    skills: [
      'React.js',
      'Node.js',
      'MongoDB',
      'PostgreSQL',
      'Machine Learning (XGBoost, ANN)',
      'Sports Data Analytics',
      'Applied Biotechnology & Bioinformatics',
      'Meta Ads & Performance Marketing',
      'SEO & Lead Generation',
      'Generative Storytelling & Filmmaking',
    ],
  },
};

export const PUBLICATION = {
  title:
    'Deep Learning Neural Networks with Dual-View Pyramid Pooling Algorithm for Better Confidence Calibration and Medical Image Classification',
  journal: 'Journal of Medical Imaging',
  date: 'February 2024',
  summary:
    'Proposed a novel dual-view pyramid pooling architecture designed to significantly improve confidence calibration and classification reliability in high-stakes medical imaging diagnostics.',
  leadAuthor: 'Kabilan B',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'arusuvai-biohealth',
    number: '01',
    category: 'AI / HEALTHCARE',
    title: 'ARUSUVAI AI & BIO-HEALTH',
    subtitle: 'BioBERT Clinical Report NLP & Indian Meal Planning',
    description:
      'An integrated AI health platform combining role-based medical report analysis via BioBERT with an intelligent nutrition engine delivering personalized ingredient-level recipe synthesis, macro calculations, and cultural dietary planning for Indian users.',
    technologies: ['BioBERT', 'Python', 'React', 'FastAPI', 'Firebase', 'NLP Transformers'],
    accentColor: '#ff5a1f',
    metrics: [
      { label: 'OFFICIAL DOMAIN', value: 'arusuvaitech.in' },
      { label: 'REPORT INFERENCE', value: '< 1.2s' },
      { label: 'TARGET AUDIENCE', value: 'Tamil & Pan-India' },
    ],
    url: 'https://arusuvaitech.in/',
    year: '2025 – 2026',
    client: 'Arusuvai AI Tech & Healthcare Labs',
    previewType: 'neural',
    details: {
      scope:
        'Engineered an end-to-end healthcare pipeline linking BioBERT diagnostic report parsing with conversational dietary guidance, doctor consultation flows, and herbal cultivator integration.',
      highlights: [
        'Live production portal deployed at arusuvaitech.in (with companion app at arusuvai-ai-tech.vercel.app)',
        'BioBERT NLP pipeline extracting structured biomarkers from unstructured clinical lab reports',
        'Ingredient-based recipe generation tailored to diabetic and cardiovascular dietary constraints',
      ],
      author: 'Kabilan B & Pragadeeshwaran S S',
    },
  },
  {
    id: 'vision-embed-128',
    number: '02',
    category: 'VISION / ML',
    title: 'VISION EMBED 128',
    subtitle: '128-D Face Embeddings & Campus Access Telemetry',
    description:
      'A real-time high-throughput biometric security system powered by TensorFlow deep learning and 128-dimensional facial embeddings, enabling automated sub-30ms classification of day-scholars and hostellers with live Streamlit monitoring.',
    technologies: ['TensorFlow', 'OpenCV', 'Streamlit', 'Python', '128D Face Embeddings'],
    accentColor: '#ff7847',
    metrics: [
      { label: 'EMBEDDING DIM', value: '128-D' },
      { label: 'FRAME LATENCY', value: '28 ms' },
      { label: 'MATCH CONFIDENCE', value: '99.2%' },
    ],
    url: 'https://github.com/kabilanbalaraman7',
    year: '2024 – 2025',
    client: 'Campus Security & Hostel Access System',
    previewType: 'webgl',
    details: {
      scope:
        'Architected real-time facial recognition pipelines capable of processing continuous RTSP video feeds, generating 128D vectors, and performing cosine nearest-neighbor search for instant campus classification.',
      highlights: [
        'Sub-30ms facial detection, landmark alignment, and embedding extraction',
        'Live Streamlit operations console with anomaly alerts and attendance sync',
        'Proven accuracy under diverse lighting and occluded conditions across 1,000+ students',
      ],
      author: 'Kabilan B',
    },
  },
  {
    id: 'superr-cricket-insight',
    number: '03',
    category: 'DATA / SPORTS',
    title: 'SUPERR CRICKET INSIGHT',
    subtitle: 'IPL 2027 Auction Intelligence & Predictive Modeling',
    description:
      'A data-driven sports analytics dashboard and predictive research suite designed for competition review and the Rajasthan Royals (RR) IPL 2027 auction, evaluating player pressure-performance metrics, squad-fit modeling, and historical match dynamics.',
    technologies: ['React', 'Data Visualizations', 'Vercel', 'Python', 'Predictive Analytics'],
    accentColor: '#f43f5e',
    metrics: [
      { label: 'LIVE DASHBOARD', value: 'superr-cricket' },
      { label: 'BALL-BY-BALL', value: '450K+ Records' },
      { label: 'AUCTION FIT', value: '91.8%' },
    ],
    url: 'https://superr-cricket-insight-epjs.vercel.app/',
    year: '2025 – 2026',
    client: 'Cricket Insight Competition & Rajasthan Royals Research',
    previewType: 'telemetry',
    details: {
      scope:
        'Conducted deep player evaluation modeling identifying high-leverage undervalued players, clutch-phase death bowling consistency, and squad equilibrium for the IPL 2027 auction cycle.',
      highlights: [
        'Live interactive web platform deployed at superr-cricket-insight-epjs.vercel.app',
        'Pressure-index scoring quantifying batsman response against top-tier bowling speeds',
        'Comprehensive comparative radar charts and Rajasthan Royals squad-composition scenarios',
      ],
      author: 'Pragadeeshwaran S S',
    },
  },
  {
    id: 'eog-biogas-optima',
    number: '04',
    category: 'BIOTECH / IOT',
    title: 'EOG-PILL & STP OPTIMA',
    subtitle: 'Smart India Hackathon Finalist & Renewable Biogas ML',
    description:
      'A dual breakthrough in applied biotechnology and IoT: EOG-PILL non-invasive intraocular pressure (IOP) biosensing for portable glaucoma monitoring (Smart India Hackathon Finalist) paired with an ANN and XGBoost process model driving sewage-to-biogas generation beyond 1,000 kWh/day.',
    technologies: ['EOG Biosensors', 'ANN / XGBoost', 'IoT Hardware', 'Bioinformatics', 'STP Telemetry'],
    accentColor: '#fb923c',
    metrics: [
      { label: 'BIOGAS TARGET', value: '1,000 kWh/d' },
      { label: 'EOG RESPONSE', value: '12 ms' },
      { label: 'HONOR', value: 'SIH Finalist' },
    ],
    url: 'https://github.com/kabilanbalaraman7',
    year: '2024 – 2025',
    client: 'Smart India Hackathon & Sustainable Energy Initiative',
    previewType: 'shader',
    details: {
      scope:
        'Engineered hardware-software biosensing prototypes for ophthalmic pressure monitoring while building machine learning process controllers that dynamically optimize chemical dosing across pre-digester and aeration tanks.',
      highlights: [
        'Portable EOG sensing architecture tailored for accessible ocular pressure checks',
        'ANN & XGBoost predictive pipelines trained on multi-tank pH, BOD, and operational flow variables',
        'Satwa 36-Hour Hackathon Finalist in both 2024 and 2025 for sustainability innovation',
      ],
      author: 'Kabilan B & Pragadeeshwaran S S',
    },
  },
  {
    id: 'ps-ai-studios',
    number: '05',
    category: 'CREATIVE / GROWTH',
    title: 'ETAL DIGITALS & PS AI',
    subtitle: 'Full-Service Digital Agency & Generative Worldbuilding',
    description:
      'A creative technology powerhouse uniting Etal Digitals (delivering digital products, SEO, and Meta Ads campaigns that scaled client acquisition to 70+ customers in 30 days at 3X ROI) with PS AI Studios (generative visual storytelling, cinematic worldbuilding, and multi-channel AI video production).',
    technologies: ['Generative AI', 'Meta Ads', 'SEO', 'Creative Direction', 'Brand Strategy'],
    accentColor: '#e11d48',
    metrics: [
      { label: 'AGENCY URL', value: 'etaldigitals.com' },
      { label: 'CAMPAIGN ROI', value: '3.0X' },
      { label: 'NEW CLIENTS', value: '70+ / Mo' },
    ],
    url: 'https://etaldigitals.com/',
    year: '2025 – 2026',
    client: 'Etal Digitals & PS AI Studios Client Portfolio',
    previewType: 'audio',
    details: {
      scope:
        'Created a unified creative engine producing cinematic AI-rendered narratives across YouTube, Instagram, and web while designing scalable lead generation and paid acquisition funnels for growth-stage businesses.',
      highlights: [
        'Official digital agency web platform deployed at etaldigitals.com',
        'Proven client case study: Praveena Saree Pre-Pleating achieved 70+ clients and 3X return on ad spend',
        'Cinematic AI visual storytelling channel on Instagram @ps_ai.studios ("Stories • Ideas • Worlds • Beyond Reality")',
      ],
      author: 'Pragadeeshwaran S S',
    },
  },
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'AI & LARGE LANGUAGE MODELS',
    description:
      'Custom LLM orchestration, Retrieval-Augmented Generation (RAG) using LangChain & LangGraph, BioBERT domain adaptation, and autonomous inference agents.',
    deliverables: ['Custom RAG Pipelines', 'BioBERT Clinical NLP', 'Multi-Agent Workflows'],
  },
  {
    number: '02',
    title: 'COMPUTER VISION & DEEP LEARNING',
    description:
      'High-speed visual recognition engines, 128-dimensional facial embedding pipelines, OpenCV real-time video analytics, and automated classification dashboards.',
    deliverables: ['Facial Biometrics', 'Video Analytics (OpenCV)', 'Edge Model Deployment'],
  },
  {
    number: '03',
    title: 'FULL-STACK WEB & SPATIAL SYSTEMS',
    description:
      'Modern web application engineering combining React, Next.js, TypeScript, FastAPI, Firebase, and real-time Three.js / WebGL 3D interactive interfaces.',
    deliverables: ['Next.js Flagship Apps', 'WebGL 3D Experiences', 'FastAPI & Firebase Backends'],
  },
  {
    number: '04',
    title: 'DATA DASHBOARDS & SPORTS ANALYTICS',
    description:
      'Interactive business intelligence, player performance telemetry, auction decision models (IPL 2027 research), and complex statistical visualization.',
    deliverables: ['Live Analytics Dashboards', 'Sports Predictive Models', 'Vercel Edge Deployments'],
  },
  {
    number: '05',
    title: 'APPLIED BIOTECHNOLOGY & BIOSENSING',
    description:
      'Computational biology workflows, EOG ocular biosensing integration (Smart India Hackathon Finalist), and ANN/XGBoost environmental process control.',
    deliverables: ['EOG Sensor Integration', 'STP Biogas ML Optimization', 'Bioinformatics Workflows'],
  },
  {
    number: '06',
    title: 'DIGITAL GROWTH, SEO & AI STORYTELLING',
    description:
      'End-to-end performance marketing (Meta Ads with verified 3X ROI), local SEO, and cinematic generative AI content creation via PS AI Studios.',
    deliverables: ['Meta Ads Funnels (3X ROI)', 'Generative AI Worldbuilding', 'Brand & Agency Strategy'],
  },
];

export const NAV_LINKS = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SERVICES', href: '#services' },
  { label: 'CONTACT', href: '#contact' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'ARUSUVAI TECH', href: 'https://arusuvaitech.in/' },
  { label: 'CRICKET INSIGHT', href: 'https://superr-cricket-insight-epjs.vercel.app/' },
  { label: 'ETAL DIGITALS', href: 'https://etaldigitals.com/' },
  { label: 'PS AI STUDIOS (INSTAGRAM)', href: 'https://www.instagram.com/ps_ai.studios?mdxt=bHB0a3M0MGd1Mjg5' },
  { label: 'GITHUB (KABILAN)', href: 'https://github.com/kabilanbalaraman7' },
  { label: 'LINKEDIN (KABILAN)', href: 'https://linkedin.com' },
  { label: 'EMAIL KABILAN', href: 'mailto:kabilanbalaraman7@gmail.com' },
  { label: 'EMAIL PRAGADEESH', href: 'mailto:mskgaap@gmail.com' },
] as const;

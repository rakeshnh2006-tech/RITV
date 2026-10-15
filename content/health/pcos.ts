export interface PcosTopicModule {
  id: string;
  title: string;
  badge: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  clinicianDiscussionPoints: string[];
  evidenceSource: {
    title: string;
    organization: string;
    url: string;
    lastReviewed: string;
    clinicalStatus: string;
  };
}

export const PCOS_MODULES: PcosTopicModule[] = [
  {
    id: "understanding-pcos",
    title: "What is Polycystic Ovary Syndrome (PCOS)?",
    badge: "Pathophysiology & Overview",
    summary:
      "A common endocrine and metabolic variation affecting approximately 8–13% of reproductive-aged women globally, characterized by hormonal imbalances and ovulatory variations.",
    content: [
      "Polycystic Ovary Syndrome is primarily an endocrine condition characterized by elevated ovarian or adrenal androgens (male-type hormones present in all bodies in varying amounts) and insulin resistance.",
      "The name 'polycystic' is somewhat misleading: the 'cysts' seen on pelvic ultrasounds are not pathological tumors or dangerous fluid sacs, but rather partially matured ovarian follicles that paused before releasing an egg.",
      "PCOS is a spectrum. Symptoms, metabolic features, and cycle rhythms vary widely between individuals. Having PCOS does not mean you will experience every symptom.",
    ],
    keyTakeaways: [
      "PCOS is an endocrine-metabolic condition, not just an ovarian disorder.",
      "Follicles seen on ultrasound are immature eggs that paused before ovulation, not harmful tumors.",
      "Symptom expression is highly individualized and changes over the lifespan.",
    ],
    clinicianDiscussionPoints: [
      "Which specific features of PCOS are most relevant to my personal health presentation?",
      "Would baseline metabolic blood tests (fasting glucose, lipid panel, HbA1c) be appropriate for me?",
    ],
    evidenceSource: {
      title: "Fact Sheet: Polycystic Ovary Syndrome",
      organization: "World Health Organization (WHO)",
      url: "https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome",
      lastReviewed: "2023",
      clinicalStatus: "WHO Global Clinical Factsheet",
    },
  },
  {
    id: "cycles-and-ovulation",
    title: "How PCOS Affects Menstrual Cycles",
    badge: "Reproductive Physiology",
    summary:
      "Explaining why menstrual cycles may become delayed, unpredictable, or absent, and how ovulatory pauses occur.",
    content: [
      "Regular menstrual cycles rely on synchronous communication between the hypothalamus (GnRH), pituitary gland (LH and FSH), and ovaries (estrogen and progesterone).",
      "In PCOS, altered pulsatile release of luteinizing hormone (LH) and mild elevation of intraovarian androgens can interrupt the normal selection and maturation of a dominant follicle, leading to delayed or absent ovulation (oligo-ovulation or anovulation).",
      "When ovulation does not occur predictably, progesterone is not produced in normal amounts. This can cause the uterine lining (endometrium) to build up continuously, resulting either in prolonged amenorrhea (missed periods) or sudden, prolonged, and heavy bleeding.",
    ],
    keyTakeaways: [
      "Cycle irregularity stems from ovulatory pauses, not 'damaged' reproductive organs.",
      "Infrequent periods require medical monitoring to protect long-term endometrial health.",
      "Tracking cycle length and bleeding flow provides critical diagnostic data for your doctor.",
    ],
    clinicianDiscussionPoints: [
      "How frequently should I be having a period to ensure my uterine lining remains protected?",
      "If periods are absent for over 90 days, what medical protocol is recommended to induce withdrawal bleeding?",
    ],
    evidenceSource: {
      title: "Recommendations from the 2023 International Evidence-based Guideline for PCOS",
      organization: "Monash University / ESHRE / ASRM",
      url: "https://www.monash.edu/medicine/mchri/pcos/guideline",
      lastReviewed: "2023",
      clinicalStatus: "International Peer-Reviewed Clinical Consensus",
    },
  },
  {
    id: "skin-hair-androgens",
    title: "Skin, Hair & Androgen Sensitivity",
    badge: "Dermatological Features",
    summary:
      "Evidence-based understanding of hirsutism, persistent hormonal acne, and androgenic alopecia without shame or stigma.",
    content: [
      "Androgens such as testosterone and androstenedione play healthy, necessary roles in women's bodies, supporting bone density, libido, and energy.",
      "In PCOS, higher circulating levels of free androgens or increased 5-alpha-reductase enzymatic activity within hair follicles can stimulate hair growth in terminal patterns (e.g., upper lip, chin, chest, abdomen), known medically as hirsutism.",
      "Similarly, elevated androgens increase sebum production within sebaceous glands, predisposing to inflammatory acne, particularly along the jawline and chin.",
      "It is vital to recognize that these physical traits carry no moral or cleanliness reflection. They are biological responses of sensitive receptor sites to endocrine messengers.",
    ],
    keyTakeaways: [
      "Dermatological symptoms are physiological responses to androgens, not reflections of hygiene.",
      "Evidence-based medical therapies exist, including anti-androgens and topical dermatological agents.",
      "Improvements with medical therapy typically require 6 to 9 months due to the human hair growth cycle.",
    ],
    clinicianDiscussionPoints: [
      "Would anti-androgenic therapy (such as combined oral contraceptives or spironolactone) be appropriate for my symptoms?",
      "What topical or clinical skincare protocols are safest and most effective alongside endocrine management?",
    ],
    evidenceSource: {
      title: "Diagnosis and Treatment of Polycystic Ovary Syndrome: An Endocrine Society Clinical Practice Guideline",
      organization: "The Endocrine Society",
      url: "https://www.endocrine.org/clinical-practice-guidelines",
      lastReviewed: "2022",
      clinicalStatus: "Endocrine Society Clinical Practice Guideline",
    },
  },
  {
    id: "metabolic-health-insulin",
    title: "Metabolic Health & Insulin Resistance",
    badge: "Metabolic Endocrinology",
    summary:
      "Why insulin is a central regulatory player in PCOS, affecting energy, weight fluctuations, and long-term cardiometabolic wellness.",
    content: [
      "Insulin is a hormone secreted by the pancreas to help cells absorb glucose from the bloodstream for energy. In approximately 65–80% of individuals with PCOS, peripheral cells exhibit insulin resistance.",
      "When cells respond less efficiently to insulin, the pancreas compensates by secreting higher concentrations (hyperinsulinemia).",
      "Elevated insulin directly stimulates the theca cells of the ovaries to produce more androgens. At the same time, it reduces the liver's production of Sex Hormone-Binding Globulin (SHBG), leaving more free active testosterone in circulation.",
      "Addressing insulin resistance through balanced nourishment, regular physical activity, quality sleep, and medications like metformin when prescribed can meaningfully support cycle regularity and energy levels.",
    ],
    keyTakeaways: [
      "Insulin resistance is a biological driver, not a failure of willpower or personal discipline.",
      "Hyperinsulinemia directly increases ovarian androgen synthesis.",
      "Metabolic health should be evaluated with objective laboratory markers, not just body weight.",
    ],
    clinicianDiscussionPoints: [
      "Should we check a fasting insulin or oral glucose tolerance test (OGTT) in addition to fasting blood sugar?",
      "Would an insulin-sensitizing medication like metformin be beneficial in my individual care plan?",
    ],
    evidenceSource: {
      title: "Clinical Guidance: Metabolic Aspects of Polycystic Ovary Syndrome",
      organization: "American College of Obstetricians and Gynecologists (ACOG)",
      url: "https://www.acog.org/clinical/clinical-guidance/practice-bulletin",
      lastReviewed: "2023",
      clinicalStatus: "ACOG Clinical Practice Guideline",
    },
  },
  {
    id: "fertility-facts-myths",
    title: "Fertility: Facts vs. Common Misconceptions",
    badge: "Reproductive Education",
    summary:
      "PCOS does not equate to sterility. Exploring how ovulatory assistance, timing, and medical care support conception when desired.",
    content: [
      "One of the most distressing and widespread myths is that receiving a PCOS diagnosis means a woman cannot ever have biological children. This is scientifically untrue.",
      "PCOS is a leading cause of anovulatory subfertility, meaning that because ovulation happens infrequently or unpredictably, identifying fertile windows and achieving conception naturally can take longer without assistance.",
      "When someone with PCOS wishes to conceive, clinicians have well-established, highly effective evidence-based pathways. These range from lifestyle adjustments to oral ovulation induction medications (such as letrozole or clomiphene citrate) that gently encourage predictable ovulation.",
      "Many women with PCOS conceive spontaneously without medical intervention once cycles stabilize.",
    ],
    keyTakeaways: [
      "PCOS causes ovulatory unpredictability, NOT permanent sterility or loss of ovarian reserve.",
      "First-line ovulation-induction therapies (like letrozole) have very high success rates when supervised by a specialist.",
      "If you are not seeking pregnancy, contraception is still necessary, as spontaneous ovulation can occur unexpectedly.",
    ],
    clinicianDiscussionPoints: [
      "What is my current ovulatory status, and how can we track ovulation accurately?",
      "When I am ready to plan a pregnancy, what is our stepwise timeline before considering ovulation induction?",
    ],
    evidenceSource: {
      title: "International Evidence-based Guideline for PCOS: Assessment and Management of Infertility",
      organization: "ESHRE / ASRM / Monash University",
      url: "https://www.monash.edu/medicine/mchri/pcos/guideline",
      lastReviewed: "2023",
      clinicalStatus: "International Fertility Evidence Guideline",
    },
  },
  {
    id: "clinical-assessment-rotterdam",
    title: "How Clinicians Formally Assess PCOS",
    badge: "Diagnostic Standards",
    summary:
      "Understanding the Rotterdam 2003 criteria, the necessity of differential exclusion, and what blood tests actually evaluate.",
    content: [
      "Under international consensus (Rotterdam Diagnostic Criteria), a clinician considers a diagnosis of PCOS when at least TWO of the following three features are present, provided other conditions have been ruled out:",
      "1. Irregular or absent ovulation (oligo- or anovulation, typically reflected in cycles <21 or >35 days).",
      "2. Clinical or biochemical hyperandrogenism (visible signs like hirsutism/severe acne, or elevated blood testosterone/DHEA-S).",
      "3. Polycystic ovarian morphology on pelvic ultrasound (20+ follicles per ovary, or ovarian volume >10ml). Note: ultrasound is NOT recommended for adolescents under 8 years post-menarche due to normal pubertal ovarian follicular development.",
      "Exclusion of mimics is mandatory: thyroid disease (TSH), elevated prolactin (hyperprolactinemia), and non-classic congenital adrenal hyperplasia (17-OHP) must be ruled out through standard laboratory tests.",
    ],
    keyTakeaways: [
      "Diagnosis requires meeting at least 2 of 3 Rotterdam criteria AND excluding other medical conditions.",
      "Ultrasound alone is NEVER sufficient for diagnosis.",
      "No smartphone app or online quiz can diagnose PCOS.",
    ],
    clinicianDiscussionPoints: [
      "Have conditions that mimic PCOS (such as thyroid disorders or hyperprolactinemia) been systematically ruled out?",
      "Which specific Rotterdam criteria do my clinical findings satisfy?",
    ],
    evidenceSource: {
      title: "Revised 2003 Consensus on Diagnostic Criteria and Long-Term Health Risks of PCOS",
      organization: "Rotterdam ESHRE/ASRM-Sponsored PCOS Consensus Workshop Group",
      url: "https://pubmed.ncbi.nlm.nih.gov/14704245/",
      lastReviewed: "2023 Update",
      clinicalStatus: "Standard Global Medical Reference",
    },
  },
  {
    id: "lifestyle-nourishment",
    title: "Nourishment, Movement & Whole-Body Care",
    badge: "Lifestyle & Wellbeing",
    summary:
      "Sustainable, non-stigmatizing strategies to nurture hormonal equilibrium without restrictive diets, shame, or unproven fads.",
    content: [
      "Supportive lifestyle habits form the foundational pillar of PCOS management. However, restrictive crash dieting and extreme exercise often elevate cortisol and exacerbate metabolic stress.",
      "Nourishment focus: Prioritize diverse, colorful dietary patterns rich in fiber (legumes, vegetables, berries, whole grains), healthy fats (nuts, seeds, olive oil), and adequate protein. These steady the post-meal glucose response and soothe chronic low-grade inflammation.",
      "Movement focus: A blend of regular cardiovascular exercise (like brisk walking or swimming) and progressive resistance training enhances muscle insulin sensitivity independent of weight changes.",
      "Rest and recovery: Chronic sleep deprivation (<7 hours nightly) increases insulin resistance and elevates ghrelin (hunger hormone). Sleep hygiene and nervous system regulation (pranayama, mindfulness, restorative yoga) are powerful endocrine allies.",
    ],
    keyTakeaways: [
      "Avoid extreme or restrictive diets that elevate stress hormones.",
      "Focus on adding fiber, protein, and colorful whole foods rather than restriction.",
      "Resistance exercise enhances cellular insulin sensitivity directly.",
    ],
    clinicianDiscussionPoints: [
      "Could a referral to a clinical dietitian specializing in PCOS and intuitive eating support my goals?",
      "What realistic activity goals would you suggest based on my current joint and cardiovascular health?",
    ],
    evidenceSource: {
      title: "Lifestyle Management in Polycystic Ovary Syndrome: Evidence and Clinical Guidelines",
      organization: "The Endocrine Society & Monash University",
      url: "https://www.monash.edu/medicine/mchri/pcos/guideline",
      lastReviewed: "2023",
      clinicalStatus: "Evidence-Based Lifestyle Consensus",
    },
  },
];

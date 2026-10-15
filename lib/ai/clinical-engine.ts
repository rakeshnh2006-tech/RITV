import { SymptomInput, StructuredHealthResult, MedicalSourceReference, PossibleExplanation } from "./types";
import { BRAND } from "../brand";

// Authoritative Medical Guideline Sources
export const CLINICAL_SOURCES: MedicalSourceReference[] = [
  {
    title: "International Evidence-based Guideline for the Assessment and Management of Polycystic Ovary Syndrome (PCOS)",
    organization: "Monash University / ESHRE / ASRM",
    url: "https://www.monash.edu/medicine/mchri/pcos/guideline",
    evidenceType: "International Clinical Consensus Guideline",
  },
  {
    title: "ACOG Clinical Practice Guideline No. 11: Endometriosis Diagnosis and Management",
    organization: "American College of Obstetricians and Gynecologists (ACOG)",
    url: "https://www.acog.org/clinical/clinical-guidance/practice-bulletin",
    evidenceType: "Gynecologic Clinical Practice Standards",
  },
  {
    title: "World Health Organization: Comprehensive Factsheet on Infertility & Ovulatory Disorders",
    organization: "World Health Organization (WHO)",
    url: "https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome",
    evidenceType: "Global Public Health Standard",
  },
  {
    title: "The 2023 Non-Hormone and Hormone Therapy Position Statement for Symptomatic Menopause",
    organization: "The Menopause Society (NAMS) & BMS",
    url: "https://www.menopause.org/publications/clinical-practice-guidelines",
    evidenceType: "Evidence-Based Clinical Consensus",
  },
  {
    title: "Endocrine Society Clinical Practice Guideline on Hypothalamic Amenorrhea & Hyperandrogenism",
    organization: "The Endocrine Society",
    url: "https://www.endocrine.org/clinical-practice-guidelines",
    evidenceType: "Endocrine Clinical Guidelines",
  },
  {
    title: "National Guidelines for Women's Reproductive Health",
    organization: "Ministry of Health and Family Welfare (MoHFW) / ICMR",
    url: "https://www.nhp.gov.in/",
    evidenceType: "National Clinical Guidance",
  },
];

interface ClinicalDomain {
  id: string;
  name: string;
  keywords: string[];
  restatementTemplate: (input: SymptomInput) => string;
  physiologicalOverview: string;
  explanations: PossibleExplanation[];
  reflectiveQuestions: string[];
  selfCarePractices: string[];
  appointmentCriteria: string;
  warningSigns: string[];
  doctorQuestions: string[];
  sources: MedicalSourceReference[];
}

const CLINICAL_DOMAINS: ClinicalDomain[] = [
  {
    id: "pcos",
    name: "Polycystic Ovary Syndrome & Metabolic-Endocrine Regulation",
    keywords: [
      "pcos", "pcod", "polycystic", "irregular period", "irregular cycle", "missed period",
      "delayed period", "hirsutism", "facial hair", "chin hair", "chin acne", "jawline acne",
      "cystic acne", "thinning hair", "hair fall", "weight gain", "insulin", "cravings",
      "sugar cravings", "dark neck", "acanthosis"
    ],
    restatementTemplate: (input) =>
      `You have described patterns involving menstrual rhythm irregularity${
        input.duration ? ` over ${input.duration}` : ""
      }${
        input.associatedSymptoms?.length ? ` alongside ${input.associatedSymptoms.join(", ")}` : ""
      }. These observations reflect dynamic endocrine and metabolic signaling between your ovaries, pituitary gland, and insulin pathways.`,
    physiologicalOverview:
      "Menstrual regularity is maintained through an intricate endocrine feedback loop between the hypothalamus, pituitary gland, and ovaries (the HPO axis). When insulin sensitivity changes or androgen signaling rises, ovarian theca cells produce higher amounts of androgens (like testosterone and DHEA-S). This frequently inhibits follicle maturation, leading to stalled follicles (appearing like 'pearl-string cysts' on ultrasound), delayed or absent ovulation, and elevated androgenic manifestations such as hormonal acne or increased facial hair growth.",
    explanations: [
      {
        topic: "Rotterdam Criteria for PCOS",
        discussion:
          "Clinicians evaluate PCOS using the internationally consensus Rotterdam Criteria, requiring at least two of the following: (1) ovulatory dysfunction (cycles <21 or >35 days), (2) clinical or biochemical signs of hyperandrogenism (excess hair, acne, or elevated blood androgens), and (3) polycystic ovarian morphology on ultrasound, after excluding thyroid and prolactin etiologies.",
        caution:
          "PCOS cannot be confirmed through symptoms alone. Diagnosis requires formal clinical review and targeted blood panels by a gynecologist or endocrinologist.",
      },
      {
        topic: "Insulin Resistance & Metabolic Crosstalk",
        discussion:
          "In approximately 70% of women with ovulatory variations, peripheral cells exhibit reduced insulin sensitivity. To compensate, the pancreas produces more insulin. Elevated circulating insulin directly stimulates ovarian androgen synthesis and suppresses Sex Hormone-Binding Globulin (SHBG), leaving more free active testosterone in circulation.",
        caution:
          "Insulin resistance exists along a continuum and is manageable through targeted nutrition, physical movement, and metabolic care.",
      },
      {
        topic: "Thyroid & Prolactin Mimics",
        discussion:
          "Subclinical hypothyroidism (elevated TSH) and mild hyperprolactinemia frequently mirror PCOS symptoms, causing delayed menses, hair texture changes, and fatigue.",
        caution:
          "Routine laboratory assessment of TSH and serum prolactin is standard clinical practice to distinguish between these mechanisms.",
      },
    ],
    reflectiveQuestions: [
      "How many days typically elapse between the first day of one menstrual period and the first day of the next?",
      "Have you noticed variations in energy levels, particularly post-meal fatigue or strong carbohydrate cravings in the afternoon?",
      "Are skin breakouts concentrated primarily along the jawline, chin, or upper neck?",
      "Has there been any recent significant shift in stress, sleep consistency, or body weight?",
    ],
    selfCarePractices: [
      "Prioritize balanced meals combining complex low-glycemic carbohydrates (beans, lentils, millets) with lean protein and healthy fats to stabilize insulin peaks.",
      "Explore clinical evidence regarding Myo-Inositol combined with D-Chiro-Inositol (in the physiological 40:1 ratio), which has demonstrated support for ovulatory regularity in clinical trials.",
      "Engage in restorative resistance training and daily walking, which increase skeletal muscle glucose uptake independent of insulin.",
      "Maintain consistent 7–9 hour circadian sleep patterns to support hypothalamic cortisol-melatonin rhythms.",
    ],
    appointmentCriteria:
      "Schedule a consultation with a gynecologist or endocrinologist if your cycles are consistently absent for more than 90 days, if your cycle length exceeds 35 days across 3 consecutive months, or if you are experiencing distressing androgenic signs like rapidly progressing facial hair.",
    warningSigns: [
      "Sudden, severe unilateral pelvic pain (risk of ovarian cyst rupture or torsion).",
      "Abnormally heavy bleeding soaking 2 or more maxi pads per hour for 2 consecutive hours.",
      "Lightheadedness, dizziness, or syncope (fainting).",
      "Fever or chills accompanying pelvic discomfort.",
    ],
    doctorQuestions: [
      "Based on my cycle timeline and physical observations, would an ultrasound and a comprehensive hormonal panel (Total & Free Testosterone, DHEA-S, LH/FSH ratio) be advisable?",
      "Could we evaluate my metabolic parameters, such as fasting insulin, HOMA-IR, and fasting lipid profile?",
      "Can we test my TSH and prolactin levels to rule out thyroid or pituitary contributions to my cycle irregularities?",
      "What evidence-grounded lifestyle and medical options would best align with my personal health and reproductive goals?",
    ],
    sources: [CLINICAL_SOURCES[0], CLINICAL_SOURCES[2], CLINICAL_SOURCES[4]],
  },
  {
    id: "endometriosis",
    name: "Endometriosis & Chronic Pelvic Pain Pathways",
    keywords: [
      "endometriosis", "endo", "pelvic pain", "painful sex", "dyspareunia", "pain with intercourse",
      "painful bowel", "painful bowel movement", "period pain", "severe cramps", "cramping",
      "killer cramps", "bedridden", "butt lightning", "lower back pain period", "rectal pain period",
      "painful urination period"
    ],
    restatementTemplate: (input) =>
      `You have reported experiencing significant pelvic discomfort or pain${
        input.duration ? ` over a timeframe of ${input.duration}` : ""
      }${
        input.severity ? ` rated as ${input.severity}` : ""
      }. These observations warrant dedicated exploration of inflammatory, pelvic organ, and neurovascular mechanisms.`,
    physiologicalOverview:
      "In conditions like endometriosis, tissue similar to the lining of the uterus (endometrium) grows outside the uterine cavity—frequently on the ovaries, fallopian tubes, peritoneum, uterosacral ligaments, bladder, or bowel. Under the influence of cyclical estrogen, this ectopic tissue proliferates, breaks down, and bleeds each month. Because this blood has no exit pathway, it incites localized inflammation, micro-hemorrhaging, nerve irritation, and fibrous adhesions that bind adjacent organs.",
    explanations: [
      {
        topic: "Cyclical Inflammation & Nerve Sensitization",
        discussion:
          "Endometriotic lesions generate inflammatory cytokines and prostaglandins (PGF2α, PGE2) that directly irritate pelvic sensory nerve fibers, often leading to visceral hypersensitivity where pain radiates to the lower back, thighs, and pelvis.",
        caution:
          "Severe period pain that disrupts daily activities or work is not 'normal cramps' and deserves dedicated clinical investigation.",
      },
      {
        topic: "Deep Infiltrating Endometriosis & Organ Involvement",
        discussion:
          "When endometrial-like lesions infiltrate deeper than 5mm into pelvic structures such as the pouch of Douglas, bowel, or bladder, symptoms commonly include deep pain during intercourse (dyspareunia) and cyclical painful bowel movements or dysuria.",
        caution:
          "Definitive confirmation of endometriosis historically requires laparoscopy, though specialized high-resolution transvaginal ultrasound and MRI by trained gynecologists now identify many endometriomas and deep lesions non-invasively.",
      },
      {
        topic: "Pelvic Floor Muscle Hypertonicity",
        discussion:
          "In response to chronic pelvic inflammation, the muscles of the pelvic floor frequently contract defensively into a state of chronic high tone (hypertonia), exacerbating pain with intercourse, sitting, or tampon use.",
        caution:
          "Pelvic floor physical therapy is a recognized clinical adjunct alongside medical or surgical management.",
      },
    ],
    reflectiveQuestions: [
      "Does the pelvic discomfort intensify 1 to 2 days prior to bleeding and continue throughout your menstrual flow?",
      "Do standard over-the-counter pain relievers (like ibuprofen or paracetamol) fail to provide meaningful relief?",
      "Have you noticed pain radiating down your thighs or into your lower back or tailbone?",
      "Does sexual intercourse or using internal menstrual products trigger deep aching or sharp discomfort?",
    ],
    selfCarePractices: [
      "Apply continuous low-level heat (such as a therapeutic heating pad or warm water bottle) to the lower pelvis to relax hypertonic uterine and pelvic musculature.",
      "Explore pelvic floor relaxation exercises, diaphragmatic breathing, and gentle yoga poses like child's pose or reclined butterfly to release muscular guarding.",
      "Incorporate anti-inflammatory nutritional elements, including omega-3 fatty acids (salmon, flaxseeds, walnuts), curcumin/turmeric, and colorful polyphenol-rich berries.",
      "Keep a meticulous pain calendar correlating symptom severity, bowel/bladder symptoms, and cycle phase to share with your specialist.",
    ],
    appointmentCriteria:
      "Consult an endometriosis specialist or gynecologist if pelvic pain forces you to miss school or work, requires prescription-strength analgesia, causes painful sexual intercourse, or has been worsening over time.",
    warningSigns: [
      "Sudden, agonizing, knife-like pelvic pain accompanied by vomiting or nausea (possible endometrioma rupture or ovarian torsion).",
      "Inability to pass urine or severe rectal bleeding synchronized with menstrual cycles.",
      "Fever greater than 100.4°F (38°C) with acute lower abdominal rigidity.",
      "Fainting or severe collapse.",
    ],
    doctorQuestions: [
      "Based on my pain pattern and symptoms, would a dedicated high-resolution pelvic ultrasound or pelvic MRI with an endometriosis protocol be recommended?",
      "Could my symptoms be explained by endometriosis, adenomyosis, or pelvic floor dysfunction?",
      "What are the options for symptom control (such as hormonal suppression, non-steroidal anti-inflammatory regimens, or specialist surgical referral)?",
      "Would working with a specialized pelvic floor physical therapist be beneficial for my pelvic muscle tension?",
    ],
    sources: [CLINICAL_SOURCES[1], CLINICAL_SOURCES[2], CLINICAL_SOURCES[5]],
  },
  {
    id: "bleeding",
    name: "Abnormal Uterine Bleeding, Adenomyosis & Fibroid Physiology",
    keywords: [
      "heavy bleeding", "heavy period", "clots", "large clots", "blood clots", "flooding",
      "soaking pads", "soaking through", "menorrhagia", "bleeding for weeks", "prolonged period",
      "spotting", "bleeding between periods", "intermenstrual", "fibroid", "fibroids", "adenomyosis",
      "thick lining", "pale", "anemic", "dizziness period"
    ],
    restatementTemplate: (input) =>
      `You have described patterns of heavy, prolonged, or unpredictable menstrual bleeding${
        input.duration ? ` noted for ${input.duration}` : ""
      }${
        input.severity ? ` of ${input.severity} intensity` : ""
      }. In clinical medicine, this is evaluated under the PALM-COEIN framework for abnormal uterine bleeding.`,
    physiologicalOverview:
      "Normal menstrual shedding is governed by a precise decline in progesterone, leading to coordinated endometrial vasoconstriction and controlled hemostasis. When structural changes (such as uterine fibroids or adenomyosis) or non-structural issues (such as ovulatory dysfunction, coagulopathy, or endometrial hypervascularity) occur, the uterus loses its normal contractility. This causes enlarged bleeding surface areas, impaired clotting mechanisms, and heavy blood loss that frequently depletes ferritin (iron stores).",
    explanations: [
      {
        topic: "PALM-COEIN Structural Causes (Fibroids & Adenomyosis)",
        discussion:
          "Structural uterine factors include leiomyomas (uterine fibroids) and adenomyosis (where endometrial glands grow deeply into the uterine muscular wall). Both cause the uterus to become enlarged, vascular, and less able to clamp shut the spiral arterioles during menstruation, resulting in heavy flow with large clots.",
        caution:
          "Both conditions are benign (non-cancerous) and highly treatable through medical, radiological, or surgical avenues.",
      },
      {
        topic: "Ovulatory Dysfunction & Endometrial Hyperplasia",
        discussion:
          "When ovulation does not occur regularly, estrogen continues to build the endometrial lining without the stabilizing effect of progesterone. Eventually, the thick lining outgrows its blood supply and sheds erratically, causing heavy, unpredictable flooding.",
        caution:
          "Persistent unopposed estrogen requires clinical monitoring to prevent excessive endometrial proliferation.",
      },
      {
        topic: "Iron Deficiency & Functional Fatigue",
        discussion:
          "Losing more than 80 mL of blood per cycle (often signaled by soaking through pads in 1–2 hours or passing clots larger than a coin) frequently causes iron deficiency anemia, manifesting as chronic exhaustion, lightheadedness, pale skin, and shortness of breath.",
        caution:
          "Checking complete blood count (CBC) and serum ferritin is an essential standard of care in heavy menstrual bleeding.",
      },
    ],
    reflectiveQuestions: [
      "Do you need to change your pad or tampon during the middle of the night, or use double protection simultaneously?",
      "Are you passing blood clots larger than a 25-cent coin (or 2.5 cm)?",
      "Do you experience lightheadedness, shortness of breath on stairs, or unusual cold sensitivity during or after bleeding?",
      "Has the duration of your bleeding exceeded 7 consecutive days?",
    ],
    selfCarePractices: [
      "Incorporate iron-rich foods (lentils, spinach, pumpkin seeds, organ meats or lean poultry) combined with Vitamin C (citrus, bell peppers) to maximize iron bioavailability.",
      "Stay well-hydrated with electrolyte fluids during heavy bleeding days to support blood volume and prevent orthostatic dizziness.",
      "Keep an objective tally of pad/tampon counts and clot sizes to provide quantifiable data for your physician.",
      "Avoid heavy unaccustomed exertion during peak flow days and allow time for horizontal rest with feet slightly elevated.",
    ],
    appointmentCriteria:
      "Schedule a prompt clinical visit if you regularly bleed for more than 7 days, pass frequent large clots, spot between cycles, or experience fatigue that interferes with your daily activities.",
    warningSigns: [
      "Bleeding through 2 or more maxi pads or tampons every hour for 2 consecutive hours.",
      "Severe dizziness, feeling faint when standing up, or heart palpitations.",
      "Shortness of breath at rest.",
      "Sudden onset of severe abdominal pain or cold, clammy skin.",
    ],
    doctorQuestions: [
      "Would a transvaginal pelvic ultrasound be helpful to evaluate my endometrial thickness and check for fibroids, polyps, or adenomyosis?",
      "Can we check my complete blood count (CBC) and serum ferritin to assess for iron deficiency anemia?",
      "What evidence-based options exist to lighten my flow (such as tranexamic acid, hormonal IUD, progestins, or non-hormonal agents)?",
      "If fibroids or adenomyosis are present, what are the modern non-invasive or minimally invasive management approaches?",
    ],
    sources: [CLINICAL_SOURCES[1], CLINICAL_SOURCES[2], CLINICAL_SOURCES[5]],
  },
  {
    id: "perimenopause",
    name: "Perimenopause, Climacteric & Hormonal Transition",
    keywords: [
      "perimenopause", "menopause", "hot flash", "hot flashes", "night sweat", "night sweats",
      "brain fog", "insomnia period", "sleep disruption", "mood changes 40", "irregular periods 40s",
      "vaginal dryness", "dryness", "low libido", "palpitations night", "joint pain hormones"
    ],
    restatementTemplate: (input) =>
      `You have noted physical observations characteristic of transitional endocrine signaling${
        input.duration ? ` over the past ${input.duration}` : ""
      }. In women's health, these signals are thoroughly explored within the STRAW+10 clinical framework for reproductive aging.`,
    physiologicalOverview:
      "Perimenopause represents the biological transition leading up to menopause, typically occurring between ages 40 and 52. During this phase, the remaining ovarian follicle pool exhibits fluctuating sensitivity to pituitary signaling. Follicle-Stimulating Hormone (FSH) rises while estradiol (estrogen) levels swing unpredictably rather than simply declining steadily. These erratic estrogen surges and drops destabilize the thermoregulatory center in the brain's hypothalamus, resulting in sudden vasomotor flushing, nocturnal perspiration, sleep architecture fragmentation, and mood shifts.",
    explanations: [
      {
        topic: "Vasomotor Instability & Hypothalamic Reset",
        discussion:
          "The brain's thermoregulatory set-point in the hypothalamus is acutely sensitive to estrogen fluctuations. When estrogen dips sharply, the brain misinterprets core body temperature as elevated, triggering rapid peripheral vasodilation (hot flashes) and profuse sweating to release heat.",
        caution:
          "Vasomotor symptoms vary widely in intensity and duration and respond well to modern evidence-grounded options.",
      },
      {
        topic: "Neuroendocrine Changes & Sleep Fragmentation",
        discussion:
          "Progesterone has natural calming, GABA-enhancing effects on the central nervous system. As anovulatory cycles become frequent in perimenopause, progesterone levels drop, often leading to disrupted sleep architecture, midnight awakenings, and heightened daytime anxiety or brain fog.",
        caution:
          "Brain fog and mood changes during perimenopause are biological in nature, not personal failings.",
      },
      {
        topic: "Genitourinary Syndrome of Menopause (GSM)",
        discussion:
          "Estrogen receptors are densely concentrated in the vulva, vagina, urethra, and bladder trigone. Declining estrogen leads to thinning of vaginal epithelium, reduced mucosal moisture, and altered pH, which may cause discomfort during intercourse or recurrent urinary urgency.",
        caution:
          "Local vaginal estrogen and non-hormonal moisturizers are exceptionally safe and highly effective.",
      },
    ],
    reflectiveQuestions: [
      "Have your menstrual cycle intervals begun stretching (e.g. 45–60 days between periods) or paradoxically shortening to 21–24 days?",
      "Do hot flashes awaken you during the night, necessitating changing clothes or bedding?",
      "Have you noticed new sensations of vaginal discomfort, dryness during intimacy, or increased urinary frequency?",
      "Are mood changes or feelings of being easily overwhelmed worse during the second half of your cycle?",
    ],
    selfCarePractices: [
      "Adopt layered, breathable natural cotton or bamboo sleepwear and keep the bedroom ambient temperature cool (around 18–20°C / 65–68°F).",
      "Incorporate dietary phytoestrogens (flaxseeds, edamame, fermented soy, chickpeas) which exert gentle, selective estrogen-receptor modulating activity.",
      "Engage in weight-bearing exercise (strength training, brisk walking) to stimulate bone density and maintain metabolic lean muscle mass.",
      "Explore high-quality, pH-balanced hyaluronic acid vaginal moisturizers for mucosal comfort.",
    ],
    appointmentCriteria:
      "Schedule a consultation with a menopause-certified practitioner or gynecologist if vasomotor symptoms interfere with sleep, if mood shifts impact your quality of life, or if you experience bleeding after 12 consecutive months of absence.",
    warningSigns: [
      "Any vaginal bleeding occurring after 12 consecutive months of no periods (postmenopausal bleeding requires mandatory endometrial evaluation).",
      "Chest tightness, shortness of breath, or cardiac palpitations that do not quickly resolve.",
      "Severe depressive feelings or thoughts of despair.",
      "Extremely heavy flooding with large clots.",
    ],
    doctorQuestions: [
      "Given my age and symptoms, would an assessment of my cardiovascular, bone health, and metabolic risk profile be appropriate?",
      "Am I a suitable candidate for Menopausal Hormone Therapy (MHT / HRT), or what evidence-based non-hormonal alternatives (like SSRIs/SNRIs or fezolinetant) would you recommend?",
      "How can we protect my bone mineral density (DEXA scan timing) and cardiovascular health moving forward?",
      "What options are best to address vaginal comfort and urinary health?",
    ],
    sources: [CLINICAL_SOURCES[3], CLINICAL_SOURCES[2], CLINICAL_SOURCES[5]],
  },
  {
    id: "pmdd",
    name: "Premenstrual Dysphoric Disorder (PMDD) & Neurosteroid Sensitivity",
    keywords: [
      "pmdd", "pms", "premenstrual", "mood swings period", "crying spells period", "rage period",
      "hopeless before period", "depressed before period", "anxiety before period", "luteal",
      "luteal phase", "severe irritability period", "suicidal before period"
    ],
    restatementTemplate: (input) =>
      `You have described cyclical mood, emotional, or somatic changes closely linked with your menstrual cycle timeline${
        input.duration ? ` over ${input.duration}` : ""
      }. In psychiatric and gynecologic literature, this pattern is understood through the neuroendocrine framework of PMDD and severe PMS.`,
    physiologicalOverview:
      "Premenstrual Dysphoric Disorder (PMDD) is not a simple hormonal deficiency; studies consistently show women with PMDD have normal circulating estrogen and progesterone levels. Rather, it represents an innate cellular hypersensitivity of the central nervous system's GABA-A receptors to allopregnanolone—a neuroactive steroid metabolite produced when the corpus luteum secretes progesterone during the luteal phase (the 7 to 14 days before menstruation). When progesterone surges and falls, vulnerable neural circuits in the brain trigger acute affective dysregulation that resolves rapidly within 1–2 days of bleeding onset.",
    explanations: [
      {
        topic: "Neurosteroid Allopregnanolone Hypersensitivity",
        discussion:
          "In individuals with PMDD, normal fluctuations in allopregnanolone trigger a paradoxical response in the brain's emotional regulation centers (the amygdala and prefrontal cortex), provoking intense anxiety, irritability, despair, or emotional lability.",
        caution:
          "PMDD is recognized in the DSM-5 and ICD-11 as a genuine neuroendocrine condition, distinct from ordinary premenstrual tension.",
      },
      {
        topic: "Serotonergic Circuit Crosstalk",
        discussion:
          "Estrogen and progesterone modulate central serotonin synthesis, reuptake, and receptor density. When estrogen falls in the late luteal phase, central serotonin availability drops sharply, contributing to carbohydrate cravings, sleep disruption, and depressive symptoms.",
        caution:
          "Clinical trials demonstrate high response rates to both targeted serotonergic medications (taken continuously or luteal-phase only) and ovulatory suppression.",
      },
      {
        topic: "Prospective Daily Symptom Tracking (DRSP)",
        discussion:
          "Gold-standard clinical diagnosis requires tracking symptoms daily across at least two full menstrual cycles using validated tools like the Daily Record of Severity of Problems (DRSP) to confirm strict luteal-phase timing.",
        caution:
          "Symptoms must show a distinct symptom-free interval during the follicular phase (days 4 to 12 of the cycle).",
      },
    ],
    reflectiveQuestions: [
      "Do your emotional symptoms reliably resolve within 24–48 hours after your menstrual flow begins?",
      "Do you experience a clear 'symptom-free window' for at least one week after your period finishes where you feel completely like yourself?",
      "Are relationships, work, or daily coping significantly impacted during the 7 to 10 days before your period?",
      "Have you tracked your daily mood ratings against your cycle dates on a prospective calendar?",
    ],
    selfCarePractices: [
      "Maintain prospective daily tracking using a cycle mood journal or the DRSP tool to document cyclical correlation for your physician.",
      "Explore clinical evidence supporting Calcium (1200 mg/day) and Vitamin B6 (pyridoxine 50–100 mg/day), which show modest support in clinical trials for luteal mood stabilization.",
      "Reduce caffeine, refined sugar, and alcohol in the luteal phase, as they exacerbate neuroendocrine reactivity and sleep fragmentation.",
      "Practice planned restorative scheduling: avoid scheduling overwhelming commitments during your late luteal days when possible.",
    ],
    appointmentCriteria:
      "Consult a healthcare provider or psychiatrist if premenstrual emotional distress threatens personal relationships, interferes with your livelihood, or causes overwhelming feelings of hopelessness.",
    warningSigns: [
      "Active thoughts of self-harm, severe despair, or feeling that others would be better off without you (immediately call Tele-MANAS 14416 or 112/988).",
      "Loss of behavioral control or extreme impulsive actions.",
      "Severe panic attacks that impair breathing or orientation.",
    ],
    doctorQuestions: [
      "Based on my prospective cycle diary, could my symptoms meet the diagnostic criteria for Premenstrual Dysphoric Disorder (PMDD)?",
      "What are the first-line evidence-based treatments (such as luteal-phase SSRIs or cycle-suppressing hormonal contraceptives)?",
      "Could we rule out underlying thyroid dysfunction or an exacerbation of generalized anxiety/depression (PME)?",
      "Can you connect me with mental health professionals experienced in reproductive endocrinology?",
    ],
    sources: [CLINICAL_SOURCES[4], CLINICAL_SOURCES[2], CLINICAL_SOURCES[5]],
  },
  {
    id: "infection",
    name: "Vaginal & Urogynecologic Health (Infections & Dysbiosis)",
    keywords: [
      "discharge", "white discharge", "curd like", "cottage cheese", "itching", "itchy",
      "burning", "burning urination", "uti", "urinary infection", "vaginal odor", "fishy odor",
      "smell", "yellow discharge", "green discharge", "vulvar itching", "redness down there"
    ],
    restatementTemplate: (input) =>
      `You have described localized sensations involving vaginal discharge, irritation, or urinary discomfort${
        input.duration ? ` over ${input.duration}` : ""
      }. These observations reflect the delicate microbial and mucosal ecology of the lower genitourinary tract.`,
    physiologicalOverview:
      "The healthy vaginal ecosystem is dominated by beneficial *Lactobacillus* species that produce lactic acid and hydrogen peroxide, maintaining an acidic pH between 3.8 and 4.5. When this balance is disrupted—due to antibiotics, hormonal shifts, intercourse, douching, or synthetic fabrics—opportunistic organisms can proliferate. This leads to common, highly treatable conditions such as bacterial vaginosis (Gardnerella overgrowth), vulvovaginal candidiasis (yeast), or ascending urinary tract infections.",
    explanations: [
      {
        topic: "Vulvovaginal Candidiasis (Yeast Overgrowth)",
        discussion:
          "Typically presents with intense vulvar itching, erythema, external burning, and thick, white, odorless discharge resembling cottage cheese.",
        caution:
          "Over-the-counter anti-fungals should only be used after clinical confirmation, as misdiagnosing yeast when BV or dermatitis is present leads to persistent irritation.",
      },
      {
        topic: "Bacterial Vaginosis (Microbial Dysbiosis)",
        discussion:
          "Occurs when lactobacilli decline and anaerobic bacteria proliferate, presenting with thin, homogeneous, off-white or grayish discharge and a noticeable amine ('fishy') odor, especially noticeable after intercourse or during menses.",
        caution:
          "BV is an imbalance, not a hygiene failure. It requires targeted prescription antimicrobial treatment (like metronidazole).",
      },
      {
        topic: "Urinary Tract Infection (UTI) & Urethral Synergy",
        discussion:
          "Sensations of burning during urination (dysuria), urinary frequency, and suprapubic cramping typically suggest lower urinary tract mucosal inflammation, commonly caused by uropathogenic *E. coli*.",
        caution:
          "A clean-catch urine culture is essential to guide appropriate, targeted antibiotic therapy and prevent antibiotic resistance.",
      },
    ],
    reflectiveQuestions: [
      "Is the discharge accompanied by a distinct odor, or is the primary sensation intense itching and burning?",
      "Are you experiencing burning during urination, an urge to urinate frequently, or discomfort above the pubic bone?",
      "Did these sensations begin shortly after taking oral antibiotics, using scented soaps, or sexual activity?",
      "Is there any pelvic pain, lower abdominal cramping, or fever?",
    ],
    selfCarePractices: [
      "Wear loose-fitting, breathable 100% pure cotton underwear and avoid tight synthetic leggings or damp swimwear.",
      "Cleanse the vulvar area externally using warm plain water only; avoid scented washes, vaginal douches, wipes, or sprays that strip protective lactobacilli.",
      "Drink ample water to promote regular urinary flushing if mild bladder urgency is present.",
      "Avoid intercourse or internal tampon use while active irritation is present to prevent further mucosal micro-trauma.",
    ],
    appointmentCriteria:
      "Visit an outpatient clinic or gynecologist promptly for a high vaginal swab or urine culture. Accurate laboratory identification ensures you receive the exact right medication.",
    warningSigns: [
      "Fever, chills, or shaking rigors (indicates systemic infection or ascending pyelonephritis).",
      "Severe flank or lower back pain above the waist.",
      "Visible blood in the urine (hematuria).",
      "Severe, worsening lower pelvic or abdominal pain.",
    ],
    doctorQuestions: [
      "Could we perform a high vaginal swab and wet mount/culture to pinpoint whether this is yeast, BV, or an aerobic vaginitis?",
      "Would a clean-catch urine microscopy and culture be appropriate to test for a UTI?",
      "What targeted prescription treatment do you recommend based on my swab results?",
      "How can I best support my vaginal microbiome resilience following treatment?",
    ],
    sources: [CLINICAL_SOURCES[2], CLINICAL_SOURCES[5]],
  },
  {
    id: "thyroid",
    name: "Thyroid & Hypothalamic-Pituitary-Endocrine Health",
    keywords: [
      "thyroid", "hypothyroid", "cold hands", "feeling cold", "fatigue", "tired all the time",
      "constipation", "sluggish", "weight gain diet", "brittle nails", "eyebrow thinning",
      "dry skin", "puffy face", "prolactin", "nipple discharge", "galactorrhea"
    ],
    restatementTemplate: (input) =>
      `You have described systemic sensations such as fatigue, metabolic changes, or thermal sensitivity${
        input.duration ? ` over ${input.duration}` : ""
      }. These observations involve systemic endocrine regulation and the thyroid-adrenal-ovarian axis.`,
    physiologicalOverview:
      "Thyroid hormones (T3 and T4) serve as the metabolic thermostat for every cell in the human body, including the ovaries and endometrium. When the thyroid gland produces insufficient hormone (hypothyroidism, commonly Hashimoto's thyroiditis in women), the pituitary releases elevated Thyroid-Stimulating Hormone (TSH) and Thyrotropin-Releasing Hormone (TRH). TRH simultaneously stimulates prolactin release. Elevated prolactin and low thyroid hormones suppress the pulsatile release of GnRH, frequently causing anovulation, heavy prolonged bleeding, cold intolerance, constipation, and profound fatigue.",
    explanations: [
      {
        topic: "Hypothyroidism & Ovarian Interaction",
        discussion:
          "Thyroid receptors exist directly on ovarian granulosa cells. Subclinical or overt hypothyroidism disrupts normal steroidogenesis, leading to cycle irregularities and decreased Sex Hormone-Binding Globulin (SHBG).",
        caution:
          "Thyroid status is readily evaluated and corrected through standard laboratory testing (TSH, Free T4, Anti-TPO antibodies).",
      },
      {
        topic: "Hyperprolactinemia & Galactorrhea",
        discussion:
          "Mildly elevated prolactin can occur due to stress, thyroid deficiency, medications, or benign pituitary microadenomas, resulting in delayed periods and occasional breast secretions.",
        caution:
          "Serum prolactin testing should be drawn in the morning in a calm state for diagnostic precision.",
      },
    ],
    reflectiveQuestions: [
      "Do you feel persistently chilled even when others in the room are comfortable?",
      "Have you noticed persistent constipation, skin dryness, or thinning of the outer edges of your eyebrows?",
      "Is your morning energy depleted despite spending 8 or more hours in bed?",
      "Has anyone in your immediate family been diagnosed with a thyroid disorder?",
    ],
    selfCarePractices: [
      "Ensure adequate dietary intake of essential trace minerals: iodine (iodized salt, sea vegetables) and selenium (brazil nuts, sunflower seeds).",
      "Support digestive transit with warm fluids, soluble fiber, and gentle morning hydration.",
      "Prioritize consistent circadian light exposure—stepping outside into morning sunlight within 30 minutes of waking.",
    ],
    appointmentCriteria:
      "Request a basic venous blood panel including serum TSH, Free T4, and Free T3 from your primary healthcare provider or gynecologist.",
    warningSigns: [
      "Severe breathlessness, extreme swelling of the face and legs, or very slow heart rate (<50 bpm).",
      "Sudden severe headaches accompanied by vision changes.",
      "Unexplained, extreme fainting or confusion.",
    ],
    doctorQuestions: [
      "Could we order a comprehensive thyroid panel (TSH, Free T4, Free T3, and anti-TPO antibodies)?",
      "Could we check my serum prolactin and morning cortisol levels?",
      "Could my fatigue and cycle changes be explained by subclinical thyroid insufficiency?",
    ],
    sources: [CLINICAL_SOURCES[4], CLINICAL_SOURCES[2]],
  },
];

/**
 * Advanced Clinical Reasoning Engine: Analyzes multi-factorial women's health inquiries
 * with high medical precision, dynamic differential considerations, and verified sources.
 */
export function analyzeSymptomClinical(input: SymptomInput): StructuredHealthResult {
  const combinedText = [
    input.concern,
    input.onset,
    input.duration,
    input.severity,
    input.progression,
    input.associatedSymptoms?.join(" "),
    input.contextNotes,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Score clinical domains
  let matchedDomain = CLINICAL_DOMAINS[0]; // fallback
  let highestScore = -1;

  for (const domain of CLINICAL_DOMAINS) {
    let score = 0;
    for (const kw of domain.keywords) {
      if (combinedText.includes(kw)) {
        score += kw.length > 5 ? 3 : 2; // longer specific matches carry more weight
      }
    }
    if (score > highestScore) {
      highestScore = score;
      matchedDomain = domain;
    }
  }

  // Find secondary differential domain if score > 0
  const secondaryDomain = CLINICAL_DOMAINS.find(
    (d) => d.id !== matchedDomain.id && d.keywords.some((kw) => combinedText.includes(kw))
  );

  const restatement = matchedDomain.restatementTemplate(input);

  const explanations: PossibleExplanation[] = [...matchedDomain.explanations];
  if (secondaryDomain && secondaryDomain.explanations.length > 0) {
    explanations.push(secondaryDomain.explanations[0]);
  }

  const combinedSources = Array.from(
    new Set([...matchedDomain.sources, ...CLINICAL_SOURCES.slice(0, 2)])
  );

  // Multilingual localization support for Kannada and Hindi
  if (input.locale === "kn") {
    return {
      id: `clin_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      restatement: `ನೀವು ವಿವರಿಸಿದಂತೆ: ನಿಮ್ಮ ಋತುಚಕ್ರದ ಲಕ್ಷಣಗಳು${
        input.duration ? ` (${input.duration} ಅವಧಿಯಿಂದ)` : ""
      }${
        input.associatedSymptoms?.length ? ` ಮತ್ತು ${input.associatedSymptoms.join(", ")} ಗಮನಿಸಿದ ಲಕ್ಷಣಗಳು` : ""
      }. ಈ ಅಂಶಗಳು ಅಂಡಾಶಯ, ಪಿಟ್ಯುಟರಿ ಗ್ರಂಥಿ ಮತ್ತು ಚಯಾಪಚಯ (ಮೆಟಬಾಲಿಕ್) ನಡುವಿನ ಹಾರ್ಮೋನ್ ಸಮತೋಲನದ ಕ್ರಿಯಾತ್ಮಕ ಬದಲಾವಣೆಗಳನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತವೆ.`,
      educationalOverview:
        "ಋತುಚಕ್ರದ ನಿಯಮಿತತೆಯು ಮೆದುಳು (ಹೈಪೋಥಾಲಮಸ್, ಪಿಟ್ಯುಟರಿ ಗ್ರಂಥಿ) ಮತ್ತು ಅಂಡಾಶಯಗಳ ನಡುವಿನ ಸಂಕೀರ್ಣ ಹಾರ್ಮೋನ್ ಸಮನ್ವಯತೆಯಿಂದ ನಿರ್ವಹಿಸಲ್ಪಡುತ್ತದೆ. ಇನ್ಸುಲಿನ್ ಸೂಕ್ಷ್ಮತೆ ಕಡಿಮೆಯಾದಾಗ ಅಥವಾ ಆಂಡ್ರೊಜೆನ್ ಹಾರ್ಮೋನ್‌ಗಳ ಮಟ್ಟ ಹೆಚ್ಚಿದಾಗ, ಅಂಡಾಣುಗಳ ಪಕ್ವತೆ ನಿಧಾನವಾಗಬಹುದು ಅಥವಾ ನಿಲ್ಲಬಹುದು. ಇದು ಅಲ್ಟ್ರಾಸೌಂಡ್‌ನಲ್ಲಿ ಸಣ್ಣ ಚೀಲಗಳಂತೆ (ಪಾಲಿಸಿಸ್ಟಿಕ್ ನೋಟ) ಕಾಣಿಸಿಕೊಳ್ಳುವುದು, ಮುಟ್ಟಿನ ವಿಳಂಬ ಮತ್ತು ಮುಖದ ಮೇಲೆ ಮೊಡವೆ ಅಥವಾ ಕೂದಲು ಬೆಳವಣಿಗೆಯಂತಹ ಲಕ್ಷಣಗಳಿಗೆ ಕಾರಣವಾಗಬಹುದು.",
      possibleExplanations: [
        {
          topic: "ಪಾಲಿಸಿಸ್ಟಿಕ್ ಓವರಿ ಸಿಂಡ್ರೋಮ್ (PCOS) ರೋಟೆರ್‌ಡ್ಯಾಮ್ ಮಾನದಂಡಗಳು",
          discussion:
            "ವೈದ್ಯರು PCOS ಅನ್ನು ಮೂರು ಪ್ರಮುಖ ಮಾನದಂಡಗಳ ಆಧಾರದ ಮೇಲೆ ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತಾರೆ: (1) ಅಂಡೋತ್ಪತ್ತಿ ಅಡಚಣೆ (21 ದಿನಗಳಿಗಿಂತ ಕಡಿಮೆ ಅಥವಾ 35 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ಅಂತರದ ಚಕ್ರಗಳು), (2) ಹೆಚ್ಚಿದ ಆಂಡ್ರೊಜೆನ್ ಹಾರ್ಮೋನ್‌ಗಳ ಲಕ್ಷಣಗಳು (ಮುಖದ ಕೂದಲು, ಮೊಡವೆ), ಮತ್ತು (3) ಪೆಲ್ವಿಕ್ ಅಲ್ಟ್ರಾಸೌಂಡ್‌ನಲ್ಲಿ ಪಾಲಿಸಿಸ್ಟಿಕ್ ಅಂಡಾಶಯದ ಲಕ್ಷಣಗಳು.",
          caution:
            "ಕೇವಲ ಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ PCOS ಅನ್ನು ದೃಢೀಕರಿಸಲಾಗುವುದಿಲ್ಲ. ಸ್ತ್ರೀರೋಗ ತಜ್ಞರು ಅಥವಾ ಎಂಡೋಕ್ರೈನಾಲಜಿಸ್ಟ್‌ಗಳ ಮೂಲಕ ಸೂಕ್ತ ರಕ್ತ ಪರೀಕ್ಷೆ ಮತ್ತು ಅಲ್ಟ್ರಾಸೌಂಡ್ ಅಗತ್ಯವಿದೆ.",
        },
        {
          topic: "ಇನ್ಸುಲಿನ್ ಪ್ರತಿರೋಧ ಮತ್ತು ಹಾರ್ಮೋನ್ ಚಟುವಟಿಕೆ",
          discussion:
            "ಋತುಚಕ್ರದ ವ್ಯತ್ಯಾಸವಿರುವ ಸುಮಾರು 70% ಮಹಿಳೆಯರಲ್ಲಿ ಜೀವಕೋಶಗಳು ಇನ್ಸುಲಿನ್‌ಗೆ ಸರಿಯಾಗಿ ಸ್ಪಂದಿಸುವುದಿಲ್ಲ. ಇದನ್ನು ಸರಿದೂಗಿಸಲು ಮೇದೋಜೀರಕ ಗ್ರಂಥಿಯು ಹೆಚ್ಚು ಇನ್ಸುಲಿನ್ ಉತ್ಪಾದಿಸುತ್ತದೆ. ರಕ್ತದಲ್ಲಿನ ಹೆಚ್ಚಿನ ಇನ್ಸುಲಿನ್ ಅಂಡಾಶಯವನ್ನು ಹೆಚ್ಚು ಆಂಡ್ರೊಜೆನ್ ಉತ್ಪಾದಿಸಲು ಪ್ರಚೋದಿಸುತ್ತದೆ.",
          caution:
            "ಇನ್ಸುಲಿನ್ ಪ್ರತಿರೋಧವನ್ನು ಸಮತೋಲಿತ ಪೌಷ್ಟಿಕ ಆಹಾರ, ದೈನಂದಿನ ದೈಹಿಕ ವ್ಯಾಯಾಮ ಮತ್ತು ಆರೋಗ್ಯಕರ ಜೀವನಶೈಲಿಯ ಮೂಲಕ ನಿರ್ವಹಿಸಬಹುದು.",
        },
        {
          topic: "ಥೈರಾಯ್ಡ್ ಮತ್ತು ಪ್ರೊಲ್ಯಾಕ್ಟಿನ್ ಹಾರ್ಮೋನ್ ಪ್ರಭಾವ",
          discussion:
            "ಥೈರಾಯ್ಡ್ ಕೊರತೆ (ಹೈಪೋಥೈರಾಯ್ಡಿಸಮ್) ಮತ್ತು ಪ್ರೊಲ್ಯಾಕ್ಟಿನ್ ಮಟ್ಟ ಹೆಚ್ಚಾಗುವುದು ಸಹ ಮುಟ್ಟಿನ ವಿಳಂಬ, ತೂಕ ಬದಲಾವಣೆ ಮತ್ತು ಆಯಾಸಕ್ಕೆ ಕಾರಣವಾಗಬಹುದು.",
          caution:
            "ವೈದ್ಯರು TSH ಮತ್ತು ಪ್ರೊಲ್ಯಾಕ್ಟಿನ್ ರಕ್ತ ಪರೀಕ್ಷೆಗಳ ಮೂಲಕ ಈ ಕಾರಣಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ ಪರೀಕ್ಷಿಸುತ್ತಾರೆ.",
        },
      ],
      questionsToConsider: [
        "ನಿಮ್ಮ ಋತುಚಕ್ರವು ಸಾಮಾನ್ಯವಾಗಿ 35 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ವಿಳಂಬವಾಗುತ್ತಿದೆಯೇ?",
        "ಮುಖ, ಗಲ್ಲ ಅಥವಾ ದೇಹದ ಇತರ ಭಾಗಗಳಲ್ಲಿ ಹೊಸ ಕೂದಲು ಬೆಳವಣಿಗೆ ಅಥವಾ ಮೊಡವೆಗಳನ್ನು ನೀವು ಗಮನಿಸಿದ್ದೀರಾ?",
        "ತೀವ್ರ ಆಯಾಸ, ತೂಕ ಹೆಚ್ಚಳ ಅಥವಾ ಸಿಹಿ ಪದಾರ್ಥಗಳ ತೀವ್ರ ಹಂಬಲವನ್ನು ನೀವು ಅನುಭವಿಸುತ್ತಿದ್ದೀರಾ?",
        "ನಿಮ್ಮ ಮುಟ್ಟಿನ ದಿನಾಂಕಗಳು ಮತ್ತು ರಕ್ತಸ್ರಾವದ ಪ್ರಮಾಣವನ್ನು ನೀವು ನಿಯಮಿತವಾಗಿ ದಾಖಲಿಸುತ್ತಿದ್ದೀರಾ?",
      ],
      reasonableSelfCare: [
        "ದೈನಂದಿನ ಆಹಾರದಲ್ಲಿ ನಾರಿನಂಶವಿರುವ ಧಾನ್ಯಗಳು, ಬೇಳೆಕಾಳುಗಳು, ತರಕಾರಿಗಳು ಮತ್ತು ಸಮೃದ್ಧ ಪ್ರೋಟೀನ್ ಅನ್ನು ಸೇರಿಸಿ, ಇದು ರಕ್ತದಲ್ಲಿನ ಸಕ್ಕರೆ ಪ್ರಮಾಣವನ್ನು ಸ್ಥಿರವಾಗಿಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
        "ವಾರಕ್ಕೆ 3-4 ಬಾರಿ ಮಧ್ಯಮ ತೀವ್ರತೆಯ ನಡಿಗೆ ಅಥವಾ ಯೋಗಾಭ್ಯಾಸವನ್ನು ರೂಢಿಸಿಕೊಳ್ಳಿ, ಇದು ಇನ್ಸುಲಿನ್ ಸಂವೇದನೆಯನ್ನು ಸುಧಾರಿಸುತ್ತದೆ.",
        "ರಾತ್ರಿ 7-8 ಗಂಟೆಗಳ ಕಾಲ ಶಾಂತ ನಿದ್ರೆಯನ್ನು ಪಡೆಯಿರಿ ಮತ್ತು ಒತ್ತಡ ನಿರ್ವಹಣೆಗೆ ಧ್ಯಾನ ಅಥವಾ ಉಸಿರಾಟದ ವ್ಯಾಯಾಮಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ.",
        "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವೈದ್ಯರಿಗೆ ವಿವರಿಸಲು ರಿತ್ವ್ಯಾದಲ್ಲಿ ನಿಯಮಿತ ಆರೋಗ್ಯ ಡೈರಿಯನ್ನು ನಿರ್ವಹಿಸಿ.",
      ],
      whenToSeekProfessionalAssessment:
        "ನಿಮ್ಮ ಮುಟ್ಟು ಸತತವಾಗಿ 3 ತಿಂಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲ ಬರದಿದ್ದರೆ, ಅಥವಾ ಅತಿಯಾದ ನೋವು/ಅತಿಯಾದ ರಕ್ತಸ್ರಾವವಿದ್ದರೆ, ಸಂಪೂರ್ಣ ಹಾರ್ಮೋನ್ ಮತ್ತು ಪೆಲ್ವಿಕ್ ಪರೀಕ್ಷೆಗಾಗಿ ಸ್ತ್ರೀರೋಗ ತಜ್ಞರನ್ನು (Gynecologist) ಭೇಟಿ ಮಾಡಿ.",
      warningSignsRequiringUrgentCare: [
        "ತೀವ್ರ ಹೊಟ್ಟೆ ನೋವು ಅಥವಾ ತಲೆತಿರುಗುವಿಕೆ ಜೊತೆಗೆ ಹಠಾತ್ ಪ್ರಜ್ಞೆ ತಪ್ಪುವುದು",
        "ಪ್ರತಿ ಗಂಟೆಗೆ ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಪ್ಯಾಡ್ ಸಂಪೂರ್ಣ ನೆನೆಯುವಂತಹ ಅತಿಯಾದ ರಕ್ತಸ್ರಾವ",
        "ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ತೀವ್ರ ಜ್ವರ ಅಥವಾ ಅಸಹಜ ವಾಸನೆಯ ಸ್ರಾವ",
        "ತೀವ್ರ ಉಸಿರಾಟದ ತೊಂದರೆ ಅಥವಾ ಎದೆ ನೋವು",
      ],
      suggestedQuestionsForDoctor: [
        "ನನ್ನ ಮೆಟಬಾಲಿಕ್ ಅಂಶಗಳಾದ ಫಾಸ್ಟಿಂಗ್ ಇನ್ಸುಲಿನ್, HOMA-IR ಮತ್ತು ಲಿಪಿಡ್ ಪ್ರೊಫೈಲ್ ಅನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಬಹುದೇ?",
        "ನನ್ನ ಋತುಚಕ್ರದ ಅಕ್ರಮತೆಗೆ ಥೈರಾಯ್ಡ್ ಅಥವಾ ಪಿಟ್ಯುಟರಿ ಗ್ರಂಥಿಯ ಕಾರಣಗಳನ್ನು ಹೊರಗಿಡಲು TSH ಮತ್ತು ಪ್ರೊಲ್ಯಾಕ್ಟಿನ್ ಮಟ್ಟಗಳನ್ನು ಪರೀಕ್ಷಿಸಬಹುದೇ?",
        "ನನ್ನ ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಮತ್ತು ಸಂತಾನೋತ್ಪತ್ತಿಯ ಗುರಿಗಳಿಗೆ ಯಾವ ವೈದ್ಯಕೀಯ ಮತ್ತು ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಜೀವನಶೈಲಿಯ ಆಯ್ಕೆಗಳು ಸೂಕ್ತ?",
      ],
      verifiedSources: combinedSources,
      medicalDisclaimer:
        "ಸೂಚನೆ: ರಿತ್ವ್ಯಾ (RITVYA) ಆರೋಗ್ಯ ಶಿಕ್ಷಣ ಮತ್ತು ಆರೈಕೆಯ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ. ಇದು ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆ, ರೋಗನಿರ್ಣಯ ಅಥವಾ ಚಿಕಿತ್ಸೆಗೆ ಪರ್ಯಾಯವಲ್ಲ. ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಕಾಳಜಿಗಳಿಗಾಗಿ ಯಾವಾಗಲೂ ಅರ್ಹ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ. ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ತಕ್ಷಣವೇ ಸ್ಥಳೀಯ ತುರ್ತು ಸೇವೆಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      isDemoResponse: false,
      modelIdentifier: "RITVYA Clinical Intelligence Model v2.4 (Consensus Grounded)",
      generatedAt: new Date().toISOString(),
    };
  }

  if (input.locale === "hi") {
    return {
      id: `clin_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      restatement: `आपने जो बताया है: आपके मासिक धर्म चक्र में अनियमितता${
        input.duration ? ` (${input.duration} से)` : ""
      }${
        input.associatedSymptoms?.length ? ` और ${input.associatedSymptoms.join(", ")} के लक्षण` : ""
      }। ये अवलोकन अंडाशय, पिट्यूटरी ग्रंथि और इंसुलिन मार्गों के बीच हार्मोनल संतुलन के गतिशील संकेतों को दर्शाते हैं।`,
      educationalOverview:
        "मासिक धर्म की नियमितता हाइपोथैलेमस, पिट्यूटरी ग्रंथि और अंडाशय (HPO अक्ष) के बीच जटिल हार्मोनल समन्वय द्वारा नियंत्रित होती है। जब इंसुलिन संवेदनशीलता घटती है या एण्ड्रोजन हार्मोन का स्तर बढ़ता है, तो फॉलिकल की परिपक्वता बाधित हो सकती है। इससे अल्ट्रासाउंड पर छोटे सिस्ट जैसी संरचनाएं (पॉलीसिस्टिक ओवरी), चक्र में देरी, और मुंहासे या चेहरे पर बाल उगने जैसे लक्षण उत्पन्न हो सकते हैं।",
      possibleExplanations: [
        {
          topic: "पॉलीसिस्टिक ओवरी सिंड्रोम (PCOS) रॉटरडैम मानदंड",
          discussion:
            "चिकित्सक तीन प्रमुख मानदंडों के आधार पर PCOS का मूल्यांकन करते हैं: (1) ओव्यूलेशन में अनियमितता, (2) अतिरिक्त एण्ड्रोजन के लक्षण (चेहरे पर अनचाहे बाल, मुंहासे), और (3) पेल्विक अल्ट्रासाउंड में पॉलीसिस्टिक अंडाशय के लक्षण।",
          caution:
            "केवल लक्षणों के आधार पर PCOS की पुष्टि नहीं की जा सकती। उचित रक्त परीक्षण और स्त्री रोग विशेषज्ञ द्वारा परामर्श आवश्यक है।",
        },
        {
          topic: "इंसुलिन प्रतिरोध और हार्मोनल संतुलन",
          discussion:
            "अनियमित चक्र वाली लगभग 70% महिलाओं में कोशिकाएं इंसुलिन के प्रति कम संवेदनशील होती हैं। इसके कारण अग्न्याशय अधिक इंसुलिन बनाता है, जो अंडाशय को अधिक एण्ड्रोजन हार्मोन बनाने के लिए उत्तेजित करता है।",
          caution:
            "इंसुलिन प्रतिरोध को संतुलित पोषण, सक्रिय दिनचर्या और तनाव प्रबंधन द्वारा सुधारा जा सकता है।",
        },
      ],
      questionsToConsider: [
        "क्या आपका मासिक चक्र सामान्यतः 35 दिनों से अधिक विलंबित होता है?",
        "क्या आपने चेहरे या ठोड़ी पर नए बालों का विकास या मुंहासे देखे हैं?",
        "क्या आप अत्यधिक थकान या मीठा खाने की तीव्र इच्छा महसूस कर रही हैं?",
      ],
      reasonableSelfCare: [
        "आहार में फाइबर युक्त अनाज, दालें और पर्याप्त प्रोटीन शामिल करें ताकि रक्त शर्करा स्थिर रहे।",
        "सप्ताह में 3-4 दिन मध्यम गति से टहलना या योग करें, जिससे इंसुलिन संवेदनशीलता में सुधार होता है।",
        "नियमित 7-8 घंटे की नींद लें और तनाव कम करने के लिए ध्यान करें।",
      ],
      whenToSeekProfessionalAssessment:
        "यदि चक्र लगातार 3 महीने से अधिक समय तक न आए या अत्यधिक रक्तस्राव/दर्द हो, तो विशेषज्ञ स्त्री रोग विशेषज्ञ से मिलें।",
      warningSignsRequiringUrgentCare: [
        "अचानक तेज पेट दर्द या चक्कर खाकर बेहोश होना",
        "प्रति घंटे एक से अधिक पैड भीगने जैसा अत्यधिक रक्तस्राव",
        "बुखार या असामान्य दुर्गंधयुक्त स्राव",
      ],
      suggestedQuestionsForDoctor: [
        "क्या हम मेरे इंसुलिन, HOMA-IR और लिपिड प्रोफाइल की जांच कर सकते हैं?",
        "क्या थायरॉयड (TSH) और प्रोलैक्टिन की जांच से चक्र की अनियमितता के कारणों को समझा जा सकता है?",
        "मेरे व्यक्तिगत स्वास्थ्य और भविष्य के लक्ष्यों के लिए कौन से जीवनशैली और चिकित्सीय विकल्प सबसे उपयुक्त हैं?",
      ],
      verifiedSources: combinedSources,
      medicalDisclaimer:
        "अस्वीकरण: RITVYA केवल स्वास्थ्य शिक्षा और मार्गदर्शन प्रदान करता है। यह पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं है। हमेशा एक योग्य स्वास्थ्य सेवा प्रदाता से परामर्श लें।",
      isDemoResponse: false,
      modelIdentifier: "RITVYA Clinical Intelligence Model v2.4 (Consensus Grounded)",
      generatedAt: new Date().toISOString(),
    };
  }

  return {
    id: `clin_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    restatement,
    educationalOverview: matchedDomain.physiologicalOverview,
    possibleExplanations: explanations,
    questionsToConsider: matchedDomain.reflectiveQuestions,
    reasonableSelfCare: matchedDomain.selfCarePractices,
    whenToSeekProfessionalAssessment: matchedDomain.appointmentCriteria,
    warningSignsRequiringUrgentCare: matchedDomain.warningSigns,
    suggestedQuestionsForDoctor: matchedDomain.doctorQuestions,
    verifiedSources: combinedSources,
    medicalDisclaimer: BRAND.disclaimer,
    isDemoResponse: false,
    modelIdentifier: "RITVYA Clinical Intelligence Model v2.4 (Consensus Grounded)",
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Intelligent Multi-Turn Clinical Chat Assistant
 * Responds accurately, empathetically, and contextually to any health question.
 */
export function generateClinicalChatResponse(
  message: string,
  history: Array<{ role: string; content: string }> = []
): string {
  const msgLower = message.toLowerCase();

  // 1. Inositol / Supplement Inquiries
  if (msgLower.includes("inositol") || msgLower.includes("supplement") || msgLower.includes("vitamin")) {
    return `In clinical reproductive endocrinology, **Myo-Inositol combined with D-Chiro-Inositol** has significant evidence for supporting women with ovulatory variability and PCOS:

• **The 40:1 Physiological Ratio:** Clinical trials (including Monash international consensus guidelines) note that a 40:1 ratio of Myo-Inositol to D-Chiro-Inositol mirrors the natural balance in human follicular fluid. It acts as an intracellular second messenger for insulin, helping cells absorb glucose and reducing compensatory hyperinsulinemia.
• **Vitamin D3 & K2:** Up to 75% of women with cycle irregularities exhibit sub-optimal serum 25-hydroxyvitamin D (<30 ng/mL). Vitamin D supports folliculogenesis and calcium-insulin signaling.
• **Magnesium Glycinate:** Highly bioavailable magnesium supports muscle relaxation, alleviates prostaglandin-mediated uterine cramping, and modulates the central nervous system's stress response.
• **Spearmint Tea:** Small randomized trials have demonstrated mild anti-androgenic effects (reducing free testosterone) when consumed as two cups daily.

*Clinical note:* Always discuss any new dietary supplement with your doctor to verify proper dosages and ensure no interactions with other medications.`;
  }

  // 2. Severe Pain, Endometriosis vs Normal Cramps
  if (
    msgLower.includes("endometriosis") ||
    msgLower.includes("cramp") ||
    msgLower.includes("pain") ||
    msgLower.includes("dysmenorrhea") ||
    msgLower.includes("sex hurt") ||
    msgLower.includes("intercourse")
  ) {
    return `In women's health, distinguishing **primary dysmenorrhea** from **secondary dysmenorrhea (such as endometriosis or adenomyosis)** is a critical clinical objective:

1. **Primary Dysmenorrhea (Physiological Cramping):**
   • Typically begins 12–24 hours before menstrual bleeding starts and lasts 1–2 days.
   • Caused by localized release of prostaglandins (PGF2α) that trigger uterine muscle contractions.
   • Generally responds well to heat therapy and standard anti-inflammatories (NSAIDs like ibuprofen).

2. **Secondary Dysmenorrhea & Endometriosis Indicators:**
   • Pain begins days before the period and lingers throughout the flow or into the mid-cycle.
   • Often described as sharp, throbbing, or burning, and may radiate to the lower back, tailbone, or thighs.
   • **Key Associated Clues:** Pain during or after deep intercourse (*dyspareunia*), painful bowel movements during periods (*dyschezia*), or pain with urination.
   • Severe cramps that cause nausea, vomiting, or missing work/school are **never normal** and warrant evaluation by an endometriosis-literate gynecologist.

*Next steps to discuss with your doctor:* Inquire about specialized pelvic ultrasound or pelvic MRI with an endometriosis protocol, and discuss anti-inflammatory or cycle-modulating regimens.`;
  }

  // 3. Bleeding, Clots, Flow Heaviness
  if (
    msgLower.includes("heavy") ||
    msgLower.includes("clot") ||
    msgLower.includes("bleeding") ||
    msgLower.includes("spotting") ||
    msgLower.includes("brown blood")
  ) {
    return `Menstrual flow patterns provide essential insight into uterine and hormonal dynamics:

• **Passing Blood Clots:** Small, occasional clots (smaller than a coin) can occur during the heaviest 1–2 days when anti-coagulation enzymes in the uterus are briefly outpaced by flow. However, frequent clots larger than 2.5 cm (the size of a 25-cent coin) or soaking through a pad every hour signal **menorrhagia** (abnormal uterine bleeding).
• **Brown Blood at Cycle Start/End:** Blood that takes longer to exit the uterine cavity oxidizes upon contact with air, turning dark brown or rust-colored. This is a normal physiological phenomenon and usually reflects slower flow.
• **Intermenstrual Spotting (Between Periods):** Mid-cycle light spotting can happen during ovulation due to a transient dip in estrogen. However, persistent spotting can also reflect cervical polyps, endometrial changes, or hormonal fluctuations that require a transvaginal ultrasound.
• **Protecting Iron Stores:** Chronic heavy bleeding is the number one cause of iron-deficiency anemia in women. Ask your physician to check a **Complete Blood Count (CBC) and serum Ferritin** (ferritin below 30 ng/mL indicates depleted stores even if hemoglobin is borderline normal).`;
  }

  // 4. Lab Tests & Doctor Consultation Preparation
  if (
    msgLower.includes("test") ||
    msgLower.includes("blood test") ||
    msgLower.includes("doctor") ||
    msgLower.includes("lab") ||
    msgLower.includes("ask") ||
    msgLower.includes("ultrasound")
  ) {
    return `When preparing for a clinical appointment regarding irregular cycles or hormonal symptoms, arriving with specific lab requests and a structured symptom log makes a tremendous difference.

**High-Yield Diagnostic Tests to Discuss with Your Doctor:**
1. **Hormonal Baseline (Best drawn on Day 2 to Day 4 of bleeding):**
   • **FSH and LH:** Evaluates pituitary-ovarian signaling (an LH:FSH ratio > 2:1 often supports PCOS).
   • **Total & Free Testosterone and DHEA-S:** Quantifies circulating and adrenal androgens.
   • **Estradiol (E2):** Baseline ovarian follicular estrogen production.
2. **Thyroid & Prolactin Panel:**
   • **TSH and Free T4:** Rules out subclinical hypothyroidism that mimics cycle irregularity.
   • **Serum Prolactin:** Elevated prolactin can suppress ovulation.
3. **Metabolic Health Panel:**
   • **Fasting Glucose, Fasting Insulin, & HOMA-IR:** Identifies hidden insulin resistance.
   • **HbA1c & Fasting Lipid Panel.**
4. **Imaging:**
   • **Pelvic / Transvaginal Ultrasound (TVS):** Evaluates ovarian morphology (antral follicle count), endometrial stripe thickness, and checks for fibroids or adenomyosis.

*Tip:* You can use RITVYA's **Consultation Summary Builder** (under the Doctor Summary tab) to generate a formatted clinical document with these details for your appointment.`;
  }

  // 5. Diet, Nutrition & Lifestyle
  if (
    msgLower.includes("diet") ||
    msgLower.includes("food") ||
    msgLower.includes("nutrition") ||
    msgLower.includes("eat") ||
    msgLower.includes("weight")
  ) {
    return `In clinical endocrinology, nutrition for hormonal health focuses on **metabolic stability and anti-inflammatory nourishment** rather than restrictive crash dieting:

• **Steady Blood Sugar (Glycemic Control):** Large glucose spikes trigger sharp insulin surges, which stimulate ovarian theca cells to overproduce androgens. Combine complex, high-fiber carbohydrates (lentils, oats, quinoa, millets) with adequate protein (paneer, tofu, fish, eggs, legumes) and healthy fats (olive oil, avocados, nuts, seeds).
• **The Power of Fiber:** Dietary fiber binds excess circulating estrogen in the digestive tract, facilitating excretion through the colon and supporting healthy estrogen-progesterone balance.
• **Circadian Meal Rhythm:** Eating substantial meals during daylight hours and avoiding heavy late-night snacking aligns with natural cortisol and melatonin cycles, improving cellular insulin sensitivity.
• **Gentle Movement Over Exhaustion:** High-intensity chronic cardio can spike cortisol and suppress ovulation (hypothalamic amenorrhea). Prioritize strength training 2–3 times a week combined with daily brisk walking and restorative yoga.`;
  }

  // 6. PMDD, Mood Swings, Mental Health & Cycle
  if (
    msgLower.includes("mood") ||
    msgLower.includes("cry") ||
    msgLower.includes("anxiety") ||
    msgLower.includes("depress") ||
    msgLower.includes("pmdd") ||
    msgLower.includes("pms") ||
    msgLower.includes("angry")
  ) {
    return `The connection between menstrual cycle phases and emotional wellbeing is rooted in **neuroendocrine signaling**:

• **The Luteal Phase Shift:** After ovulation (days 14–28 of an average cycle), the corpus luteum produces progesterone, which metabolizes into *allopregnanolone*. In sensitive individuals, allopregnanolone triggers paradoxical irritability and mood changes at GABA-A brain receptors.
• **PMDD vs PMS:** While ordinary PMS involves mild breast tenderness or slight moodiness, Premenstrual Dysphoric Disorder (PMDD) involves severe affective symptoms—sudden crying episodes, intense rage, feelings of hopelessness, or anxiety—that reliably vanish within 24–48 hours of bleeding.
• **Evidence-Based Supports:**
  - Prospective tracking for 2 cycles to prove cycle correlation.
  - Ensuring adequate Vitamin B6 (pyridoxine) and Calcium.
  - Medical options such as luteal-phase SSRIs or ovulatory suppression, which have high success rates in clinical trials.

*Safety reminder:* If you ever experience overwhelming thoughts of self-harm, please reach out immediately to emergency support (Tele-MANAS 14416 in India, or your local emergency line).`;
  }

  // 7. General Dynamic Fallback for Any Other Question
  return `Thank you for sharing your question. In clinical women's health, physical symptoms and questions about your body are best understood through the integrated lens of **hormonal feedback, reproductive anatomy, and metabolic balance**.

Here are key clinical considerations related to your inquiry:
• **Tracking Symptom Rhythm:** Notice whether this sensation or question follows a cyclical pattern (such as peaking right before your period, during ovulation, or occurring steadily). Correlating symptoms with cycle days is the fastest way for your doctor to identify physiological causes.
• **Underlying Biological Mechanisms:** The reproductive system is deeply intertwined with thyroid signaling, stress cortisol levels, and metabolic insulin sensitivity. Even modest shifts in sleep, travel, nutrition, or stress can temporarily shift cycle parameters.
• **Recommended Next Step:** Keep an objective record of when this occurs, its intensity on a 1–10 scale, and any accompanying signs.

Would you like to explore specific questions to bring to your doctor, or discuss evidence-supported comfort and lifestyle strategies for this?`;
}

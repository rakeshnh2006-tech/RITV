import { SafetyRule, SafetyAssessment, EmergencyContact } from "./types";

export const VERIFIED_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    label: "National Emergency Number",
    number: "112",
    region: "India",
    description: "All-in-one emergency helpline for police, fire, and medical dispatch.",
  },
  {
    label: "National Ambulance Service",
    number: "108",
    region: "India",
    description: "Emergency medical response and trauma ambulance services.",
  },
  {
    label: "Maternal & Child Health Express",
    number: "102",
    region: "India",
    description: "Free obstetric and maternity emergency transport.",
  },
  {
    label: "Tele-MANAS Mental Health Helpline",
    number: "14416 / 1800-891-4416",
    region: "India",
    description: "24/7 free mental health counseling and crisis support in multiple languages.",
  },
  {
    label: "Women Helpline",
    number: "1091 / 181",
    region: "India",
    description: "Emergency support for women facing violence, distress, or emergency danger.",
  },
  {
    label: "International Emergency Guidelines",
    number: "Local Emergency (911 / 999 / 112)",
    region: "International",
    description: "Contact your local emergency room or national emergency operator immediately if outside India.",
  },
];

export const SAFETY_RULES: SafetyRule[] = [
  {
    id: "RULE_HEMORRHAGE",
    name: "Severe Vaginal Hemorrhage / Heavy Bleeding",
    severity: "EMERGENCY",
    description: "Dangerously heavy blood loss soaking multiple pads/tampons rapidly with faintness.",
    keywords: [
      "bleeding through pad",
      "soaking through pads",
      "filling a pad every hour",
      "huge blood clots",
      "fainting from bleeding",
      "excessive vaginal bleeding",
      "pale and bleeding heavily",
      "hemorrhage",
      "खूब खून बह रहा है",
      "खून की उल्टी",
      "रक्तस्राव",
      "ಅತಿಯಾದ ರಕ್ತಸ್ರಾವ",
    ],
    patterns: [
      /soak(ing)?\s+(through\s+)?(two|2|\d+)\s+(large\s+)?pads?\s+(an|every|\/)\s*hour/i,
      /blood\s+clots?\s+(as\s+big\s+as|larger\s+than)\s+(a\s+)?(lemon|egg|golf\s+ball)/i,
      /passing\s+massive\s+clots/i,
      /dizzy\s+(and|from)\s+heavy\s+bleed/i,
      /bleeding\s+won'?t\s+stop/i,
    ],
    recommendedActions: [
      "Seek emergency medical evaluation at the nearest hospital emergency room immediately.",
      "Call emergency services (112 / 108 in India, or your local emergency line).",
      "Lie flat with feet slightly elevated while awaiting medical help.",
      "Do NOT insert tampons or take blood-thinning painkillers like aspirin without clinical guidance.",
    ],
    clinicalRationale:
      "Rapid acute vaginal blood loss can lead to hypovolemic shock, requiring immediate intravenous access, diagnostic ultrasound, and hemodynamic stabilization.",
  },
  {
    id: "RULE_ECTOPIC_ACUTE_ABDOMEN",
    name: "Acute Severe Pelvic Pain / Potential Ruptured Ectopic or Torsion",
    severity: "EMERGENCY",
    description: "Sudden sharp lower pelvic agony, shoulder tip ache, feeling faint or dizzy.",
    keywords: [
      "sudden sharp pelvic pain",
      "severe lower right abdomen pain",
      "severe lower left abdomen pain",
      "shoulder tip pain",
      "fainted with abdominal pain",
      "missed period severe pain",
      "positive pregnancy test agonizing pain",
      "ovarian torsion",
      "ectopic pregnancy",
      "pet dard behosh",
      "ತೀವ್ರ ಹೊಟ್ಟೆ ನೋವು",
    ],
    patterns: [
      /severe\s+(sharp|stabbing|unbearable)\s+(pelvic|lower\s+abdom(en|inal))\s+pain/i,
      /shoulder\s+tip\s+pain\s+(with|and)\s+(abdom|pelvic)/i,
      /(faint(ed|ing)?|blacked\s+out)\s+(with|from)\s+(stomach|pelvic|cramp)/i,
      /positive\s+pregnancy\s+test.*(sharp|severe|stabbing)\s+pain/i,
    ],
    recommendedActions: [
      "Go to the nearest emergency room immediately. Ruptured ectopic pregnancy and ovarian torsion are surgical emergencies.",
      "Do not eat or drink anything in case emergency surgical intervention is required.",
      "Notify emergency staff if there is any possibility of pregnancy.",
    ],
    clinicalRationale:
      "A ruptured ectopic pregnancy or twisted ovary (adnexal torsion) can cause rapid internal hemorrhage or tissue ischemia, risking fertility and life within hours.",
  },
  {
    id: "RULE_CARDIAC_CHEST_PAIN",
    name: "Acute Chest Pain / Cardiovascular Crisis",
    severity: "EMERGENCY",
    description: "Crushing chest discomfort, shortness of breath, pain radiating to left jaw or arm.",
    keywords: [
      "chest pain",
      "crushing chest",
      "chest tightness",
      "pain radiating to left arm",
      "shortness of breath with chest pain",
      "chhati me dard",
      "ಎದೆ ನೋವು",
    ],
    patterns: [
      /crushing\s+(chest|substernal)\s+pain/i,
      /chest\s+(pain|pressure|tightness).*(jaw|left\s+arm|shoulder|neck)/i,
      /cannot\s+breathe.*chest\s+pain/i,
    ],
    recommendedActions: [
      "Call emergency medical dispatch (112 or 108 in India) immediately.",
      "Sit upright and rest quietly while awaiting emergency responders.",
      "Do not drive yourself to the clinic; wait for an emergency ambulance.",
    ],
    clinicalRationale:
      "Atypical acute coronary syndromes in women frequently present with pressure, shortness of breath, or epigastric discomfort.",
  },
  {
    id: "RULE_PREECLAMPSIA_PREGNANCY",
    name: "Severe Preeclampsia / Obstetric Warning Signs",
    severity: "EMERGENCY",
    description: "Pregnant with sudden severe headache, blurred vision, epigastric pain, or swelling.",
    keywords: [
      "pregnant severe headache",
      "spots in vision pregnant",
      "blurred vision pregnant",
      "sudden swelling pregnancy",
      "baby stopped moving",
      "seizure while pregnant",
    ],
    patterns: [
      /pregnant.*(sudden|severe)\s+headache/i,
      /pregnant.*(visual\s+disturb|seeing\s+spots|blurred\s+vision)/i,
      /pregnant.*(water\s+broke|fluid\s+gush|leaking\s+fluid)/i,
      /pregnant.*(baby|fetal)\s+(has\s+not\s+moved|stopped\s+moving)/i,
    ],
    recommendedActions: [
      "Go to an obstetric emergency unit or labor ward immediately.",
      "Call emergency ambulance service (108 / 102 in India).",
      "Do not delay for an outpatient appointment.",
    ],
    clinicalRationale:
      "Preeclampsia can progress rapidly to eclampsia (seizures) and placental abruption, threatening both maternal and fetal survival.",
  },
  {
    id: "RULE_CRISIS_SELF_HARM",
    name: "Psychiatric Crisis / Thoughts of Self-Harm",
    severity: "EMERGENCY",
    description: "Active intentions or urges of self-harm, ending life, or overwhelming psychological distress.",
    keywords: [
      "suicide",
      "want to die",
      "kill myself",
      "end my life",
      "self harm",
      "cutting myself",
      "no reason to live",
      "mar jana chahta",
      "marne ka man",
      "ಆತ್ಮಹತ್ಯೆ",
    ],
    patterns: [
      /(want|wish)\s+to\s+(die|end\s+my\s+life|kill\s+myself)/i,
      /better\s+off\s+dead/i,
      /thinking\s+about\s+suicide/i,
      /hurting\s+myself/i,
    ],
    recommendedActions: [
      "You are not alone, and supportive, confidential help is available right now.",
      "In India, call Tele-MANAS toll-free at 14416 or 1800-891-4416 for 24/7 mental health crisis support.",
      "Call National Emergency Services at 112.",
      "Reach out immediately to a trusted family member, close friend, or crisis counselor.",
    ],
    clinicalRationale:
      "Acute suicidal ideation and distress require immediate human crisis intervention and compassionate professional support.",
  },
  {
    id: "RULE_NEUROLOGICAL_DEFICIT",
    name: "Acute Neurological Deficit / Stroke Indicators",
    severity: "EMERGENCY",
    description: "Sudden facial asymmetry, arm weakness, slurred speech, or explosive thunderclap headache.",
    keywords: [
      "slurred speech",
      "face drooping",
      "cannot move arm",
      "sudden thunderclap headache",
      "worst headache of my life",
      "sudden loss of vision",
    ],
    patterns: [
      /sudden(ly)?\s+(cannot|unable\s+to)\s+speak/i,
      /face\s+is\s+drooping/i,
      /worst\s+headache\s+of\s+(my\s+)?life/i,
      /thunderclap\s+headache/i,
    ],
    recommendedActions: [
      "Call emergency services (112 or 108) immediately for rapid stroke assessment.",
      "Note the exact time symptoms began.",
      "Do not take aspirin or sleep it off.",
    ],
    clinicalRationale:
      "Rapid time-to-treatment in acute stroke or subarachnoid hemorrhage is paramount for brain tissue preservation.",
  },
  {
    id: "RULE_SEPSIS_INFECTION",
    name: "High-Grade Infection / Systemic Red Flags",
    severity: "URGENT",
    description: "High fever with neck rigidity, confusion, foul-smelling vaginal discharge, or post-procedure fever.",
    keywords: [
      "high fever and stiff neck",
      "foul smelling discharge with fever",
      "fever after abortion",
      "fever after delivery",
      "fever after d&c",
      "chills shaking uncontrollably",
    ],
    patterns: [
      /fever\s+(and|with)\s+(stiff\s+neck|confusion|disorientation)/i,
      /fever.*(after|following).*(delivery|abortion|d&c|miscarriage|surgery)/i,
      /(foul|offensive|rotten).*discharge.*(with|and|accompanied by)?.*fever/i,
      /fever.*(with|and)?.*(foul|offensive|rotten).*discharge/i,
    ],
    recommendedActions: [
      "Seek prompt medical assessment at an urgent care center or emergency clinic today.",
      "Notify the healthcare provider of any recent gynecological procedures or childbirth.",
      "Stay hydrated and avoid unprescribed antibiotics.",
    ],
    clinicalRationale:
      "Pelvic inflammatory disease (PID), postpartum endometritis, and systemic infections require timely clinical diagnosis and culture-directed therapy.",
  },
];

/**
 * Deterministic Safety Evaluator
 * Runs before any AI response and again before presenting output.
 */
export function evaluateSafety(text: string): SafetyAssessment {
  if (!text || typeof text !== "string") {
    return {
      isSafeForEducation: true,
      severity: "ROUTINE",
      matchedRuleIds: [],
      matchedRuleNames: [],
      rationale: "No alarming medical red flags detected.",
      recommendedActions: [],
      emergencyContacts: [],
      timestamp: new Date().toISOString(),
    };
  }

  const normalized = text.toLowerCase().trim();
  const matchedRules: SafetyRule[] = [];

  for (const rule of SAFETY_RULES) {
    let matched = false;

    // 1. Keyword check
    for (const kw of rule.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        matched = true;
        break;
      }
    }

    // 2. Regex pattern check
    if (!matched) {
      for (const pattern of rule.patterns) {
        if (pattern.test(text)) {
          matched = true;
          break;
        }
      }
    }

    if (matched) {
      matchedRules.push(rule);
    }
  }

  // If any rule is EMERGENCY, escalate to EMERGENCY
  const hasEmergency = matchedRules.some((r) => r.severity === "EMERGENCY");
  const hasUrgent = matchedRules.some((r) => r.severity === "URGENT");

  if (hasEmergency) {
    const actions = Array.from(
      new Set(matchedRules.flatMap((r) => r.recommendedActions))
    );
    return {
      isSafeForEducation: false,
      severity: "EMERGENCY",
      matchedRuleIds: matchedRules.map((r) => r.id),
      matchedRuleNames: matchedRules.map((r) => r.name),
      rationale:
        "The description contains symptoms that indicate a potential medical emergency requiring immediate clinical attention.",
      recommendedActions: actions,
      emergencyContacts: VERIFIED_EMERGENCY_CONTACTS,
      timestamp: new Date().toISOString(),
    };
  }

  if (hasUrgent) {
    const actions = Array.from(
      new Set(matchedRules.flatMap((r) => r.recommendedActions))
    );
    return {
      isSafeForEducation: false,
      severity: "URGENT",
      matchedRuleIds: matchedRules.map((r) => r.id),
      matchedRuleNames: matchedRules.map((r) => r.name),
      rationale:
        "These symptoms warrant prompt same-day medical evaluation by a licensed healthcare professional.",
      recommendedActions: actions,
      emergencyContacts: VERIFIED_EMERGENCY_CONTACTS,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    isSafeForEducation: true,
    severity: "ROUTINE",
    matchedRuleIds: [],
    matchedRuleNames: [],
    rationale: "No critical emergency indicators identified. Safe for supportive health education.",
    recommendedActions: [],
    emergencyContacts: [],
    timestamp: new Date().toISOString(),
  };
}

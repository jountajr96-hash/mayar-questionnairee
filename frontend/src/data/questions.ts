import { QuestionSection } from "@/types/questionnaire";

export const questionnaireSections: QuestionSection[] = [
  {
    id: "identification",
    title: "1. Identification de la population - Profil",
    questions: [
      {
        id: "age",
        text: "Âge :",
        type: "radio",
        options: [
          { label: "22-30", value: "22-30" },
          { label: "31-40", value: "31-40" },
          { label: "41-50", value: "41-50" },
          { label: "51-60", value: "51-60" },
        ],
      },
      {
        id: "genre",
        text: "Genre :",
        type: "radio",
        options: [
          { label: "Masculin", value: "masculin" },
          { label: "Féminin", value: "feminin" },
        ],
      },
      {
        id: "experience",
        text: "Années d'expérience professionnelle :",
        type: "radio",
        options: [
          { label: "1–5 ans", value: "1-5" },
          { label: "5–10 ans", value: "5-10" },
          { label: "10–15 ans", value: "10-15" },
          { label: "15–20 ans", value: "15-20" },
          { label: "Plus de 20 ans", value: "20+" },
        ],
      },
      {
        id: "grade",
        text: "Grade :",
        type: "radio",
        options: [
          { label: "Infirmier principal", value: "principal" },
          { label: "Infirmier major", value: "major" },
          { label: "Infirmier Général", value: "general" },
          { label: "Autre", value: "autre" },
        ],
      },
      {
        id: "service",
        text: "Service :",
        type: "radio",
        options: [
          { label: "Hématologie", value: "hematologie" },
          { label: "Pédiatrie", value: "pediatrie" },
          { label: "Médecine", value: "medecine" },
          { label: "Urgences", value: "urgences" },
        ],
      },
      {
        id: "horaire",
        text: "Horaire de travail :",
        type: "radio",
        options: [
          { label: "Équipe de jour", value: "jour" },
          { label: "Équipe de nuit", value: "nuit" },
        ],
      },
    ],
  },
  {
    id: "experience_thalassemie",
    title: "2. Expérience avec la thalassémie",
    questions: [
      {
        id: "contact_patient",
        text: "Avez-vous déjà été en contact (prise en charge, soins, transfusion) avec un patient atteint de β-thalassémie splénectomisé ?",
        type: "text",
      },
    ],
  },
  {
    id: "connaissances",
    title: "3. Connaissances théoriques",
    questions: [
      {
        id: "caracteristiques",
        text: "Caractéristiques de bêta-thalassémie majeur :",
        type: "radio",
        options: [
          { label: "Hétérozygote", value: "heterozygote" },
          { label: "Homozygote", value: "homozygote" },
        ],
      },
      {
        id: "signes_vus",
        text: "Quelles sont les signes de β-thalassémie que vous avez vu ?",
        type: "text",
      },
      {
        id: "splenomegalie",
        text: "Présence de splénomégalie :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "dysmorphie",
        text: "Dysmorphie faciale :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "retard_staturo",
        text: "Retard staturo-pondéral :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "retard_pubertaire",
        text: "Retard pubertaire :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "anemie_regenerative",
        text: "Anémie régénérative ou arégénérative :",
        type: "radio",
        options: [
          { label: "Régénérative", value: "regenerative" },
          { label: "Arégénérative", value: "aregenerative" },
        ],
      },
      {
        id: "anemie_corpusculaire",
        text: "Corpusculaire ou extra-corpusculaire :",
        type: "radio",
        options: [
          { label: "Corpusculaire", value: "corpusculaire" },
          { label: "Extra-corpusculaire", value: "extra_corpusculaire" },
        ],
      },
      {
        id: "anemie_taille",
        text: "Microcytaire ou macrocytaire :",
        type: "radio",
        options: [
          { label: "Microcytaire", value: "microcytaire" },
          { label: "Macrocytaire", value: "macrocytaire" },
        ],
      },
      {
        id: "anemie_chromie",
        text: "Hypochrome ou normochrome :",
        type: "radio",
        options: [
          { label: "Hypochrome", value: "hypochrome" },
          { label: "Normochrome", value: "normochrome" },
        ],
      },
      {
        id: "anemie_hemolytique",
        text: "Hémolytique ou non hémolytique :",
        type: "radio",
        options: [
          { label: "Hémolytique", value: "hemolytique" },
          { label: "Non hémolytique", value: "non_hemolytique" },
        ],
      },
      {
        id: "transferrine",
        text: "Transferrine diminuée :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "coeff_saturation",
        text: "Coefficient de saturation diminué :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "ferritine_elevee",
        text: "Ferritine élevée :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
    ],
  },
  {
    id: "complications",
    title: "4. Complications",
    questions: [
      {
        id: "complications_frequentes",
        text: "Les complications les plus fréquentes :",
        type: "text",
      },
      {
        id: "fievre",
        text: "Fièvre > 38,5°C :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "infection_grave",
        text: "Infection grave :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "thrombose",
        text: "Thrombose :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "osteoporose",
        text: "Ostéoporose :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "hypertension_pulmonaire",
        text: "Hypertension pulmonaire :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "surcharge_martiale",
        text: "Surcharge martiale :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "splenomegalie_comp",
        text: "Splénomégalie :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "hospitalisations",
        text: "Hospitalisations répétées :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "duree_hospitalisation",
        text: "Durée moyenne d'hospitalisation par admission :",
        type: "radio",
        options: [
          { label: "< 24h", value: "<24h" },
          { label: "1–3 jours", value: "1-3j" },
          { label: "4–7 jours", value: "4-7j" },
          { label: "> 7 jours", value: ">7j" },
        ],
      },
    ],
  },
  {
    id: "examens_bio",
    title: "5. Examens biologiques",
    questions: [
      {
        id: "frequence_nfs",
        text: "Fréquence NFS :",
        type: "radio",
        options: [
          { label: "Avant chaque transfusion", value: "transfusion" },
          { label: "Mensuel", value: "mensuel" },
          { label: "Trimestriel", value: "trimestriel" },
          { label: "Annuel", value: "annuel" },
        ],
      },
      {
        id: "frequence_ferritine",
        text: "Fréquence Ferritine :",
        type: "radio",
        options: [
          { label: "Avant chaque transfusion", value: "transfusion" },
          { label: "Mensuel", value: "mensuel" },
          { label: "Trimestriel", value: "trimestriel" },
          { label: "Annuel", value: "annuel" },
        ],
      },
      {
        id: "frequence_bilan_hepatique",
        text: "Fréquence Bilan hépatique :",
        type: "radio",
        options: [
          { label: "Avant chaque transfusion", value: "transfusion" },
          { label: "Trimestriel", value: "trimestriel" },
          { label: "Annuel", value: "annuel" },
        ],
      },
      {
        id: "frequence_tp_tca",
        text: "Fréquence TP/TCA :",
        type: "radio",
        options: [
          { label: "Avant chaque transfusion", value: "transfusion" },
          { label: "Trimestriel", value: "trimestriel" },
          { label: "Annuel", value: "annuel" },
        ],
      },
    ],
  },
  {
    id: "examens_radio",
    title: "6. Examens radiologiques",
    questions: [
      {
        id: "examens_prescrits",
        text: "Quels examens radiologiques sont prescrits pour le suivi ?",
        type: "checkbox",
        options: [
          { label: "Échographie abdominale", value: "echo_abdo" },
          { label: "IRM hépatique/cardiaque", value: "irm" },
          { label: "Radiographie osseuse", value: "radio_osseuse" },
          { label: "Échocardiographie", value: "echocardiographie" },
          { label: "DEXA (densitométrie osseuse)", value: "dexa" },
        ],
      },
    ],
  },
  {
    id: "traitement",
    title: "6. Traitements administrés",
    questions: [
      {
        id: "traitements_recus",
        text: "Quels traitements reçoit le patient ?",
        type: "checkbox",
        options: [
          { label: "Transfusions sanguines régulières", value: "transfusions" },
          { label: "Chélation du fer (Desféral®, Exjade®, Ferriprox®)", value: "chelation" },
          { label: "Antibioprophylaxie post-splénectomie", value: "antibioprophylaxie" },
          { label: "Vaccinations (pneumocoque, méningocoque, H. influenzae)", value: "vaccinations" },
          { label: "Acide folique", value: "acide_folique" },
        ],
      },
    ],
  },
  {
    id: "suivi_infirmier",
    title: "II. Suivi infirmier",
    questions: [
      {
        id: "frequence_controles",
        text: "Fréquence des contrôles infirmiers :",
        type: "radio",
        options: [
          { label: "À chaque transfusion", value: "transfusion" },
          { label: "1 fois/mois", value: "mensuel" },
          { label: "Rarement", value: "rarement" },
        ],
      },
      {
        id: "surveillance_temperature",
        text: "Surveillance - Température :",
        type: "radio",
        options: [
          { label: "Toujours", value: "toujours" },
          { label: "Parfois", value: "parfois" },
          { label: "Jamais", value: "jamais" },
        ],
      },
      {
        id: "surveillance_ta",
        text: "Surveillance - TA :",
        type: "radio",
        options: [
          { label: "Toujours", value: "toujours" },
          { label: "Parfois", value: "parfois" },
          { label: "Jamais", value: "jamais" },
        ],
      },
      {
        id: "surveillance_operation",
        text: "Surveillance - Inspection du point d'opération :",
        type: "radio",
        options: [
          { label: "Toujours", value: "toujours" },
          { label: "Parfois", value: "parfois" },
          { label: "Jamais", value: "jamais" },
        ],
      },
      {
        id: "surveillance_fatigue",
        text: "Surveillance - Bilan de fatigue :",
        type: "radio",
        options: [
          { label: "Toujours", value: "toujours" },
          { label: "Parfois", value: "parfois" },
          { label: "Jamais", value: "jamais" },
        ],
      },
    ],
  },
  {
    id: "prevention",
    title: "7. Mesures de prévention",
    questions: [
      {
        id: "vaccins_obligatoires",
        text: "Quels vaccins sont obligatoires ?",
        type: "checkbox",
        options: [
          { label: "Pneumocoque", value: "pneumocoque" },
          { label: "Méningocoque", value: "meningocoque" },
          { label: "Haemophilus influenzae type b", value: "haemophilus" },
          { label: "Grippe annuelle", value: "grippe" },
          { label: "Hépatite B", value: "hepatite_b" },
        ],
      },
      {
        id: "verification_carnet",
        text: "Vérifiez-vous le carnet vaccinal ?",
        type: "radio",
        options: [
          { label: "Toujours", value: "toujours" },
          { label: "Parfois", value: "parfois" },
          { label: "Jamais", value: "jamais" },
        ],
      },
      {
        id: "antibioprophylaxie",
        text: "Le patient reçoit une antibioprophylaxie ?",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
          { label: "Je ne sais pas", value: "nsp" },
        ],
      },
      {
        id: "observance_antibiotique",
        text: "Vérifiez-vous l'observance de l'antibiotique ?",
        type: "radio",
        options: [
          { label: "Toujours", value: "toujours" },
          { label: "Parfois", value: "parfois" },
          { label: "Jamais", value: "jamais" },
        ],
      },
      {
        id: "surveillance_plaquettes",
        text: "Surveillez-vous la numération plaquettaire ?",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
    ],
  },
  {
    id: "splenectomie",
    title: "8. La splénectomie",
    questions: [
      {
        id: "besoins_transfusionnels",
        text: "Augmentation significative des besoins transfusionnels :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "cytopenies",
        text: "Cytopénies symptomatiques :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "symptomes_mecaniques",
        text: "Symptômes mécaniques :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "echec_alternatives",
        text: "Échec ou contre-indication des thérapies alternatives :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "risque_infectieux",
        text: "Risque infectieux accru :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "prophylaxie_long_cours",
        text: "Prophylaxie antibiotique au long cours :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "risque_thrombotique",
        text: "Risque thrombotique :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "surcharge_fer_aggravation",
        text: "Aggravation paradoxale de la surcharge en fer :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
    ],
  },
  {
    id: "connaissances_infirmier",
    title: "8. Connaissances de l'infirmier",
    questions: [
      {
        id: "difficultes_prevention",
        text: "Rencontrez-vous des difficultés pour appliquer la prévention ?",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "splenectomie_risque_infection",
        text: "La splénectomie augmente le risque d'infection grave :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "fievre_urgence",
        text: "La fièvre chez un patient splénectomisé est une urgence vitale :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
      {
        id: "vaccins_obligatoires_connaissance",
        text: "Les vaccins post-splénectomie sont obligatoires :",
        type: "radio",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ],
      },
    ],
  },
];

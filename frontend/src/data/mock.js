// Mock data for Spacio+ cleaning service website

export const companyInfo = {
  name: "Spacio+",
  tagline: "Des espaces impeccables, au meilleur prix",
  description: "Service de nettoyage résidentiel et commercial dans la région Ottawa-Gatineau",
  address: "15 Rue Jos-Montferrand, Gatineau, QC, J8X 0C2",
  phone: "(819) 555-0123",
  email: "contact@spacioplus.ca",
  website: "www.spacioplus.ca",
  serviceAreas: ["Gatineau", "Hull", "Aylmer", "Chelsea", "Cantley", "Ottawa"]
};

export const services = [
  {
    id: 1,
    title: "Nettoyage Résidentiel",
    description: "Entretien régulier et ponctuel pour votre domicile",
    features: ["Nettoyage hebdomadaire/mensuel", "Grand ménage", "Produits écologiques", "Personnel formé"],
    price: "À partir de 28$/h",
    icon: "Home"
  },
  {
    id: 2,
    title: "Nettoyage Commercial",
    description: "Solutions professionnelles pour bureaux et commerces",
    features: ["Nettoyage en dehors des heures", "Bureaux et commerces", "Désinfection renforcée", "Contrats flexibles"],
    price: "À partir de 0,20$/pi²",
    icon: "Building"
  },
  {
    id: 3,
    title: "Nettoyage Après Travaux",
    description: "Remise en état après rénovations ou construction",
    features: ["Enlèvement poussière", "Nettoyage fenêtres", "Surfaces spécialisées", "Prêt à habiter"],
    price: "Devis personnalisé",
    icon: "HardHat"
  },
  {
    id: 4,
    title: "Assainissement",
    description: "Services de désinfection et assainissement",
    features: ["Désinfection complète", "Produits certifiés", "Normes sanitaires", "Intervention rapide"],
    price: "Devis sur mesure",
    icon: "Shield"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Marie Dubois",
    location: "Hull, QC",
    rating: 5,
    text: "Service exceptionnel ! L'équipe de Spacio+ est ponctuelle, professionnelle et fait un travail impeccable. Je recommande vivement !",
    service: "Nettoyage résidentiel"
  },
  {
    id: 2,
    name: "Jean-Pierre Martin",
    location: "Gatineau, QC",
    rating: 5,
    text: "Nous utilisons Spacio+ pour nos bureaux depuis 6 mois. Excellent rapport qualité-prix et toujours à l'écoute de nos besoins.",
    service: "Nettoyage commercial"
  },
  {
    id: 3,
    name: "Sophie Lapointe",
    location: "Aylmer, QC",
    rating: 5,
    text: "Après nos rénovations, Spacio+ a transformé notre maison. Travail minutieux et respectueux de l'environnement.",
    service: "Nettoyage après travaux"
  }
];

export const features = [
  {
    title: "Qualité Garantie",
    description: "Contrôle qualité systématique et satisfaction garantie",
    icon: "CheckCircle"
  },
  {
    title: "Produits Écologiques",
    description: "Produits respectueux de l'environnement et de votre santé",
    icon: "Leaf"
  },
  {
    title: "Service Bilingue",
    description: "Équipe bilingue français-anglais pour mieux vous servir",
    icon: "MessageCircle"
  },
  {
    title: "Devis Gratuit",
    description: "Évaluation gratuite et transparente de vos besoins",
    icon: "Calculator"
  }
];

export const pricingPlans = [
  {
    name: "Résidentiel Standard",
    price: "32",
    period: "/heure",
    description: "Parfait pour l'entretien régulier de votre domicile",
    features: [
      "Nettoyage complet",
      "Produits écologiques inclus",
      "Équipe formée et assurée",
      "Satisfaction garantie"
    ],
    popular: false
  },
  {
    name: "Commercial",
    price: "38",
    period: "/heure",
    description: "Solutions adaptées aux entreprises et commerces",
    features: [
      "Horaires flexibles",
      "Nettoyage professionnel",
      "Désinfection incluse",
      "Contrats sur mesure",
      "Suivi qualité régulier"
    ],
    popular: true
  },
  {
    name: "Après Travaux",
    price: "Devis",
    period: "personnalisé",
    description: "Nettoyage spécialisé post-construction/rénovation",
    features: [
      "Évaluation sur place",
      "Équipement spécialisé",
      "Enlèvement débris légers",
      "Finition impeccable"
    ],
    popular: false
  }
];

export const contactInfo = {
  address: companyInfo.address,
  phone: companyInfo.phone,
  email: companyInfo.email,
  hours: {
    weekdays: "8h00 - 18h00",
    weekend: "9h00 - 15h00"
  },
  socialMedia: {
    facebook: "https://facebook.com/spacioplus",
    instagram: "https://instagram.com/spacioplus"
  }
};
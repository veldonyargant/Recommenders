# 📋 Guide d'Installation et Configuration - Spacio+

## ✅ **CE QUI EST DÉJÀ FAIT**

### **Site Web Complet** ✅
- ✅ Site web moderne avec logo officiel Spacio+
- ✅ Formulaire de devis identique à votre Google Forms
- ✅ Email configuré: contact@spacioplus.ca
- ✅ Zones de service: Gatineau • Hull • Aylmer • Chelsea • Cantley • Ottawa
- ✅ Couleurs alignées avec le logo (bleu royal + vert vif)
- ✅ Texte 100% français (anglais retiré)

### **Backend Fonctionnel** ✅
- ✅ API REST pour recevoir les formulaires
- ✅ Base de données MongoDB pour stocker les demandes
- ✅ Validation complète des données
- ✅ Dashboard administrateur à `/admin`
- ✅ Export CSV des données

### **Système d'Email Préparé** ✅
- ✅ Code prêt pour notifications automatiques
- ✅ Email client: confirmation de réception
- ✅ Email équipe: notification à spacioplusservices@gmail.com
- ⚠️ **NÉCESSITE CONFIGURATION** (voir ci-dessous)

---

## 🚀 **PROCHAINES ÉTAPES RECOMMANDÉES**

### **Étape 1: Configuration Email (15 min)**

#### A. Configuration Gmail App Password
1. **Connectez-vous à votre Gmail spacioplusservices@gmail.com**
2. **Allez dans Sécurité > Authentification à 2 facteurs** (activez si pas fait)
3. **Créez un "Mot de passe d'application":**
   - Sécurité > Mots de passe d'applications
   - Sélectionnez "Mail" et "Autre (nom personnalisé)"
   - Nommez: "Site Web Spacio+"
   - **Copiez le mot de passe généré (16 caractères)**

#### B. Configuration Backend
1. **Modifiez le fichier `/app/backend/.env`:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=spacioplusservices@gmail.com
SMTP_PASSWORD=VOTRE_MOT_PASSE_APP_16_CARACTERES
NOTIFICATION_EMAIL=spacioplusservices@gmail.com
EMAIL_FROM=noreply@spacioplus.ca
```

2. **Redémarrez le backend:**
```bash
sudo supervisorctl restart backend
```

#### C. Test des Notifications
- Remplissez le formulaire sur le site
- Vérifiez votre boîte spacioplusservices@gmail.com
- Le client devrait aussi recevoir un email de confirmation

---

### **Étape 2: Accès aux Données (Immédiat)**

#### A. Dashboard Web
- **URL:** `https://votre-site.com/admin`
- **Fonctionnalités:**
  - Voir toutes les demandes de devis
  - Rechercher par nom/email/adresse
  - Exporter en CSV
  - Répondre directement par email/téléphone

#### B. API REST (Pour développeurs)
- **Endpoint:** `https://votre-site.com/api/contact`
- **Format:** JSON avec toutes les données du formulaire

---

### **Étape 3: Hébergement (30-60 min)**

#### **Option A: Hébergement Full-Stack (Recommandé)**

**Railway.app (Le plus simple):**
1. Créer compte sur railway.app
2. Connecter votre repository GitHub
3. Déployer automatiquement
4. **Coût:** ~20-30$ CAD/mois
5. **Avantages:** Déploiement automatique, base de données incluse

**Vercel + PlanetScale:**
1. Frontend sur Vercel (gratuit)
2. Backend + DB sur PlanetScale
3. **Coût:** ~15-25$ CAD/mois

#### **Option B: VPS Traditionnel**

**DigitalOcean Droplet:**
1. Créer un droplet Ubuntu (10$ CAD/mois)
2. Installer Docker + Docker Compose
3. Déployer l'application
4. **Avantages:** Contrôle total, moins cher

#### **Option C: Site Statique (Alternative)**
Si vous ne voulez pas de base de données:
- Formulaire → Email direct via Formspree
- Hébergement gratuit sur Netlify/Vercel
- **Coût:** 0-10$ CAD/mois
- **Inconvénient:** Pas de dashboard admin

---

## 📊 **FONCTIONNALITÉS DISPONIBLES**

### **Pour les Clients:**
- ✅ Formulaire de devis identique à Google Forms
- ✅ Confirmation automatique par email
- ✅ Interface responsive (mobile + desktop)
- ✅ Validation en temps réel

### **Pour l'Équipe Spacio+:**
- ✅ Notification email instantanée des nouvelles demandes
- ✅ Dashboard web pour gérer les contacts
- ✅ Export CSV pour suivis externes
- ✅ Liens directs email/téléphone pour réponse rapide

### **Données Collectées (Exactement comme Google Forms):**
- Informations client (nom, email, téléphone, adresse facturation)
- Fréquence du service souhaité
- Types de propriété (sélection multiple)
- Détails propriété (superficie, adresse service, nombre salles)
- Préférences (sous-sol, fenêtres)
- Message libre du client

---

## 🔧 **MAINTENANCE**

### **Sauvegardes Automatiques**
- Base de données sauvegardée automatiquement
- Export CSV régulier recommandé

### **Monitoring**
- Logs d'envoi email disponibles
- Dashboard admin pour suivre les volumes

### **Mises à jour**
- Templates email facilement modifiables
- Ajout de nouveaux champs possible

---

## 💡 **BÉNÉFICES IMMÉDIATS**

1. **✅ Professionnalisme:** Site web moderne vs Google Forms
2. **✅ Automatisation:** Notifications automatiques
3. **✅ Contrôle:** Vos données sur votre système
4. **✅ Flexibilité:** Modifications faciles du formulaire
5. **✅ Analytics:** Statistiques des demandes par service

---

## 🆘 **SUPPORT**

### **Configuration Email**
Si problème avec Gmail:
- Vérifier authentification 2 facteurs activée
- Utiliser le mot de passe d'application (pas votre mot de passe normal)
- Tester avec un autre service email si nécessaire

### **Hébergement**
- Railway.app a excellent support français
- DigitalOcean a documentation complète
- Nous pouvons assister pour la configuration

### **Modifications**
- Ajout de nouveaux champs au formulaire
- Modification des templates email
- Nouvelles fonctionnalités dashboard

---

**🚀 Prêt à mettre en production ! La solution est complète et fonctionnelle.**
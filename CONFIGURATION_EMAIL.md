# Configuration Email pour Spacio+

## 📧 Options de Configuration SMTP

Vous avez plusieurs options pour configurer les notifications email :

### Option 1: Gmail (Gratuit - Recommandé)

#### Étapes de configuration Gmail :

1. **Créer un compte Gmail dédié** (ou utiliser un existant)
   - Exemple: `spacioplusgatineau@gmail.com`

2. **Activer l'authentification à 2 facteurs**
   - Aller dans Compte Google > Sécurité
   - Activer la "Validation en deux étapes"

3. **Générer un mot de passe d'application**
   - Dans Sécurité > Mots de passe d'applications
   - Sélectionner "Mail" et "Autre"
   - Copier le mot de passe généré (16 caractères)

4. **Configurer le fichier .env**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=spacioplusgatineau@gmail.com
   SMTP_PASSWORD=xxxx xxxx xxxx xxxx  # Mot de passe d'application
   NOTIFICATION_EMAIL=spacioplusservices@gmail.com
   EMAIL_FROM=noreply@spacioplus.ca
   ```

### Option 2: Outlook/Hotmail (Gratuit)

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=votre-email@outlook.com
SMTP_PASSWORD=votre-mot-de-passe
NOTIFICATION_EMAIL=spacioplusservices@gmail.com
EMAIL_FROM=noreply@spacioplus.ca
```

### Option 3: Services Professionnels (Payant)

#### SendGrid (Recommandé pour production)
- **Avantages**: Fiable, statistiques détaillées, réputation IP
- **Prix**: Gratuit jusqu'à 100 emails/jour, puis $14.95/mois
- **Configuration**:
  ```env
  SMTP_HOST=smtp.sendgrid.net
  SMTP_PORT=587
  SMTP_USER=apikey
  SMTP_PASSWORD=votre-api-key-sendgrid
  ```

#### Mailgun
- **Avantages**: API puissante, bonne délivrabilité
- **Prix**: Gratuit 10,000 emails/mois pendant 3 mois

## 🚀 Instructions d'installation

### Étape 1: Créer le fichier .env

```bash
# Dans le dossier backend
cp .env.example .env
```

### Étape 2: Éditer le fichier .env

Remplacer les valeurs par vos vraies informations :

```env
# Configuration de base (ne pas modifier)
MONGO_URL=mongodb://localhost:27017
DB_NAME=spacio_db

# Configuration email SMTP
SMTP_HOST=smtp.gmail.com  # ou autre
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-app-password
NOTIFICATION_EMAIL=spacioplusservices@gmail.com
EMAIL_FROM=noreply@spacioplus.ca
```

### Étape 3: Redémarrer le backend

```bash
sudo supervisorctl restart backend
```

### Étape 4: Tester les emails

Une fois configuré, les emails seront envoyés automatiquement :
- **Client**: Email de confirmation avec récapitulatif
- **Équipe**: Notification à `spacioplusservices@gmail.com`

## 📋 Liste des emails envoyés

### Email Client (Confirmation)
- **À**: Client qui a fait la demande
- **Sujet**: "Confirmation de votre demande de devis - Spacio+"
- **Contenu**: Récapitulatif, prochaines étapes, coordonnées

### Email Équipe (Notification)
- **À**: spacioplusservices@gmail.com
- **Sujet**: "🔔 Nouvelle demande de devis - [Nom Client]"
- **Contenu**: Toutes les informations client + détails service

## 🔍 Dépannage

### Erreur "Authentication failed"
- Vérifier que l'authentification 2 facteurs est activée
- Utiliser le mot de passe d'application, pas le mot de passe du compte
- Vérifier l'adresse email exacte

### Emails non reçus
- Vérifier les dossiers spam/indésirables
- Tester avec une autre adresse email
- Vérifier les logs backend: `tail -f /var/log/supervisor/backend.*.log`

### Test manual des emails
Vous pouvez tester en soumettant le formulaire de contact sur le site web.

## 🎯 Recommandation

**Pour démarrer rapidement**: Utiliser Gmail (Option 1)
**Pour la production**: Migrer vers SendGrid ou Mailgun

## ❓ Besoin d'aide ?

Si vous rencontrez des difficultés :
1. Vérifier que toutes les étapes ont été suivies
2. Consulter les logs d'erreur
3. Tester avec un compte Gmail simple d'abord

Une fois les credentials configurés, toutes les notifications email fonctionneront automatiquement !
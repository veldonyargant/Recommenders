# Contracts API - Spacio+ Website

## Vue d'ensemble
Ce document définit les contrats API entre le frontend et le backend pour le site web de Spacio+, une agence de nettoyage résidentiel et commercial.

## Frontend Mock Data à Remplacer
Le fichier `/app/frontend/src/data/mock.js` contient actuellement :
- Informations de l'entreprise (statiques - à conserver)
- Services (statiques - à conserver) 
- Témoignages (statiques - à conserver)
- Features (statiques - à conserver)

**À implémenter côté backend :**
- Gestion des demandes de devis/contact
- Sauvegarde des soumissions de formulaires

## Modèles de Données MongoDB

### ContactRequest
```javascript
{
  _id: ObjectId,
  nom: String (required),
  email: String (required),
  telephone: String (optional),
  typeService: String (required), // "residentiel", "commercial", "apres-travaux", "assainissement"
  message: String (optional),
  dateCreation: Date (auto),
  statut: String, // "nouveau", "contacte", "devis_envoye", "ferme"
  notes: String (optional) // Notes internes
}
```

## Endpoints API

### POST /api/contact
**Description :** Créer une nouvelle demande de contact/devis
**Request Body :**
```json
{
  "nom": "Marie Dubois",
  "email": "marie.dubois@email.com", 
  "telephone": "(819) 555-0123",
  "typeService": "residentiel",
  "message": "Je souhaiterais un devis pour le nettoyage de ma maison..."
}
```
**Response Success (201) :**
```json
{
  "success": true,
  "message": "Demande de contact envoyée avec succès",
  "data": {
    "id": "contact_id",
    "nom": "Marie Dubois",
    "dateCreation": "2024-01-15T10:30:00Z"
  }
}
```
**Response Error (400) :**
```json
{
  "success": false,
  "message": "Données manquantes",
  "errors": ["Le nom est requis", "L'email est requis"]
}
```

### GET /api/contact (Admin - optionnel)
**Description :** Récupérer toutes les demandes de contact
**Response :**
```json
{
  "success": true,
  "data": [
    {
      "id": "contact_id",
      "nom": "Marie Dubois",
      "email": "marie.dubois@email.com",
      "typeService": "residentiel",
      "statut": "nouveau",
      "dateCreation": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Intégration Frontend

### Composant Contact.jsx
**Modifications nécessaires :**
1. Remplacer la soumission mock par un appel API réel
2. Utiliser `REACT_APP_BACKEND_URL` pour les appels
3. Gérer les états de chargement et d'erreur
4. Afficher des messages de succès/erreur appropriés

**Code d'intégration :**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const response = await axios.post(`${BACKEND_URL}/api/contact`, formData);
    
    if (response.data.success) {
      toast({
        title: "Demande envoyée !",
        description: "Nous vous contacterons dans les 24h pour votre devis gratuit.",
        variant: "default",
      });
      setFormData({ nom: '', email: '', telephone: '', typeService: '', message: '' });
    }
  } catch (error) {
    toast({
      title: "Erreur",
      description: "Une erreur est survenue. Veuillez réessayer.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};
```

## Validation
- **Côté Frontend :** Validation basique (champs requis, format email)
- **Côté Backend :** Validation complète avec Pydantic models
- **Sanitisation :** Nettoyage des données d'entrée
- **Rate Limiting :** Limitation des soumissions répétées

## Fonctionnalités Additionnelles (Phase 2 - Optionnel)
- Envoi d'email automatique de confirmation au client
- Notification email à l'équipe Spacio+
- Dashboard admin pour gérer les demandes
- Export des contacts en CSV
- Statistiques des demandes par service

## Tests à Effectuer
1. **Soumission valide :** Formulaire complet avec tous les champs
2. **Validation :** Champs manquants, email invalide
3. **Cas limites :** Messages très longs, caractères spéciaux
4. **Performance :** Temps de réponse < 2 secondes
5. **Sécurité :** Injection SQL, XSS prevention
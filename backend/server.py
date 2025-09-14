from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime
import re
import asyncio

# Import du service email
from email_service import email_service


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Spacio+ API", description="API for Spacio+ cleaning service website")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models for Spacio+ Contact System
class ContactRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    # Champs de base (obligatoires)
    nom: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    telephone: str = Field(..., min_length=10, max_length=20)
    adresseFacturation: str = Field(..., min_length=10, max_length=200)
    
    # Service et fréquence
    frequence: Optional[str] = Field(None, description="Fréquence du service")
    typesPropriete: Optional[List[str]] = Field(default=[], description="Types de propriété (sélection multiple)")
    superficie: Optional[str] = Field(None, max_length=50, description="Superficie en pieds carrés")
    adresseService: str = Field(..., min_length=10, max_length=200, description="Adresse de la propriété à entretenir")
    
    # Détails spécifiques (obligatoires)
    sallesBainCompletes: str = Field(..., description="Nombre de salles de bain complètes")
    sallesDEau: str = Field(..., description="Nombre de salles d'eau")
    inclueSousSol: str = Field(..., description="Inclure le sous-sol (oui/non)")
    inclueNetoyageFenetres: Optional[str] = Field(None, description="Inclure nettoyage fenêtres (oui/non)")
    
    # Message optionnel
    message: Optional[str] = Field(None, max_length=1000)
    
    # Champs système
    dateCreation: datetime = Field(default_factory=datetime.utcnow)
    statut: str = Field(default="nouveau")
    notes: Optional[str] = Field(None, max_length=500)

    @validator('frequence')
    def validate_frequence(cls, v):
        if v:
            valid_frequences = ['une-fois', 'hebdomadaire', 'bihebdomadaire', 'mensuel', 'occasionnel', 'sur-appel']
            if v not in valid_frequences:
                raise ValueError(f'Fréquence doit être une de: {", ".join(valid_frequences)}')
        return v

    @validator('typesPropriete')
    def validate_types_propriete(cls, v):
        if v:
            valid_types = ['appartement-condo', 'maison-unifamiliale', 'immeuble-logements', 'bureau-commercial', 'commerce-detail', 'garderie', 'autre']
            for type_prop in v:
                if type_prop not in valid_types:
                    raise ValueError(f'Type de propriété invalide: {type_prop}')
        return v

    @validator('inclueSousSol')
    def validate_inclue_sous_sol(cls, v):
        if v not in ['oui', 'non']:
            raise ValueError('Inclure sous-sol doit être "oui" ou "non"')
        return v

    @validator('inclueNetoyageFenetres')
    def validate_inclue_nettoyage_fenetres(cls, v):
        if v and v not in ['oui', 'non']:
            raise ValueError('Inclure nettoyage fenêtres doit être "oui" ou "non"')
        return v

    @validator('sallesBainCompletes', 'sallesDEau')
    def validate_nombres_salles(cls, v):
        try:
            num = int(v)
            if num < 0:
                raise ValueError('Le nombre ne peut pas être négatif')
            return str(num)
        except (ValueError, TypeError):
            raise ValueError('Doit être un nombre valide')

    @validator('telephone')
    def validate_telephone(cls, v):
        if v:
            # Remove spaces, parentheses, and dashes for validation
            clean_phone = re.sub(r'[\s\-\(\)]', '', v)
            if not re.match(r'^\+?[\d]{10,15}$', clean_phone):
                raise ValueError('Format de téléphone invalide')
        return v

    @validator('nom')
    def validate_nom(cls, v):
        if not v.strip():
            raise ValueError('Le nom ne peut pas être vide')
        return v.strip().title()

class ContactRequestCreate(BaseModel):
    # Champs de base (obligatoires)
    nom: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    telephone: str = Field(..., min_length=10, max_length=20)
    adresseFacturation: str = Field(..., min_length=10, max_length=200)
    
    # Service et fréquence
    frequence: Optional[str] = Field(None, description="Fréquence du service")
    typesPropriete: Optional[List[str]] = Field(default=[], description="Types de propriété (sélection multiple)")
    superficie: Optional[str] = Field(None, max_length=50, description="Superficie en pieds carrés")
    adresseService: str = Field(..., min_length=10, max_length=200, description="Adresse de la propriété à entretenir")
    
    # Détails spécifiques (obligatoires)
    sallesBainCompletes: str = Field(..., description="Nombre de salles de bain complètes")
    sallesDEau: str = Field(..., description="Nombre de salles d'eau")
    inclueSousSol: str = Field(..., description="Inclure le sous-sol (oui/non)")
    inclueNetoyageFenetres: Optional[str] = Field(None, description="Inclure nettoyage fenêtres (oui/non)")
    
    # Message optionnel
    message: Optional[str] = Field(None, max_length=1000)

    @validator('frequence')
    def validate_frequence(cls, v):
        if v:
            valid_frequences = ['une-fois', 'hebdomadaire', 'bihebdomadaire', 'mensuel', 'occasionnel', 'sur-appel']
            if v not in valid_frequences:
                raise ValueError(f'Fréquence doit être une de: {", ".join(valid_frequences)}')
        return v

    @validator('typesPropriete')
    def validate_types_propriete(cls, v):
        if v:
            valid_types = ['appartement-condo', 'maison-unifamiliale', 'immeuble-logements', 'bureau-commercial', 'commerce-detail', 'garderie', 'autre']
            for type_prop in v:
                if type_prop not in valid_types:
                    raise ValueError(f'Type de propriété invalide: {type_prop}')
        return v

    @validator('inclueSousSol')
    def validate_inclue_sous_sol(cls, v):
        if v not in ['oui', 'non']:
            raise ValueError('Inclure sous-sol doit être "oui" ou "non"')
        return v

    @validator('inclueNetoyageFenetres')
    def validate_inclue_nettoyage_fenetres(cls, v):
        if v and v not in ['oui', 'non']:
            raise ValueError('Inclure nettoyage fenêtres doit être "oui" ou "non"')
        return v

    @validator('sallesBainCompletes', 'sallesDEau')
    def validate_nombres_salles(cls, v):
        try:
            num = int(v)
            if num < 0:
                raise ValueError('Le nombre ne peut pas être négatif')
            return str(num)
        except (ValueError, TypeError):
            raise ValueError('Doit être un nombre valide')

    @validator('telephone')
    def validate_telephone(cls, v):
        if v:
            clean_phone = re.sub(r'[\s\-\(\)]', '', v)
            if not re.match(r'^\+?[\d]{10,15}$', clean_phone):
                raise ValueError('Format de téléphone invalide')
        return v

    @validator('nom')
    def validate_nom(cls, v):
        if not v.strip():
            raise ValueError('Le nom ne peut pas être vide')
        return v.strip().title()

class ContactResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None
    errors: Optional[List[str]] = None

# Legacy Status Check Models (keeping for compatibility)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Spacio+ API - Service de nettoyage professionnel"}

# Spacio+ Contact Routes
@api_router.post("/contact", response_model=ContactResponse)
async def create_contact_request(contact_data: ContactRequestCreate):
    """Créer une nouvelle demande de contact/devis pour Spacio+"""
    try:
        # Create the contact request object
        contact_request = ContactRequest(**contact_data.dict())
        
        # Insert into database
        result = await db.contact_requests.insert_one(contact_request.dict())
        
        if result.inserted_id:
            # Envoyer les emails en arrière-plan
            asyncio.create_task(send_notification_emails(contact_request.dict()))
            
            return ContactResponse(
                success=True,
                message="Demande de contact envoyée avec succès! Nous vous répondrons dans les 24h. Un email de confirmation vous a été envoyé.",
                data={
                    "id": contact_request.id,
                    "nom": contact_request.nom,
                    "dateCreation": contact_request.dateCreation.isoformat()
                }
            )
        else:
            raise HTTPException(status_code=500, detail="Erreur lors de l'enregistrement")
            
    except ValueError as ve:
        return ContactResponse(
            success=False,
            message="Données invalides",
            errors=[str(ve)]
        )
    except Exception as e:
        logging.error(f"Error creating contact request: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

async def send_notification_emails(contact_data: dict):
    """Envoie les emails de notification en arrière-plan"""
    try:
        # Email de confirmation au client
        client_email_sent = email_service.send_client_confirmation(contact_data)
        
        # Email de notification à l'équipe
        team_email_sent = email_service.send_team_notification(contact_data)
        
        if client_email_sent:
            logging.info(f"Email de confirmation envoyé au client: {contact_data.get('email')}")
        else:
            logging.warning(f"Échec envoi email client: {contact_data.get('email')}")
            
        if team_email_sent:
            logging.info(f"Email de notification envoyé à l'équipe: {email_service.notification_email}")
        else:
            logging.warning(f"Échec envoi email équipe: {email_service.notification_email}")
            
    except Exception as e:
        logging.error(f"Erreur envoi emails: {str(e)}")

@api_router.get("/contact", response_model=List[ContactRequest])
async def get_contact_requests():
    """Récupérer toutes les demandes de contact (pour usage administratif)"""
    try:
        contacts = await db.contact_requests.find().sort("dateCreation", -1).to_list(100)
        
        # Convert contacts and provide default values for missing fields
        result = []
        for contact in contacts:
            # Provide default values for new required fields if they don't exist or are None
            default_address = contact.get('adresse') or 'Adresse non spécifiée'
            
            if 'adresseFacturation' not in contact or contact['adresseFacturation'] is None:
                contact['adresseFacturation'] = default_address
            if 'adresseService' not in contact or contact['adresseService'] is None:
                contact['adresseService'] = default_address
            if 'sallesBainCompletes' not in contact:
                contact['sallesBainCompletes'] = '0'
            if 'sallesDEau' not in contact:
                contact['sallesDEau'] = '0'
            if 'inclueSousSol' not in contact:
                contact['inclueSousSol'] = 'non'
            if 'telephone' not in contact or contact['telephone'] is None:
                contact['telephone'] = '(819) 555-0000'  # Valid phone format
                
            result.append(ContactRequest(**contact))
        
        return result
    except Exception as e:
        logging.error(f"Error fetching contact requests: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des données")

@api_router.get("/contact/stats")
async def get_contact_stats():
    """Statistiques des demandes de contact par type de service"""
    try:
        pipeline = [
            {
                "$group": {
                    "_id": "$typeService",
                    "count": {"$sum": 1}
                }
            },
            {
                "$project": {
                    "typeService": "$_id",
                    "count": 1,
                    "_id": 0
                }
            }
        ]
        
        stats = await db.contact_requests.aggregate(pipeline).to_list(None)
        
        total_requests = await db.contact_requests.count_documents({})
        
        return {
            "success": True,
            "data": {
                "total_requests": total_requests,
                "by_service": stats,
                "last_updated": datetime.utcnow().isoformat()
            }
        }
    except Exception as e:
        logging.error(f"Error fetching contact stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des statistiques")

# Legacy Status Check Routes (keeping for compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

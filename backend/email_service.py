import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.smtp_user = os.getenv('SMTP_USER', '')
        self.smtp_password = os.getenv('SMTP_PASSWORD', '')
        self.notification_email = os.getenv('NOTIFICATION_EMAIL', 'spacioplusservices@gmail.com')
        self.from_email = os.getenv('EMAIL_FROM', 'noreply@spacioplus.ca')

    def send_client_confirmation(self, contact_data: Dict[str, Any]) -> bool:
        """Envoie un email de confirmation au client"""
        try:
            subject = "Confirmation de votre demande de devis - Spacio+"
            
            # Template HTML pour le client
            html_body = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .header {{ background: linear-gradient(135deg, #2563eb, #16a34a); color: white; padding: 20px; text-align: center; }}
                    .content {{ padding: 20px; }}
                    .footer {{ background: #f8f9fa; padding: 15px; text-align: center; color: #666; }}
                    .info-box {{ background: #f0f9ff; border-left: 4px solid #2563eb; padding: 15px; margin: 15px 0; }}
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Spacio+</h1>
                    <p>Des espaces impeccables, au meilleur prix</p>
                </div>
                
                <div class="content">
                    <h2>Bonjour {contact_data.get('nom', '')} !</h2>
                    
                    <p>Merci pour votre confiance envers Spacio+. Nous avons bien reçu votre demande de devis personnalisé.</p>
                    
                    <div class="info-box">
                        <h3>📋 Récapitulatif de votre demande :</h3>
                        <p><strong>Nom :</strong> {contact_data.get('nom', '')}</p>
                        <p><strong>Email :</strong> {contact_data.get('email', '')}</p>
                        <p><strong>Téléphone :</strong> {contact_data.get('telephone', '')}</p>
                        <p><strong>Fréquence :</strong> {contact_data.get('frequence', 'Non spécifiée')}</p>
                        <p><strong>Adresse du service :</strong> {contact_data.get('adresseService', '')}</p>
                        <p><strong>Superficie :</strong> {contact_data.get('superficie', 'Non spécifiée')}</p>
                    </div>
                    
                    <h3>⏰ Prochaines étapes :</h3>
                    <ul>
                        <li><strong>Réponse garantie sous 24h</strong></li>
                        <li>Analyse détaillée de vos besoins</li>
                        <li>Devis personnalisé gratuit</li>
                        <li>Proposition de rendez-vous si nécessaire</li>
                    </ul>
                    
                    <p>Notre équipe s'engage à vous répondre rapidement avec une estimation claire et adaptée à vos besoins spécifiques.</p>
                    
                    <h3>📞 Nous contacter :</h3>
                    <p>
                        <strong>Email :</strong> contact@spacioplus.ca<br>
                        <strong>Téléphone :</strong> (819) 555-0123<br>
                        <strong>Adresse :</strong> 15 Rue Jos-Montferrand, Gatineau, QC, J8X 0C2
                    </p>
                </div>
                
                <div class="footer">
                    <p>Spacio+ - Votre satisfaction est notre priorité</p>
                    <p>Gatineau • Hull • Aylmer • Chelsea • Cantley • Ottawa</p>
                </div>
            </body>
            </html>
            """
            
            return self._send_email(
                to_email=contact_data.get('email', ''),
                subject=subject,
                html_body=html_body
            )
            
        except Exception as e:
            logger.error(f"Erreur envoi email client: {str(e)}")
            return False

    def send_team_notification(self, contact_data: Dict[str, Any]) -> bool:
        """Envoie une notification à l'équipe Spacio+"""
        try:
            subject = f"🔔 Nouvelle demande de devis - {contact_data.get('nom', 'Client')}"
            
            # Formater les types de propriété
            types_propriete = contact_data.get('typesPropriete', [])
            types_str = ', '.join(types_propriete) if types_propriete else 'Non spécifié'
            
            # Template HTML pour l'équipe
            html_body = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .header {{ background: #dc2626; color: white; padding: 20px; text-align: center; }}
                    .content {{ padding: 20px; }}
                    .client-info {{ background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 15px 0; }}
                    .service-info {{ background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 15px 0; }}
                    .urgent {{ color: #dc2626; font-weight: bold; }}
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🚨 NOUVELLE DEMANDE DE DEVIS</h1>
                    <p>Reçue le {datetime.now().strftime('%d/%m/%Y à %H:%M')}</p>
                </div>
                
                <div class="content">
                    <p class="urgent">Action requise : Réponse client sous 24h !</p>
                    
                    <div class="client-info">
                        <h3>👤 Informations Client</h3>
                        <p><strong>Nom :</strong> {contact_data.get('nom', '')}</p>
                        <p><strong>Email :</strong> <a href="mailto:{contact_data.get('email', '')}">{contact_data.get('email', '')}</a></p>
                        <p><strong>Téléphone :</strong> <a href="tel:{contact_data.get('telephone', '')}">{contact_data.get('telephone', '')}</a></p>
                        <p><strong>Adresse facturation :</strong> {contact_data.get('adresseFacturation', '')}</p>
                    </div>
                    
                    <div class="service-info">
                        <h3>🏠 Détails du Service</h3>
                        <p><strong>Fréquence :</strong> {contact_data.get('frequence', 'Non spécifiée')}</p>
                        <p><strong>Types de propriété :</strong> {types_str}</p>
                        <p><strong>Superficie :</strong> {contact_data.get('superficie', 'Non spécifiée')}</p>
                        <p><strong>Adresse du service :</strong> {contact_data.get('adresseService', '')}</p>
                        <p><strong>Salles de bain complètes :</strong> {contact_data.get('sallesBainCompletes', '')}</p>
                        <p><strong>Salles d'eau :</strong> {contact_data.get('sallesDEau', '')}</p>
                        <p><strong>Inclure sous-sol :</strong> {contact_data.get('inclueSousSol', '').upper()}</p>
                        <p><strong>Nettoyage fenêtres :</strong> {contact_data.get('inclueNetoyageFenetres', 'Non spécifié').upper()}</p>
                    </div>
                    
                    {f'<div style="background: #f0f9ff; padding: 15px; margin: 15px 0;"><h3>💬 Message du client :</h3><p>"{contact_data.get("message", "")}"</p></div>' if contact_data.get('message') else ''}
                    
                    <hr>
                    <p><strong>ID de la demande :</strong> {contact_data.get('id', '')}</p>
                    <p><small>Cette demande a été automatiquement sauvegardée dans la base de données.</small></p>
                </div>
            </body>
            </html>
            """
            
            return self._send_email(
                to_email=self.notification_email,
                subject=subject,
                html_body=html_body
            )
            
        except Exception as e:
            logger.error(f"Erreur envoi email équipe: {str(e)}")
            return False

    def _send_email(self, to_email: str, subject: str, html_body: str) -> bool:
        """Envoie un email via SMTP"""
        try:
            if not self.smtp_user or not self.smtp_password:
                logger.warning("Configuration email manquante - emails non envoyés")
                return False
                
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = self.from_email
            msg['To'] = to_email
            
            html_part = MIMEText(html_body, 'html', 'utf-8')
            msg.attach(html_part)
            
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
                
            logger.info(f"Email envoyé avec succès à {to_email}")
            return True
            
        except Exception as e:
            logger.error(f"Erreur envoi SMTP vers {to_email}: {str(e)}")
            return False

# Instance globale
email_service = EmailService()
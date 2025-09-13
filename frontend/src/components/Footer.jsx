import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, CheckCircle } from 'lucide-react';
import { companyInfo, contactInfo } from '../data/mock';

const Footer = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_sparkle-homes/artifacts/1v1x22yk_Spatio%2B%20%286%29%20-%20Copy.png" 
                alt="Spacio+ Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Service de nettoyage professionnel dans la région Ottawa-Gatineau. 
              Qualité garantie, produits écologiques, prix compétitifs.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <a 
                href={contactInfo.socialMedia.facebook}
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href={contactInfo.socialMedia.instagram}
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Nos Services</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('#services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Nettoyage Résidentiel
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#services')}
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Nettoyage Commercial
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Nettoyage Après Travaux
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#services')}
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Assainissement
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('#accueil')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#apropos')}
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  À Propos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#temoignages')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Témoignages
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#contact')}
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{contactInfo.email}</span>
              </li>
            </ul>

            {/* Service Areas */}
            <div className="mt-6">
              <h5 className="font-medium text-blue-400 mb-2">Zones de Service</h5>
              <div className="text-sm text-gray-300">
                {companyInfo.serviceAreas.join(' • ')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 {companyInfo.name}. Tous droits réservés.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-blue-400">
                <CheckCircle className="h-4 w-4" />
                <span>Entreprise locale certifiée</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span>Produits écologiques</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
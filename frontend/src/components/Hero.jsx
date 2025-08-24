import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, Star, MapPin } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100 bg-[size:20px_20px] opacity-60" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-brand-blue hover:bg-blue-100 px-3 py-1">
                <Star className="h-3 w-3 mr-1" />
                Service de qualité supérieure
              </Badge>
            </div>

            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Votre espace</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                  impeccable
                </span>
                <br />
                <span className="text-gray-900">au meilleur prix</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Service de nettoyage résidentiel et commercial dans la région Ottawa-Gatineau. 
                Qualité professionnelle, produits écologiques, prix compétitifs.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-brand-green flex-shrink-0" />
                <span className="text-gray-700 font-medium">Devis gratuit 24h</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-brand-green flex-shrink-0" />
                <span className="text-gray-700 font-medium">Produits écologiques</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-brand-green flex-shrink-0" />
                <span className="text-gray-700 font-medium">Équipe assurée</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-brand-green flex-shrink-0" />
                <span className="text-gray-700 font-medium">Service bilingue</span>
              </div>
            </div>

            {/* Service area */}
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                Gatineau • Hull • Aylmer • Chelsea • Ottawa
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-brand-gradient hover:bg-brand-gradient text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection('#contact')}
              >
                Obtenir un Devis Gratuit
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-brand-blue text-brand-blue hover:bg-blue-50 font-semibold px-8 py-4 text-lg"
                onClick={() => scrollToSection('#services')}
              >
                Découvrir nos Services
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100+</div>
                <div className="text-sm text-gray-600">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">5★</div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2+</div>
                <div className="text-sm text-gray-600">Ans d'expérience</div>
              </div>
            </div>
          </div>

          {/* Right column - Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl p-6 h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_sparkle-homes/artifacts/qvt2i9j6_Spatio%2B%20%284%29.png" 
                    alt="Spacio+ Logo" 
                    className="w-32 h-auto mx-auto"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Service Professionnel
                  </h3>
                  <p className="text-gray-600">
                    Équipe formée • Matériel professionnel • Satisfaction garantie
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Disponible maintenant</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4">
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-600">24h</div>
                <div className="text-xs text-gray-600">Réponse garantie</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
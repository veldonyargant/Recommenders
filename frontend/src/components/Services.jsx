import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Home, Building, HardHat, Shield, CheckCircle } from 'lucide-react';
import { services } from '../data/mock';

const Services = () => {
  const getIcon = (iconName) => {
    const icons = { Home, Building, HardHat, Shield };
    const Icon = icons[iconName];
    return Icon ? <Icon className="h-8 w-8" /> : <Home className="h-8 w-8" />;
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">
            Nos Services
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Solutions de nettoyage adaptées à vos besoins
          </h2>
          <p className="text-xl text-gray-600">
            Que ce soit pour votre domicile ou votre entreprise, nous offrons des services 
            de nettoyage professionnels avec des produits écologiques et une garantie de satisfaction.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.id} 
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50 hover:from-emerald-50 hover:to-teal-50"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300">
                  {getIcon(service.icon)}
                </div>
                <CardTitle className="text-xl text-gray-900 mb-2">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-emerald-600">{service.price}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      onClick={scrollToContact}
                    >
                      Demander un devis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Pourquoi choisir Spacio+ ?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Qualité garantie</h4>
                    <p className="text-gray-600">Contrôle qualité systématique après chaque intervention avec photos avant/après.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Produits écologiques</h4>
                    <p className="text-gray-600">Utilisation exclusive de produits respectueux de l'environnement et de votre santé.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Service personnalisé</h4>
                    <p className="text-gray-600">Adaptation à vos horaires et besoins spécifiques. Service bilingue disponible.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="bg-white rounded-xl p-6 shadow-lg inline-block">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Devis gratuit en 24h</h4>
                <p className="text-gray-600 mb-4">Évaluation transparente de vos besoins</p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold"
                  onClick={scrollToContact}
                >
                  Obtenir mon devis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
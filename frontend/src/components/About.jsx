import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, Leaf, MessageCircle, Calculator, Users, Award, Clock } from 'lucide-react';
import { features } from '../data/mock';

const About = () => {
  const getIcon = (iconName) => {
    const icons = { CheckCircle, Leaf, MessageCircle, Calculator };
    const Icon = icons[iconName];
    return Icon ? <Icon className="h-6 w-6" /> : <CheckCircle className="h-6 w-6" />;
  };

  return (
    <section id="apropos" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-blue-100 text-brand-blue hover:bg-blue-100 mb-4">
            À Propos de Nous
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Votre partenaire de confiance pour un environnement sain
          </h2>
          <p className="text-xl text-gray-600">
            Spacio+ est une entreprise locale spécialisée dans le nettoyage résidentiel et commercial, 
            fondée sur des valeurs de qualité, respect de l'environnement et satisfaction client.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left Column - Story */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Chez Spacio+, nous croyons que la propreté ne se limite pas à l'esthétique. 
                Elle contribue directement au bien-être, à la santé et à la productivité. 
                Notre mission est d'offrir un environnement sain, propre et accueillant à nos clients, 
                qu'il s'agisse de particuliers ou d'entreprises.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nous combinons des méthodes de nettoyage modernes, des produits respectueux 
                de l'environnement et un savoir-faire professionnel pour apporter plus qu'un 
                simple service : une expérience de confiance et de tranquillité d'esprit.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Nos Valeurs</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Professionnalisme</div>
                    <div className="text-sm text-gray-600">Excellence dans chaque intervention</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Intégrité</div>
                    <div className="text-sm text-gray-600">Transparence et honnêteté</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Respect</div>
                    <div className="text-sm text-gray-600">De nos clients et de l'environnement</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Innovation</div>
                    <div className="text-sm text-gray-600">Méthodes et produits modernes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Visual */}
          <div className="space-y-8">
            {/* Stats Card */}
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  Notre Performance
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-blue mb-1">100+</div>
                    <div className="text-sm text-gray-600">Clients Satisfaits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-green mb-1">98%</div>
                    <div className="text-sm text-gray-600">Taux de Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-blue mb-1">5★</div>
                    <div className="text-sm text-gray-600">Note Moyenne</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-green mb-1">24h</div>
                    <div className="text-sm text-gray-600">Réponse Garantie</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vision Card */}
            <Card className="bg-brand-gradient text-white border-0">
              <CardContent className="p-8">
                <h4 className="text-xl font-semibold mb-4">Notre Vision</h4>
                <p className="leading-relaxed mb-4">
                  Devenir la référence régionale en matière de services de nettoyage, 
                  reconnue pour notre professionnalisme, notre fiabilité et notre 
                  engagement envers la satisfaction client.
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm">Objectif 2027: Leader régional</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-4 ${index % 2 === 0 ? 'bg-blue-100 text-brand-blue' : 'bg-green-100 text-brand-green'} rounded-xl flex items-center justify-center`}>
                  {getIcon(feature.icon)}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
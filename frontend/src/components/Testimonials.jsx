import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/mock';

const Testimonials = () => {
  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-blue-100 text-brand-blue hover:bg-blue-100 mb-4">
            Témoignages Clients
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600">
            La satisfaction de nos clients est notre priorité. Découvrez leurs expériences 
            avec nos services de nettoyage professionnel.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-green-50"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-blue-200" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs border-brand-blue text-brand-blue">
                        {testimonial.service}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Rejoignez nos clients satisfaits
              </h3>
              <p className="text-gray-600">
                Plus de 100 clients nous font confiance
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-blue mb-1">98%</div>
              <div className="text-sm text-gray-600">Taux de satisfaction</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-green mb-1">5.0★</div>
              <div className="text-sm text-gray-600">Note moyenne</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-blue mb-1">85%</div>
              <div className="text-sm text-gray-600">Clients fidèles</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
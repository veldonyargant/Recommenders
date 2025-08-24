import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  CheckCircle,
  Facebook,
  Instagram,
  Loader2
} from 'lucide-react';
import { companyInfo, contactInfo } from '../data/mock';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    typeService: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contact`, formData);
      
      if (response.data.success) {
        toast({
          title: "Demande envoyée !",
          description: response.data.message,
          variant: "default",
        });
        
        // Reset form
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          typeService: '',
          message: ''
        });
      } else {
        throw new Error(response.data.message || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      let errorMessage = "Une erreur est survenue. Veuillez réessayer.";
      
      if (error.response?.data?.errors) {
        errorMessage = error.response.data.errors.join(', ');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-blue-100 text-brand-blue hover:bg-blue-100 mb-4">
            Contactez-nous
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Obtenez votre devis gratuit en 24h
          </h2>
          <p className="text-xl text-gray-600">
            Prêt à transformer vos espaces ? Contactez-nous dès aujourd'hui pour une 
            évaluation gratuite et personnalisée de vos besoins de nettoyage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-brand-blue" />
                  Demande de Devis Gratuit
                </CardTitle>
                <p className="text-gray-600">
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <Input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Votre nom et prénom"
                        required
                        disabled={loading}
                        className="border-gray-200 focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                        disabled={loading}
                        className="border-gray-200 focus:border-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <Input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="(819) 555-0123"
                        disabled={loading}
                        className="border-gray-200 focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de service *
                      </label>
                      <select
                        name="typeService"
                        value={formData.typeService}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-3 border border-gray-200 rounded-md focus:border-brand-blue focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Sélectionnez un service</option>
                        <option value="residentiel">Nettoyage Résidentiel</option>
                        <option value="commercial">Nettoyage Commercial</option>
                        <option value="apres-travaux">Après Travaux</option>
                        <option value="assainissement">Assainissement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Décrivez vos besoins
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet : superficie, fréquence souhaitée, exigences particulières..."
                      rows={4}
                      disabled={loading}
                      className="border-gray-200 focus:border-brand-blue"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-brand-green flex-shrink-0" />
                    <span>Réponse garantie sous 24h • Devis gratuit • Sans engagement</span>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={loading}
                    className="w-full bg-brand-gradient hover:bg-brand-gradient text-white font-semibold py-4 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer ma Demande'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Informations de Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Adresse</div>
                    <div className="text-gray-600 text-sm">{contactInfo.address}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-brand-green flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Téléphone</div>
                    <div className="text-gray-600 text-sm">{contactInfo.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-brand-blue flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600 text-sm">{contactInfo.email}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-brand-green mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Horaires</div>
                    <div className="text-gray-600 text-sm">
                      Lun-Ven: {contactInfo.hours.weekdays}
                      <br />
                      Sam-Dim: {contactInfo.hours.weekend}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Areas Card */}
            <Card className="shadow-lg border-0 bg-brand-gradient text-white">
              <CardHeader>
                <CardTitle className="text-xl">Zones de Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-blue-100">
                  Nous desservons toute la région Ottawa-Gatineau :
                </p>
                <div className="space-y-2">
                  {companyInfo.serviceAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-200" />
                      <span className="text-blue-100">{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media Card */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Suivez-nous</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <a 
                    href={contactInfo.socialMedia.facebook}
                    className="flex items-center justify-center w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </a>
                  <a 
                    href={contactInfo.socialMedia.instagram}
                    className="flex items-center justify-center w-12 h-12 bg-pink-100 hover:bg-pink-200 rounded-full transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Découvrez nos réalisations et conseils d'entretien
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-blue-100 text-brand-blue hover:bg-blue-100 mb-4">
            Contactez-nous
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Obtenez votre devis gratuit en 24h
          </h2>
          <p className="text-xl text-gray-600">
            Prêt à transformer vos espaces ? Contactez-nous dès aujourd'hui pour une 
            évaluation gratuite et personnalisée de vos besoins de nettoyage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-brand-blue" />
                  Demande de Devis Gratuit
                </CardTitle>
                <p className="text-gray-600">
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <Input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Votre nom et prénom"
                        required
                        className="border-gray-200 focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                        className="border-gray-200 focus:border-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <Input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="(819) 555-0123"
                        className="border-gray-200 focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de service *
                      </label>
                      <select
                        name="typeService"
                        value={formData.typeService}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-200 rounded-md focus:border-brand-blue focus:outline-none"
                      >
                        <option value="">Sélectionnez un service</option>
                        <option value="residentiel">Nettoyage Résidentiel</option>
                        <option value="commercial">Nettoyage Commercial</option>
                        <option value="apres-travaux">Après Travaux</option>
                        <option value="assainissement">Assainissement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Décrivez vos besoins
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet : superficie, fréquence souhaitée, exigences particulières..."
                      rows={4}
                      className="border-gray-200 focus:border-brand-blue"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-brand-green flex-shrink-0" />
                    <span>Réponse garantie sous 24h • Devis gratuit • Sans engagement</span>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full bg-brand-gradient hover:bg-brand-gradient text-white font-semibold py-4 hover:scale-105 transition-all duration-300"
                  >
                    Envoyer ma Demande
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Informations de Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Adresse</div>
                    <div className="text-gray-600 text-sm">{contactInfo.address}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-brand-green flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Téléphone</div>
                    <div className="text-gray-600 text-sm">{contactInfo.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-brand-blue flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600 text-sm">{contactInfo.email}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-brand-green mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Horaires</div>
                    <div className="text-gray-600 text-sm">
                      Lun-Ven: {contactInfo.hours.weekdays}
                      <br />
                      Sam-Dim: {contactInfo.hours.weekend}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Areas Card */}
            <Card className="shadow-lg border-0 bg-brand-gradient text-white">
              <CardHeader>
                <CardTitle className="text-xl">Zones de Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-blue-100">
                  Nous desservons toute la région Ottawa-Gatineau :
                </p>
                <div className="space-y-2">
                  {companyInfo.serviceAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-200" />
                      <span className="text-blue-100">{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media Card */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Suivez-nous</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <a 
                    href={contactInfo.socialMedia.facebook}
                    className="flex items-center justify-center w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </a>
                  <a 
                    href={contactInfo.socialMedia.instagram}
                    className="flex items-center justify-center w-12 h-12 bg-pink-100 hover:bg-pink-200 rounded-full transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Découvrez nos réalisations et conseils d'entretien
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Users, 
  Calendar, 
  Filter, 
  Download, 
  Eye,
  RefreshCw,
  Search,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [stats, setStats] = useState({ total_requests: 0, by_service: [] });

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/contact`);
      setContacts(response.data);
    } catch (error) {
      console.error('Erreur récupération contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/contact/stats`);
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Erreur récupération stats:', error);
    }
  };

  const filteredContacts = contacts.filter(contact => 
    contact.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.adresseService && contact.adresseService.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (statut) => {
    switch(statut) {
      case 'nouveau': return 'bg-blue-100 text-blue-800';
      case 'contacte': return 'bg-yellow-100 text-yellow-800';
      case 'devis_envoye': return 'bg-green-100 text-green-800';
      case 'ferme': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const headers = [
      'Date', 'Nom', 'Email', 'Téléphone', 'Fréquence', 
      'Adresse Service', 'Superficie', 'Sous-sol', 'Fenêtres', 'Statut'
    ];
    
    const csvData = filteredContacts.map(contact => [
      formatDate(contact.dateCreation),
      contact.nom,
      contact.email,
      contact.telephone,
      contact.frequence || '',
      contact.adresseService || '',
      contact.superficie || '',
      contact.inclueSousSol || '',
      contact.inclueNetoyageFenetres || '',
      contact.statut
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `spacio_contacts_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrateur - Spacio+</h1>
          <p className="text-gray-600">Gestion des demandes de devis et contacts clients</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Demandes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_requests}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredContacts.filter(c => 
                  new Date(c.dateCreation).toDateString() === new Date().toDateString()
                ).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredContacts.filter(c => c.statut === 'nouveau').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cette Semaine</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredContacts.filter(c => {
                  const contactDate = new Date(c.dateCreation);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return contactDate >= weekAgo;
                }).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par nom, email ou adresse..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => fetchContacts()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
            <Button onClick={exportToCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Liste des contacts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Demandes de Devis ({filteredContacts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p>Chargement des contacts...</p>
                  </div>
                ) : filteredContacts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Aucune demande trouvée
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedContact?.id === contact.id 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedContact(contact)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{contact.nom}</h4>
                            <p className="text-sm text-gray-600">{contact.email}</p>
                          </div>
                          <Badge className={getStatusColor(contact.statut)}>
                            {contact.statut}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <p><strong>Fréquence:</strong> {contact.frequence || 'Non spécifiée'}</p>
                          <p><strong>Date:</strong> {formatDate(contact.dateCreation)}</p>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedContact(contact);
                          }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Voir détails
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Détails du contact sélectionné */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Détails de la Demande</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedContact ? (
                  <div className="space-y-4">
                    
                    {/* Informations client */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">👤 Informations Client</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{selectedContact.nom}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                            {selectedContact.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <a href={`tel:${selectedContact.telephone}`} className="text-blue-600 hover:underline">
                            {selectedContact.telephone}
                          </a>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                          <span>{selectedContact.adresseFacturation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Détails du service */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">🏠 Service Demandé</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Fréquence:</strong> {selectedContact.frequence || 'Non spécifiée'}</p>
                        <p><strong>Types de propriété:</strong> {
                          Array.isArray(selectedContact.typesPropriete) 
                            ? selectedContact.typesPropriete.join(', ')
                            : 'Non spécifié'
                        }</p>
                        <p><strong>Superficie:</strong> {selectedContact.superficie || 'Non spécifiée'}</p>
                        <p><strong>Adresse service:</strong> {selectedContact.adresseService}</p>
                        <p><strong>Salles de bain:</strong> {selectedContact.sallesBainCompletes}</p>
                        <p><strong>Salles d'eau:</strong> {selectedContact.sallesDEau}</p>
                        <p><strong>Sous-sol:</strong> {selectedContact.inclueSousSol?.toUpperCase()}</p>
                        <p><strong>Fenêtres:</strong> {selectedContact.inclueNetoyageFenetres?.toUpperCase()}</p>
                      </div>
                    </div>

                    {/* Message */}
                    {selectedContact.message && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">💬 Message</h4>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          {selectedContact.message}
                        </p>
                      </div>
                    )}

                    {/* Métadonnées */}
                    <div className="border-t pt-4">
                      <p className="text-xs text-gray-500">
                        <strong>ID:</strong> {selectedContact.id}<br />
                        <strong>Reçu le:</strong> {formatDate(selectedContact.dateCreation)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        onClick={() => window.open(`mailto:${selectedContact.email}?subject=Réponse à votre demande de devis - Spacio+`, '_blank')}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Répondre par Email
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(`tel:${selectedContact.telephone}`, '_self')}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Appeler le Client
                      </Button>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Sélectionnez une demande pour voir les détails</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
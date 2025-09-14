#!/usr/bin/env python3
"""
Backend Test Suite for Spacio+ API - Admin Dashboard Focus
Tests the admin dashboard endpoints and contact form functionality
"""

import requests
import json
import sys
from datetime import datetime
import time

# Backend URL from frontend/.env
BASE_URL = "https://spacioplus-web.preview.emergentagent.com/api"

class SpacioAdminTestSuite:
    def __init__(self):
        self.results = []
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = 0
        self.created_contact_ids = []
        
    def log_result(self, test_name, passed, message, details=None):
        """Log test result"""
        self.total_tests += 1
        if passed:
            self.passed_tests += 1
            status = "✅ PASS"
        else:
            self.failed_tests += 1
            status = "❌ FAIL"
            
        result = {
            "test": test_name,
            "status": status,
            "message": message,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.results.append(result)
        print(f"{status}: {test_name} - {message}")
        if details:
            print(f"   Details: {details}")
        print()

    def test_api_root(self):
        """Test 1: GET /api/ - Vérifier que l'API répond"""
        try:
            response = requests.get(f"{BASE_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "Spacio+" in data.get("message", ""):
                    self.log_result("API Root Endpoint", True, "API répond correctement", data)
                else:
                    self.log_result("API Root Endpoint", False, "Message API incorrect", data)
            else:
                self.log_result("API Root Endpoint", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("API Root Endpoint", False, f"Erreur de connexion: {str(e)}")

    def test_contact_form_required_fields(self):
        """Test 2: Validation des champs requis selon le nouveau modèle ContactRequest"""
        
        # Test avec champs manquants - selon le nouveau modèle
        test_cases = [
            {
                "name": "Sans nom",
                "data": {
                    "email": "test@example.com",
                    "telephone": "(819) 555-1234",
                    "adresseFacturation": "123 Rue Facturation, Gatineau, QC",
                    "adresseService": "456 Rue Service, Gatineau, QC",
                    "sallesBainCompletes": "2",
                    "sallesDEau": "1",
                    "inclueSousSol": "oui"
                },
                "should_fail": True
            },
            {
                "name": "Sans email", 
                "data": {
                    "nom": "Jean Dupont",
                    "telephone": "(819) 555-1234",
                    "adresseFacturation": "123 Rue Facturation, Gatineau, QC",
                    "adresseService": "456 Rue Service, Gatineau, QC",
                    "sallesBainCompletes": "2",
                    "sallesDEau": "1",
                    "inclueSousSol": "oui"
                },
                "should_fail": True
            },
            {
                "name": "Sans téléphone",
                "data": {
                    "nom": "Jean Dupont",
                    "email": "jean@example.com",
                    "adresseFacturation": "123 Rue Facturation, Gatineau, QC",
                    "adresseService": "456 Rue Service, Gatineau, QC",
                    "sallesBainCompletes": "2",
                    "sallesDEau": "1",
                    "inclueSousSol": "oui"
                },
                "should_fail": True
            },
            {
                "name": "Sans adresse facturation",
                "data": {
                    "nom": "Jean Dupont",
                    "email": "jean@example.com",
                    "telephone": "(819) 555-1234",
                    "adresseService": "456 Rue Service, Gatineau, QC",
                    "sallesBainCompletes": "2",
                    "sallesDEau": "1",
                    "inclueSousSol": "oui"
                },
                "should_fail": True
            },
            {
                "name": "Avec tous les champs requis",
                "data": {
                    "nom": "Jean Dupont",
                    "email": "jean@example.com",
                    "telephone": "(819) 555-1234",
                    "adresseFacturation": "123 Rue Facturation, Gatineau, QC",
                    "adresseService": "456 Rue Service, Gatineau, QC",
                    "sallesBainCompletes": "2",
                    "sallesDEau": "1",
                    "inclueSousSol": "oui"
                },
                "should_fail": False
            }
        ]
        
        for case in test_cases:
            try:
                response = requests.post(f"{BASE_URL}/contact", json=case["data"], timeout=10)
                
                if case["should_fail"]:
                    if response.status_code != 200 or not response.json().get("success", True):
                        self.log_result(f"Validation - {case['name']}", True, "Validation échoue comme attendu")
                    else:
                        self.log_result(f"Validation - {case['name']}", False, "Devrait échouer mais a réussi", response.json())
                else:
                    if response.status_code == 200 and response.json().get("success", False):
                        data = response.json()
                        contact_id = data.get("data", {}).get("id")
                        if contact_id:
                            self.created_contact_ids.append(contact_id)
                        self.log_result(f"Validation - {case['name']}", True, "Validation réussit comme attendu")
                    else:
                        self.log_result(f"Validation - {case['name']}", False, "Devrait réussir mais a échoué", response.json())
                        
            except Exception as e:
                self.log_result(f"Validation - {case['name']}", False, f"Erreur: {str(e)}")

    def test_contact_form_field_validation(self):
        """Test 3: Validation des champs optionnels et formats"""
        
        base_data = {
            "nom": "Marie Tremblay",
            "email": "marie@example.com",
            "telephone": "(819) 555-5678",
            "adresseFacturation": "789 Rue Facturation, Gatineau, QC",
            "adresseService": "321 Rue Service, Gatineau, QC",
            "sallesBainCompletes": "3",
            "sallesDEau": "2",
            "inclueSousSol": "non"
        }
        
        validation_tests = [
            {
                "name": "frequence invalide",
                "data": {**base_data, "frequence": "invalide"},
                "should_fail": True
            },
            {
                "name": "frequence valide - bihebdomadaire",
                "data": {**base_data, "frequence": "bihebdomadaire"},
                "should_fail": False
            },
            {
                "name": "typesPropriete invalide",
                "data": {**base_data, "typesPropriete": ["invalide"]},
                "should_fail": True
            },
            {
                "name": "typesPropriete valide - appartement-condo",
                "data": {**base_data, "typesPropriete": ["appartement-condo"]},
                "should_fail": False
            },
            {
                "name": "email invalide",
                "data": {**base_data, "email": "email-invalide"},
                "should_fail": True
            },
            {
                "name": "téléphone invalide",
                "data": {**base_data, "telephone": "123"},
                "should_fail": True
            },
            {
                "name": "inclueSousSol invalide",
                "data": {**base_data, "inclueSousSol": "peut-être"},
                "should_fail": True
            },
            {
                "name": "sallesBainCompletes invalide",
                "data": {**base_data, "sallesBainCompletes": "abc"},
                "should_fail": True
            }
        ]
        
        for case in validation_tests:
            try:
                response = requests.post(f"{BASE_URL}/contact", json=case["data"], timeout=10)
                
                if case["should_fail"]:
                    if response.status_code != 200 or not response.json().get("success", True):
                        self.log_result(f"Validation champs - {case['name']}", True, "Validation échoue comme attendu")
                    else:
                        self.log_result(f"Validation champs - {case['name']}", False, "Devrait échouer mais a réussi", response.json())
                else:
                    if response.status_code == 200 and response.json().get("success", False):
                        data = response.json()
                        contact_id = data.get("data", {}).get("id")
                        if contact_id:
                            self.created_contact_ids.append(contact_id)
                        self.log_result(f"Validation champs - {case['name']}", True, "Validation réussit comme attendu")
                    else:
                        self.log_result(f"Validation champs - {case['name']}", False, "Devrait réussir mais a échoué", response.json())
                        
            except Exception as e:
                self.log_result(f"Validation champs - {case['name']}", False, f"Erreur: {str(e)}")

    def test_complete_contact_forms(self):
        """Test 4: Créer plusieurs contacts complets pour tester le dashboard admin"""
        
        complete_contacts = [
            {
                "nom": "Sophie Lavoie",
                "email": "sophie.lavoie@example.com", 
                "telephone": "(819) 555-1111",
                "adresseFacturation": "100 Rue des Érables, Gatineau, QC J8T 1A1",
                "adresseService": "100 Rue des Érables, Gatineau, QC J8T 1A1",
                "frequence": "hebdomadaire",
                "typesPropriete": ["maison-unifamiliale"],
                "superficie": "1500-2000",
                "sallesBainCompletes": "2",
                "sallesDEau": "1",
                "inclueSousSol": "oui",
                "inclueNetoyageFenetres": "oui",
                "message": "Nettoyage complet maison familiale avec sous-sol fini"
            },
            {
                "nom": "Marc Bélanger",
                "email": "marc.belanger@example.com",
                "telephone": "(819) 555-2222", 
                "adresseFacturation": "250 Boulevard Maloney, Gatineau, QC J8P 7B5",
                "adresseService": "250 Boulevard Maloney, Gatineau, QC J8P 7B5",
                "frequence": "mensuel",
                "typesPropriete": ["appartement-condo"],
                "superficie": "800-1200",
                "sallesBainCompletes": "1",
                "sallesDEau": "1",
                "inclueSousSol": "non",
                "inclueNetoyageFenetres": "non",
                "message": "Condo moderne, nettoyage standard"
            },
            {
                "nom": "Entreprise ABC Inc.",
                "email": "info@abc-inc.com",
                "telephone": "(819) 555-3333",
                "adresseFacturation": "500 Rue Principale, Hull, QC J8Y 3M5",
                "adresseService": "500 Rue Principale, Hull, QC J8Y 3M5",
                "frequence": "bihebdomadaire",
                "typesPropriete": ["bureau-commercial"],
                "superficie": "2000+",
                "sallesBainCompletes": "4",
                "sallesDEau": "2",
                "inclueSousSol": "non",
                "inclueNetoyageFenetres": "oui",
                "message": "Bureaux commerciaux, nettoyage professionnel requis"
            }
        ]
        
        for i, contact_data in enumerate(complete_contacts, 1):
            try:
                response = requests.post(f"{BASE_URL}/contact", json=contact_data, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success", False):
                        contact_id = data.get("data", {}).get("id")
                        if contact_id:
                            self.created_contact_ids.append(contact_id)
                        self.log_result(f"Contact complet {i}", True, f"Contact '{contact_data['nom']}' créé avec succès", {"id": contact_id})
                    else:
                        self.log_result(f"Contact complet {i}", False, f"Échec création contact '{contact_data['nom']}'", data)
                else:
                    self.log_result(f"Contact complet {i}", False, f"Status code: {response.status_code}", response.text)
                    
            except Exception as e:
                self.log_result(f"Contact complet {i}", False, f"Erreur: {str(e)}")

    def test_admin_dashboard_get_contacts(self):
        """Test 5: GET /api/contact - Endpoint principal du dashboard admin"""
        try:
            response = requests.get(f"{BASE_URL}/contact", timeout=10)
            
            if response.status_code == 200:
                contacts = response.json()
                if isinstance(contacts, list):
                    self.log_result("Admin Dashboard - GET Contacts", True, f"Dashboard peut récupérer {len(contacts)} contacts")
                    
                    # Vérifier la structure des données pour le dashboard
                    if len(contacts) > 0:
                        sample_contact = contacts[0]
                        required_fields = ['id', 'nom', 'email', 'telephone', 'dateCreation', 'statut']
                        missing_fields = [field for field in required_fields if field not in sample_contact]
                        
                        if not missing_fields:
                            self.log_result("Structure données dashboard", True, "Tous les champs requis présents pour l'affichage admin")
                        else:
                            self.log_result("Structure données dashboard", False, f"Champs manquants: {missing_fields}")
                    
                    # Vérifier que nos contacts de test sont présents
                    found_test_contacts = 0
                    for contact_id in self.created_contact_ids:
                        if any(contact.get('id') == contact_id for contact in contacts):
                            found_test_contacts += 1
                    
                    if found_test_contacts > 0:
                        self.log_result("Persistance données", True, f"{found_test_contacts}/{len(self.created_contact_ids)} contacts de test trouvés")
                    else:
                        self.log_result("Persistance données", False, "Aucun contact de test trouvé dans la base")
                        
                else:
                    self.log_result("Admin Dashboard - GET Contacts", False, "Format de réponse incorrect", contacts)
            else:
                self.log_result("Admin Dashboard - GET Contacts", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result("Admin Dashboard - GET Contacts", False, f"Erreur: {str(e)}")

    def test_admin_dashboard_stats(self):
        """Test 6: GET /api/contact/stats - Endpoint statistiques du dashboard admin"""
        try:
            response = requests.get(f"{BASE_URL}/contact/stats", timeout=10)
            
            if response.status_code == 200:
                stats = response.json()
                if stats.get("success", False) and "data" in stats:
                    data = stats["data"]
                    required_stats = ["total_requests", "by_service", "last_updated"]
                    missing_stats = [stat for stat in required_stats if stat not in data]
                    
                    if not missing_stats:
                        total = data["total_requests"]
                        by_service = data["by_service"]
                        self.log_result("Admin Dashboard - Statistiques", True, f"Stats complètes - Total: {total}, Services: {len(by_service)}", data)
                        
                        # Vérifier que les statistiques reflètent nos données de test
                        if total >= len(self.created_contact_ids):
                            self.log_result("Cohérence statistiques", True, f"Total requests ({total}) cohérent avec les données créées")
                        else:
                            self.log_result("Cohérence statistiques", False, f"Total requests ({total}) inférieur aux contacts créés ({len(self.created_contact_ids)})")
                    else:
                        self.log_result("Admin Dashboard - Statistiques", False, f"Champs statistiques manquants: {missing_stats}", stats)
                else:
                    self.log_result("Admin Dashboard - Statistiques", False, "Structure de réponse incorrecte", stats)
            else:
                self.log_result("Admin Dashboard - Statistiques", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result("Admin Dashboard - Statistiques", False, f"Erreur: {str(e)}")

    def test_performance_multiple_requests(self):
        """Test 7: Performance des endpoints avec plusieurs requêtes simultanées"""
        import concurrent.futures
        import threading
        
        def make_request(endpoint):
            try:
                start_time = time.time()
                response = requests.get(f"{BASE_URL}{endpoint}", timeout=10)
                end_time = time.time()
                return {
                    "endpoint": endpoint,
                    "status_code": response.status_code,
                    "response_time": end_time - start_time,
                    "success": response.status_code == 200
                }
            except Exception as e:
                return {
                    "endpoint": endpoint,
                    "status_code": 0,
                    "response_time": 0,
                    "success": False,
                    "error": str(e)
                }
        
        endpoints = ["/contact", "/contact/stats"] * 5  # 10 requêtes total
        
        try:
            with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
                futures = [executor.submit(make_request, endpoint) for endpoint in endpoints]
                results = [future.result() for future in concurrent.futures.as_completed(futures)]
            
            successful_requests = [r for r in results if r["success"]]
            failed_requests = [r for r in results if not r["success"]]
            
            if len(successful_requests) >= 8:  # Au moins 80% de succès
                avg_response_time = sum(r["response_time"] for r in successful_requests) / len(successful_requests)
                self.log_result("Performance endpoints", True, f"{len(successful_requests)}/{len(results)} requêtes réussies, temps moyen: {avg_response_time:.2f}s")
            else:
                self.log_result("Performance endpoints", False, f"Seulement {len(successful_requests)}/{len(results)} requêtes réussies")
                
        except Exception as e:
            self.log_result("Performance endpoints", False, f"Erreur test performance: {str(e)}")

    def run_all_tests(self):
        """Exécuter tous les tests pour le dashboard admin"""
        print("=" * 70)
        print("SPACIO+ ADMIN DASHBOARD BACKEND TEST SUITE")
        print("=" * 70)
        print(f"Testing API at: {BASE_URL}")
        print("Focus: Admin Dashboard endpoints /api/contact et /api/contact/stats")
        print()
        
        # Run all tests
        self.test_api_root()
        self.test_contact_form_required_fields()
        self.test_contact_form_field_validation()
        self.test_complete_contact_forms()
        self.test_admin_dashboard_get_contacts()
        self.test_admin_dashboard_stats()
        self.test_performance_multiple_requests()
        
        # Print summary
        print("=" * 70)
        print("TEST SUMMARY")
        print("=" * 70)
        print(f"Total Tests: {self.total_tests}")
        print(f"Passed: {self.passed_tests}")
        print(f"Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests)*100:.1f}%")
        print(f"Contacts créés pour test: {len(self.created_contact_ids)}")
        print()
        
        if self.failed_tests > 0:
            print("FAILED TESTS:")
            for result in self.results:
                if "❌" in result["status"]:
                    print(f"- {result['test']}: {result['message']}")
        
        return self.failed_tests == 0

if __name__ == "__main__":
    test_suite = SpacioAdminTestSuite()
    success = test_suite.run_all_tests()
    sys.exit(0 if success else 1)
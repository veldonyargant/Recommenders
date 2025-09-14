#!/usr/bin/env python3
"""
Backend Test Suite for Spacio+ API
Tests the enhanced contact form and API endpoints
"""

import requests
import json
import sys
from datetime import datetime
import time

# Backend URL from frontend/.env
BASE_URL = "https://spacioplus-web.preview.emergentagent.com/api"

class SpacioTestSuite:
    def __init__(self):
        self.results = []
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = 0
        
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
        """Test 2: Validation des champs requis (nom, email, typeService)"""
        
        # Test avec champs manquants
        test_cases = [
            {
                "name": "Sans nom",
                "data": {"email": "test@test.com", "typeService": "residentiel"},
                "should_fail": True
            },
            {
                "name": "Sans email", 
                "data": {"nom": "Test User", "typeService": "residentiel"},
                "should_fail": True
            },
            {
                "name": "Sans typeService",
                "data": {"nom": "Test User", "email": "test@test.com"},
                "should_fail": True
            },
            {
                "name": "Avec champs requis minimum",
                "data": {"nom": "Test User", "email": "test@test.com", "typeService": "residentiel"},
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
                        self.log_result(f"Validation - {case['name']}", True, "Validation réussit comme attendu")
                    else:
                        self.log_result(f"Validation - {case['name']}", False, "Devrait réussir mais a échoué", response.json())
                        
            except Exception as e:
                self.log_result(f"Validation - {case['name']}", False, f"Erreur: {str(e)}")

    def test_contact_form_field_validation(self):
        """Test 3: Validation des choix multiples et formats"""
        
        base_data = {"nom": "Test User", "email": "test@test.com", "typeService": "residentiel"}
        
        validation_tests = [
            {
                "name": "typeService invalide",
                "data": {**base_data, "typeService": "invalide"},
                "should_fail": True
            },
            {
                "name": "typeService valide - commercial",
                "data": {**base_data, "typeService": "commercial"},
                "should_fail": False
            },
            {
                "name": "superficie invalide",
                "data": {**base_data, "superficie": "invalide"},
                "should_fail": True
            },
            {
                "name": "superficie valide - moyen",
                "data": {**base_data, "superficie": "moyen"},
                "should_fail": False
            },
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
                "name": "téléphone valide",
                "data": {**base_data, "telephone": "(819) 555-1234"},
                "should_fail": False
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
                        self.log_result(f"Validation champs - {case['name']}", True, "Validation réussit comme attendu")
                    else:
                        self.log_result(f"Validation champs - {case['name']}", False, "Devrait réussir mais a échoué", response.json())
                        
            except Exception as e:
                self.log_result(f"Validation champs - {case['name']}", False, f"Erreur: {str(e)}")

    def test_complete_contact_form(self):
        """Test 4: Test avec données complètes comme spécifié dans la demande"""
        
        complete_data = {
            "nom": "Marie Dubois",
            "email": "marie@test.com", 
            "telephone": "(819) 555-1234",
            "typeService": "residentiel",
            "superficie": "moyen",
            "frequence": "bihebdomadaire", 
            "adresse": "123 Rue Test, Gatineau, QC",
            "datePreferee": "2024-12-25",
            "message": "Nettoyage maison 2 étages"
        }
        
        try:
            response = requests.post(f"{BASE_URL}/contact", json=complete_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success", False):
                    self.log_result("Formulaire complet", True, "Données complètes acceptées", data)
                    # Store the ID for later verification
                    self.contact_id = data.get("data", {}).get("id")
                else:
                    self.log_result("Formulaire complet", False, "Échec avec données complètes", data)
            else:
                self.log_result("Formulaire complet", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result("Formulaire complet", False, f"Erreur: {str(e)}")

    def test_get_contacts(self):
        """Test 5: GET /api/contact pour vérifier la sauvegarde"""
        try:
            response = requests.get(f"{BASE_URL}/contact", timeout=10)
            
            if response.status_code == 200:
                contacts = response.json()
                if isinstance(contacts, list):
                    self.log_result("GET Contacts", True, f"Récupération réussie - {len(contacts)} contacts trouvés")
                    
                    # Verify our test contact exists
                    if hasattr(self, 'contact_id') and self.contact_id:
                        found_contact = any(contact.get('id') == self.contact_id for contact in contacts)
                        if found_contact:
                            self.log_result("Vérification sauvegarde", True, "Contact test trouvé dans la base")
                        else:
                            self.log_result("Vérification sauvegarde", False, "Contact test non trouvé dans la base")
                else:
                    self.log_result("GET Contacts", False, "Format de réponse incorrect", contacts)
            else:
                self.log_result("GET Contacts", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result("GET Contacts", False, f"Erreur: {str(e)}")

    def test_contact_stats(self):
        """Test 6: GET /api/contact/stats pour les statistiques"""
        try:
            response = requests.get(f"{BASE_URL}/contact/stats", timeout=10)
            
            if response.status_code == 200:
                stats = response.json()
                if stats.get("success", False) and "data" in stats:
                    data = stats["data"]
                    if "total_requests" in data and "by_service" in data:
                        self.log_result("Statistiques contacts", True, f"Stats récupérées - Total: {data['total_requests']}", data)
                    else:
                        self.log_result("Statistiques contacts", False, "Structure de données incorrecte", stats)
                else:
                    self.log_result("Statistiques contacts", False, "Réponse incorrecte", stats)
            else:
                self.log_result("Statistiques contacts", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result("Statistiques contacts", False, f"Erreur: {str(e)}")

    def test_all_service_types(self):
        """Test 7: Vérifier tous les types de service disponibles"""
        base_data = {"nom": "Test Service", "email": "service@test.com"}
        service_types = ['residentiel', 'commercial', 'apres-travaux', 'assainissement']
        
        for service_type in service_types:
            try:
                test_data = {**base_data, "typeService": service_type}
                response = requests.post(f"{BASE_URL}/contact", json=test_data, timeout=10)
                
                if response.status_code == 200 and response.json().get("success", False):
                    self.log_result(f"Service type - {service_type}", True, f"Type de service '{service_type}' accepté")
                else:
                    self.log_result(f"Service type - {service_type}", False, f"Type de service '{service_type}' rejeté", response.json())
                    
            except Exception as e:
                self.log_result(f"Service type - {service_type}", False, f"Erreur: {str(e)}")

    def run_all_tests(self):
        """Exécuter tous les tests"""
        print("=" * 60)
        print("SPACIO+ BACKEND TEST SUITE")
        print("=" * 60)
        print(f"Testing API at: {BASE_URL}")
        print()
        
        # Run all tests
        self.test_api_root()
        self.test_contact_form_required_fields()
        self.test_contact_form_field_validation()
        self.test_complete_contact_form()
        self.test_get_contacts()
        self.test_contact_stats()
        self.test_all_service_types()
        
        # Print summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.total_tests}")
        print(f"Passed: {self.passed_tests}")
        print(f"Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests)*100:.1f}%")
        print()
        
        if self.failed_tests > 0:
            print("FAILED TESTS:")
            for result in self.results:
                if "❌" in result["status"]:
                    print(f"- {result['test']}: {result['message']}")
        
        return self.failed_tests == 0

if __name__ == "__main__":
    test_suite = SpacioTestSuite()
    success = test_suite.run_all_tests()
    sys.exit(0 if success else 1)
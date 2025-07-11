import React from "react";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  UserCheck,
} from "lucide-react";

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Politique de confidentialité
                </h1>
                <p className="text-gray-600">
                  Dernière mise à jour : 15 janvier 2025
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Lock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Votre vie privée est notre priorité
                  </h3>
                  <p className="text-blue-800">
                    Chez Sleep Harmony, nous comprenons que vous nous confiez
                    des informations sensibles sur votre vie de couple et
                    familiale. Cette politique explique comment nous protégeons
                    et utilisons vos données personnelles.
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Database className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    1. Données que nous collectons
                  </h2>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Données d'inscription
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Prénom et adresse email</li>
                  <li>
                    Informations sur votre situation familiale (âge du bébé,
                    durée de relation)
                  </li>
                  <li>Défis et objectifs relationnels</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Données d'utilisation
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Informations sur le sommeil de votre bébé</li>
                  <li>Évaluations de votre humeur et relation de couple</li>
                  <li>
                    Interactions avec l'application (pages visitées,
                    fonctionnalités utilisées)
                  </li>
                  <li>
                    Données techniques (adresse IP, type de navigateur, système
                    d'exploitation)
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Données de paiement
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Les informations de paiement sont traitées de manière
                  sécurisée par notre prestataire de paiement certifié PCI DSS.
                  Nous ne stockons jamais vos données bancaires complètes.
                </p>
              </section>

              <section className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    2. Comment nous utilisons vos données
                  </h2>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Fourniture du service
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Personnaliser vos conseils et recommandations</li>
                  <li>
                    Analyser les corrélations entre sommeil de bébé et relation
                    de couple
                  </li>
                  <li>Générer vos rapports et tableaux de bord</li>
                  <li>Vous envoyer des notifications et rappels pertinents</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Communication
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Vous envoyer vos conseils personnalisés par email</li>
                  <li>Vous informer des mises à jour importantes du service</li>
                  <li>Répondre à vos questions et demandes de support</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Amélioration du service
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>
                    Analyser l'utilisation pour améliorer nos fonctionnalités
                  </li>
                  <li>Développer de nouveaux conseils et recommandations</li>
                  <li>Assurer la sécurité et prévenir les fraudes</li>
                </ul>
              </section>

              <section className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    3. Base légale du traitement
                  </h2>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Conformément au RGPD, nous traitons vos données personnelles
                  sur les bases légales suivantes :
                </p>

                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Exécution du contrat :</strong> pour fournir le
                    service Sleep Harmony
                  </li>
                  <li>
                    <strong>Consentement :</strong> pour l'envoi d'emails de
                    conseils personnalisés
                  </li>
                  <li>
                    <strong>Intérêt légitime :</strong> pour améliorer notre
                    service et assurer la sécurité
                  </li>
                  <li>
                    <strong>Obligation légale :</strong> pour la facturation et
                    la comptabilité
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="w-6 h-6 text-orange-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    4. Partage de vos données
                  </h2>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>
                    Nous ne vendons jamais vos données personnelles.
                  </strong>{" "}
                  Nous pouvons partager vos informations uniquement dans les cas
                  suivants :
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Prestataires de services
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>
                    Hébergement sécurisé des données (Supabase - conformité
                    RGPD)
                  </li>
                  <li>
                    Traitement des paiements (Stripe - certification PCI DSS)
                  </li>
                  <li>Envoi d'emails (prestataires certifiés RGPD)</li>
                  <li>Analytics anonymisées pour améliorer le service</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Obligations légales
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Nous pouvons divulguer vos informations si la loi l'exige ou
                  pour protéger nos droits légaux.
                </p>
              </section>

              <section className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Lock className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    5. Sécurité de vos données
                  </h2>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Nous mettons en place des mesures de sécurité techniques et
                  organisationnelles appropriées :
                </p>

                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Chiffrement des données en transit et au repos</li>
                  <li>
                    Accès restreint aux données sur la base du besoin d'en
                    connaître
                  </li>
                  <li>Surveillance continue de la sécurité</li>
                  <li>Sauvegardes régulières et sécurisées</li>
                  <li>
                    Formation régulière de nos équipes sur la protection des
                    données
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Conservation des données
                </h2>

                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Données de compte :</strong> conservées tant que
                    votre compte est actif
                  </li>
                  <li>
                    <strong>Données de suivi :</strong> conservées 3 ans après
                    la fin de votre abonnement
                  </li>
                  <li>
                    <strong>Données de facturation :</strong> conservées 10 ans
                    (obligation légale)
                  </li>
                  <li>
                    <strong>Données marketing :</strong> supprimées
                    immédiatement en cas de désinscription
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Vos droits
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Droit d'accès
                    </h4>
                    <p className="text-sm text-gray-600">
                      Obtenir une copie de vos données personnelles
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Droit de rectification
                    </h4>
                    <p className="text-sm text-gray-600">
                      Corriger des données inexactes ou incomplètes
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Droit à l'effacement
                    </h4>
                    <p className="text-sm text-gray-600">
                      Demander la suppression de vos données
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Droit à la portabilité
                    </h4>
                    <p className="text-sm text-gray-600">
                      Récupérer vos données dans un format structuré
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Droit d'opposition
                    </h4>
                    <p className="text-sm text-gray-600">
                      Vous opposer au traitement de vos données
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Droit de limitation
                    </h4>
                    <p className="text-sm text-gray-600">
                      Limiter le traitement de vos données
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mt-4">
                  Pour exercer ces droits, contactez-nous à{" "}
                  <strong>beats@latechnova.com</strong>. Nous répondrons dans un
                  délai maximum de 30 jours.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Cookies et technologies similaires
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Nous utilisons des cookies essentiels pour le fonctionnement
                  du service et des cookies d'analyse pour améliorer votre
                  expérience. Vous pouvez gérer vos préférences de cookies dans
                  les paramètres de votre navigateur.
                </p>

                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Cookies essentiels :</strong> nécessaires au
                    fonctionnement du site
                  </li>
                  <li>
                    <strong>Cookies d'analyse :</strong> pour comprendre
                    l'utilisation du service (anonymisés)
                  </li>
                  <li>
                    <strong>Cookies de préférences :</strong> pour mémoriser vos
                    choix
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Transferts internationaux
                </h2>

                <p className="text-gray-700 leading-relaxed">
                  Vos données sont principalement stockées dans l'Union
                  européenne. En cas de transfert vers des pays tiers, nous nous
                  assurons que des garanties appropriées sont en place (clauses
                  contractuelles types, décisions d'adéquation).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Modifications de cette politique
                </h2>

                <p className="text-gray-700 leading-relaxed">
                  Nous pouvons modifier cette politique de confidentialité. Les
                  modifications importantes vous seront notifiées par email au
                  moins 30 jours avant leur entrée en vigueur.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. Contact et réclamations
                </h2>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">
                    Délégué à la protection des données
                  </h3>
                  <p className="text-blue-800 mb-4">
                    Pour toute question concernant vos données personnelles :
                  </p>
                  <div className="text-blue-800">
                    <p>
                      <strong>Email :</strong> beats@latechnova.com
                    </p>
                    <p>
                      <strong>Courrier :</strong> 19 rue Alfred Brinon, 69100
                      Villeurbanne
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mt-4">
                  Si vous estimez que vos droits ne sont pas respectés, vous
                  pouvez introduire une réclamation auprès de la CNIL
                  (Commission Nationale de l'Informatique et des Libertés) :
                  <a
                    href="https://www.cnil.fr"
                    className="text-blue-600 hover:underline"
                  >
                    www.cnil.fr
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

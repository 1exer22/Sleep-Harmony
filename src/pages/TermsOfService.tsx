import React from "react";
import { ArrowLeft, FileText } from "lucide-react";

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
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
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Conditions d'utilisation
                </h1>
                <p className="text-gray-600">
                  Dernière mise à jour : 15 janvier 2025
                </p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Acceptation des conditions
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  En accédant et en utilisant Sleep Harmony ("le Service"), vous
                  acceptez d'être lié par ces Conditions d'utilisation. Si vous
                  n'acceptez pas ces conditions, veuillez ne pas utiliser notre
                  service.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Sleep Harmony est un service fourni par Sleep Harmony SAS,
                  société par actions simplifiée au capital de 10 000 euros,
                  immatriculée au RCS de Paris sous le numéro 123 456 789, dont
                  le siège social est situé au 123 Avenue des Champs-Élysées,
                  75008 Paris.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Description du service
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sleep Harmony est une application web qui aide les couples
                  avec bébé à comprendre comment le sommeil de leur enfant
                  affecte leur relation et à retrouver leur complicité. Le
                  service comprend :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>
                    Un système de suivi du sommeil de bébé et de l'humeur du
                    couple
                  </li>
                  <li>
                    Des analyses personnalisées des corrélations entre sommeil
                    et relation
                  </li>
                  <li>
                    Des conseils et recommandations adaptés à votre situation
                  </li>
                  <li>Un tableau de bord pour suivre vos progrès</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Inscription et compte utilisateur
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Pour utiliser Sleep Harmony, vous devez créer un compte en
                  fournissant des informations exactes et complètes. Vous êtes
                  responsable de maintenir la confidentialité de vos
                  identifiants de connexion.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Vous devez être âgé d'au moins 18 ans pour utiliser ce
                  service. En créant un compte, vous confirmez que vous
                  remplissez cette condition d'âge.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Période d'essai et abonnement
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sleep Harmony propose une période d'essai gratuite de 7 jours.
                  À l'issue de cette période, l'abonnement se renouvelle
                  automatiquement au tarif de 19€ par mois, sauf résiliation de
                  votre part.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Vous pouvez annuler votre abonnement à tout moment depuis
                  votre espace personnel ou en nous contactant. L'annulation
                  prend effet à la fin de la période de facturation en cours.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Conformément au droit de rétractation, vous disposez de 14
                  jours pour annuler votre abonnement sans justification et
                  obtenir un remboursement complet.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Utilisation acceptable
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Vous vous engagez à :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>
                    Utiliser le service uniquement à des fins personnelles et
                    légales
                  </li>
                  <li>
                    Fournir des informations exactes lors de votre inscription
                  </li>
                  <li>Respecter la confidentialité des autres utilisateurs</li>
                  <li>
                    Ne pas tenter de contourner les mesures de sécurité du
                    service
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Propriété intellectuelle
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Tous les contenus, fonctionnalités et technologies de Sleep
                  Harmony sont la propriété exclusive de Sleep Harmony SAS et
                  sont protégés par les lois sur la propriété intellectuelle.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Vous conservez la propriété des données personnelles que vous
                  nous fournissez, mais vous nous accordez une licence pour les
                  utiliser dans le cadre de la fourniture du service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Limitation de responsabilité
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sleep Harmony est un outil d'accompagnement et ne remplace pas
                  un conseil médical, psychologique ou thérapeutique
                  professionnel. En cas de difficultés importantes dans votre
                  couple, nous vous encourageons à consulter un professionnel
                  qualifié.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Notre responsabilité est limitée au montant des sommes versées
                  au titre de l'abonnement au cours des 12 derniers mois.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Protection des données
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Le traitement de vos données personnelles est régi par notre
                  Politique de confidentialité, qui fait partie intégrante de
                  ces conditions d'utilisation.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Modifications des conditions
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Nous nous réservons le droit de modifier ces conditions
                  d'utilisation à tout moment. Les modifications importantes
                  vous seront notifiées par email au moins 30 jours avant leur
                  entrée en vigueur.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Droit applicable et juridiction
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Ces conditions sont régies par le droit français. En cas de
                  litige, les tribunaux de Paris seront seuls compétents, après
                  tentative de résolution amiable.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. Contact
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Pour toute question concernant ces conditions d'utilisation,
                  vous pouvez nous contacter à :
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="text-gray-700">
                    <strong>Email :</strong> beats@latechnova.com
                    <br />
                    <strong>Adresse :</strong> 19 rue Alfred Brinon, 69100
                    Villeurbanne
                    <br />
                    <strong>Téléphone :</strong> +33 07 59 27 30 67
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

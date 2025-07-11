import React from "react";
import { CheckCircle, Mail, Heart, Clock, Star } from "lucide-react";

interface ThankYouScreenProps {
  email: string;
  firstName: string;
  onContinue: () => void;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({
  email,
  firstName,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>

        {/* Main Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          🎉 Merci {firstName} !
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          Vos identifiants Sleep Harmony seront envoyés à votre adresse email.
        </p>

        {/* Email Confirmation */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Mail className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Vos conseils arrivent bientôt !
            </h2>
          </div>

          <p className="text-lg text-gray-700 mb-4">
            Nous envoyons vos premiers conseils personnalisés à :
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-blue-800 font-semibold text-lg">{email}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-500" />
              <span className="text-gray-600">Vous serez recompensé</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-gray-600">Conseils personnalisés</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-600">Essai gratuit 7 jours</span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold mb-4">
            Ce qui vous attend maintenant :
          </h3>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email de bienvenue</h4>
                  <p className="text-blue-100 text-sm">
                    Vos premiers conseils personnalisés selon votre situation
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    Accès à votre tableau de bord
                  </h4>
                  <p className="text-blue-100 text-sm">
                    Suivez le sommeil de bébé et l'évolution de votre couple
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Conseils quotidiens</h4>
                  <p className="text-blue-100 text-sm">
                    Recommandations adaptées aux nuits de votre bébé
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Suivi de vos progrès</h4>
                  <p className="text-blue-100 text-sm">
                    Visualisez l'amélioration de votre relation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Tips */}
        {/* <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">
            💡 Conseils pour bien commencer
          </h3>
          <div className="text-left space-y-2 text-yellow-700">
            <p>
              • <strong>Ajoutez contact@sleepharmony.fr à vos contacts</strong>{" "}
              pour ne rien rater
            </p>
            <p>
              • <strong>Vérifiez vos spams</strong> si vous ne recevez pas
              l'email dans 5 minutes
            </p>
            <p>
              • <strong>Prenez 2 minutes chaque matin</strong> pour noter le
              sommeil de bébé
            </p>
          </div>
        </div> */}

        {/* CTA Button */}
        {/* <button
          onClick={onContinue}
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Parfait, j'ai hâte de commencer !
          <ArrowRight className="ml-2 w-5 h-5 inline" />
        </button> */}

        {/* Footer Note */}
        <p className="mt-8 text-gray-500 text-sm">
          Vous pouvez annuler votre essai à tout moment • Aucun engagement •
          Support 7j/7
        </p>
      </div>
    </div>
  );
};

export default ThankYouScreen;

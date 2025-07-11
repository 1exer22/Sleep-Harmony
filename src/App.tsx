import React, { useState } from 'react';
import QualificationModal from './components/QualificationModal';
import ThankYouScreen from './components/ThankYouScreen';
import { createEmailSignup } from './services/userService';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { 
  Heart, 
  Users, 
  Clock, 
  Moon, 
  Sun, 
  Baby, 
  MessageCircle, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Sparkles,
  RefreshCw
} from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showQualificationModal, setShowQualificationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'terms' | 'privacy'>('home');
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [thankYouData, setThankYouData] = useState<{ email: string; firstName: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEmail(true);
    setEmailError(null);
    
    if (email) {
      try {
        console.log('Soumission du formulaire avec email:', email);
        const result = await createEmailSignup({ email });
        console.log('Résultat de l\'inscription:', result);
        
        if (result.success) {
          console.log('Inscription réussie');
          setIsSubmitted(true);
        } else {
          console.error('Erreur d\'inscription:', result.error);
          setEmailError(result.error || 'Une erreur est survenue');
        }
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
        setEmailError('Erreur de connexion. Veuillez réessayer.');
      } finally {
        setIsSubmittingEmail(false);
      }
    } else {
      console.error('Email vide');
      setEmailError('Veuillez saisir une adresse email valide');
      setIsSubmittingEmail(false);
    }
  };

  const scrollToSignup = () => {
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openQualificationModal = () => {
    setShowQualificationModal(true);
  };

  const closeQualificationModal = () => {
    setShowQualificationModal(false);
  };

  if (currentPage === 'terms') {
    return <TermsOfService onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'privacy') {
    return <PrivacyPolicy onBack={() => setCurrentPage('home')} />;
  }

  const handleQualificationComplete = (data: any) => {
    console.log('Qualification data:', data);
    setShowQualificationModal(false);
    setThankYouData({ email: data.email, firstName: data.firstName });
    setShowThankYou(true);
  };

  const handleThankYouContinue = () => {
    setShowThankYou(false);
    setIsSubmitted(true);
  };

  if (showThankYou && thankYouData) {
    return (
      <ThankYouScreen
        email={thankYouData.email}
        firstName={thankYouData.firstName}
        onContinue={handleThankYouContinue}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Vous vous disputez tout le temps depuis l'arrivée de bébé ?
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Découvrez comment le sommeil de votre enfant influence votre couple et retrouvez votre complicité en quelques semaines
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-gray-700">Comprenez pourquoi vous vous disputez plus qu'avant</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-gray-700">Recevez des conseils personnalisés selon les nuits de bébé</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-gray-700">Retrouvez votre complicité sans culpabiliser</span>
                </div>
              </div>

              <button 
                onClick={openQualificationModal}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Commencer maintenant - Gratuit 7 jours
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </button>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-200 to-green-200 rounded-full flex items-center justify-center">
                  <div className="w-60 h-60 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <Heart className="w-16 h-16 text-red-400 mx-auto mb-4" />
                      <Users className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                      <Baby className="w-8 h-8 text-green-500 mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Difficultés Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Vous reconnaissez-vous dans ces situations ?
            </h2>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Disputes pour tout et n'importe quoi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                "Depuis l'accouchement, on se dispute constamment. Pour des broutilles qui nous faisaient rire avant. On ne se reconnaît plus."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Épuisement total qui change tout
              </h3>
              <p className="text-gray-600 leading-relaxed">
                "Le manque de sommeil nous rend fous. On n'a plus de patience l'un pour l'autre. Chaque nuit difficile = lendemain explosif."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Nostalgie de votre ancienne relation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                "Notre ancienne relation me manque. On était complices, maintenant on est comme des colocataires épuisés qui s'évitent."
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-2xl text-center">
              <p className="text-xl font-medium">
                Le problème n'est pas votre amour - c'est que personne ne vous a expliqué comment le sommeil de bébé transforme votre relation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Imaginez votre quotidien dans quelques semaines...
            </h2>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Comprendre au lieu de subir
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Vous savez pourquoi certains jours sont plus difficiles et comment vous préparer ensemble.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-100">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Équipe unie face aux défis
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Au lieu de vous disputer, vous travaillez ensemble. Chaque nuit difficile vous rapproche au lieu de vous diviser.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Complicité retrouvée
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Vous redécouvrez cette complicité qui vous manquait tant. Vous redevenez partenaires, pas adversaires.
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl text-center">
              <p className="text-xl font-medium">
                Et si le secret n'était pas de "faire plus d'efforts" mais de comprendre les vraies causes de vos tensions ?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sleep Harmony
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              L'application qui sauve les couples après bébé
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              La première application qui connecte le sommeil de votre bébé à l'harmonie de votre couple, avec des conseils personnalisés chaque jour.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                1. Notez en 30 secondes
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Chaque matin, notez comment bébé a dormi et votre humeur de couple
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                2. Comprenez les liens
              </h3>
              <p className="text-gray-600 leading-relaxed">
                L'application vous montre comment les nuits de bébé influencent votre relation
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                3. Recevez vos conseils
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Obtenez des recommandations personnalisées pour chaque situation
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-500">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    "Après avoir vécu cette période difficile avec ma femme, j'ai créé Sleep Harmony pour que d'autres couples ne traversent pas cette épreuve seuls. Vous n'êtes pas fous, vous n'êtes pas de mauvais parents - vous traversez juste une période que personne ne vous a expliquée."
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    - Thomas, papa de Léa et fondateur de Sleep Harmony
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section id="signup" className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Votre couple mérite de retrouver sa complicité
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Chaque jour d'attente, c'est un jour de plus de tensions inutiles. Commencez dès aujourd'hui.
            </p>
            
            {!isSubmitted ? (
              <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-auto">
                {emailError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{emailError}</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="email"
                      placeholder="Votre adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingEmail}
                    className={`w-full font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform shadow-lg ${
                      isSubmittingEmail
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 hover:scale-105 text-white'
                    }`}
                  >
                    {isSubmittingEmail ? 'Inscription en cours...' : 'Commencer mon évaluation gratuite'}
                  </button>
                </form>
                
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Sans engagement</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RefreshCw className="w-4 h-4 text-green-500" />
                      <span>Annulation en 1 clic</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Résultats visibles dès la première semaine</span>
                  </div>
                </div>
                
                <p className="mt-4 text-sm text-gray-500">
                  Puis seulement 19€/mois
                </p>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Merci pour votre inscription !
                  </h3>
                  <p className="text-gray-600">
                    Vous recevrez bientôt un email pour commencer votre essai gratuit de 7 jours.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Moon className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">Sleep Harmony</span>
            </div>
            <p className="text-gray-400 mb-6">
              L'application qui aide les couples à retrouver leur complicité après l'arrivée de bébé
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <span>© 2024 Sleep Harmony</span>
              <span>•</span>
              <button 
                onClick={() => setCurrentPage('terms')}
                className="hover:text-white transition-colors"
              >
                Conditions d'utilisation
              </button>
              <span>•</span>
              <button 
                onClick={() => setCurrentPage('privacy')}
                className="hover:text-white transition-colors"
              >
                Politique de confidentialité
              </button>
            </div>
          </div>
        </div>
      </footer>

      <QualificationModal
        isOpen={showQualificationModal}
        onClose={closeQualificationModal}
        onComplete={handleQualificationComplete}
      />
    </div>
  );
}

export default App;
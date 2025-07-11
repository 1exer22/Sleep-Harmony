import React, { useState } from 'react';
import { createUserWithQualification } from '../services/userService';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Heart, 
  Baby, 
  Clock, 
  Users, 
  MessageCircle,
  Moon,
  Scale,
  RefreshCw,
  AlertTriangle,
  Frown,
  Meh,
  Smile,
  CheckCircle,
  Mail,
  User
} from 'lucide-react';

interface QualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: FormData) => void;
}

interface FormData {
  babyAge: string;
  relationDuration: string;
  relationStatus: string;
  mainChallenges: string[];
  urgencyLevel: string;
  motivation: string;
  firstName: string;
  email: string;
  acceptsEmails: boolean;
}

const QualificationModal: React.FC<QualificationModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    babyAge: '',
    relationDuration: '',
    relationStatus: '',
    mainChallenges: [],
    urgencyLevel: '',
    motivation: '',
    firstName: '',
    email: '',
    acceptsEmails: false
  });

  const totalSteps = 8;

  const handleClose = () => {
    if (currentStep > 0) {
      setShowCloseConfirm(true);
    } else {
      onClose();
    }
  };

  const confirmClose = () => {
    setShowCloseConfirm(false);
    onClose();
  };

  const cancelClose = () => {
    setShowCloseConfirm(false);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOptionSelect = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: 'mainChallenges', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return formData.babyAge && formData.relationDuration;
      case 2: return formData.relationStatus;
      case 3: return formData.mainChallenges.length > 0;
      case 4: return formData.urgencyLevel;
      case 5: return formData.motivation;
      case 6: return formData.firstName && formData.email && formData.acceptsEmails;
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await createUserWithQualification(formData);
      
      if (result.success) {
        onComplete(formData);
      } else {
        setSubmitError(result.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setSubmitError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepIcon = (step: number) => {
    const icons = [Heart, Users, MessageCircle, AlertTriangle, Clock, Smile, Mail, CheckCircle];
    const Icon = icons[step];
    return <Icon className="w-5 h-5" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header with progress */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                {getStepIcon(currentStep)}
              </div>
              <span className="text-sm font-medium text-gray-600">
                Étape {currentStep + 1} sur {totalSteps}
              </span>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Parlons de votre situation
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Quelques questions rapides pour personnaliser votre expérience
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-700 font-medium">
                  ⏱️ 2 minutes maximum - Vos réponses restent confidentielles
                </p>
              </div>
            </div>
          )}

          {/* Step 1: Family situation */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Commençons par les bases
              </h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Quel âge a votre bébé ?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Moins de 3 mois',
                    '3-6 mois',
                    '6-12 mois',
                    'Plus de 12 mois'
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect('babyAge', option)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.babyAge === option
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Depuis combien de temps êtes-vous en couple ?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Moins de 2 ans',
                    '2-5 ans',
                    '5-10 ans',
                    'Plus de 10 ans'
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect('relationDuration', option)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.relationDuration === option
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Difficulty level */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Où en êtes-vous aujourd'hui ?
              </h2>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Comment décririez-vous votre relation depuis l'arrivée de bébé ?
              </h3>
              <div className="space-y-3">
                {[
                  { value: 'disputes', label: '😫 "On se dispute tout le temps"', color: 'red' },
                  { value: 'tendu', label: '😔 "C\'est tendu mais on s\'en sort"', color: 'orange' },
                  { value: 'ponctuel', label: '😐 "Quelques difficultés ponctuelles"', color: 'yellow' },
                  { value: 'bien', label: '🙂 "Ça va plutôt bien"', color: 'green' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect('relationStatus', option.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.relationStatus === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Main challenges */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quel est votre plus gros défi ?
              </h2>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Qu'est-ce qui vous pose le plus de difficultés ?
                <span className="text-sm font-normal text-gray-500 block mt-1">
                  (Vous pouvez sélectionner plusieurs réponses)
                </span>
              </h3>
              <div className="space-y-3">
                {[
                  { value: 'sommeil', label: '💤 Le manque de sommeil nous rend irritables' },
                  { value: 'communication', label: '🗣️ On ne communique plus comme avant' },
                  { value: 'repartition', label: '⚖️ Répartition inégale des tâches' },
                  { value: 'identite', label: '😢 Je ne me reconnais plus' },
                  { value: 'routine', label: '🔄 Routine trop lourde, pas de temps pour nous' },
                  { value: 'complicite', label: '💔 On a perdu notre complicité' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleMultiSelect('mainChallenges', option.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.mainChallenges.includes(option.value)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Urgency */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                À quel point c'est urgent ?
              </h2>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Si rien ne change, que craignez-vous le plus ?
              </h3>
              <div className="space-y-3">
                {[
                  { value: 'separation', label: '🚨 "Qu\'on finisse par se séparer"' },
                  { value: 'empire', label: '😰 "Que ça empire encore"' },
                  { value: 'routine', label: '😕 "De rester dans cette routine"' },
                  { value: 'pas-inquietude', label: '🤷 "Pas d\'inquiétude particulière"' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect('urgencyLevel', option.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.urgencyLevel === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Motivation */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Qu'est-ce qui vous ferait le plus plaisir ?
              </h2>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Dans 3 mois, votre rêve ce serait ?
              </h3>
              <div className="space-y-3">
                {[
                  { value: 'complicite', label: '💕 "Retrouver notre complicité d\'avant"' },
                  { value: 'equipe', label: '🤝 "Faire équipe au lieu de se disputer"' },
                  { value: 'serenite', label: '😌 "Être plus sereins au quotidien"' },
                  { value: 'famille', label: '👨‍👩‍👧 "Profiter vraiment de notre famille"' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect('motivation', option.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.motivation === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Contact info */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                C'est presque fini !
              </h2>
              <p className="text-gray-600 mb-6">
                Où peut-on vous envoyer vos premiers conseils personnalisés ?
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="acceptEmails"
                    checked={formData.acceptsEmails}
                    onChange={(e) => handleInputChange('acceptsEmails', e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="acceptEmails" className="text-sm text-gray-700">
                    J'accepte de recevoir des conseils personnalisés par email *
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Confirmation */}
          {currentStep === 7 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🎉 Merci ! Votre profil est créé
              </h2>
              
              <div className="text-left bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 mb-4">
                  Vos premiers conseils personnalisés arrivent dans votre boîte mail dans 2 minutes.
                </p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Votre essai gratuit de 7 jours commence maintenant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Vos réponses nous aident à personnaliser vos recommandations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Vous pouvez annuler à tout moment</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-700 text-sm">
                  💡 <strong>Conseil :</strong> Ajoutez contact@sleepharmony.fr à vos contacts pour ne rien rater !
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with navigation */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex justify-between items-center">
            {currentStep > 0 && currentStep < 7 && (
              <button
                onClick={prevStep}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Précédent</span>
              </button>
            )}
            
            {currentStep === 0 && <div />}
            
            {currentStep < 6 && (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  canProceed()
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>{currentStep === 0 ? "C'est parti !" : "Suivant"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            
            {currentStep === 6 && (
              <div>
                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{submitError}</p>
                  </div>
                )}
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  canProceed() && !isSubmitting
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Création de votre profil...' : 'Recevoir mes conseils personnalisés'}
              </button>
              </div>
            )}
            
            {currentStep === 7 && (
              <button
                onClick={() => onComplete(formData)}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Accéder à mon tableau de bord
              </button>
            )}
          </div>
          
          {currentStep > 0 && currentStep < 7 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Plus que {totalSteps - currentStep - 1} question{totalSteps - currentStep - 1 > 1 ? 's' : ''} !
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Close confirmation modal */}
      {showCloseConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Êtes-vous sûr de vouloir quitter ?
            </h3>
            <p className="text-gray-600 mb-6">
              Vos réponses seront perdues et vous devrez recommencer.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={cancelClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Continuer
              </button>
              <button
                onClick={confirmClose}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Quitter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualificationModal;
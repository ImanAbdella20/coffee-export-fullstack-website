import React, { FormEvent, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface SubscriptionProps {
  user: User | null;
}

const Subscription: React.FC<SubscriptionProps> = ({ user }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 4000); // Auto-hide after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/subscription/add`, {
        email,
        plan,
      });

      if (response.status === 201) {
        setSuccess(t('subscription.success', { email, plan: t(`subscription.plans.${plan}`) }));
      } else {
        throw new Error(t('subscription.errors.generic'));
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setError(t('subscription.errors.alreadySubscribed'));
      } else {
        setError(t('subscription.errors.generic'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscribtion flex flex-col items-center">
      <div className="w-full max-w-md p-8 relative top-5">
        <h1 className="subscribtionh1 font-bold text-center text-amber-800 mb-2">
          {t('subscription.title')}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          {t('subscription.description')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 relative top-10 flex justify-around gap-5">
          <input
            type="email"
            placeholder={t('subscription.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="monthly">{t('subscription.plans.monthly')}</option>
            <option value="yearly">{t('subscription.plans.yearly')}</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="subscribtionbtn w-full transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? t('subscription.processing') : t('subscription.submitButton')}
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <div className="mt-4 px-4 py-2 bg-green-100 text-green-800 border border-green-300 rounded-lg text-sm transition-opacity duration-500 animate-fade-in">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}
      </div>

      {/* Add Tailwind animation class */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Subscription;
import React from 'react';
import coffee1 from '../../assets/images/4.png';
import useInView from '../useInView';
import { useTranslation } from 'react-i18next';

const FeaturedCoffee = () => {
  const { t } = useTranslation();
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();

  return (
    <div className="featured bg-gray-100 py-12 flex items-center justify-center relative">
      <div className="featuredcontainer mx-auto px-4 text-center">
        {/* Section Title and Description */}
        <div className="titlediv mb-17 animate-fade-in absolute top-10 right-1/2 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
          <h2 className="titleheader font-bold text-brown-900 mb-4">
            {t('featured.title')}
          </h2>
          <p className="titlepara text-base text-gray-700 mb-6">
            {t('featured.description')}
          </p>
        </div>

        {/* Featured Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => {
            const ref = [ref1, ref2, ref3][index];
            const inView = [inView1, inView2, inView3][index];
            
            return (
              <div
                key={index}
                ref={ref}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ${
                  inView ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                } hover:scale-105 hover:shadow-xl hover:border-brown-900 hover:border-2`}
              >
                <div className="p-4">
                  <div className="flex justify-center">
                    <img
                      src={coffee1}
                      alt={t('featured.coffeeAlt')}
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-brown-900 mt-4 mb-2">
                    {t('featured.coffeeName')}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    {t('featured.coffeeDescription')}
                  </p>
                  <ul className="text-sm text-gray-700 mb-4">
                    <li>{t('featured.origin')}</li>
                    <li>{t('featured.flavorProfile')}</li>
                    <li>{t('featured.brewingMethod')}</li>
                  </ul>
                  <div className="flex justify-center space-x-3">
                    <a
                      href="/products"
                      className="featuredbutton inline-block py-1 px-4 bg-brown-900 text-white rounded-lg text-sm hover:bg-brown-800 transition-colors duration-300"
                    >
                      {t('featured.shopNow')}
                    </a>
                    <a
                      href="/blog/ethiopian-coffee"
                      className="featuredbutton inline-block py-1 px-4 border-2 border-brown-900 text-brown-900 rounded-lg text-sm hover:bg-brown-900 hover:text-white transition-colors duration-300"
                    >
                      {t('featured.learnMore')}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCoffee;
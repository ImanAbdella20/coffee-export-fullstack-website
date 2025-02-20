import React from 'react';
import { useTranslation } from 'react-i18next';
import coffee1 from '../../assets/images/coffees.png';
import { motion } from 'framer-motion';
import useInView from '../useInView';
import { FaCoffee, FaGlobe, FaHandsHelping } from 'react-icons/fa';


const OurStory = () => {
  const { t } = useTranslation();

  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();

  return (
    <div className="text-black h-full p-4 sm:p-6 lg:p-8">
      <div className="text-3xl font-bold text-center storyheader mb-8">
        <h2>{t("ourstory1.title")}</h2>
      </div>

      {/**story1 */}
      <motion.div
        ref={ref1}
        initial={{ opacity: 0, y: 50 }}
        animate={inView1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className='flex flex-col lg:flex-row items-center justify-center mb-8 storydiv'
      >
        <nav className="max-w-md text-center lg:text-left mb-4 lg:mb-0 lg:mr-8">
          <div className='flex'>
          <FaCoffee className="mx-auto  text-[#61300d] " size={48} /> 
          <h2 className="font-semibold mb-4 story2">{t("ourstory1.subtitle")}</h2>
          </div>
      
          <p className='story'>{t("ourstory1.description")}</p>
          
        </nav>
        <img src={coffee1} alt="" className='w-72' />
      </motion.div>

      {/**story2 */}
      <motion.div
        ref={ref2}
        initial={{ opacity: 0, x: 50 }}
        animate={inView2 ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='flex flex-col-reverse lg:flex-row items-center justify-center mb-8 storydiv'
      >
        <img src={coffee1} alt="" className='w-72 mb-4 lg:mb-0 lg:mr-8' />
        <nav className='max-w-md text-center lg:text-left'>
          <div className='flex'>
          <FaHandsHelping className="mx-auto  text-[#61300d] " size={48} />
          <h2 className="font-semibold mb-4 story2">{t("ourstory2.subtitle")}</h2>
          </div>
       
          <p className='story'>{t("ourstory2.description")}</p>
          
        </nav>
      </motion.div>

      {/**story3 */}
      <motion.div
        ref={ref3}
        initial={{ opacity: 0, y: 50 }}
        animate={inView3 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='flex flex-col lg:flex-row items-center justify-center mb-8 storydiv'
      >
        <nav className='max-w-md text-center lg:text-left mb-4 lg:mb-0 lg:mr-8'>
          <div className='flex'>
          <FaGlobe className="mx-auto  text-[#61300d]" size={48} /> 
          <h2 className="font-semibold mb-4 story2">{t("ourstory3.subtitle")}</h2>
          </div>
      
          <p className='story'>{t("ourstory3.description")}</p>
        
        </nav>
        <img src={coffee1} alt="" className='w-72' />
      </motion.div>
    </div>
  );
}

export default OurStory;

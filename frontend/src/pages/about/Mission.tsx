import React from 'react';
import { FaSeedling, FaGlobeAfrica, FaHandshake, FaMountain } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Mission = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="missionDiv  bg-gradient-to-b py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="missionHeader font-bold text-amber-900 font-serif">
            The Soul of Ethiopian Coffee
          </h2>
          <div className="mt-4 h-1 w-24 bg-amber-700 mx-auto rounded-full"></div>
        </motion.div>

        {/* Mission & Vision Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className=" grid md:grid-cols-2 gap-12"
        >
          {/* Mission Card */}
          <motion.div 
            variants={item}
            className="allMission relative bg-white rounded-3xl shadow-2xl overflow-hidden group"
          >
            <div className=" absolute inset-0 bg-[#AD7C59] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="eachMission p-10">
              <div className="flex items-center mb-8">
                <div className="bg-amber-100 p-4 rounded-full shadow-inner">
                  <FaSeedling className="text-amber-700 text-3xl" />
                </div>
                <h3 className="ml-6 text-3xl font-bold text-amber-900 font-serif">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To cultivate and share Ethiopia's coffee heritage with the world while empowering 
                our farming communities. We preserve traditional cultivation methods that have been 
                passed down for generations, ensuring each bean tells the story of its origin.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {['#EthiopianPride', '#FarmFirst', '#AuthenticFlavors'].map((tag) => (
                  <span 
                    key={tag}
                    className="inline-block bg-amber-100 rounded-full px-4 py-2 text-sm font-medium text-amber-800 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            variants={item}
            className="allMission relative bg-white rounded-3xl shadow-2xl overflow-hidden group"
          >
            <div className=" absolute inset-0 bg-gradient-to-br bg-[#AD7C59]  opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="eachVision p-10">
              <div className="flex items-center mb-8">
                <div className="bg-amber-100 p-4 rounded-full shadow-inner">
                  <FaGlobeAfrica className="text-amber-700 text-3xl" />
                </div>
                <h3 className="ml-6 text-3xl font-bold text-amber-900 font-serif">Our Vision</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To establish Ethiopian coffee as the global benchmark for quality and sustainability. 
                We envision a world where every cup connects drinkers to the rich soils and skilled 
                hands that make Ethiopian coffee truly exceptional.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {['#GlobalStandards', '#SustainableGrowth', '#CoffeeCulture'].map((tag) => (
                  <span 
                    key={tag}
                    className="inline-block bg-amber-100 rounded-full px-4 py-2 text-sm font-medium text-amber-800 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-28"
        >
          <h3 className="missionHeader text-3xl font-bold text-amber-900 text-center mb-16 font-serif">
            Pillars of Our Practice
          </h3>
          
          <div className="eachMission grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <FaHandshake className= "missionIcon text-amber-700 text-3xl" />,
                title: "Fair Partnerships",
                desc: "Direct trade relationships that honor farmers' expertise and labor"
              },
              { 
                icon: <FaSeedling className="text-amber-700 text-3xl" />,
                title: "Organic Integrity",
                desc: "Chemical-free cultivation preserving Ethiopia's pristine ecosystems"
              },
              { 
                icon: <FaMountain className="text-amber-700 text-3xl" />,
                title: "Terroir Respect",
                desc: "Celebrating the unique flavors of each growing region"
              },
              { 
                icon: <FaGlobeAfrica className="text-amber-700 text-3xl" />,
                title: "Cultural Legacy",
                desc: "Safeguarding centuries-old coffee traditions and knowledge"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.03 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center h-full flex flex-col"
              >
                <div className="bg-amber-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-amber-900 mb-4">{value.title}</h4>
                <p className="text-gray-700 mt-auto">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Mission;
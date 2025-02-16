import React from 'react'
import coffee1 from '../../assets/images/1.jpg'
import { useTranslation } from 'react-i18next'

const OurStory = () => {

    const { t } = useTranslation();
  return (
    <div className="text-black h-[200vh]">
      <div className="text-3xl font-bold">Our Story</div>
      <div className='flex'>
      <nav className="story py-8 px-6 ">
        
        <h2 className="text-2xl font-semibold mb-4">The Essence of Ethiopian Coffee</h2>
        <p>
          At IFNA Coffee, we are proud to bring the world the finest Ethiopian coffee, meticulously grown in the heart of Africa.
          Ethiopia, the birthplace of coffee, is home to some of the world’s most exceptional and aromatic beans, cultivated in the rich
          volcanic soils and lush highlands of the region. Our commitment is to deliver this rich legacy in every pack of coffee, bringing
          the unique flavors of Ethiopia to your doorstep.
          For centuries, the Ethiopian highlands have been blessed with the perfect combination of altitude, climate, and fertile soils,
          creating an ideal environment for coffee cultivation. Our farmers, guardians of this ancient tradition, practice sustainable farming
          methods passed down through generations, ensuring that each bean is nurtured with care and expertise.
          </p>
      </nav>

      <img src={coffee1} alt="" className='w-72 ' />
      </div>
     


    </div>
  )
}

export default OurStory;

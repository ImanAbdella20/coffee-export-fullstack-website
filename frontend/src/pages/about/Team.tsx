import React, { useState } from 'react'
import fuad from '../../assets/images/fuad.jpg'


// Define the types for social link and team member props
type SocialLink = {
  name: string;
  icon: string;
  url: string;
};

type TeamMemberProps = {
  image: string;
  name: string;
  role: string;
  socialLinks: SocialLink[];
};
const TeamMember: React.FC<TeamMemberProps> = ({ image, name, role, socialLinks }) => (
  <div className="flex flex-col eachmem">
    <img
      src={image}
      alt={name}
      className="mb-4 rounded-full w-32 h-32 object-cover"
    />
    <div className="text-xl font-semibold mb-2">{name}</div>
    <div className="text-gray-600 mb-4">{role}</div>

    {/* Social Media Icons */}
    <div className="flex space-x-4">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          className="text-xl hover:text-[#61300d]"
          aria-label={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
  </div>
);
const Team = () => {

  const teamMembers = [
    {
      name: 'Fuad Abdella',
      role: 'Software Engineer',
      image: fuad,
      socialLinks: [
        { name: 'LinkedIn', icon: '🔗', url: '#' },
        { name: 'GitHub', icon: '🐙', url: '#' },
        { name: 'Phone', icon: '📞', url: '#' },
      ]
    },
    {
      name: 'iman Abdella',
      role: 'Product Manager',
      image: fuad, // Replace with actual image
      socialLinks: [
        { name: 'LinkedIn', icon: '🔗', url: '#' },
        { name: 'GitHub', icon: '🐙', url: '#' },
        { name: 'Phone', icon: '📞', url: '#' },
      ]
    },
    {
      name: 'nesr Abdella',
      role: 'Product Manager',
      image: fuad, // Replace with actual image
      socialLinks: [
        { name: 'LinkedIn', icon: '🔗', url: '#' },
        { name: 'GitHub', icon: '🐙', url: '#' },
        { name: 'Phone', icon: '📞', url: '#' },
      ]
    },

    {
      name: 'amir Abdella',
      role: 'Product Manager',
      image: fuad, // Replace with actual image
      socialLinks: [
        { name: 'LinkedIn', icon: '🔗', url: '#' },
        { name: 'GitHub', icon: '🐙', url: '#' },
        { name: 'Phone', icon: '📞', url: '#' },
      ]
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle left and right button clicks
  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="h-screen justify-center items-center">
      <div className="text-center text-3xl font-bold mb-8">
        Meet Our <span className="text-[#61300d]">Team</span>
      </div>

      <div className="relative flex items-center">
        {/* Left arrow button */}

        <div className=''>
        <button className="absolute left-4 p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none buttons"
        onClick={handleLeftClick}
        >
          &#129168;
        </button>
        </div>
       

        {/* Team Member Info */}
        <div className="flex space-x-6 meminfo">
          {teamMembers
            .slice(currentIndex, currentIndex + 3) // Show 3 members at a time
            .map((member, index) => (
              <TeamMember
                key={index}
                image={member.image}
                name={member.name}
                role={member.role}
                socialLinks={member.socialLinks}
              />
            ))}
        </div>

        {/* Right arrow button */}

        <div>
        <button className="absolute right-4 p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none buttons"
        onClick={handleRightClick}
        >
          &#129170;
        </button>
        </div>
      
      </div>
    </div>
  )
}

export default Team

import React, { useState } from 'react';
import fuad from '../../assets/images/fuad.jpg';
import githubIcon from '../../assets/images/github.svg'; // assuming this is the image path
import { useTranslation } from 'react-i18next';

// Define the types for social link and team member props
type SocialLink = {
  name: string;
  icon: string | { github: string }; // Modify to support both string and object
  url: string;
};

type TeamMemberProps = {
  image: string;
  name: string;
  role: string;
  socialLinks: SocialLink[];
};

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, role, socialLinks }) => (

  <div className="flex flex-col items-center eachmem">
    <img
      src={image}
      alt={name}
      className="mb-4 rounded-full w-32 h-32 object-cover"
    />
    <div className="text-xl font-semibold mb-6 mt-4">{name}</div>
    <div className="text-gray-600 mb-4">{role}</div>

    {/* Social Media Icons */}
    <div className="flex space-x-4">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          className="text-xl "
          aria-label={link.name}
        >
          {typeof link.icon === 'string' ? (
            link.icon // Render the string (emoji, text) directly
          ) : (
            <img src={link.icon.github} alt="GitHub" className="w-6 h-6" /> // Render the image
          )}
        </a>
      ))}
    </div>
  </div>
);

const Team = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: 'Fuad Abdella',
      role: t('team.roles.softwareEngineer'),
      image: fuad,
      socialLinks: [
        { name: t('team.socialLinks.linkedIn'), icon: '🔗', url: '#' },
        { name: t('team.socialLinks.github'), icon: { github: githubIcon }, url: '#' }, // icon is now an object with the 'github' key
      ],
    },
    {
      name: 'Iman Abdella',
      role: t('team.roles.productManager'),
      image: fuad,
      socialLinks: [
        { name: t('team.socialLinks.linkedIn'), icon: '🔗', url: '#' },
        { name: t('team.socialLinks.github'), icon: { github: githubIcon }, url: '#' },
      ],
    },
    {
      name: 'Nesr Abdella',
      role: t('team.roles.productManager'),
      image: fuad,
      socialLinks: [
        { name: t('team.socialLinks.linkedIn'), icon: '🔗', url: '#' },
        { name: t('team.socialLinks.github'), icon: { github: githubIcon }, url: '#' },
      ],
    },
    {
      name: 'Amir Abdella',
      role: t('team.roles.productManager'),
      image: fuad,
      socialLinks: [
        { name: t('team.socialLinks.linkedIn'), icon: '🔗', url: '#' },
        { name: t('team.socialLinks.github'), icon: { github: githubIcon }, url: '#' },
      ],
    },
    {
      name: 'Mami Abdella',
      role: t('team.roles.productManager'),
      image: fuad,
      socialLinks: [
        { name: t('team.socialLinks.linkedIn'), icon: '🔗', url: '#' },
        { name: t('team.socialLinks.github'), icon: { github: githubIcon }, url: '#' },
      ],
    },
    {
      name: 'Babi Abdella',
      role: t('team.roles.productManager'),
      image: fuad,
      socialLinks: [
        { name: t('team.socialLinks.linkedIn'), icon: '🔗', url: '#' },
        { name: t('team.socialLinks.github'), icon: { github: githubIcon }, url: '#' },
      ],
    },
    {
      name: 'Nunesh Abdella',
      role: t('team.roles.productManager'),
      image: fuad,
      socialLinks: [
        { name: t('team.socialLinks.linkedIn'), icon: '🔗', url: '#' },
        { name: t('team.socialLinks.github'), icon: { github: githubIcon }, url: '#' },
      ],
    },
    {
      name: 'Ema Abdella',
      role: t('team.roles.productManager'),
      image: fuad,
      socialLinks: [
        { name: t('team.socialLinks.linkedIn'), icon: '🔗', url: '#' },
        { name: t('team.socialLinks.github'), icon: { github: githubIcon }, url: '#' },
      ],
    },
    {
      name: 'Aba Abdella',
      role: t('team.roles.productManager'),
      image: fuad,
      socialLinks: [
        { name: t('team.socialLinks.linkedIn'), icon: '🔗', url: '#' },
        { name: t('team.socialLinks.github'), icon: { github: githubIcon }, url: '#' },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle left and right button clicks
  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? teamMembers.length - 3 : prevIndex - 1)); 
    // This ensures we loop back to the end when at the beginning
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % teamMembers.length); 
    // This ensures we loop back to the beginning when at the end
  };

  return (
    <div className="teamdiv min-h-[75vh] flex flex-col ">
      <div className="text-center text-3xl font-bold teamcontainer">
      {t('team.title')} <span className="text-[#61300d]">{t('team.teamHighlight')}</span>
      </div>

      <div className="relative flex items-center w-full px-4">
        {/* Left arrow button */}
        <button
          className="absolute left-4 p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none buttons"
          onClick={handleLeftClick}
        >
          &#129168;
        </button>

        {/* Team Member Info */}
        <div className="flex justify-center space-x-6 w-full overflow-x-auto">
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
        <button
          className="absolute right-4 p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none buttons"
          onClick={handleRightClick}
        >
          &#129170;
        </button>
      </div>
    </div>
  );
};

export default Team;

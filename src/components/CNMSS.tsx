import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, Building, Users, MapPin, Globe, Award, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * Composant CNMSS - Page dédiée à la présentation de la CNMSS
 * Inclut des animations et des informations détaillées sur l'entreprise
 */
const CNMSS = () => {
  const { darkMode } = useTheme();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  // État séparé pour les sections dépliables
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  // Hooks pour les animations au scroll
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [infoRef, infoInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [alternanceRef, alternanceInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Effet pour gérer le scroll et mettre à jour la section active
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Ne mettre à jour que la section active pour la navigation, pas pour les sections dépliables
          if (sectionId && ['presentation', 'missions', 'equipe', 'alternance'].includes(sectionId)) {
            setActiveSection(sectionId);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fonction pour faire défiler jusqu'à une section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };
  
  // Fonction pour basculer l'état d'une section dépliable
  const toggleExpandedSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  // Animation pour les éléments qui apparaissent
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  // Animation pour les cartes
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation fixe en haut */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-800/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md shadow-sm'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              <ArrowLeft className="mr-2" />
              <span className="font-medium">Retour au portfolio</span>
            </motion.div>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            {['presentation', 'missions', 'equipe', 'alternance'].map((section) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section 
                    ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                    : (darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100')
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section === 'presentation' && 'Présentation'}
                {section === 'missions' && 'Missions'}
                {section === 'equipe' && 'Équipe'}
                {section === 'alternance' && 'Mon alternance'}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>
      
      {/* En-tête avec animation */}
      <section 
        id="header" 
        ref={headerRef}
        className="pt-32 pb-20 relative overflow-hidden"
        style={{
          background: darkMode 
            ? 'linear-gradient(135deg, #1a365d 0%, #2d3748 100%)' 
            : 'linear-gradient(135deg, #ebf4ff 0%, #e6fffa 100%)'
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="flex flex-col items-center text-center"
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <motion.div 
              className={`p-4 rounded-full mb-6 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
              whileHover={{ rotate: 360, transition: { duration: 1 } }}
            >
              <Building className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              CNMSS
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl font-medium mb-6"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Caisse Nationale Militaire de Sécurité Sociale
            </motion.h2>
            
            <motion.p 
              className="max-w-2xl text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Organisme de sécurité sociale dédié aux militaires et à leurs familles, 
              assurant une protection sociale complète et adaptée aux spécificités du métier militaire.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.button 
                onClick={() => scrollToSection('presentation')}
                className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-white text-blue-800' : 'bg-blue-600 text-white'} font-medium`}
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir la CNMSS
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Éléments décoratifs d'arrière-plan */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full z-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 0.1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-400" />
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-600" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-blue-500" />
        </motion.div>
      </section>
      
      {/* Section de présentation */}
      <section id="presentation" ref={infoRef} className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate={infoInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4">Présentation de la CNMSS</h2>
            <p className="max-w-3xl mx-auto">
              Créée en 1949, la CNMSS est l'organisme de sécurité sociale dédié aux militaires.
              Son siège est à Toulon et elle protège plus de 800 000 ressortissants en France et à l'étranger.
            </p>
          </motion.div>
          
          {/* Ajout des images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <img 
                src={`${import.meta.env.BASE_URL}CNMSS/logo-cnmss.png`} 
                alt="Logo de la CNMSS" 
                className="rounded-lg shadow-md max-w-full h-auto mb-2" 
              />
              <p className={`text-sm text-center mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Logo officiel de la CNMSS
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <img 
                src={`${import.meta.env.BASE_URL}CNMSS/image-site-cnmss.jpg`} 
                alt="Bâtiment de la CNMSS" 
                className="rounded-lg shadow-md max-w-full h-auto mb-2" 
              />
              <p className={`text-sm text-center mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Siège de la CNMSS à Toulon (La Garde)
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Building className="w-8 h-8" />,
                title: "Établissement public",
                description: "La CNMSS est un établissement public à caractère administratif sous tutelle du ministère des Armées, basé à Toulon."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Population protégée",
                description: "Elle assure la protection sociale de plus de 800 000 ressortissants, militaires d'active, retraités et leurs familles."
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Implantation",
                description: "Son siège est situé à Toulon (La Garde), avec une présence sur tout le territoire national via ses antennes."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Rayonnement",
                description: "La CNMSS intervient également pour les militaires en opérations extérieures et leurs familles partout dans le monde."
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Expertise",
                description: "Elle dispose d'une expertise unique dans la prise en charge des spécificités liées au métier militaire."
              },
              {
                icon: <Briefcase className="w-8 h-8" />,
                title: "Effectifs",
                description: "La CNMSS emploie environ 800 personnes, dont une majorité de personnels civils spécialisés."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate={infoInView ? "visible" : "hidden"}
                variants={cardVariants}
                className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} transition-colors duration-300`}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className={`p-3 rounded-lg mb-4 inline-block ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section des missions */}
      <section 
        id="missions" 
        ref={missionRef}
        className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4">Missions et valeurs</h2>
            <p className="max-w-3xl mx-auto">
              La CNMSS assure des missions essentielles adaptées aux spécificités du métier militaire,
              en France comme lors des opérations extérieures.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Assurance maladie",
                description: "Gestion du régime obligatoire d'assurance maladie des militaires et de leurs ayants droit, avec remboursement des soins et versement des prestations."
              },
              {
                title: "Action sanitaire et sociale",
                description: "Mise en œuvre d'une politique d'action sanitaire et sociale adaptée aux besoins spécifiques de la communauté militaire."
              },
              {
                title: "Prévention",
                description: "Développement d'actions de prévention et de promotion de la santé pour les militaires et leurs familles."
              },
              {
                title: "Soutien aux blessés",
                description: "Accompagnement spécifique des militaires blessés en service et de leurs familles, avec des dispositifs adaptés."
              }
            ].map((mission, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate={missionInView ? "visible" : "hidden"}
                variants={cardVariants}
                className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
              >
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className={`inline-block w-8 h-8 rounded-full mr-3 flex items-center justify-center ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
                    {i + 1}
                  </span>
                  {mission.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{mission.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 p-8 rounded-xl shadow-lg max-w-4xl mx-auto"
            style={{
              background: darkMode 
                ? 'linear-gradient(135deg, #2d3748 0%, #1a365d 100%)' 
                : 'linear-gradient(135deg, #ebf8ff 0%, #e6fffa 100%)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-center">Nos valeurs</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { value: "Service", description: "Engagement au service des militaires et de leurs familles" },
                { value: "Excellence", description: "Recherche constante de la qualité dans nos prestations" },
                { value: "Solidarité", description: "Soutien aux plus vulnérables de la communauté militaire" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="p-4"
                >
                  <h4 className={`text-xl font-bold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>{item.value}</h4>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Section équipe */}
      <section id="equipe" ref={teamRef} className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4">L'équipe informatique</h2>
            <p className="max-w-3xl mx-auto">
              La Direction des Systèmes d'Information (DSI) de la CNMSS est structurée en départements 
              spécialisés pour assurer le développement et la maintenance des systèmes d'information.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Direction des Systèmes d'Information",
                role: "DSI",
                description: "Pilotage stratégique des projets informatiques et coordination des différentes équipes techniques."
              },
              {
                name: "Équipe Développement",
                role: "Développeurs",
                description: "Conception et développement des applications métiers internes, maintenance évolutive et corrective. C'est dans cette équipe que j'ai effectué mon alternance."
              },
              {
                name: "Équipe Infrastructure",
                role: "Administrateurs systèmes et réseaux",
                description: "Gestion de l'infrastructure technique, sécurité des systèmes et maintenance du réseau."
              },
              {
                name: "Support utilisateurs",
                role: "Techniciens",
                description: "Assistance aux utilisateurs, résolution des incidents et formation sur les outils informatiques."
              },
              {
                name: "Gestion de projets",
                role: "Chefs de projets",
                description: "Coordination des projets informatiques, suivi des plannings et des ressources, relation avec les métiers."
              },
              {
                name: "Qualité et méthodes",
                role: "Experts",
                description: "Définition des standards de développement, contrôle qualité et amélioration continue des processus."
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate={teamInView ? "visible" : "hidden"}
                variants={cardVariants}
                className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className={`text-sm mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{member.role}</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section mon alternance */}
      <section 
        id="alternance" 
        ref={alternanceRef}
        className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate={alternanceInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4">Mon alternance à la CNMSS</h2>
            <p className="max-w-3xl mx-auto">
              En tant qu'alternant BTS SIO option SLAM au sein de l'équipe Développement, 
              j'ai contribué à la création et à l'amélioration d'applications stratégiques.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                title: "Missions principales",
                content: [
                  "Développement d'applications web avec PHP/Symfony",
                  "Maintenance évolutive et corrective",
                  "Participation aux phases de conception",
                  "Tests et documentation technique",
                  "Analyse des besoins métiers"
                ]
              },
              {
                title: "Compétences développées",
                content: [
                  "Framework Symfony et écosystème PHP",
                  "Bases de données PostgreSQL",
                  "Méthodologie de développement en équipe",
                  "Versioning avec Git",
                  "Communication avec les équipes métiers"
                ]
              },
              {
                title: "Projets réalisés",
                content: [
                  { name: "CODAH", path: "/#projects-codah", description: "Gestion des droits et habilitations" },
                  { name: "FIB", path: "/#projects-fib", description: "Gestion des implémentations bancaires" },
                  { name: "SIJ", path: "/#projects-sij", description: "Suivi des statistiques individuelles" }
                ]
              }
            ].map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={alternanceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`mb-8 p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
              >
                <motion.div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpandedSection(`section-${i}`);
                  }}
                >
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                  {expandedSections[`section-${i}`] ? <ChevronUp /> : <ChevronDown />}
                </motion.div>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: expandedSections[`section-${i}`] ? 'auto' : 0,
                    opacity: expandedSections[`section-${i}`] ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className={`mt-4 space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {section.content.map((item, j) => (
                      <motion.li 
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={expandedSections[`section-${i}`] ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.3, delay: j * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></span>
                        {typeof item === 'string' ? (
                          item
                        ) : (
                          <Link to={item.path} className="hover:text-blue-500 transition-colors">
                            <strong>{item.name}</strong> - {item.description}
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={alternanceInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link to="/">
              <motion.button 
                className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Retour au portfolio
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CNMSS; 
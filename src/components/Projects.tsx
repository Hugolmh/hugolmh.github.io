import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Définir le type pour un projet
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  additionalImages?: string[];
  additionalInfo?: string;
  icon: JSX.Element;
}

// Nouveau composant pour la popup
const ProjectPopup = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const { darkMode } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [project.image, ...(project.additionalImages || [])];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Gestion des touches clavier pour la navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
      if (e.key === 'ArrowRight') setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allImages.length, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50" onClick={onClose}>
      <div 
        className={`relative w-full h-full max-w-6xl max-h-[90vh] mx-auto my-auto p-6 overflow-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture en haut à droite */}
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 z-50 p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          aria-label="Fermer"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
        
        {/* Galerie d'images avec navigation */}
        <div className="relative mb-6 rounded-lg overflow-hidden">
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <img
              src={allImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Navigation des images */}
          {allImages.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${darkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-800'} hover:bg-opacity-100`}
                aria-label="Image précédente"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNextImage}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${darkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-800'} hover:bg-opacity-100`}
                aria-label="Image suivante"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Indicateur de position */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-blue-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Description</h4>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>
            
            {project.additionalInfo && (
              <div className="mb-4">
                <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Informations supplémentaires</h4>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.additionalInfo}</p>
              </div>
            )}
          </div>
          
          <div>
            <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fonctionnalités</h4>
            <ul className="space-y-2 mb-4">
              {project.features.map((feature, i) => (
                <li key={i} className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bouton de fermeture en bas */}
        <div className="mt-6 flex justify-center">
          <button 
            onClick={onClose} 
            className={`px-6 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const projects: Project[] = [ 
    {
      title: 'Codah',
      description: 'Application de gestion des dossiers administratifs pour les collectivités locales, facilitant le suivi et le traitement des demandes citoyennes.',
      image: `${import.meta.env.BASE_URL}Capture.PNG`,
      tags: ['En cours de développement'],
      features: [
        'En cours de développement',
        'En cours de développement',
        'En cours de développement',
        'En cours de développement',
      ],
      additionalImages: [
        `${import.meta.env.BASE_URL}Capture2.PNG`,
      ],
      additionalInfo: 'Cette application a été développée pour améliorer l\'efficacité des services administratifs.',
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: 'FIB',
      description: 'Plateforme de gestion financière intégrée pour les entreprises, offrant des outils de comptabilité, de facturation et de reporting financier.',
      image: `${import.meta.env.BASE_URL}Capture4.PNG`,
      tags: ['En cours de développement'],
      features: [
        'En cours de développement',
        'En cours de développement',
        'En cours de développement',
        'En cours de développement',
      ],
      additionalImages: [],
      additionalInfo: 'Cette plateforme permet une gestion financière simplifiée et efficace.',
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: 'SIJ',
      description: 'Système d\'information jeunesse permettant aux jeunes d\'accéder à des ressources, des événements et des opportunités locales.',
      image: `${import.meta.env.BASE_URL}Capture3.PNG`,
      tags: ['En cours de développement'],
      features: [
        'En cours de développement',
        'En cours de développement',
        'En cours de développement',
        'En cours de développement',
      ],
      additionalImages: [],
      additionalInfo: 'Ce système vise à renforcer l\'engagement des jeunes dans leur communauté.',
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: 'GSB',
      description: 'Développement d\'une application de gestion des frais pour le laboratoire pharmaceutique Galaxy Swiss Bourdin, permettant aux visiteurs médicaux de saisir et suivre leurs notes de frais.',
      image: `${import.meta.env.BASE_URL}gsb.jpg`,
      tags: ['BTS SIO', 'SLAM', 'Projet de développement'],
      features: [
        'Conception et développement d\'une application web en php, html, css, javascript, sql',
        'Mise en place d\'une base de données MySQL pour la gestion des utilisateurs et des frais.',
        'Implémentation d\'un système d\'authentification sécurisé pour les visiteurs médicaux.',
        'Fonctionnalités de saisie, modification et consultation des fiches de frais.',
        'Génération de rapports financiers pour le suivi des dépenses.',
        'Tests unitaires et fonctionnels pour assurer la fiabilité de l\'application.'
      ],
      additionalImages: [],
      additionalInfo: 'Ce projet a été réalisé dans le cadre du BTS SIO option SLAM, mettant en œuvre des compétences en développement web, gestion de bases de données et sécurité applicative.',
      icon: <Code className="w-6 h-6" />,
    },    
  ];

  return (
    <section id="projects" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Projets & Réalisations</h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Découvrez mes projets réalisés en formation et en entreprise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`rounded-lg shadow-lg overflow-hidden cursor-pointer ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors duration-300`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg mr-4 ${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-50 text-blue-500'}`}>
                    {project.icon}
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>
                </div>
                <ul className="space-y-2 mb-4">
                  {project.features.slice(0, 2).map((feature, i) => (
                    <li key={i} className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                  {project.features.length > 2 && (
                    <li className={`text-sm italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      + {project.features.length - 2} autres fonctionnalités...
                    </li>
                  )}
                </ul>
                
                {/* Indicateur de galerie d'images */}
                {project.additionalImages && project.additionalImages.length > 0 && (
                  <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'} flex items-center`}>
                    <span className="mr-2">Voir {project.additionalImages.length + 1} images</span>
                    <div className="flex space-x-1">
                      {[...Array(Math.min(3, project.additionalImages.length + 1))].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-blue-500" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectPopup project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Briefcase, GraduationCap, User } from 'lucide-react';
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
  category: 'entreprise' | 'ecole' | 'personnel';
  referentiel?: string[];
}

// Composant pour l'affichage d'une image en plein écran
const FullscreenImage = ({ 
  src, 
  alt, 
  onClose 
}: { 
  src: string; 
  alt: string; 
  onClose: () => void;
}) => {
  const { darkMode } = useTheme();
  
  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="relative max-w-[90vw] max-h-[90vh]"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-full object-contain" 
        />
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'} text-gray-800 dark:text-white`}
          aria-label="Fermer l'image en plein écran"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  );
};

// Nouveau composant pour la popup
const ProjectPopup = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const { darkMode } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const allImages = [project.image, ...(project.additionalImages || [])];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };
  
  const openFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFullscreenImage(allImages[currentImageIndex]);
  };

  // Gestion des touches clavier pour la navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreenImage) return; // Ne pas gérer les touches si l'image est en plein écran
      
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
      if (e.key === 'ArrowRight') setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allImages.length, onClose, fullscreenImage]);

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className={`relative w-full h-full max-w-6xl max-h-[90vh] mx-auto my-auto p-6 overflow-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg`}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture en haut à droite */}
        <motion.button 
          onClick={onClose}
          className={`absolute top-4 right-4 z-50 p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          aria-label="Fermer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={24} />
        </motion.button>

        <motion.h3 
          className="text-2xl font-semibold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {project.title}
        </motion.h3>
        
        {/* Galerie d'images avec navigation */}
        <motion.div 
          className="relative mb-6 rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="aspect-video bg-gray-900 flex items-center justify-center group">
            <motion.img
              src={allImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain cursor-pointer"
              onClick={openFullscreen}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Bouton pour agrandir l'image */}
            <motion.button
              onClick={openFullscreen}
              className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'} text-gray-800 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity`}
              aria-label="Voir en plein écran"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Maximize2 size={20} />
            </motion.button>
          </div>
          
          {/* Navigation des images */}
          {allImages.length > 1 && (
            <>
              <motion.button 
                onClick={handlePrevImage}
                className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${darkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-800'} hover:bg-opacity-100`}
                aria-label="Image précédente"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button 
                onClick={handleNextImage}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${darkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-800'} hover:bg-opacity-100`}
                aria-label="Image suivante"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={24} />
              </motion.button>
              
              {/* Indicateur de position */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {allImages.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-blue-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Description</h4>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>
            
            {project.additionalInfo && (
              <div className="mb-4">
                <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Informations supplémentaires</h4>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.additionalInfo}</p>
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fonctionnalités</h4>
            <ul className="space-y-2 mb-4">
              {project.features.map((feature, i) => (
                <motion.li 
                  key={i} 
                  className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {feature}
                </motion.li>
              ))}
            </ul>
            
            {/* Référentiel BTS SIO */}
            {project.referentiel && (
              <div className="mt-4">
                <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Référentiel BTS SIO</h4>
                <ul className="space-y-2 mb-4">
                  {project.referentiel.map((ref, i) => (
                    <li key={i} className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Bouton de fermeture en bas */}
        <motion.div 
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button 
            onClick={onClose} 
            className={`px-6 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Fermer
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Affichage de l'image en plein écran */}
      <AnimatePresence>
        {fullscreenImage && (
          <FullscreenImage 
            src={fullscreenImage} 
            alt={`${project.title} - Vue plein écran`} 
            onClose={() => setFullscreenImage(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * Composant Projects - Affiche les projets réalisés avec des détails et des captures d'écran
 * Permet de visualiser les images en plein écran pour une présentation détaillée
 */
const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'entreprise' | 'ecole' | 'personnel'>('all');
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
      description: 'Application de consultation des droits, accès et habiliataion',
      image: `${import.meta.env.BASE_URL}Capture.PNG`,
      tags: ['En cours de développement', 'PHP', 'Symfony'],
      features: [
        'Recherche par utilisateur et département',
        'Accès aux référentiels multiples pour une gestion optimisée',
        'Extraction de données via un bouton Excel pour une analyse approfondie',
        'Suivi des droits et habilitations en temps réel',
      ],
      additionalImages: [
        `${import.meta.env.BASE_URL}Capture2.PNG`,
      ],
      additionalInfo: 'Cette application a été développée pour améliorer l\'efficacité des services administratifs.',
      icon: <Briefcase className="w-6 h-6" />,
      category: 'entreprise',
      referentiel: [
        'Mettre à disposition des utilisateurs un service informatique',
        'Travailler en mode projet',
        'Développer la présence en ligne de l\'organisation',
        'Répondre aux incidents et aux demandes d\'assistance et d\'évolution',
        'Gérer le patrimoine informatique'
      ]
    },
    {
      title: 'FIB',
      description: 'Application de fichier des implementations bancaires',
      image: `${import.meta.env.BASE_URL}Capture4.PNG`,
      tags: ['En cours de développement', 'PHP', 'Symfony'],
      features: [
        'Fusion de plusieurs fichiers de la Banque de France pour rechercher par code banque ou code guichet',
        'Accès aux informations bancaires',
        'Recherche avancée par département ou ville',
      ],
      additionalImages: [],
      additionalInfo: 'Cette plateforme permet une gestion financière simplifiée et efficace.',
      icon: <Briefcase className="w-6 h-6" />,
      category: 'entreprise',
      referentiel: [
        'Mettre à disposition des utilisateurs un service informatique',
        'Travailler en mode projet',
        'Développer la présence en ligne de l\'organisation',
        'Répondre aux incidents et aux demandes d\'assistance et d\'évolution',
        'Gérer le patrimoine informatique'
      ]
    },
    {
      title: 'SIJ',
      description: 'Application de suivi des statistiques individuelles journalières',
      image: `${import.meta.env.BASE_URL}Capture3.PNG`,
      tags: ['En cours de développement', 'PHP', 'Symfony'],
      features: [
        'Suivi des performances individuelles au quotidien',
        'Visualisation des statistiques sous forme de tableaux',
        'Espace personnel pour consulter et analyser les données avec différents niveaux d\'habilitation : N0, N1, N2',
      ],
      additionalImages: [],
      additionalInfo: 'Cette application permet aux utilisateurs de suivre leurs progrès quotidiens et d\'analyser leurs performances.',
      icon: <Briefcase className="w-6 h-6" />,
      category: 'entreprise',
      referentiel: [
        'Mettre à disposition des utilisateurs un service informatique',
        'Travailler en mode projet',
        'Développer la présence en ligne de l\'organisation',
        'Répondre aux incidents et aux demandes d\'assistance et d\'évolution',
        'Gérer le patrimoine informatique'
      ]
    },
    {
      title: 'GSB',
      description: 'Développement d\'une application de gestion des frais pour le laboratoire pharmaceutique Galaxy Swiss Bourdin, permettant aux visiteurs médicaux de saisir et suivre leurs notes de frais.',
      image: `${import.meta.env.BASE_URL}gsb.jpg`,
      tags: ['BTS SIO', 'SLAM', 'Projet de développement', 'PHP', 'MySQL'],
      features: [
        'Conception et développement d\'une application web en php, javascript, sql',
        'Mise en place d\'une base de données MySQL pour la gestion des utilisateurs et des frais.',
        'Implémentation d\'un système d\'authentification sécurisé pour les visiteurs médicaux.',
        'Fonctionnalités de saisie, modification et consultation des fiches de frais.',
        'Tests unitaires et fonctionnels pour assurer la fiabilité de l\'application.'
      ],
      additionalImages: [],
      additionalInfo: 'Ce projet a été réalisé dans le cadre du BTS SIO option SLAM, mettant en œuvre des compétences en développement web, gestion de bases de données et sécurité applicative.',
      icon: <GraduationCap className="w-6 h-6" />,
      category: 'ecole',
      referentiel: [
        'Mettre à disposition des utilisateurs un service informatique',
        'Travailler en mode projet',
        'Développer la présence en ligne de l\'organisation',
        'Répondre aux incidents et aux demandes d\'assistance et d\'évolution',
        'Gérer le patrimoine informatique',
        'Organiser son développement professionnel'
      ]
    },
    {
      title: 'Nolark',
      description: 'Site web de vente de casques de moto en ligne avec catalogue de produits, système de filtrage et informations sur la sécurité routière.',
      image: `${import.meta.env.BASE_URL}nolark.jpg`,
      tags: ['BTS SIO', 'SLAM', 'HTML/CSS', 'JavaScript', 'PHP'],
      features: [
        'Développement d\'un site web responsive avec HTML5, CSS3 et JavaScript',
        'Catalogue de produits avec système de filtrage par catégorie et prix',
        'Formulaire de contact avec validation côté client et serveur',
        'Section informative sur la sécurité routière et les normes des casques',
        'Intégration de vente avec graphiques interactifs',
        'Optimisation pour le référencement naturel (SEO)'
      ],
      additionalImages: [
        `${import.meta.env.BASE_URL}nolark2.jpg`,
        `${import.meta.env.BASE_URL}nolark3.jpg`
      ],
      additionalInfo: 'Projet pédagogique réalisé dans le cadre du BTS SIO pour mettre en pratique les compétences en développement web front-end et back-end. Le site est accessible à l\'adresse http://nolark.it-fernandeztony.com/',
      icon: <GraduationCap className="w-6 h-6" />,
      category: 'ecole',
      referentiel: [
        'Développer la présence en ligne de l\'organisation',
        'Répondre aux incidents et aux demandes d’assistance et d’évolution',
        'Travailler en mode projet',
        'Mettre à disposition des utilisateurs un service informatique',
        'Organiser son développement professionnel',
        'Gérer le patrimoine informatique'
      ]
    },
    {
      title: 'Portfolio Personnel',
      description: 'Développement de mon portfolio personnel avec React, TypeScript et Tailwind CSS pour présenter mes compétences et projets.',
      image: `${import.meta.env.BASE_URL}preview.png`,
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      features: [
        'Conception et développement d\'une interface utilisateur moderne et responsive',
        'Implémentation d\'animations fluides avec Framer Motion',
        'Mode sombre/clair avec persistance des préférences',
        'Présentation détaillée des projets avec galerie d\'images',
        'Système de notation des compétences avec étoiles',
        'Optimisation des performances et du référencement'
      ],
      additionalImages: [],
      additionalInfo: 'Ce portfolio a été développé en dehors du cadre scolaire pour mettre en valeur mes compétences et projets. Il est régulièrement mis à jour avec mes dernières réalisations.',
      icon: <User className="w-6 h-6" />,
      category: 'personnel',
      referentiel: [
        'Développer la présence en ligne de l\'organisation',
        'Organiser son développement professionnel',
        'Gérer son identité professionnelle'
      ]
    }
  ];

  // Filtrer les projets en fonction du filtre sélectionné
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
          
          {/* Filtres de projets */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all' 
                ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
                : (darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tous les projets
            </motion.button>
            
            <motion.button
              onClick={() => setFilter('entreprise')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'entreprise' 
                ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
                : (darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Projets d'entreprise
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => setFilter('ecole')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'ecole' 
                ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
                : (darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Projets scolaires
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => setFilter('personnel')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'personnel' 
                ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
                : (darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Projets personnels
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Affichage des projets filtrés */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {filteredProjects.length === 0 ? (
              <motion.div 
                className={`col-span-2 text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Aucun projet ne correspond à ce filtre.
              </motion.div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`rounded-lg shadow-lg overflow-hidden cursor-pointer ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-all duration-300`}
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 overflow-hidden group">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    
                    {/* Indicateur de catégorie */}
                    <div className="absolute top-4 left-4">
                      <motion.div 
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                          project.category === 'entreprise' 
                            ? 'bg-blue-500/80 text-white' 
                            : project.category === 'ecole' 
                              ? 'bg-green-500/80 text-white' 
                              : 'bg-purple-500/80 text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {project.category === 'entreprise' && <Briefcase className="w-3 h-3" />}
                        {project.category === 'ecole' && <GraduationCap className="w-3 h-3" />}
                        {project.category === 'personnel' && <User className="w-3 h-3" />}
                        <span>
                          {project.category === 'entreprise' ? 'Entreprise' : 
                           project.category === 'ecole' ? 'Formation' : 'Personnel'}
                        </span>
                      </motion.div>
                    </div>
                    
                    {/* Indicateur de clic pour voir plus */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div 
                        className={`px-4 py-2 rounded-full ${darkMode ? 'bg-blue-600/80' : 'bg-blue-500/80'} text-white text-sm font-medium`}
                        whileHover={{ scale: 1.05 }}
                      >
                        Cliquez pour voir plus
                      </motion.div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <motion.span
                            key={i}
                            className="px-2 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                        {project.tags.length > 3 && (
                          <motion.span
                            className="px-2 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                          >
                            +{project.tags.length - 3}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className={`p-2 rounded-lg mr-4 ${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-50 text-blue-500'}`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {project.icon}
                      </motion.div>
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
                    
                    {/* Référentiel BTS SIO */}
                    {project.referentiel && (
                      <div className="mt-4">
                        <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Référentiel BTS SIO:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.referentiel.slice(0, 1).map((ref, i) => (
                            <motion.span
                              key={i}
                              className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                              whileHover={{ scale: 1.05 }}
                            >
                              {ref.length > 30 ? ref.substring(0, 30) + '...' : ref}
                            </motion.span>
                          ))}
                          {project.referentiel.length > 1 && (
                            <motion.span
                              className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                              whileHover={{ scale: 1.05 }}
                            >
                              +{project.referentiel.length - 1} autres
                            </motion.span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Indicateur de galerie d'images */}
                    {project.additionalImages && project.additionalImages.length > 0 && (
                      <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'} flex items-center mt-4`}>
                        <span className="mr-2">Voir {project.additionalImages.length + 1} images</span>
                        <div className="flex space-x-1">
                          {[...Array(Math.min(3, project.additionalImages.length + 1))].map((_, i) => (
                            <motion.div 
                              key={i} 
                              className="w-2 h-2 rounded-full bg-blue-500"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Popup du projet sélectionné avec AnimatePresence pour les animations de sortie */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectPopup project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

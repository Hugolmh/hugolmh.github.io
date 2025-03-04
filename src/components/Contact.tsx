import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Github, Linkedin } from 'lucide-react';
import { FaInstagram, FaDiscord } from 'react-icons/fa';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            N'hésitez pas à me contacter sur mes réseaux sociaux
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <a
              href="mailto:lamarche.hugo@orange.fr"
              className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>lamarche.hugo@orange.fr</span>
            </a>
            <a
              href="https://github.com/hugolamarche"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>github.com/hugolamarche</span>
            </a>
            <a
              href="https://linkedin.com/in/hugolamarche"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>linkedin.com/in/hugolamarche</span>
            </a>
            <a
              href="https://instagram.com/votre_instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <FaInstagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
            <a
              href="https://discord.com/users/votre_discord"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <FaDiscord className="w-5 h-5" />
              <span>Discord</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
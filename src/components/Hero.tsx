import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-20 flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Hugo Lamarche
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
              Étudiant en BTS SIO SLAM
            </h2>
            <p className="text-gray-600 mb-8">
              Né le 20 mars 2004 • En alternance chez CNMSS à Toulon
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:lamarche.hugo@orange.fr"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                title="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/hugolmh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                title="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/hugo-lamarche-03a4342b7"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={`${import.meta.env.BASE_URL}developer.jpg`}
              alt="Développeur Hugo Lamarche"
              className="rounded-lg shadow-xl w-full max-w-md mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
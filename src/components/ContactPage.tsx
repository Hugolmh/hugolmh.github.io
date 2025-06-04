import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ContactPage = () => {
  const { darkMode } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (resp.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="container mx-auto px-6 py-12 max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Nom"
            className="w-full p-3 border rounded text-gray-900"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full p-3 border rounded text-gray-900"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="Votre message"
            className="w-full p-3 border rounded h-32 text-gray-900"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Envoyer
          </button>
        </form>
        {status === 'sent' && (
          <p className="mt-4 text-green-500">
            Votre demande a bien été prise en compte.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-500">
            Une erreur est survenue. Merci de réessayer plus tard.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactPage;

"use client"; // ఫారమ్ సబ్మిట్ లాజిక్ కోసం దీన్ని టాప్‌లో పెట్టాలి

import { useState } from 'react';
import { siteContent } from "../lib/content";

export default function ContactSection() {
  // ఫారమ్ డేటా మరియు స్టేటస్ మెసేజ్ కోసం స్టేట్స్
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // ఇన్‌పుట్ బాక్సుల్లో టైప్ చేస్తున్నప్పుడు డేటాను అప్‌డేట్ చేయడానికి
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ఫారమ్ సబ్మిట్ చేసినప్పుడు రన్ అయ్యే ఫంక్షన్
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: 'success', message: 'Enquiry sent successfully! 🎉' });
        setFormData({ name: '', email: '', message: '' }); // ఫారమ్ ఖాళీ చేయడానికి
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Cannot connect to server. Please check if backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-us" className="section contact-section">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">Contact Us</p>
          <h2>{siteContent.contact.title}</h2>
          <p className="muted">{siteContent.contact.description}</p>
          <div className="contact-info">
            <span>hello@webnsoftware.com</span>
            <span>+91 90000 00000</span>
          </div>
        </div>
        
        {/* ఇక్కడ సబ్మిట్ ఫంక్షన్ లింక్ చేసాం */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name" 
              required 
            />
          </label>
          <label>
            Email
            <input 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com" 
              required 
            />
          </label>
          <label>
            Requirement
            <textarea 
              name="message" 
              rows={5} 
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..." 
              required 
            />
          </label>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Enquiry →'}
          </button>

          {/* సక్సెస్ లేదా ఎర్రర్ మెసేజ్ చూపించడానికి */}
          {status.message && (
            <div style={{
              marginTop: '15px',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
              fontSize: '14px',
              backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
              color: status.type === 'success' ? '#155724' : '#721c24'
            }}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

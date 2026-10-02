import React, { useState } from 'react';
import { Mail, Send, MapPin, Check, Copy, ExternalLink } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/socials';
import confetti from 'canvas-confetti';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Film Collaboration / Co-Production',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0033', '#000000', '#1877f2', '#00f2fe']
    });

    // Reset after showing feedback
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        inquiryType: 'Film Collaboration / Co-Production',
        message: ''
      });
    }, 5000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(COMPANY_CONTACT.email);
    setCopiedEmail(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 }
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 relative bg-[#edebe4] border-b border-black/10 overflow-hidden text-zinc-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#ff0033] text-xs font-black uppercase tracking-widest block mb-2 font-mono">
            Connect & Collaborate
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            Let's Create Cinema Together
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-2 font-medium">
            Have a script, co-production proposal, brand commercial inquiry, or want to invite us to a film festival? Reach out to the Magnates Media team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Left Column: Direct Info Card in White Poster Style */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-white border border-black/15 space-y-6 shadow-md">
              <div>
                <h3 className="font-display text-3xl font-black uppercase text-black tracking-wider leading-none">
                  Magnates Media Films
                </h3>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">
                  Panabo City Filmmaking Collective
                </p>
              </div>

              {/* Direct Email with One-Click Copy */}
              <div className="p-4 rounded-2xl bg-zinc-100 border border-black/10">
                <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block mb-1">
                  Official Studio Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${COMPANY_CONTACT.email}`}
                    className="text-xs sm:text-sm font-bold text-black hover:text-[#ff0033] transition-colors truncate"
                  >
                    {COMPANY_CONTACT.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded-lg bg-black hover:bg-[#ff0033] text-white transition-all flex-shrink-0 cursor-pointer shadow-sm"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedEmail && (
                  <span className="text-[11px] text-emerald-600 font-bold block mt-1">
                    ✓ Email copied to clipboard!
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 text-xs text-zinc-700">
                <div className="p-2 rounded-xl bg-black text-white flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-black text-black block uppercase tracking-wider">Location</span>
                  <span className="font-medium">Panabo City, Davao del Norte, Philippines</span>
                </div>
              </div>

              {/* Direct Mailto Action Button */}
              <a
                href={`mailto:${COMPANY_CONTACT.email}?subject=Project%20Inquiry%20via%20Magnates%20Media%20Portfolio`}
                className="w-full py-4 rounded-2xl bg-black text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#ff0033] transition-all shadow-md hover:scale-[1.02]"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Email App</span>
              </a>

            </div>

            {/* Facebook Instant Messaging Button Card */}
            <div className="p-6 rounded-3xl bg-white border border-black/15 shadow-md space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-600 font-bold uppercase tracking-wider text-[11px] font-mono">
                  Prefer Instant Messaging?
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>

              <a
                href="https://www.facebook.com/magnatesmediaph"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-[#1877f2] hover:bg-[#166fe5] text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-md hover:shadow-xl transition-all hover:scale-[1.02] active:scale-98 cursor-pointer group"
                title="Message Magnates Media on Facebook"
              >
                <svg className="w-4 h-4 fill-current flex-shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Message on Facebook</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="text-center text-[11px] font-mono text-zinc-500">
                Official Page: <span className="text-[#1877f2] font-bold">@magnatesmediaph</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form in White Poster Card Style */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/15 shadow-xl relative">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-3xl font-black text-black uppercase tracking-wider">
                    Message Sent!
                  </h3>
                  <p className="text-zinc-600 text-sm max-w-md mx-auto font-medium">
                    Salamat! Thank you for reaching out to Magnates Media. Our production team in Panabo will review your message and reply promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-2xl font-black text-black uppercase tracking-wide mb-2">
                    Send an Inquiry
                  </h3>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                      Your Name / Production House
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria Santos / Creative Studio"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-black/20 text-black placeholder-zinc-400 text-sm font-medium focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. maria@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-black/20 text-black placeholder-zinc-400 text-sm font-medium focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                      Inquiry Nature
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-black/20 text-black text-sm font-semibold focus:outline-none focus:border-black transition-colors cursor-pointer"
                    >
                      <option value="Film Collaboration / Co-Production">Film Collaboration / Co-Production</option>
                      <option value="Festival Screening / Invitation">Festival Screening / Invitation</option>
                      <option value="Brand Commercial / Video Production">Brand Commercial / Video Production</option>
                      <option value="Casting / Actor Audition">Casting / Actor Audition</option>
                      <option value="Press / Media Interview">Press / Media Interview</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                      Message / Project Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about the project, festival, or ideas you'd like to collaborate on..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-black/20 text-black placeholder-zinc-400 text-sm font-medium focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-black hover:bg-[#ff0033] text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Production Team</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

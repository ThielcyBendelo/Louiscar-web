import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

function GoogleMapsSection() {
  return (
    <section className="py-20 px-6 bg-slate-950 border-t border-slate-900" id="localisation">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Texte et Informations de Contact */}
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Siège Social</h2>
              <h3 className="text-4xl font-black text-white mb-4">
                Localisation <span className="text-slate-500">Professionnelle</span>
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Retrouvez-moi au cœur de Kinshasa pour discuter de vos stratégies RP ou de la maintenance de vos infrastructures critiques.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-red-600 border border-slate-800 shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-white font-bold">Adresse</h4>
                  <p className="text-slate-400 text-sm">Avenue Kimwenza A/25, Kinshasa, DR Congo</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-red-600 border border-slate-800 shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="text-white font-bold">Téléphone</h4>
                  <p className="text-slate-400 text-sm">+243 814 176 800</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-red-600 border border-slate-800 shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-white font-bold">Email Business</h4>
                  <p className="text-slate-400 text-sm">ingebalouiscar@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Carte Google Maps avec style sombre */}
          <div className="relative">
            <div className="absolute -inset-2 bg-red-600 rounded-3xl blur opacity-10"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 h-[450px]">
              <iframe
                title="Google Maps MUAMOKEL"
                src="https://www.google.com/maps?q=Avenue+Kimwenza+A%2FA25,+Kinshasa,+DR+Congo&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(90%)" }} 
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default GoogleMapsSection;

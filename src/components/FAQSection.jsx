import React from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Quels types de projets réalisez-vous ?",
    answer: "Nous créons des sites web, applications mobiles, solutions cloud, design UI/UX, et proposons des services de cybersécurité et maintenance.",
  },
  {
    question: "Quels sont vos délais de livraison ?",
    answer: "Les délais varient selon le projet : site vitrine (2-4 semaines), e-commerce (3-6 semaines), application mobile (3-6 semaines).",
  },
  {
    question: "Proposez-vous un accompagnement après livraison ?",
    answer: "Oui, nous assurons un support technique, des mises à jour régulières et une maintenance proactive selon vos besoins.",
  },
  {
    question: "Comment garantir la sécurité de mon projet ?",
    answer: "Nous intégrons la sécurité dès la conception (Security by Design), réalisons des audits et assurons la conformité aux normes.",
  },
];

function FAQSection() {
  return (
    <section className="py-24 px-6 bg-slate-950" id="faq">
      <div className="max-w-4xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Questions <span className="text-red-600">Fréquentes</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Tout ce que vous devez savoir sur mon accompagnement et l'expertise de MUAMOKEL Agency.
          </p>
        </div>

        {/* Liste des FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.details 
              key={idx} 
              className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-red-600/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <summary className="flex items-center justify-between font-bold text-white cursor-pointer p-6 list-none group-open:text-red-500 transition-colors">
                <span className="text-lg md:text-xl pr-4">{faq.question}</span>
                <span className="text-red-600 transition-transform duration-300 group-open:rotate-45">
                  <svg xmlns="http://w3.org" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Refroidir 12 4v16m8-8H4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-400 leading-relaxed text-base md:text-lg border-t border-slate-800/50 pt-4">
                {faq.answer}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
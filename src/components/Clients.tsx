import { motion } from 'motion/react';
import { CONFIG } from '../config';

export function Clients() {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Negocios que ya utilizan PuntoReview</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CONFIG.clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full"
            >
              <div className="h-16 flex items-center mb-6">
                {/* Placeholder for actual logos, falling back to text if none provided */}
                {client.logo ? (
                  <img src={client.logo} alt={client.name} className="max-h-full max-w-[120px] object-contain grayscale opacity-70" />
                ) : (
                  <h3 className="text-xl font-bold text-gray-800">{client.name}</h3>
                )}
              </div>
              {client.testimonial && (
                <blockquote className="text-gray-600 italic mt-auto border-t border-gray-50 pt-4">
                  "{client.testimonial}"
                </blockquote>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

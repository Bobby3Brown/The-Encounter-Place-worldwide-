import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-white mb-4">The Encounter-Place Worldwide</h3>
            <p className="text-gray-400">
              Where Heaven Meets Earth. A place of divine encounters, transformation, and supernatural breakthroughs.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  className="text-gray-400 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#90EE90'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#vision" 
                  className="text-gray-400 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#90EE90'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  Vision & Mission
                </a>
              </li>
              <li>
                <a 
                  href="#pastor" 
                  className="text-gray-400 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#90EE90'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  Our Pastor
                </a>
              </li>
              <li>
                <a 
                  href="#testimony" 
                  className="text-gray-400 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#90EE90'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  Share Testimony
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-400 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#90EE90'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Service Times */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white mb-4">Service Times</h4>
            <ul className="space-y-2 text-gray-400">
              <li></li>
              <li></li>
              <li>Friday Service : 4:00 PM</li>
              <li></li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">© 2025 The Encounter-Place Worldwide. All rights reserved.</p>
          <p className="text-gray-500 mt-2">Built with faith, powered by the Holy Spirit</p>
          <div className="mt-4">
            <Link 
              to="/admin" 
              className="text-gray-700 hover:text-gray-500 text-xs transition-colors opacity-30 hover:opacity-50"
            >
              •
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

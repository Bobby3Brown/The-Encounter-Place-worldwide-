import { ImageWithFallback } from './figma/ImageWithFallback';
import { Quote } from 'lucide-react';
import { motion } from 'motion/react';
import pastorImage from '../../assets/pastors pics.jpeg';

export function Pastor() {
  return (
    <section id="pastor" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gray-900 mb-4">Meet Our Pastor</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Led by a heart of compassion and a passion for God's presence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Pastor Image */}
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={pastorImage}
                  alt="Pastor Okechukwu D. Mike"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ backgroundColor: '#006400' }}></div>
            </div>
          </motion.div>

          {/* Pastor Info */}
          <motion.div 
            className="order-1 md:order-2 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-gray-900 mb-2">Okechukwu D. Mike</h3>
              <p style={{ color: '#006400' }}>Senior Pastor & Founder</p>
            </div>

            <div className="relative pl-6 border-l-4" style={{ borderColor: '#006400' }}>
              <Quote className="absolute -left-3 top-0 bg-white" size={24} style={{ color: '#006400' }} />
              <p className="text-gray-700 italic mb-4">
                "I am sending you as a deliverer to your generation and to the nations of the earth, 
                to bring them out from every form of captivity through the teaching and preaching of 
                the word of Deliverance."
              </p>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                On the 7th of September 2019, the word of Deliverance Mandate was delivered to Pastor Okechukwu. 
                And God said to him, "I am sending you as a deliverer to your generation and to the nations of 
                the earth, to bring them out from every form of captivity through the teaching and preaching of 
                the word of Deliverance." (Isaiah 45:13-14 / Luke 4:18 / Exodus 3:7-14 / John 8:32,36)
              </p>
              <p>
                Pastor Okechukwu D. Mike is a dedicated servant of God, faithfully fulfilling the mandate given 
                to him by the Lord. His passion for creating an atmosphere where people can encounter God and 
                experience true deliverance has been the driving force behind The Encounter-Place Worldwide.
              </p>
              <p>
                Under his leadership, the church has grown into a vibrant community of believers who are 
                passionate about worship, fellowship, and reaching the lost with the message of freedom in Christ.
              </p>
            </div>

            <div className="pt-4">
              <div className="inline-block px-6 py-3 rounded-lg" style={{ backgroundColor: '#e6f4e6' }}>
                <p style={{ color: '#006400' }}>
                  "And you shall know the truth, and the truth shall make you free." - John 8:32
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

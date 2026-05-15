import { Eye, Target, Shield, BookOpen, Sparkles, Flame, Lightbulb, Crown, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { motion } from 'motion/react';

export function VisionMission() {
  const pillars = [
    {
      icon: Shield,
      title: 'Deliverance',
      description: 'Setting the captives free through the power of God.',
    },
    {
      icon: BookOpen,
      title: 'The Word & Faith',
      description: 'Building faith through God\'s unchanging Word.',
    },
    {
      icon: Sparkles,
      title: 'The Holy Spirit, Supernatural, Signs & Wonders',
      description: 'Experiencing the supernatural power of God.',
    },
    {
      icon: Flame,
      title: 'Prayers & Revival',
      description: 'Transforming lives through fervent prayer and revival.',
    },
    {
      icon: Lightbulb,
      title: 'Wisdom, Vision, Prosperity & Success',
      description: 'Walking in divine wisdom and purpose.',
    },
    {
      icon: Crown,
      title: 'Consecration, Holiness, Righteousness & Sanctification',
      description: 'Living a life set apart for God\'s glory.',
    },
    {
      icon: Heart,
      title: 'Praise, Thanksgiving & Worship',
      description: 'Entering His gates with thanksgiving and praise.',
    },
  ];

  return (
    <section id="vision" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-l-4 shadow-lg hover:shadow-xl transition-shadow" style={{ borderColor: '#006400' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e6f4e6' }}>
                  <Eye size={24} style={{ color: '#006400' }} />
                </div>
                <h2 style={{ color: '#006400' }}>Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To build up a generation in righteousness by the ministry of the Holy Spirit and by the word of Deliverance.
              </p>
            </Card>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: '#006400' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Target className="text-white" size={24} />
                </div>
                <h2 className="text-white">Our Mission</h2>
              </div>
              <p className="text-white leading-relaxed">
                To search out the lost, redirecting them back to Christ and to let go the captive via the power of the Holy Spirit, word, worship, and prayer.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Core Pillars */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gray-900 mb-4">Our Core Pillars</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The foundational principles that guide our ministry and community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white mb-4" style={{ background: 'linear-gradient(to bottom right, #006400, #004d00)' }}>
                <pillar.icon size={28} />
              </div>
              <h3 className="text-gray-900 mb-3">{pillar.title}</h3>
              <p className="text-gray-600">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Heart, Users, BookOpen } from 'lucide-react';

export function Mission() {
  const values = [
    {
      icon: Heart,
      title: 'Love & Compassion',
      description: 'We believe in showing Christ\'s love through genuine care and compassion for our community.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building meaningful relationships and growing together in faith as one family.',
    },
    {
      icon: BookOpen,
      title: 'Scripture-Based',
      description: 'Our teachings are rooted in Biblical truth, helping you grow deeper in your faith journey.',
    },
  ];

  return (
    <section className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-emerald-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            To share the Gospel of Jesus Christ and make disciples who transform their communities through faith, service, and love.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 text-white mb-4">
                <value.icon size={32} />
              </div>
              <h3 className="text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

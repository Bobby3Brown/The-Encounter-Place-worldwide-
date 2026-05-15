import { Card } from './ui/card';
import { Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Member since 2020',
      text: 'This church has become my family. The warmth and genuine care from everyone here has transformed my life and deepened my faith.',
    },
    {
      name: 'Michael Chen',
      role: 'Member since 2019',
      text: 'The teachings are powerful and practical. I\'ve grown so much spiritually and found a community that truly supports one another.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Member since 2021',
      text: 'From the moment I walked in, I felt welcomed. This is a place where you can be yourself and grow in your relationship with God.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">What People Are Saying</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from members of our community about their experience at Grace Community Church.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <Quote className="text-emerald-600 mb-4" size={32} />
              <p className="text-gray-700 mb-6">{testimonial.text}</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-900">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { MessageCircleHeart, Send } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { motion } from 'motion/react';

export function TestimonyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    testimony: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a056ab6a/testimonies`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit testimony');
      }

      toast.success('Thank you for sharing your testimony! It will be reviewed and may be featured on our website.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        testimony: '',
      });
    } catch (error) {
      console.error('Error submitting testimony:', error);
      toast.error('Failed to submit testimony. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="testimony" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#e6f4e6' }}>
            <MessageCircleHeart size={32} style={{ color: '#006400' }} />
          </div>
          <h2 className="text-gray-900 mb-4">Share Your Testimony</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We would love to hear how God has worked in your life. Your story can inspire and encourage others 
            on their faith journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>

              {/* Testimony Field */}
              <div className="space-y-2">
                <Label htmlFor="testimony">Your Testimony *</Label>
                <Textarea
                  id="testimony"
                  name="testimony"
                  placeholder="Share your story... How has God impacted your life? What miracles have you experienced?"
                  value={formData.testimony}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full resize-none"
                />
                <p className="text-gray-500">Please share your testimony in detail. Minimum 50 characters.</p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="px-8"
                  style={{ backgroundColor: '#006400', color: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#004d00'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006400'}
                  disabled={loading}
                >
                  <Send size={20} className="mr-2" />
                  {loading ? 'Submitting...' : 'Share Your Testimony'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            By submitting your testimony, you give us permission to share it on our website and social media platforms.
          </p>
        </div>
      </div>
    </section>
  );
}

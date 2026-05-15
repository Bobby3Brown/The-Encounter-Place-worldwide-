import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function AdminSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First check admin count
      const countResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a056ab6a/admin/count`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const countData = await countResponse.json();

      if (countResponse.ok && countData.count >= 3) {
        throw new Error('Maximum number of admin accounts (3) has been reached. Please contact an existing administrator.');
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a056ab6a/admin/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create admin');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', password: '' });
    } catch (err: any) {
      console.error('Admin creation error:', err);
      setError(err.message || 'Failed to create admin. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Back to Website Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="absolute top-4 left-4">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
            Back to Website
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl">
          <div className="mb-8 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#014421' }}>
                <UserPlus className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 style={{ color: '#014421' }}>Create Admin Account</h2>
            <p className="text-gray-600 mt-2">
              Set up an admin account for your church (Maximum 3 admins)
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="bg-green-50 text-green-800 p-4 rounded-lg">
                Admin account created successfully! You can now log in.
              </div>
              <Button
                onClick={() => navigate('/admin')}
                className="w-full text-white"
                style={{ backgroundColor: '#014421' }}
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Admin Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@church.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">Minimum 6 characters</p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full text-white"
                style={{ backgroundColor: '#014421' }}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Admin Account'}
              </Button>

              <div className="text-center">
                <Link to="/admin" className="text-sm text-gray-600 hover:text-gray-900">
                  Already have an account? Login
                </Link>
              </div>
            </form>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

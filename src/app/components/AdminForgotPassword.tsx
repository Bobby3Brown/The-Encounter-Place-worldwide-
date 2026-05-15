import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/auth/v1/recover`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: publicAnonKey,
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            redirect_to: `${window.location.origin}/#/admin/reset-password`,
          }),
        }
      );

      const text = await response.text();
      let data: any = {};
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        try {
          data = JSON.parse(text || '{}');
        } catch {
          data = { error: text };
        }
      } else {
        data = { error: text };
      }

      if (!response.ok) {
        throw new Error(
          data.error || `${response.status} ${response.statusText}: ${text}` || 'Unable to send password reset email.'
        );
      }

      setSuccess('If this email exists, a reset link has been sent. Check your inbox.');
    } catch (err: any) {
      console.error('Forgot password request failed:', err);
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f8f9fa' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl">
          <div className="mb-8 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#014421' }}>
                <ArrowLeft size={24} className="text-white" />
              </div>
            </div>
            <h2 style={{ color: '#014421' }}>Forgot Password</h2>
            <p className="text-gray-600 mt-2">Enter your admin email to receive a password reset link.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="forgot-email">Email</Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="admin@church.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <Button
              type="submit"
              className="w-full text-white"
              style={{ backgroundColor: '#014421' }}
              disabled={loading}
            >
              {loading ? 'Sending email...' : 'Send reset email'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Remembered your password?{' '}
              <Link to="/admin" className="hover:underline" style={{ color: '#014421' }}>
                Back to login
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

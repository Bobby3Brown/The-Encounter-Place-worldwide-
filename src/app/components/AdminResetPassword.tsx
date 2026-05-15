import { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { motion } from 'framer-motion';

export function AdminResetPassword() {
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const accessToken = params.get('access_token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!accessToken) {
      setError('Missing reset token. Use the link from your email.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/auth/v1/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          apikey: publicAnonKey,
        },
        body: JSON.stringify({ password }),
      });

      const text = await response.text();
      let data: any = {};
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        data = JSON.parse(text || '{}');
      } else {
        data = { error: text };
      }

      if (!response.ok) {
        throw new Error(data.error || 'Unable to reset password.');
      }

      setSuccess('Password has been reset successfully. You can now log in.');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(err.message || 'Failed to reset password. Please try again.');
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
            <h2 style={{ color: '#014421' }}>Reset Password</h2>
            <p className="text-gray-600 mt-2">
              {accessToken
                ? 'Enter your new password below.'
                : 'Please open the reset link from your email to set a new password.'}
            </p>
          </div>

          {accessToken ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? 'Resetting password...' : 'Reset Password'}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-sm">
                A valid reset token was not detected. Please use the link sent to your email.
              </div>
              <div className="text-center text-sm text-gray-500">
                <Link to="/admin/forgot-password" className="hover:underline" style={{ color: '#014421' }}>
                  Resend password reset email
                </Link>
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Go back to{' '}
              <Link to="/admin" className="hover:underline" style={{ color: '#014421' }}>
                Admin login
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

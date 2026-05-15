import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { UserPlus, LogIn, Shield, CheckCircle } from 'lucide-react';

export function AdminWelcome() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f8f9fa' }}>
      <Card className="w-full max-w-2xl p-8 shadow-xl rounded-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#014421' }}>
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 style={{ color: '#014421' }}>Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to The Encounter-Place Worldwide Admin Portal
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-blue-900 mb-2">Getting Started</h3>
            <p className="text-blue-800 text-sm">
              Choose an option below to access the admin dashboard:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Create Admin Account Card */}
            <Card className="p-6 border-2 border-gray-200 hover:border-green-600 transition-colors">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#e6f4e6' }}>
                  <UserPlus size={24} style={{ color: '#014421' }} />
                </div>
                <h3 className="mb-2" style={{ color: '#014421' }}>New Admin</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Create your first admin account to manage testimonies
                </p>
                <Link to="/admin/setup">
                  <Button
                    className="w-full text-white"
                    style={{ backgroundColor: '#014421' }}
                  >
                    Create Admin Account
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Login Card */}
            <Card className="p-6 border-2 border-gray-200 hover:border-green-600 transition-colors">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#e6f4e6' }}>
                  <LogIn size={24} style={{ color: '#014421' }} />
                </div>
                <h3 className="mb-2" style={{ color: '#014421' }}>Existing Admin</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Sign in to access the admin dashboard
                </p>
                <Link to="/admin">
                  <Button
                    variant="outline"
                    className="w-full"
                    style={{ borderColor: '#014421', color: '#014421' }}
                  >
                    Login to Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Features List */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="mb-4" style={{ color: '#014421' }}>Dashboard Features</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1" size={20} />
                <div>
                  <p className="text-gray-900">View All Testimonies</p>
                  <p className="text-gray-600 text-sm">See all submitted testimonies in one place</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1" size={20} />
                <div>
                  <p className="text-gray-900">Approve or Reject</p>
                  <p className="text-gray-600 text-sm">Review and moderate testimony submissions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1" size={20} />
                <div>
                  <p className="text-gray-900">Manage Content</p>
                  <p className="text-gray-600 text-sm">Delete or edit testimonies as needed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1" size={20} />
                <div>
                  <p className="text-gray-900">Real-time Updates</p>
                  <p className="text-gray-600 text-sm">See new testimonies as they are submitted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to Home
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

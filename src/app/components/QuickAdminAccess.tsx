import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from './ui/button';

export function QuickAdminAccess() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link to="/admin/welcome">
        <Button
          className="rounded-full shadow-2xl text-white px-6 py-6"
          style={{ backgroundColor: '#014421' }}
        >
          <Shield className="mr-2" size={20} />
          Admin
        </Button>
      </Link>
    </div>
  );
}

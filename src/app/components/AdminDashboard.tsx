import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LogOut, Eye, Check, X, Trash2, MessageSquare, Mail, AlertCircle, ExternalLink } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Testimony {
  id: string;
  name: string;
  email: string;
  testimony: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  submittedAt: string;
  readAt?: string;
}

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

export function AdminDashboard({ token, onLogout }: AdminDashboardProps) {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonies();
    fetchContactMessages();
  }, []);

  const fetchTestimonies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a056ab6a/testimonies`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch testimonies');
      }

      const data = await response.json();
      setTestimonies(data.testimonies || []);
    } catch (error) {
      console.error('Error fetching testimonies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a056ab6a/contact-pastor`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch contact messages');
      }

      const data = await response.json();
      setContactMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
    }
  };

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a056ab6a/testimonies/${id}/approve`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to approve testimony');
      }

      await fetchTestimonies();
    } catch (error) {
      console.error('Error approving testimony:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a056ab6a/testimonies/${id}/reject`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to reject testimony');
      }

      await fetchTestimonies();
    } catch (error) {
      console.error('Error rejecting testimony:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimony?')) {
      return;
    }

    setProcessingId(id);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a056ab6a/testimonies/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete testimony');
      }

      await fetchTestimonies();
    } catch (error) {
      console.error('Error deleting testimony:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleView = (testimony: Testimony) => {
    setSelectedTestimony(testimony);
    setViewDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleMarkAsRead = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a056ab6a/contact-pastor/${id}/read`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to mark message as read');
      }

      await fetchContactMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    setProcessingId(id);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a056ab6a/contact-pastor/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      await fetchContactMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleViewContact = async (message: ContactMessage) => {
    setSelectedContact(message);
    setContactDialogOpen(true);
    
    // Mark as read if it's new
    if (message.status === 'new') {
      await handleMarkAsRead(message.id);
    }
  };

  const stats = {
    total: testimonies.length,
    pending: testimonies.filter(t => t.status === 'pending').length,
    approved: testimonies.filter(t => t.status === 'approved').length,
    rejected: testimonies.filter(t => t.status === 'rejected').length,
  };

  const contactStats = {
    total: contactMessages.length,
    new: contactMessages.filter(m => m.status === 'new').length,
    read: contactMessages.filter(m => m.status === 'read').length,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 style={{ color: '#014421' }}>Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage testimony submissions</p>
            </div>
            <Button
              variant="outline"
              onClick={onLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="testimonies" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="testimonies" className="flex items-center gap-2">
              <MessageSquare size={18} />
              Testimonies
              {stats.pending > 0 && (
                <Badge className="ml-2 bg-yellow-500 text-white">{stats.pending}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Mail size={18} />
              Contact Pastor
              {contactStats.new > 0 && (
                <Badge className="ml-2 bg-blue-500 text-white">{contactStats.new}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Testimonies Tab */}
          <TabsContent value="testimonies">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">Total Testimonies</div>
                <div className="text-3xl" style={{ color: '#014421' }}>{stats.total}</div>
              </Card>
              <Card className="p-6 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">Pending</div>
                <div className="text-3xl text-yellow-600">{stats.pending}</div>
              </Card>
              <Card className="p-6 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">Approved</div>
                <div className="text-3xl text-green-600">{stats.approved}</div>
              </Card>
              <Card className="p-6 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">Rejected</div>
                <div className="text-3xl text-red-600">{stats.rejected}</div>
              </Card>
            </div>

            {/* Testimonies Table */}
            <Card className="rounded-xl overflow-hidden">
          <div className="p-6 border-b" style={{ backgroundColor: '#014421' }}>
            <h2 className="text-white">Testimony Submissions</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Loading testimonies...
            </div>
          ) : testimonies.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No testimonies submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Name</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Email</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Submitted</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testimonies.map((testimony) => (
                    <tr key={testimony.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{testimony.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{testimony.email || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(testimony.submittedAt)}</td>
                      <td className="px-6 py-4">{getStatusBadge(testimony.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleView(testimony)}
                            className="flex items-center gap-1"
                          >
                            <Eye size={16} />
                            View
                          </Button>
                          {testimony.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApprove(testimony.id)}
                                disabled={processingId === testimony.id}
                                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                              >
                                <Check size={16} />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleReject(testimony.id)}
                                disabled={processingId === testimony.id}
                                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
                              >
                                <X size={16} />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(testimony.id)}
                            disabled={processingId === testimony.id}
                            className="text-red-600 hover:bg-red-50 flex items-center gap-1"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
          </TabsContent>

          {/* Contact Messages Tab */}
          <TabsContent value="contacts">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">Total Messages</div>
                <div className="text-3xl" style={{ color: '#014421' }}>{contactStats.total}</div>
              </Card>
              <Card className="p-6 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">New Messages</div>
                <div className="text-3xl text-blue-600">{contactStats.new}</div>
              </Card>
              <Card className="p-6 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">Read Messages</div>
                <div className="text-3xl text-gray-600">{contactStats.read}</div>
              </Card>
            </div>

            {/* Contact Messages Table */}
            <Card className="rounded-xl overflow-hidden">
              <div className="p-6 border-b" style={{ backgroundColor: '#014421' }}>
                <h2 className="text-white">Contact Pastor Messages</h2>
              </div>

              {loading ? (
                <div className="p-12 text-center text-gray-500">
                  Loading messages...
                </div>
              ) : contactMessages.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  No contact messages yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm text-gray-600">Name</th>
                        <th className="px-6 py-4 text-left text-sm text-gray-600">Email</th>
                        <th className="px-6 py-4 text-left text-sm text-gray-600">Subject</th>
                        <th className="px-6 py-4 text-left text-sm text-gray-600">Submitted</th>
                        <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
                        <th className="px-6 py-4 text-left text-sm text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contactMessages.map((message) => (
                        <tr 
                          key={message.id} 
                          className={`hover:bg-gray-50 transition-colors ${message.status === 'new' ? 'bg-blue-50' : ''}`}
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">{message.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{message.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{message.subject}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{formatDate(message.submittedAt)}</td>
                          <td className="px-6 py-4">
                            {message.status === 'new' ? (
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Read</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewContact(message)}
                                className="flex items-center gap-1"
                              >
                                <Eye size={16} />
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteContact(message.id)}
                                disabled={processingId === message.id}
                                className="text-red-600 hover:bg-red-50 flex items-center gap-1"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* View Testimony Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle style={{ color: '#014421' }}>Testimony Details</DialogTitle>
            <DialogDescription>
              Submitted by {selectedTestimony?.name} on {selectedTestimony && formatDate(selectedTestimony.submittedAt)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTestimony && (
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Name</div>
                <div className="text-gray-900">{selectedTestimony.name}</div>
              </div>
              
              {selectedTestimony.email && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Email</div>
                  <div className="text-gray-900">{selectedTestimony.email}</div>
                </div>
              )}
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Status</div>
                <div>{getStatusBadge(selectedTestimony.status)}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">Testimony</div>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-900 whitespace-pre-wrap">
                  {selectedTestimony.testimony}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                {selectedTestimony.status === 'pending' && (
                  <>
                    <Button
                      onClick={() => {
                        handleApprove(selectedTestimony.id);
                        setViewDialogOpen(false);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check size={16} className="mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        handleReject(selectedTestimony.id);
                        setViewDialogOpen(false);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <X size={16} className="mr-2" />
                      Reject
                    </Button>
                  </>
                )}
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Contact Message Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle style={{ color: '#014421' }}>Contact Pastor Message</DialogTitle>
            <DialogDescription>
              From {selectedContact?.name} on {selectedContact && formatDate(selectedContact.submittedAt)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Name</div>
                <div className="text-gray-900">{selectedContact.name}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Email</div>
                <div className="text-gray-900">
                  <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                    {selectedContact.email}
                  </a>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Subject</div>
                <div className="text-gray-900">{selectedContact.subject}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">Message</div>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-900 whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => window.location.href = `mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                  className="text-white"
                  style={{ backgroundColor: '#014421' }}
                >
                  <Mail size={16} className="mr-2" />
                  Reply via Email
                </Button>
                <Button variant="outline" onClick={() => setContactDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyOpenId, setReplyOpenId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sendingReplyId, setSendingReplyId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages');
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error ?? 'Failed to load messages');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load messages');
      console.error('Failed:', error);
    }
  };

  const markAsRead = async (id: string, read: boolean) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !read }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error ?? 'Failed to update message');
      }
      toast.success(read ? 'Marked as unread' : 'Marked as read');
      await loadMessages();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update the message');
      console.error('Failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed');
      toast.success('Message deleted');
      await loadMessages();
    } catch (error) {
      toast.error('Unable to delete the message');
      console.error('Failed:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const confirmDelete = (id: string) => {
    const toastId = toast.info(
      <div className="space-y-2">
        <p className="text-sm">Delete this message?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(toastId);
              handleDelete(id);
            }}
            className="px-3 py-1 text-xs bg-destructive/15 text-destructive rounded hover:bg-destructive/25"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="px-3 py-1 text-xs bg-muted text-foreground rounded hover:bg-muted/80"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
      },
    );
  };

  const handleSendReply = async (message: ContactMessage) => {
    if (!replyText.trim()) {
      toast.error('Please write your reply message');
      return;
    }

    setSendingReplyId(message.id);
    try {
      const response = await fetch(`/api/admin/messages/${message.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: replyText }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error ?? payload?.message ?? 'Failed to send reply');
      }

      toast.success(`Reply sent to ${message.email}`);
      setReplyText('');
      setReplyOpenId(null);
      await loadMessages();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send reply');
      console.error('Reply failed:', error);
    } finally {
      setSendingReplyId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-foreground mb-2">Contact Messages</h1>
        <p className="text-muted-foreground">View and manage inquiries from your portfolio</p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground rounded-lg border border-border bg-card/50">
            No messages yet
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`p-6 rounded-lg border transition-all ${msg.read ? 'border-border bg-card/30' : 'border-accent/50 bg-card/50'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-light text-foreground text-lg">{msg.subject}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    From: <span className="text-foreground">{msg.name}</span> ({msg.email})
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(msg.created_at).toLocaleDateString()} at {new Date(msg.created_at).toLocaleTimeString()}
                  </p>
                </div>
                {!msg.read && <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded">New</span>}
              </div>
              <p className="text-foreground mb-4 whitespace-pre-wrap">{msg.message}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (replyOpenId === msg.id) {
                      setReplyOpenId(null);
                      setReplyText('');
                      return;
                    }
                    setReplyOpenId(msg.id);
                    setReplyText(`Hi ${msg.name},\n\n`);
                  }}
                  className="px-3 py-1 text-sm bg-accent/20 text-accent rounded hover:bg-accent/30"
                >
                  Reply
                </button>
                <button
                  onClick={() => markAsRead(msg.id, msg.read)}
                  className="px-3 py-1 text-sm bg-muted text-foreground rounded hover:bg-muted/80"
                >
                  {msg.read ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button
                  onClick={() => confirmDelete(msg.id)}
                  disabled={deletingId === msg.id}
                  className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded hover:bg-destructive/20 disabled:opacity-50"
                >
                  {deletingId === msg.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>

              {replyOpenId === msg.id && (
                <div className="mt-4 space-y-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                    rows={5}
                    className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSendReply(msg)}
                      disabled={sendingReplyId === msg.id}
                      className="px-4 py-2 text-sm bg-accent text-accent-foreground rounded hover:bg-accent/90 disabled:opacity-50"
                    >
                      {sendingReplyId === msg.id ? 'Sending...' : `Send Reply to ${msg.email}`}
                    </button>
                    <button
                      onClick={() => {
                        setReplyOpenId(null);
                        setReplyText('');
                      }}
                      className="px-4 py-2 text-sm bg-muted text-foreground rounded hover:bg-muted/80"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}


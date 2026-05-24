"use client";

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  published: boolean;
  featured_image?: string;
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    published: false,
    featured_image: '',
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      if (!response.ok) throw new Error('Failed to load');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingId ? `/api/admin/blog/${editingId}` : '/api/admin/blog';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Save error:', err);
        const msg = err?.error ?? err?.message ?? err?.details ?? err?.text ?? 'Failed to save post';
        toast.error(msg);
        throw new Error('Failed to save');
      }
      setFormData({ title: '', slug: '', excerpt: '', content: '', category: '', published: false, featured_image: '' });
      setEditingId(null);
      await loadPosts();
      toast.success(editingId ? 'Post updated' : 'Post created');
    } catch (error) {
      console.error('Failed:', error);
      toast.error('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed');
      toast.success('Post deleted');
      await loadPosts();
    } catch (error) {
      toast.error('Failed to delete post');
      console.error('Failed:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const confirmDelete = (id: string) => {
    toast.custom((toastId) => (
      <div className="space-y-2 rounded-xl border border-border bg-card p-4 text-foreground shadow-xl">
        <p className="text-sm">Delete this post?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(toastId);
              handleDelete(id);
            }}
            className="rounded px-3 py-1 text-xs bg-destructive/15 text-destructive hover:bg-destructive/25"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="rounded px-3 py-1 text-xs bg-muted text-foreground hover:bg-muted/80"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataObj,
      });

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setFormData({ ...formData, featured_image: data.url });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-foreground mb-2">Blog Posts</h1>
        <p className="text-muted-foreground">Create and manage blog content</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-lg border border-border bg-card/50 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="text"
            placeholder="Slug (e.g., my-first-post)"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            className="px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <textarea
          placeholder="Excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={2}
          className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />

        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={6}
          className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />

        <label className="flex items-center gap-2 text-sm font-light text-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="rounded"
          />
          Published
        </label>

        {/* Featured Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-light text-foreground">Featured Image</label>
          <div className="flex items-center gap-4">
            <label className="flex-1 px-4 py-3 border-2 border-dashed border-border rounded bg-background/50 hover:bg-background cursor-pointer transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
              <span className="text-sm text-muted-foreground">
                {uploading ? 'Uploading...' : 'Click to upload featured image'}
              </span>
            </label>
            {formData.featured_image && (
              <div className="relative w-20 h-20 rounded border border-border overflow-hidden">
                <Image
                  src={formData.featured_image}
                  alt="Featured image preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-accent text-accent-foreground rounded font-light hover:bg-accent/90 disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Post' : 'Add Post'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: '', slug: '', excerpt: '', content: '', category: '', published: false });
              }}
              className="px-6 py-2 bg-muted text-foreground rounded font-light hover:bg-muted/80"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        {posts.map((post) => (
          <div key={post.id} className="p-4 rounded-lg border border-border bg-card/50 flex justify-between items-start">
            <div>
              <h3 className="font-light text-foreground">{post.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{post.slug}</p>
              <div className="flex gap-2 mt-2">
                {post.published && <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">Published</span>}
                {post.category && <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">{post.category}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFormData(post);
                  setEditingId(post.id);
                }}
                className="px-3 py-1 text-sm bg-muted text-foreground rounded hover:bg-muted/80"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(post.id)}
                disabled={deletingId === post.id}
                className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded hover:bg-destructive/20 disabled:opacity-50"
              >
                {deletingId === post.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

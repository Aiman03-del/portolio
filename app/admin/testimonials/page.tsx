"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { StarRating } from '@/components/star-rating';

interface Testimonial {
  id: string;
  author_name: string;
  author_role?: string;
  author_company?: string;
  content: string;
  rating: number;
  featured: boolean;
  author_image?: string;
}

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    author_name: '',
    author_role: '',
    author_company: '',
    content: '',
    rating: 5,
    featured: false,
    author_image: '',
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials');
      if (!response.ok) throw new Error('Failed to load');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingId ? `/api/admin/testimonials/${editingId}` : '/api/admin/testimonials';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

        if (!response.ok) {
          const err = await response.json().catch(() => ({ error: 'Unknown error' }));
          console.error('Save error:', err);
          const msg = err?.error ?? err?.message ?? err?.details ?? err?.text ?? 'Failed to save testimonial';
          toast.error(msg);
          throw new Error('Failed to save');
        }
      
      setFormData({ author_name: '', author_role: '', author_company: '', content: '', rating: 5, featured: false, author_image: '' });
      setEditingId(null);
      await loadTestimonials();
      toast.success(editingId ? 'Testimonial updated' : 'Testimonial added');
    } catch (error) {
      console.error('Failed:', error);
      toast.error('Failed to save testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      await loadTestimonials();
      toast.success('Testimonial deleted');
    } catch (error) {
      console.error('Failed:', error);
      toast.error('Failed to delete testimonial');
    } finally {
      setDeletingId(null);
    }
  };

  const confirmDelete = (id: string) => {
    const toastId = toast.info(
      <div className="space-y-2">
        <p className="text-sm">Delete this testimonial?</p>
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
      setFormData({ ...formData, author_image: data.url });
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
        <h1 className="text-3xl font-light text-foreground mb-2">Testimonials</h1>
        <p className="text-muted-foreground">Manage client testimonials</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-lg border border-border bg-card/50 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Author Name"
            value={formData.author_name}
            onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            required
            className="px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="text"
            placeholder="Role (e.g., CEO)"
            value={formData.author_role}
            onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
            className="px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <input
          type="text"
          placeholder="Company"
          value={formData.author_company}
          onChange={(e) => setFormData({ ...formData, author_company: e.target.value })}
          className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <textarea
          placeholder="Testimonial"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={4}
          className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-light text-foreground">Rating</label>
            <div className="flex items-center gap-3">
              <StarRating
                value={formData.rating}
                onChange={(rating) => setFormData({ ...formData, rating })}
                size={24}
              />
              <span className="text-sm text-muted-foreground">{formData.rating}/5</span>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm font-light text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="rounded"
            />
            Featured
          </label>
        </div>

        {/* Author Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-light text-foreground">Author Image</label>
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
                {uploading ? 'Uploading...' : 'Click to upload author image'}
              </span>
            </label>
            {formData.author_image && (
              <div className="relative w-20 h-20 rounded-full border border-border overflow-hidden">
                <Image
                  src={formData.author_image}
                  alt="Author image preview"
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
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add Testimonial'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ author_name: '', author_role: '', author_company: '', content: '', rating: 5, featured: false, author_image: '' });
              }}
              className="px-6 py-2 bg-muted text-foreground rounded font-light hover:bg-muted/80"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-4 rounded-lg border border-border bg-card/50 flex justify-between items-start">
            <div>
              <h3 className="font-light text-foreground">{testimonial.author_name}</h3>
              <p className="text-sm text-muted-foreground">{testimonial.author_role} at {testimonial.author_company}</p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{testimonial.content}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-3">
                <StarRating
                  value={testimonial.rating}
                  readonly
                  size={16}
                />
              </div>
                {testimonial.featured && <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">Featured</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFormData(testimonial);
                  setEditingId(testimonial.id);
                }}
                className="px-3 py-1 text-sm bg-muted text-foreground rounded hover:bg-muted/80"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(testimonial.id)}
                disabled={deletingId === testimonial.id}
                className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded hover:bg-destructive/20 disabled:opacity-50"
              >
                {deletingId === testimonial.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


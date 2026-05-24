'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  category?: string;
  technologies: string[];
  live_url?: string;
  github_url?: string;
  featured: boolean;
  thumbnail_url?: string;
}

export default function ProjectsAdminPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    long_description: '',
    category: '',
    technologies: [] as string[],
    live_url: '',
    github_url: '',
    featured: false,
    thumbnail_url: '',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects');
      if (!response.ok) throw new Error('Failed to load projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to load projects');
      console.error('Failed to load projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingId ? `/api/admin/projects/${editingId}` : '/api/admin/projects';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save project');
      toast.success(editingId ? 'Project updated' : 'Project created');
      
      setFormData({
        title: '',
        description: '',
        long_description: '',
        category: '',
        technologies: [],
        live_url: '',
        github_url: '',
        featured: false,
        thumbnail_url: '',
      });
      setEditingId(null);
      await loadProjects();
    } catch (error) {
      toast.error('Failed to save project');
      console.error('Failed to save project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      toast.success('Project deleted');
      await loadProjects();
    } catch (error) {
      toast.error('Failed to delete project');
      console.error('Failed to delete project:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const confirmDelete = (id: string) => {
    toast.custom((toastId) => (
      <div className="space-y-2 rounded-xl border border-border bg-card p-4 text-foreground shadow-xl">
        <p className="text-sm">Delete this project?</p>
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
      const uploadData = new FormData(); // formData → uploadData
      uploadData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setFormData(prev => ({ ...prev, thumbnail_url: data.url }));
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      long_description: project.long_description || '',
      category: project.category || '',
      technologies: project.technologies || [],
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      featured: project.featured,
      thumbnail_url: project.thumbnail_url || '',
    });
    setEditingId(project.id);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-foreground mb-2">Projects</h1>
        <p className="text-muted-foreground">Manage your portfolio projects</p>
      </div>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-lg border border-border bg-card/50 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={2}
          className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />

        <textarea
          placeholder="Long Description (optional)"
          value={formData.long_description}
          onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="url"
            placeholder="Live URL"
            value={formData.live_url}
            onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
            className="px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="url"
            placeholder="GitHub URL"
            value={formData.github_url}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            className="px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
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

        {/* Thumbnail Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-light text-foreground">Project Thumbnail</label>
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
                {uploading ? 'Uploading...' : 'Click to upload thumbnail'}
              </span>
            </label>
            {formData.thumbnail_url && (
              <div className="relative w-20 h-20 rounded border border-border overflow-hidden">
                <Image
                  src={formData.thumbnail_url}
                  alt="Thumbnail preview"
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
            {loading ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: '',
                  description: '',
                  long_description: '',
                  category: '',
                  technologies: [],
                  live_url: '',
                  github_url: '',
                  featured: false,
                  thumbnail_url: '',
                });
              }}
              className="px-6 py-2 bg-muted text-foreground rounded font-light hover:bg-muted/80"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 rounded-lg border border-border bg-card/50 flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-light text-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
              <div className="flex gap-2 mt-2">
                {project.featured && <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">Featured</span>}
                {project.category && <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">{project.category}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="px-3 py-1 text-sm bg-muted text-foreground rounded hover:bg-muted/80"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(project.id)}
                disabled={deletingId === project.id}
                className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded hover:bg-destructive/20 disabled:opacity-50"
              >
                {deletingId === project.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

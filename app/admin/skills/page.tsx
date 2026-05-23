"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface Skill {
  id: string;
  category: string;
  skills: string[];
  proficiency_level: string;
}

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    skills: [] as string[],
    proficiency_level: 'Advanced',
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await fetch('/api/admin/skills');
      if (!response.ok) throw new Error('Failed to load');
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Failed:', error);
      toast.error('Failed to load skills');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skillsArray = formData.skills.map(s => s.trim()).filter(Boolean);
      
      const endpoint = editingId ? `/api/admin/skills/${editingId}` : '/api/admin/skills';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, skills: skillsArray }),
      });

      if (!response.ok) throw new Error('Failed to save');
      
      setFormData({ category: '', skills: [], proficiency_level: 'Advanced' });
      setEditingId(null);
      await loadSkills();
      toast.success(editingId ? 'Skills updated' : 'Skills added');
    } catch (error) {
      console.error('Failed:', error);
      toast.error('Failed to save skills');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed');
      await loadSkills();
      toast.success('Skills deleted');
    } catch (error) {
      console.error('Failed:', error);
      toast.error('Failed to delete skills');
    } finally {
      setDeletingId(null);
    }
  };

  const confirmDelete = (id: string) => {
    const toastId = toast.info(
      <div className="space-y-2">
        <p className="text-sm">Delete this skills category?</p>
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-foreground mb-2">Skills</h1>
        <p className="text-muted-foreground">Manage your expertise categories</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-lg border border-border bg-card/50 space-y-4">
        <input
          type="text"
          placeholder="Category (e.g., Frontend)"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
          className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <textarea
          placeholder="Skills (comma-separated, e.g., React, Next.js, TypeScript)"
          value={formData.skills.join(', ')}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
          rows={3}
          className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-accent text-accent-foreground rounded font-light hover:bg-accent/90 disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add Skills'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ category: '', skills: [], proficiency_level: 'Advanced' });
              }}
              className="px-6 py-2 bg-muted text-foreground rounded font-light hover:bg-muted/80"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 rounded-lg border border-border bg-card/50 flex justify-between items-start">
            <div>
              <h3 className="font-light text-foreground">{skill.category}</h3>
              <p className="text-sm text-muted-foreground mt-1">{skill.skills.join(', ')}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFormData(skill);
                  setEditingId(skill.id);
                }}
                className="px-3 py-1 text-sm bg-muted text-foreground rounded hover:bg-muted/80"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(skill.id)}
                disabled={deletingId === skill.id}
                className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded hover:bg-destructive/20 disabled:opacity-50"
              >
                {deletingId === skill.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { useToast } from '../../contexts/ToastContext';
import { DashboardInput } from './ui/DashboardInput';
import { LanguageToggle } from './ui/LanguageToggle';
import { ImagePicker } from './ui/ImagePicker';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Plus, Trash2, Edit2, Image as ImageIcon, X, Save, Layers, Tag, Search } from 'lucide-react';
import { Project } from '../../types';

export const PortfolioManager: React.FC = () => {
  const { fullContent, addProject, updateProject, deleteProject, categories, addCategory, deleteCategory } = useContent();
  const { showToast } = useToast();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  
  const projects = fullContent[lang].projects;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showCatManager, setShowCatManager] = useState(false);
  const [newCatInput, setNewCatInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [techInput, setTechInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');
  
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const resetForm = () => {
    setFormData({});
    setTechInput('');
    setGalleryInput('');
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEditClick = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
    setTechInput(project.technologies.join(', '));
    setGalleryInput(project.gallery ? project.gallery.join(', ') : '');
    setIsEditing(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.category) {
        showToast('Title and Category are required.', 'error');
        return;
    }

    const technologies = techInput.split(',').map(t => t.trim()).filter(t => t !== '');
    const gallery = galleryInput.split(',').map(g => g.trim()).filter(g => g !== '');

    const projectData: Project = {
        id: editingId || Date.now(),
        title: formData.title,
        category: formData.category,
        description: formData.description || '',
        fullDescription: formData.fullDescription || '',
        image: formData.image || 'https://picsum.photos/800/600',
        technologies: technologies,
        gallery: gallery,
        isVisible: true
    };

    if (editingId) {
        updateProject(projectData);
        showToast('Project updated successfully.', 'success');
    } else {
        addProject(projectData);
        showToast('New project created.', 'success');
    }
    
    resetForm();
  };

  const handleDelete = () => {
    if (deleteId) {
        deleteProject(deleteId);
        showToast('Project deleted.', 'info');
        setDeleteId(null);
    }
  };

  const handleAddCategory = () => {
    if (newCatInput.trim()) {
        addCategory(newCatInput.trim());
        setNewCatInput('');
        showToast('Category added.', 'success');
    }
  };

  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h3 className="text-2xl font-bold">Portfolio Projects</h3>
            <p className="text-gray-400 text-sm">Manage your case studies and project details.</p>
        </div>
        
        <div className="flex items-center gap-4">
            <LanguageToggle lang={lang} setLang={(l) => { setLang(l); resetForm(); }} />

            <button 
                onClick={() => setShowCatManager(!showCatManager)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors border ${showCatManager ? 'bg-white/10 border-white text-white' : 'border-white/10 text-gray-400 hover:text-white'}`}
            >
                <Tag size={18} /> Categories
            </button>

            <button 
                onClick={() => { resetForm(); setIsEditing(true); }}
                className="flex items-center gap-2 bg-app-accent text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/20"
            >
                <Plus size={18} /> Add Project
            </button>
        </div>
      </div>

      {showCatManager && (
        <div className="bg-black border border-white/10 rounded-2xl p-6 animate-in fade-in slide-in-from-top-2">
            <h4 className="font-bold text-white mb-4">Manage Categories</h4>
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(cat => (
                    <span key={cat} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 flex items-center gap-2 group hover:border-white/30 transition-colors">
                        {cat}
                        <button onClick={() => deleteCategory(cat)} className="text-gray-500 hover:text-red-500 transition-colors"><X size={14} /></button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2 max-w-md">
                <input 
                    value={newCatInput}
                    onChange={(e) => setNewCatInput(e.target.value)}
                    placeholder="New Category Name"
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-app-accent focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                />
                <button 
                    onClick={handleAddCategory}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                >
                    Add
                </button>
            </div>
        </div>
      )}

      {isEditing && (
        <div className="bg-black border border-white/10 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 shadow-2xl">
            <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
                <h4 className="font-bold text-white flex items-center gap-2">
                    {editingId ? <Edit2 size={16} /> : <Plus size={16} />} 
                    {editingId ? 'Edit Project' : 'Create New Project'}
                </h4>
                <button onClick={resetForm} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DashboardInput
                        label="Project Title"
                        value={formData.title || ''}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g. Lumina Financial"
                    />
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Category</label>
                        <div className="relative">
                            <select 
                                value={formData.category || ''}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-app-accent focus:outline-none appearance-none cursor-pointer text-sm"
                            >
                                <option value="" disabled>Select a Category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="bg-neutral-900 text-white py-2">{cat}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <Tag size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                <DashboardInput
                    label="Short Description"
                    textarea
                    value={formData.description || ''}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Brief overview for the card..."
                />

                <DashboardInput
                    label="Full Description"
                    textarea
                    value={formData.fullDescription || ''}
                    onChange={e => setFormData({...formData, fullDescription: e.target.value})}
                    placeholder="Detailed case study content..."
                    className="min-h-[150px]"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <ImagePicker
                            label="Main Image"
                            value={formData.image || ''}
                            onChange={(val) => setFormData({...formData, image: val})}
                            placeholder="https://..."
                        />
                    </div>
                    
                    <div className="space-y-2">
                         <DashboardInput
                            label="Technologies"
                            icon={<Layers size={14} />}
                            value={techInput}
                            onChange={e => setTechInput(e.target.value)}
                            placeholder="React, TypeScript, Tailwind (comma separated)"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {techInput.split(',').filter(t => t.trim()).map((t, i) => (
                                <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">{t.trim()}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <DashboardInput
                    label="Gallery Images (Comma Separated URLs)"
                    textarea
                    value={galleryInput}
                    onChange={e => setGalleryInput(e.target.value)}
                    placeholder="https://image1.jpg, https://image2.jpg..."
                    helperText="Or copy-paste URLs from Media Library"
                />

                <div className="flex gap-4 pt-4 border-t border-white/10">
                    <button onClick={handleSubmit} className="flex-1 bg-app-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                        <Save size={18} /> {editingId ? 'Update Project' : 'Publish Project'}
                    </button>
                    <button onClick={resetForm} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-white/30"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
            <div key={project.id} className="bg-black border border-white/10 rounded-2xl overflow-hidden group hover:border-white/30 transition-all">
                <div className="aspect-video relative overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                        <button 
                            onClick={() => handleEditClick(project)}
                            className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform shadow-xl"
                            title="Edit"
                        >
                            <Edit2 size={18} />
                        </button>
                        <button 
                            onClick={() => setDeleteId(project.id)}
                            className="p-3 bg-red-500 rounded-full text-white hover:scale-110 transition-transform shadow-xl"
                            title="Delete"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10 text-[10px] text-white">
                        {project.category}
                    </div>
                </div>
                <div className="p-5 space-y-2">
                    <h4 className="font-bold text-white text-lg">{project.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                </div>
            </div>
        ))}
        {filteredProjects.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
                No projects found.
            </div>
        )}
      </div>

      <ConfirmDialog 
        isOpen={!!deleteId}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        isDestructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
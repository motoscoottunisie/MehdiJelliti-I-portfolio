import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { useToast } from '../../contexts/ToastContext';
import { DashboardInput } from './ui/DashboardInput';
import { LanguageToggle } from './ui/LanguageToggle';
import { ImagePicker } from './ui/ImagePicker';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Plus, Trash2, Edit2, Image as ImageIcon, X, Save, Clock, Calendar, Tag, Search } from 'lucide-react';
import { BlogPost } from '../../types';

export const BlogManager: React.FC = () => {
  const { fullContent, addPost, updatePost, deletePost, categories } = useContent();
  const { showToast } = useToast();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  
  const posts = fullContent[lang].blog.posts;

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<Partial<BlogPost>>({});
  const [contentInput, setContentInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const resetForm = () => {
    setFormData({});
    setContentInput('');
    setTagsInput('');
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEditClick = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData(post);
    setContentInput(post.content.join('\n\n'));
    setTagsInput(post.tags ? post.tags.join(', ') : '');
    setIsEditing(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.category) {
        showToast('Title and Category are required.', 'error');
        return;
    }

    const contentArray = contentInput.split('\n\n').map(p => p.trim()).filter(p => p !== '');
    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(t => t !== '');

    const postData: BlogPost = {
        id: editingId || Date.now(),
        title: formData.title,
        category: formData.category,
        excerpt: formData.excerpt || '',
        content: contentArray,
        image: formData.image || 'https://picsum.photos/800/600',
        date: formData.date || new Date().toLocaleDateString(),
        readTime: formData.readTime || '5 min read',
        tags: tagsArray,
        status: 'published'
    };

    if (editingId) {
        updatePost(postData);
        showToast('Article updated successfully.', 'success');
    } else {
        addPost(postData);
        showToast('Article published successfully.', 'success');
    }
    
    resetForm();
  };

  const handleDelete = () => {
    if (deleteId) {
        deletePost(deleteId);
        showToast('Article deleted.', 'info');
        setDeleteId(null);
    }
  };

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h3 className="text-2xl font-bold">Blog Management</h3>
            <p className="text-gray-400 text-sm">Create and edit articles and thoughts.</p>
        </div>

        <div className="flex items-center gap-4">
            <LanguageToggle lang={lang} setLang={(l) => { setLang(l); resetForm(); }} />

            <button 
                onClick={() => { resetForm(); setIsEditing(true); }}
                className="flex items-center gap-2 bg-app-accent text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/20"
            >
                <Plus size={18} /> New Article
            </button>
        </div>
      </div>

      {isEditing && (
        <div className="bg-black border border-white/10 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 shadow-2xl">
            <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
                <h4 className="font-bold text-white flex items-center gap-2">
                    {editingId ? <Edit2 size={16} /> : <Plus size={16} />} 
                    {editingId ? 'Edit Article' : 'Compose New Article'}
                </h4>
                <button onClick={resetForm} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <DashboardInput
                        label="Article Title"
                        value={formData.title || ''}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder="Title..."
                    />
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Category</label>
                         <div className="relative">
                            <select 
                                value={formData.category || ''}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-app-accent focus:outline-none appearance-none cursor-pointer text-sm"
                            >
                                <option value="" disabled>Select Category</option>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DashboardInput
                        label="Date"
                        icon={<Calendar size={14} />}
                        value={formData.date || ''}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        placeholder="e.g. Oct 24, 2024"
                    />
                     <DashboardInput
                        label="Read Time"
                        icon={<Clock size={14} />}
                        value={formData.readTime || ''}
                        onChange={e => setFormData({...formData, readTime: e.target.value})}
                        placeholder="e.g. 5 min read"
                    />
                </div>

                <div className="space-y-2">
                    <ImagePicker
                        label="Cover Image"
                        value={formData.image || ''}
                        onChange={(val) => setFormData({...formData, image: val})}
                        placeholder="https://..."
                    />
                </div>

                 <DashboardInput
                    label="Excerpt (Card View)"
                    textarea
                    value={formData.excerpt || ''}
                    onChange={e => setFormData({...formData, excerpt: e.target.value})}
                />

                <div className="space-y-2">
                    <DashboardInput
                        label="Full Article Content"
                        helperText="Separate paragraphs with double enter."
                        textarea
                        value={contentInput}
                        onChange={e => setContentInput(e.target.value)}
                        placeholder="Write your article here..."
                        className="min-h-[250px]"
                    />
                </div>

                <DashboardInput
                    label="Tags (Comma Separated)"
                    icon={<Tag size={14} />}
                    value={tagsInput}
                    onChange={e => setTagsInput(e.target.value)}
                    placeholder="React, Design, Tutorial"
                />

                <div className="flex gap-4 pt-4 border-t border-white/10">
                    <button onClick={handleSubmit} className="flex-1 bg-app-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                        <Save size={18} /> {editingId ? 'Update Article' : 'Publish Article'}
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
            placeholder="Search articles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-white/30"
        />
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
            <div key={post.id} className="bg-black border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between group hover:border-white/30 transition-colors gap-4">
                <div className="flex items-center gap-4">
                    <img src={post.image} className="w-16 h-16 rounded-lg object-cover" alt={post.title} />
                    <div>
                        <h4 className="font-bold text-white line-clamp-1">{post.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span className="text-app-accent">{post.category}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 self-end md:self-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                        onClick={() => handleEditClick(post)} 
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                        title="Edit"
                     >
                        <Edit2 size={18} />
                     </button>
                     <button 
                        onClick={() => setDeleteId(post.id)} 
                        className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-500 transition-colors"
                        title="Delete"
                     >
                        <Trash2 size={18} />
                     </button>
                </div>
            </div>
        ))}
         {filteredPosts.length === 0 && (
            <div className="py-12 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
                No articles found.
            </div>
        )}
      </div>

      <ConfirmDialog 
        isOpen={!!deleteId}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
        isDestructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
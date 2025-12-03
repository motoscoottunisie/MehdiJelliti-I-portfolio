import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { useToast } from '../../contexts/ToastContext';
import { DashboardInput } from './ui/DashboardInput';
import { LanguageToggle } from './ui/LanguageToggle';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Plus, Trash2, Edit2, MessageSquare, Save, X, Eye, EyeOff } from 'lucide-react';
import { Testimonial } from '../../types';

export const TestimonialsManager: React.FC = () => {
  const { fullContent, addTestimonial, updateTestimonial, deleteTestimonial } = useContent();
  const { showToast } = useToast();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  
  const testimonials = fullContent[lang].testimonials.items;

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({});
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const resetForm = () => {
    setFormData({});
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEditClick = (testimonial: Testimonial) => {
    const id = testimonial.id || Date.now(); // Handle legacy items without IDs
    setEditingId(id);
    setFormData({ ...testimonial, id }); 
    setIsEditing(true);
  };

  const handleSubmit = () => {
    if (!formData.author || !formData.text) {
        showToast('Author and Quote are required.', 'error');
        return;
    }

    const testimonialData: Testimonial = {
        id: editingId || Date.now(),
        text: formData.text,
        author: formData.author,
        role: formData.role || '',
        isVisible: formData.isVisible !== false // Default to true if undefined
    };

    if (editingId) {
        updateTestimonial(testimonialData);
        showToast('Testimonial updated successfully.', 'success');
    } else {
        addTestimonial(testimonialData);
        showToast('New testimonial added.', 'success');
    }
    
    resetForm();
  };

  const handleDelete = () => {
    if (deleteId) {
        deleteTestimonial(deleteId);
        showToast('Testimonial deleted.', 'info');
        setDeleteId(null);
    }
  };

  const toggleVisibility = (testimonial: Testimonial) => {
      const id = testimonial.id || Date.now();
      updateTestimonial({ ...testimonial, id, isVisible: !testimonial.isVisible });
      showToast(testimonial.isVisible ? 'Testimonial hidden.' : 'Testimonial visible.', 'info');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h3 className="text-2xl font-bold">Reviews Management</h3>
            <p className="text-gray-400 text-sm">Manage client testimonials and feedback.</p>
        </div>

        <div className="flex items-center gap-4">
            <LanguageToggle lang={lang} setLang={(l) => { setLang(l); resetForm(); }} />

            <button 
                onClick={() => { resetForm(); setIsEditing(true); }}
                className="flex items-center gap-2 bg-app-accent text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/20"
            >
                <Plus size={18} /> Add Review
            </button>
        </div>
      </div>

      {isEditing && (
        <div className="bg-black border border-white/10 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 shadow-2xl">
            <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
                <h4 className="font-bold text-white flex items-center gap-2">
                    {editingId ? <Edit2 size={16} /> : <Plus size={16} />} 
                    {editingId ? 'Edit Review' : 'Add New Review'}
                </h4>
                <button onClick={resetForm} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <DashboardInput
                        label="Client Name"
                        value={formData.author || ''}
                        onChange={e => setFormData({...formData, author: e.target.value})}
                        placeholder="e.g. Sarah Jenkins"
                    />
                    <DashboardInput
                        label="Role / Company"
                        value={formData.role || ''}
                        onChange={e => setFormData({...formData, role: e.target.value})}
                        placeholder="e.g. CEO, Modern Living"
                    />
                </div>

                <DashboardInput
                    label="Testimonial Quote"
                    textarea
                    value={formData.text || ''}
                    onChange={e => setFormData({...formData, text: e.target.value})}
                    placeholder="The review content..."
                    className="min-h-[120px]"
                />

                <div className="flex gap-4 pt-4 border-t border-white/10">
                    <button onClick={handleSubmit} className="flex-1 bg-app-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                        <Save size={18} /> {editingId ? 'Update Review' : 'Save Review'}
                    </button>
                    <button onClick={resetForm} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((item, idx) => {
            const displayId = item.id || idx; 
            return (
                <div key={displayId} className={`bg-black border rounded-2xl p-6 relative group transition-all ${item.isVisible === false ? 'border-red-500/20 opacity-60' : 'border-white/10 hover:border-white/30'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-app-accent">
                                <MessageSquare size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{item.author}</h4>
                                <p className="text-xs text-gray-500">{item.role}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => toggleVisibility({...item, id: item.id || displayId})}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-400 hover:text-white transition-colors"
                                title={item.isVisible === false ? "Show" : "Hide"}
                            >
                                {item.isVisible === false ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button 
                                onClick={() => handleEditClick({...item, id: item.id || displayId})} 
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                                title="Edit"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button 
                                onClick={() => setDeleteId(item.id || displayId)} 
                                className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-500 transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm italic leading-relaxed">"{item.text}"</p>
                    {item.isVisible === false && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">HIDDEN</div>
                    )}
                </div>
            );
        })}
        {testimonials.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
                No testimonials found.
            </div>
        )}
      </div>

      <ConfirmDialog 
        isOpen={!!deleteId}
        title="Delete Review"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        isDestructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
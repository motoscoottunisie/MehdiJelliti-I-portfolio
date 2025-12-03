import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { useToast } from '../../contexts/ToastContext';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { RefreshCw } from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const { resetToDefaults } = useContent();
  const { showToast } = useToast();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    resetToDefaults();
    showToast('System reset to default state.', 'info');
    setShowResetConfirm(false);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-8">
         <h3 className="text-xl font-bold text-red-500 mb-2">Danger Zone</h3>
         <p className="text-gray-400 text-sm mb-6">Resetting will clear all local changes and revert the website to its original static content.</p>
         <button 
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-2 bg-red-500/20 text-red-500 px-6 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-all"
         >
            <RefreshCw size={16} /> Reset Content to Defaults
         </button>
      </div>

      <ConfirmDialog 
        isOpen={showResetConfirm}
        title="Reset All Content?"
        message="This will completely wipe all your changes, deleted projects, and blog posts. The site will revert to its original installation state. This cannot be undone."
        confirmText="Yes, Reset Everything"
        isDestructive
        onConfirm={handleReset}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};
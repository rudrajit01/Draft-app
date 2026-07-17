// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// ================== সব টেক্সটের অনুবাদ ==================
const translations = {
  en: {
    app_title: '📝 Draft Management System',
    total_drafts: 'Total Drafts',
    edit_draft: '✏️ Edit Draft',
    create_new_draft: '➕ Create New Draft',
    title_placeholder: 'Enter draft title',
    content_placeholder: 'Enter draft content',
    saving: '⏳ Saving...',
    update: '🔄 Update',
    save: '📥 Save',
    cancel: '❌ Cancel',
    your_drafts: '📄 Your Drafts',
    loading: '⏳ Loading...',
    no_drafts: 'No drafts found. Create a new one!',
    id_label: 'ID',
    edit_btn: '✏️ Edit',
    delete_btn: '🗑️ Delete',
    delete_confirm: 'Are you sure you want to delete this draft?',
    validation_alert: 'Title and content are required!',
    switch_lang: 'বাংলা',
    search_placeholder: 'Search drafts...',
  },
  bn: {
    app_title: '📝 ড্রাফ্ট ব্যবস্থাপনা সিস্টেম',
    total_drafts: 'মোট ড্রাফ্ট',
    edit_draft: '✏️ ড্রাফ্ট এডিট করুন',
    create_new_draft: '➕ নতুন ড্রাফ্ট তৈরি করুন',
    title_placeholder: 'ড্রাফ্টের টাইটেল লিখুন',
    content_placeholder: 'ড্রাফ্টের কন্টেন্ট লিখুন',
    saving: '⏳ সংরক্ষণ করা হচ্ছে...',
    update: '🔄 আপডেট করুন',
    save: '📥 সেভ করুন',
    cancel: '❌ বাতিল করুন',
    your_drafts: '📄 আপনার ড্রাফ্টসমূহ',
    loading: '⏳ লোড হচ্ছে...',
    no_drafts: 'কোন ড্রাফ্ট নেই। নতুন ড্রাফ্ট তৈরি করুন!',
    id_label: 'আইডি',
    edit_btn: '✏️ এডিট',
    delete_btn: '🗑️ ডিলিট',
    delete_confirm: 'আপনি কি এই ড্রাফ্টটি মুছে ফেলতে চান?',
    validation_alert: 'টাইটেল এবং কন্টেন্ট অবশ্যই পূরণ করতে হবে!',
    switch_lang: 'English',
    search_placeholder: 'ড্রাফ্ট খুঁজুন...',
  }
};

function App() {
  // ================== স্টেট ডিক্লেয়ারেশন ==================
  const [drafts, setDrafts] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('bn');
  const [searchTerm, setSearchTerm] = useState('');

  // অনুবাদ ফাংশন
  const t = (key) => translations[language][key] || key;

  // ================== মেমোইজড ফিল্টার ==================
  const filteredDrafts = useMemo(() => {
    if (!searchTerm.trim()) return drafts;
    return drafts.filter(draft =>
      draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      draft.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [drafts, searchTerm]);

  // ================== localStorage ==================
  useEffect(() => {
    const savedDrafts = localStorage.getItem('drafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('drafts', JSON.stringify(drafts));
  }, [drafts]);

  // ================== হ্যান্ডলার ফাংশন ==================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() === '' || formData.content.trim() === '') {
      alert(t('validation_alert'));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (editingId !== null) {
        const updatedDrafts = drafts.map((draft) =>
          draft.id === editingId
            ? { ...draft, title: formData.title, content: formData.content }
            : draft
        );
        setDrafts(updatedDrafts);
        setEditingId(null);
      } else {
        const newDraft = {
          id: Date.now(),
          title: formData.title,
          content: formData.content,
        };
        setDrafts([newDraft, ...drafts]);
      }
      setFormData({ title: '', content: '' });
      setLoading(false);
    }, 800);
  };

  const deleteDraft = (id) => {
    if (window.confirm(t('delete_confirm'))) {
      setLoading(true);
      setTimeout(() => {
        const remainingDrafts = drafts.filter((draft) => draft.id !== id);
        setDrafts(remainingDrafts);
        setLoading(false);
      }, 500);
    }
  };

  const startEditing = (draft) => {
    setEditingId(draft.id);
    setFormData({ title: draft.title, content: draft.content });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({ title: '', content: '' });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  // ================== UI রেন্ডার ==================
  return (
    <div className="app-container">
      {/* হেডার + ল্যাঙ্গুয়েজ টগল বাটন */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h1 style={{ margin: 0 }}>{t('app_title')}</h1>
        <button 
          onClick={toggleLanguage} 
          style={{
            padding: '8px 18px',
            background: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.3s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => e.target.style.background = '#1a252f'}
          onMouseOut={(e) => e.target.style.background = '#2c3e50'}
        >
          {language === 'en' ? '🇧🇩 বাংলা' : '🇬🇧 English'}
        </button>
      </div>

      <p className="draft-count">{t('total_drafts')}: {drafts.length}</p>

      {/* ফর্ম */}
      <form onSubmit={handleSubmit} className="draft-form">
        <h3>{editingId !== null ? t('edit_draft') : t('create_new_draft')}</h3>
        
        <input
          type="text"
          name="title"
          placeholder={t('title_placeholder')}
          value={formData.title}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <textarea
          name="content"
          placeholder={t('content_placeholder')}
          value={formData.content}
          onChange={handleChange}
          rows="4"
          disabled={loading}
          required
        />
        
        <div className="form-buttons">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? t('saving') : (editingId !== null ? t('update') : t('save'))}
          </button>
          {editingId !== null && (
            <button type="button" onClick={cancelEditing} className="cancel-btn" disabled={loading}>
              {t('cancel')}
            </button>
          )}
        </div>
      </form>

      {/* ===== সার্চ ইনপুট ===== */}
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder={t('search_placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 15px',
            border: '1px solid #cbd5e0',
            borderRadius: '10px',
            fontSize: '16px',
            background: 'white',
            color: '#1a202c',
            fontFamily: 'Poppins, sans-serif'
          }}
        />
      </div>

      {/* ড্রাফ্ট লিস্ট */}
      <div className="drafts-list">
        <h2>{t('your_drafts')}</h2>
        {loading && filteredDrafts.length === 0 && <p>{t('loading')}</p>}
        
        {filteredDrafts.length === 0 && !loading ? (
          <p className="empty-msg">{t('no_drafts')}</p>
        ) : (
          filteredDrafts.map((draft) => (
            <div key={draft.id} className="draft-card">
              <div className="draft-content">
                <h3>{draft.title}</h3>
                <p>{draft.content}</p>
                <small>{t('id_label')}: {draft.id}</small>
              </div>
              <div className="draft-actions">
                <button onClick={() => startEditing(draft)} disabled={loading} className="edit-btn">
                  {t('edit_btn')}
                </button>
                <button onClick={() => deleteDraft(draft.id)} disabled={loading} className="delete-btn">
                  {t('delete_btn')}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
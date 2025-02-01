import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  question_hi?: string;
  answer_hi?: string;
  question_bn?: string;
  answer_bn?: string;
}

const AdminPanel: React.FC = () => {
  // FAQs list from backend
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  // For editing, if null then we're creating a new FAQ
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  // Form state for question and answer
  const [formData, setFormData] = useState({ question: '', answer: '' });
  // For showing messages (optional)
  const [message, setMessage] = useState<string>('');

  // Fetch FAQs from API
  const fetchFaqs = async () => {
    try {
      const response = await axios.get<FAQ[]>('http://localhost:8080/api/faq');
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Update form values as user types
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission for both create and update
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingFAQ) {
        // Update FAQ
        await axios.put(`http://localhost:8080/api/faq`, {...formData, id: editingFAQ._id});
        setMessage('FAQ updated successfully!');
      } else {
        // Create new FAQ
        await axios.post('http://localhost:8080/api/faq', formData);
        setMessage('FAQ created successfully!');
      }
      setFormData({ question: '', answer: '' });
      setEditingFAQ(null);
      fetchFaqs();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      setMessage('Error saving FAQ');
    }
  };

  // Set form for editing a FAQ
  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({ question: faq.question, answer: faq.answer });
  };

  // Delete a FAQ
  const handleDelete = async (faqId: string) => {
    try {
      await axios.delete(`/api/faq/${faqId}`);
      setMessage('FAQ deleted successfully!');
      fetchFaqs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setMessage('Error deleting FAQ');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>FAQ Admin Panel</h1>

      {message && (
        <p style={{ color: 'green' }}>{message}</p>
      )}

      <div style={{ marginBottom: '30px' }}>
        <h2>{editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="question" style={{ display: 'block', marginBottom: '5px' }}>
              Question:
            </label>
            <input
              type="text"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              style={{ padding: '8px', width: '300px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="answer" style={{ display: 'block', marginBottom: '5px' }}>
              Answer:
            </label>
            <textarea
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              style={{ padding: '8px', width: '300px', height: '100px' }}
              required
            />
          </div>
          <button type="submit" style={{ padding: '8px 16px', marginRight: '10px' }}>
            {editingFAQ ? 'Update FAQ' : 'Create FAQ'}
          </button>
          {editingFAQ && (
            <button
              type="button"
              onClick={() => {
                setEditingFAQ(null);
                setFormData({ question: '', answer: '' });
                setMessage('');
              }}
              style={{ padding: '8px 16px' }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <hr />

      <h2>Existing FAQs</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Question</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Answer</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(faqs) && faqs.length > 0 ? (
            faqs.map(faq => (
              <tr key={faq._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{faq.question}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{faq.answer}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button onClick={() => handleEdit(faq)} style={{ marginRight: '10px' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(faq._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', padding: '8px' }}>
                No FAQs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;

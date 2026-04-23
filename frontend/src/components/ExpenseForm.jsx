import { useState } from 'react';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';

const ExpenseForm = ({ refreshExpenses }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: ''
  });
  const [error, setError] = useState('');

  const categories = ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Other'];

  const { title, amount, category, date } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/expense', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setFormData({ title: '', amount: '', category: 'Food', date: '' });
      refreshExpenses();
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error adding expense');
    }
  };

  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>Add New Expense</h2>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            name="title" 
            value={title} 
            onChange={onChange} 
            className="form-input" 
            required 
            placeholder="e.g. Groceries"
          />
        </div>
        <div className="form-group">
          <label>Amount ($)</label>
          <input 
            type="number" 
            name="amount" 
            value={amount} 
            onChange={onChange} 
            className="form-input" 
            required 
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select 
            name="category" 
            value={category} 
            onChange={onChange} 
            className="form-input"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Date (Optional)</label>
          <input 
            type="date" 
            name="date" 
            value={date} 
            onChange={onChange} 
            className="form-input" 
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <PlusCircle size={18} style={{ marginRight: '0.5rem' }} /> Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;

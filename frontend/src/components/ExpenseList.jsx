import { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';

const ExpenseList = ({ expenses }) => {
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Other'];

  const filteredExpenses = useMemo(() => {
    if (filterCategory === 'All') return expenses;
    return expenses.filter(expense => expense.category === filterCategory);
  }, [expenses, filterCategory]);

  const totalAmount = useMemo(() => {
    return filteredExpenses.reduce((total, item) => total + item.amount, 0);
  }, [filteredExpenses]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="glass-card summary-card">
        <h3 className="summary-title">Total Expenses</h3>
        <div className="summary-amount">${totalAmount.toFixed(2)}</div>
      </div>

      <div className="filters">
        <select 
          className="filter-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div style={{ alignSelf: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Showing {filteredExpenses.length} expense{filteredExpenses.length !== 1 && 's'}
        </div>
      </div>

      <div className="expense-list">
        {filteredExpenses.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            No expenses found. Add some!
          </div>
        ) : (
          filteredExpenses.map(expense => (
            <div key={expense._id} className="expense-item">
              <div className="expense-info">
                <span className="expense-title">{expense.title}</span>
                <div className="expense-meta">
                  <span style={{ 
                    background: 'var(--primary)', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem',
                    color: 'white'
                  }}>
                    {expense.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    {formatDate(expense.date)}
                  </span>
                </div>
              </div>
              <div className="expense-amount">
                ${expense.amount.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;

import { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { LogOut, Wallet } from 'lucide-react';

const Dashboard = ({ setAuth }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await axios.get(`${apiUrl}/expenses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setExpenses(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching expenses', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExpenses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="header-title">
          <Wallet size={28} color="var(--primary)" />
          <span>Expense Manager</span>
        </div>
        <button onClick={handleLogout} className="btn btn-danger" style={{ width: 'auto' }}>
          <LogOut size={18} style={{ marginRight: '0.5rem' }} /> Logout
        </button>
      </div>

      <div className="dashboard-grid">
        <div>
          <ExpenseForm refreshExpenses={fetchExpenses} />
        </div>
        <div>
          {loading ? (
            <div>Loading expenses...</div>
          ) : (
            <ExpenseList expenses={expenses} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

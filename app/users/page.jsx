'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiCalendar, FiMail, FiRefreshCw, FiTrash2, FiUsers } from 'react-icons/fi';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${apiUrl}/auth/users`);
      setUsers(response.data.users || []);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId, userName) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"?`)) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await axios.delete(`${apiUrl}/auth/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              <FiUsers className="text-[#ee0979]" />
              Registered Users
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Total: {users.length} {users.length === 1 ? 'user' : 'users'}
            </p>
          </div>
          <button
            onClick={fetchUsers}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            <FiRefreshCw />
            Refresh
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-[#ee0979] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading users...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl p-6 text-center">
            <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>
          </div>
        )}

        {/* Users Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all hover:border-[#ee0979]"
              >
                {/* User Avatar */}
                <div className="flex items-start justify-between mb-4">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#ee0979]"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#ee0979] to-[#ff6a00] flex items-center justify-center text-white font-bold text-2xl">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    onClick={() => handleDelete(user._id, user.name)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete user"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                {/* User Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                    {user.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FiMail className="flex-shrink-0" />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FiCalendar className="flex-shrink-0" />
                    <span className="text-sm">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Role Badge */}
                  <div className="pt-2">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'admin'
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    }`}>
                      {user.role || 'user'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && users.length === 0 && (
          <div className="text-center py-20">
            <FiUsers className="mx-auto text-gray-400 text-6xl mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Users Found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Register some users to see them here
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

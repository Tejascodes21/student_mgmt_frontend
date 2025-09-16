'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { authenticateUser } from '@/lib/data';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role') || 'student';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getRoleInfo = () => {
    switch (role) {
      case 'teacher':
        return {
          title: 'Teacher Login',
          icon: '/teacher.png',
          redirect: '/teacher'
        };
      case 'admin':
        return {
          title: 'Admin Login',
          icon: '/profile.png',
          redirect: '/admin'
        };
      default:
        return {
          title: 'Student Login',
          icon: '/student.png',
          redirect: '/student'
        };
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await authenticateUser(formData.email, formData.password);
      
      if (user) {
        // Check if the user's role matches the intended role
        if (user.role === role) {
          router.push(getRoleInfo().redirect);
        } else {
          setError(`This login is for ${role} accounts. Please use the correct login option.`);
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Image
              src={roleInfo.icon}
              alt={roleInfo.title}
              width={64}
              height={64}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800">{roleInfo.title}</h1>
            <p className="text-gray-600 mt-2">Please enter your credentials to continue</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-blue-600 hover:text-blue-500">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
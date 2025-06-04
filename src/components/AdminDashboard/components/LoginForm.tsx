// src/pages/AdminLogin/components/LoginForm.tsx
import api from '@/api';
import { Button } from '@heroui/button';
import { Input, Form } from '@heroui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@heroui/progress';

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Giriş hatası:', error.response.data);
      // Örnek hata yapısı: { message: "Geçersiz kullanıcı adı!" }
      if (error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response.data.message) {
        setErrors({
          username: error.response.data.message,
          password: error.response.data.message,
        });
      } else {
        setErrors({ username: 'Bilinmeyen bir hata oluştu.' });
      }
      setIsLoading(false);
    }
  };

  return (
    <Form
      className="w-full max-w-md mx-auto flex flex-col gap-4 p-6"
      onSubmit={handleSubmit}
      validationErrors={errors}
    >
      <Input
        isRequired
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="Enter your username"
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setErrors((prev) => ({ ...prev, username: '' }));
        }}
        errorMessage={errors.username}
      />
      <Input
        isRequired
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors((prev) => ({ ...prev, password: '' }));
        }}
        errorMessage={errors.password}
      />
      <div className="flex gap-2 justify-center">
        {isLoading ? (
          <CircularProgress size="md" aria-label="Loading" />
        ) : (
          <Button color="primary" type="submit">
            Login
          </Button>
        )}
      </div>
    </Form>
  );
};

export default LoginForm;

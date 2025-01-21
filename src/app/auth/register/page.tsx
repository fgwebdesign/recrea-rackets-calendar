'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    telefono: '',
    foto_perfil: '',
    categoria: '4ta'
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      // Validate password strength
      if (formData.password.length < 8) {
        setErrorMessage('La contraseña debe tener al menos 8 caracteres');
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMessage('Por favor ingrese un email válido');
        return;
      }

      const response = await axios.post('http://localhost:9999/auth/register', {
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono || '',
        foto_perfil: formData.foto_perfil || '',
        categoria: formData.categoria
      });

      if (response.data.user) {
        router.push('/auth/login');
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Error en el registro');
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Crear una cuenta
            </h2>
            <p className="text-gray-600 text-sm">
              Únete a nuestra comunidad de pádel y comienza a jugar
            </p>
          </div>

          {errorMessage && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido
                </label>
                <input
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              >
                <option value="4ta">4ta</option>
                <option value="5ta">5ta</option>
                <option value="6ta">6ta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Registrarse
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Image/Branding */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 relative">
        <div className="absolute inset-0 bg-[linear-gradient(40deg,#0000_40%,#fff2_70%,#0000)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#fff3_0%,#0000_50%)] opacity-40" />
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="text-center text-white max-w-lg">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <Image
                src="/assets/logo_padel_manager.png"
                alt="Padel Manager"
                width={300}
                height={300}
                className="mx-auto mb-8"
              />
              <h2 className="text-2xl font-bold mb-4">Bienvenido a Padel Manager</h2>
              <p className="text-lg text-white/90">
                Únete a la comunidad líder de pádel y disfruta de todas las ventajas de nuestra plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
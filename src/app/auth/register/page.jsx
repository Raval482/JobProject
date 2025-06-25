'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import FormGroupField from '../../components/ui/FormGroupField';
import Button from '../../components/ui/Button';
import Link from 'next/link';
import { registerFormData } from '../../form-schema/registerform'; import { useRegisterMutation } from '../../services/mutationServices';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';




const RegisterForm = () => {

  const registerMutation = useRegisterMutation()
  const router = useRouter()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const RegisterUser = (formData) => {

    registerMutation.mutate(formData, {
      onSuccess: (data) => {
        if (data?.status === 200) {
          toast.success(data?.message)
          router.push('/auth/login')
        } else {
          toast.info(data?.message)
        }

      },
      onError: (error) => {
        toast.error(error.message)
      }
    })

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 px-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/40 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center ">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(RegisterUser)}>
          {registerFormData.map((field) => (
            <FormGroupField
              key={field.id}
              data={{
                ...field,
                ...register(field.name),
                className:
                  'bg-white/70 border border-white/60 text-gray-800 placeholder-gray-500 focus:ring-blue-400',
              }}
            />
          ))}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Register
          </Button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

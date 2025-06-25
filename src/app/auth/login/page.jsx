'use client';
import React from 'react';
import FormGroupField from '../../components/ui/FormGroupField';
import Button from '../../components/ui/Button';
import Link from 'next/link';
import { loginForm } from '../../form-schema/loginform';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../services/mutationServices';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const LoginForm = () => {


  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const loginMutation = useLoginMutation()
  const router = useRouter()

  const loginUser = (formData) => {
    loginMutation.mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data?.message)
          localStorage.setItem("token", data.token)
          sessionStorage.setItem("role", data.data.role)
          sessionStorage.setItem("id", data.data._id)

          data.data.role === "user" && router.push("/user-page")
          data.data.role === "provider" && router.push("/provider-page")
          data.data.role === "admin" && router.push("/admin-page")

        }
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 px-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/40 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center ">
          Login to Your Account
        </h2>


        <form onSubmit={handleSubmit(loginUser)}>

          {
            loginForm.length > 0 && loginForm.map((field) => (
              <FormGroupField
                key={field.id}
                data={{
                  ...field,
                  ...register(field.name),
                  className:
                    'bg-white/70 border border-white/60 text-gray-800 placeholder-gray-500 focus:ring-blue-400',
                }}
              />
            ))
          }

          <div className="flex justify-between items-center mb-4 text-sm">
            <a href="#" className="text-blue-700 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Login
          </Button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-6">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-700 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

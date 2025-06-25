'use client'

import { useProfileView } from '../services/mutationServices'
import { Shield, Mail, User, BadgeCheck, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {
  const router = useRouter()
  const { data, isLoading, isError, error } = useProfileView()

  if (isLoading) return <div className="text-center mt-10 text-lg text-gray-800">Loading profile...</div>
  if (isError) return <div className="text-center mt-10 text-red-500">Error: {error?.message}</div>

  const user = data?.data

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-6">
      <div className="w-full max-w-2xl backdrop-blur-md bg-white/30 border border-white/30 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 drop-shadow">👤 User Profile</h2>

        <div className="grid gap-4 text-gray-800 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Name:</span> {user.name}
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-pink-600" />
            <span className="font-medium">Email:</span> {user.email}
          </div>

          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Role:</span> {user.role}
          </div>

          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-green-600" />
            <span className="font-medium">Status:</span> {user.status}
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => router.push(`/auth/changepassword/${user._id}`)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:shadow-lg transition"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

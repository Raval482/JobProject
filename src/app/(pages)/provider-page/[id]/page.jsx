'use client'

import { useParams } from 'next/navigation'
import { useParticularJob } from '../../../services/mutationServices'
import { Briefcase, MapPin, DollarSign, Clock, ShieldCheck, User } from 'lucide-react'

export default function ManageJobPage() {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useParticularJob(id)

  if (isLoading) return <div className="text-center mt-10 text-lg">Loading...</div>
  if (isError) return <div className="text-center mt-10 text-red-500">Error: {error?.message}</div>

  const job = data?.data

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200 p-6">
      <div className="w-full max-w-3xl bg-white/30 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 transition-all">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{job.title}</h1>
        <p className="text-lg text-gray-700 mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-purple-500" />
          {job.company}  
          <MapPin className="w-4 h-4 ml-4 text-blue-500" />
          {job.location}
        </p>

        <div className="bg-white/20 p-6 rounded-xl mb-6 border border-white/30 shadow-inner">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📝 Job Description</h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <span><strong>Salary:</strong> {job.salary || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <span><strong>Type:</strong> {job.type || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span><strong>Status:</strong> {job.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            <span><strong>Posted By:</strong> {job.postedBy}</span>
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <span><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

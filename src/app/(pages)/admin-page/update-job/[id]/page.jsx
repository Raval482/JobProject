'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useParams } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import axiosService from '../../../../services/axiosServices'
import { toast } from 'sonner'
import FormGroupField from '../../../../components/ui/FormGroupField'
import { jobform } from '../../../../form-schema/jobform'
import { updateJob } from '../../../../services/apiRoute'

const fetchJob = async (id) => {
  const res = await axiosService.get(`/v1/jobs/managejob/${id}`)
  return res.data.data
}

const EditJobPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const { register, handleSubmit, setValue } = useForm()

  const { data: jobData, isLoading } = useQuery({
    queryKey: ['editJob', id],
    queryFn: () => fetchJob(id),
    enabled: !!id,
  })

  const { mutate: updateJobMutate, isPending } = useMutation({
    mutationFn: (body) => updateJob(id, body),
    onSuccess: () => {
      toast.success('Job updated successfully')
      router.push('/admin-page/my-job')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Update failed')
    },
  })

  React.useEffect(() => {
    if (jobData) {
      jobform.forEach(({ name }) => {
        setValue(name, jobData[name])
      })
    }
  }, [jobData, setValue])

  const onSubmit = (formData) => {
    updateJobMutate(formData)
  }

  if (isLoading) return <div className="text-center mt-10">Loading...</div>

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <div className="max-w-2xl mx-auto mt-12 bg-white/30 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center drop-shadow">✏️ Edit Job</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {jobform.map((field) => (
            <FormGroupField
              key={field.id}
              data={{ ...field, ...register(field.name) }}
            />
          ))}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isPending ? 'Updating...' : 'Update Job'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditJobPage

'use client'

import { useGetAllJobs, useDeleteJob } from '../../services/mutationServices';
import Link from 'next/link';
import { MapPin, Briefcase, DollarSign, Trash2, Pencil } from 'lucide-react';
import withAuthRole from '../../../../utils/withAuthRole';
import { useEffect } from 'react';

const JobCard = ({ job }) => {
  const { mutateAsync: deleteJob } = useDeleteJob();
   
  const handleDelete = async () => {
    const confirm = window.confirm(`Are you sure you want to delete "${job.title}"?`);
    if (!confirm) return;


      const res = await deleteJob(job._id);
        console.log(res)
   
  };


  useEffect(()=>{

  })

  return (
    <div className="bg-white/30 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/provider-page/job-application/${job._id}`} >
      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>

      <p className="text-gray-700 flex items-center gap-2 mb-1">
        <Briefcase className="w-4 h-4 text-purple-600" />
        {job.company}
      </p>

      <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

      <div className="mt-4 space-y-1 text-sm text-gray-800">
        <p className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-500" />
          {job.location}
        </p>
        <p className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-500" />
          {job.salary || 'Not specified'}
        </p>
      </div>
      </Link>

      <div className="mt-6 flex justify-between items-center">
        <Link
          href={`/provider-page/update-job/${job._id}`}
          className="flex items-center gap-1 text-sm px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Pencil className="w-4 h-4" />
          Update
        </Link>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1 text-sm px-4 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

const JobsPage = () => {
  const { data, isLoading, error } = useGetAllJobs();

  if (isLoading) return <div className="text-center mt-10 text-lg text-gray-800">Loading jobs...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error loading jobs</div>;

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12 drop-shadow-md">
          📋 Manage Your Jobs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default  withAuthRole(JobsPage, ["provider"]);

'use client'

import { useGetAllJobs } from '../../services/mutationServices';
import Link from 'next/link';
import { MapPin, Briefcase, DollarSign } from 'lucide-react';
import withAuthRole from '../../../../utils/withAuthRole';

const JobCard = ({ job }) => (
  <Link
    href={`/user-page/${job._id}`}
    className="group bg-white/30 backdrop-blur-md border border-white/30 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200"
  >
    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors">
      {job.title} 
    </h3>

    <p className="text-gray-700 flex items-center gap-2 mt-1">
      <Briefcase className="w-4 h-4 text-purple-600" />
      {job.company}
    </p>

    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{job.description}</p>

    <div className="mt-4 flex flex-col gap-1 text-sm text-gray-800">
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
);

const JobsPage = () => {
  const { data, isLoading, error } = useGetAllJobs();

  if (isLoading) return <div className="text-center mt-10 text-lg text-gray-800">Loading jobs...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error loading jobs</div>;

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12 drop-shadow-md">
          🚀 Explore Jobs
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

export default withAuthRole(JobsPage, ["user"]);;

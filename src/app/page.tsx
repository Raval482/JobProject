

import Link from "next/link";
import Button from "./components/ui/Button"

export default function Home() {
  return (
   <section className="bg-white py-16 px-6 md:px-12">
  <div className="max-w-6xl mx-auto text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Career Hub</h1>
    <p className="text-lg text-gray-600 mb-12">Connecting talent with opportunity, one job at a time.</p>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">Find Your Dream Job</h2>
        <p className="text-gray-600">With top companies across industries.</p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">For Employers</h2>
        <p className="text-gray-600">Discover top talent faster and easier than ever.</p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">Smart Job Matching</h2>
        <p className="text-gray-600">Smart filters and personalized job alerts, just for you.</p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">Streamlined Hiring</h2>
        <p className="text-gray-600">Post jobs, manage applicants, and hire with confidence.</p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">Trusted by Thousands</h2>
        <p className="text-gray-600">Job seekers and recruiters worldwide rely on us.</p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">Stay Updated</h2>
        <p className="text-gray-600">Real-time updates on openings and application status.</p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">Mobile Friendly</h2>
        <p className="text-gray-600">Search and apply on the go with ease.</p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">Secure & Reliable</h2>
        <p className="text-gray-600">Your data and experience are always safe.</p>
      </div>
      <div className="p-6 bg-blue-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-blue-800">Join Us Today</h2>
        <p className="text-blue-700">Take the next step in your career journey!</p>
      </div>
    </div>
    <Button className="mt-10 bg-blue-700 hover:bg-emerald-600 text-white" type="button">
      <Link href="/auth/login"> Let's Get Started</Link>
     </Button>
  </div>
</section>

  );
}



'use client';
import { useForm } from 'react-hook-form';
import FormGroupField from '../ui/FormGroupField';
import Button from '../ui/Button';
import { jobform } from '../../form-schema/jobform';
import { useCreateJobMutation } from '../../services/mutationServices';
import { toast } from 'react-toastify';


const AddJobForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { mutateAsync, isPending } = useCreateJobMutation();
  const onSubmit = async (data) => {
    try {
      await mutateAsync(data, {
        onSuccess: (res) => {
          toast.success(res.message || 'Job posted successfully!');
          reset();
        },
      });
    } catch (err) {
      console.error('Error posting job:', err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 px-4">
      <div className="w-full max-w-lg bg-white/50 backdrop-blur-lg border border-white/40 shadow-2xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Post a New Job</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {jobform.map((field) => (
            <FormGroupField
              key={field.id}
              data={{
                ...field,
                ...register(field.name),
              }}
            />
          ))}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4"
            disabled={isPending}
          >
            {isPending ? 'Posting...' : 'Post Job'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddJobForm;

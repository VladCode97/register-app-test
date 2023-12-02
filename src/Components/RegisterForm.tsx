import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const url: string = "https://backend-nuawi-f58654165e2a.herokuapp.com/"

const registerUser = async (data: FormData) => {
  const response = await axios.post(url + 'user', data);
  return response.data;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();
  const mutation = useMutation(registerUser);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await mutation.mutateAsync(data);
      toast.success('User created successfully');
    } catch (error) {
      toast.error('Unable to create user');
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <div className="input-container">
          <label>Name:</label>
          <input {...register('name', { required: 'Name is required' })} />
          {errors.name && <p className="input-error">{errors.name.message}</p>}
        </div>

        <div className="input-container">
          <label>Email:</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="input-error">{errors.email.message}</p>
          )}
        </div>

        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
                message: 'Invalid password',
              },
            })}
          />
          {errors.password && (
            <p className="input-error">{errors.password.message}</p>
          )}
        </div>

        <button
          className="button"
          type="submit"
          disabled={mutation.isLoading || !isValid}
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;

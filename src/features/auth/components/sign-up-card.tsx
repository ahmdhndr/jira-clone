'use client';

import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import z from 'zod';
import { registerSchema } from '../schemas';
import { useRegister } from '../api/use-register';

export const SignUpCard = () => {
  const { mutate, isPending } = useRegister();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutate({
      json: values,
    });
  };

  return (
    <Card className='w-full h-full md:w-[486px] border-none shadow-none'>
      <CardHeader className='flex items-center justify-center text-center p-7'>
        <CardTitle className='text-2xl'>Sign Up</CardTitle>
        <CardDescription>
          By signing up, you agree to our{' '}
          <Link href='#'>
            <span className='text-blue-700 hover:underline'>
              Privacy Policy
            </span>
          </Link>{' '}
          and{' '}
          <Link href='#'>
            <span className='text-blue-700 hover:underline'>
              Terms of Service
            </span>
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className='p-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <FormLabel htmlFor='name'>Full Name</FormLabel>
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id='name'
                        type='text'
                        placeholder='Enter your name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <FormField
                name='email'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id='email'
                        type='email'
                        placeholder='Enter email address'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <FormField
                name='password'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id='password'
                        type='password'
                        placeholder='Enter your password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
              <FormField
                name='confirmPassword'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id='confirmPassword'
                        type='password'
                        placeholder='Enter your password confirmation'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className='w-full' disabled={isPending} size='lg'>
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7 flex flex-col gap-y-4'>
        <Button
          disabled={isPending}
          className='w-full'
          variant='secondary'
          size='lg'
        >
          <FcGoogle className='mr-2 size-5' />
          Login with Google
        </Button>
        <Button
          disabled={isPending}
          className='w-full'
          variant='secondary'
          size='lg'
        >
          <FaGithub className='mr-2 size-5' />
          Login with Github
        </Button>
      </CardContent>

      <CardContent className='p-7 items-center justify-center'>
        <p className='text-center'>
          Already have an account?{' '}
          <Link href='/sign-in'>
            <span className='text-blue-700 hover:underline'>Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

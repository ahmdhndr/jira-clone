'use client';

import DottedSeparator from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import z from 'zod';
import { useLogin } from '../api/use-login';
import { loginSchema } from '../schemas';

export const SignInCard = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { mutate, isPending } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({
      json: values,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className='w-full h-full md:w-[486px] border-none shadow-none'>
      <CardHeader className='flex items-center justify-center text-center p-7'>
        <CardTitle className='text-2xl'>Welcome Back!</CardTitle>
      </CardHeader>
      <CardContent className='p-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                    <div className='relative'>
                      <FormControl>
                        <Input
                          id='password'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter password'
                          {...field}
                        />
                      </FormControl>
                      <div
                        role='none'
                        onClick={handleShowPassword}
                        className='absolute right-2 top-[12px] text-neutral-500 cursor-pointer'
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className='w-full' disabled={isPending} size='lg'>
              Sign In
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
          Don&apos;t have an account?{' '}
          <Link href='/sign-up'>
            <span className='text-blue-700 hover:underline'>Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

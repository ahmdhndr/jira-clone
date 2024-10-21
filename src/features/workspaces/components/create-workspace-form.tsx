'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { createWorkspaceSchema } from '../schemas';
import { z } from 'zod';
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
import { Button } from '@/components/ui/button';
import { useCreateWorkspace } from '../api/use-create-workspace';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const { mutate, isPending } = useCreateWorkspace();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : '',
    };
    mutate(
      { form: finalValues },
      {
        onSuccess: () => {
          form.reset();
          // TODO: redirect to new workspace
        },
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
    }
  };

  return (
    <Card className='w-full h-full border-none shadow-none'>
      <CardHeader className='flex p-7'>
        <CardTitle className='text-xl font-bold'>
          Create a new workspace
        </CardTitle>
      </CardHeader>
      <CardContent className='p-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex flex-col gap-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter workspace name' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <div className='flex flex-col gap-y-2'>
                    <div className='flex items-center gap-x-5'>
                      {field.value ? (
                        <div className='size-[72px] relative rounded-md overflow-hidden'>
                          <Image
                            alt='Logo'
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            fill
                            className='object-cover'
                          />
                        </div>
                      ) : (
                        <Avatar className='size-[72px]'>
                          <AvatarFallback>
                            <ImageIcon className='size-[36px] text-neutral-400' />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className='flex flex-col'>
                        <p className='text-sm'>Workspace Icon</p>
                        <p className='text-sm text-muted-foreground'>
                          JPG, PNG, SVG or JPEG, max 1MB
                        </p>
                        <input
                          type='file'
                          className='hidden'
                          accept='.jpg, .png, .jpeg, .svg'
                          ref={inputRef}
                          onChange={handleImageChange}
                          disabled={isPending}
                        />
                        <Button
                          type='button'
                          disabled={isPending}
                          variant='tertiary'
                          size='xs'
                          className='w-fit mt-2'
                          onClick={() => inputRef.current?.click()}
                        >
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
            <div className='flex items-center justify-between'>
              <Button
                type='button'
                variant='secondary'
                size='lg'
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='primary'
                size='lg'
                disabled={isPending}
              >
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateWorkspaceForm;
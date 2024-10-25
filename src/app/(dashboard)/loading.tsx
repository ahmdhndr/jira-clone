import { LoaderCircle } from 'lucide-react';
import React from 'react';

const DashboarLoading = () => {
  return (
    <div className='h-full flex items-center justify-center'>
      <LoaderCircle className='size-10 animate-spin text-muted-foreground' />
    </div>
  );
};

export default DashboarLoading;

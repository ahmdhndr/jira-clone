'use client';

import React from 'react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import Sidebar from './sidebar';
import { usePathname } from 'next/navigation';

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='secondary' className='lg:hidden'>
          <MenuIcon className='size-5 text-neutral-500' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='p-0'>
        <VisuallyHidden.Root>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Menu Desc</SheetDescription>
          </SheetHeader>
        </VisuallyHidden.Root>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

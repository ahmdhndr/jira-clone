import React from 'react';
import { useMedia } from 'react-use';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

interface ResponsiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const ResponsiveModal = ({
  open,
  onOpenChange,
  children,
}: ResponsiveModalProps) => {
  const isDesktop = useMedia('(min-width: 1024px)', true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='w-full sm:max-w-lg p-0 border-none hide-scrollbar overflow-y-auto max-h-[85vh]'>
          <VisuallyHidden.Root>
            <DialogHeader>
              <DialogTitle>Create Workspace</DialogTitle>
              <DialogDescription>
                Create an awesome workspace.
              </DialogDescription>
            </DialogHeader>
          </VisuallyHidden.Root>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <VisuallyHidden.Root>
          <DrawerHeader>
            <DrawerTitle>Create Workspace</DrawerTitle>
            <DrawerDescription>Create an awesome workspace.</DrawerDescription>
          </DrawerHeader>
        </VisuallyHidden.Root>
        <div className='hide-scrollbar overflow-y-auto max-h-[85vh]'>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModal;

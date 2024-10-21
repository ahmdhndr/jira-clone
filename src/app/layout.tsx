import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/query-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Logo Ipsum | Jira Clone',
  description: 'Jira clone using nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'antialiased min-h-screen')}>
        <QueryProvider>
          <Toaster
            toastOptions={{
              classNames: {
                error: 'border-transparent bg-red-400',
                success: 'border-transparent bg-green-400',
                warning: 'border-transparent bg-yellow-400',
                info: 'border-transparent bg-blue-400',
              },
            }}
          />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}

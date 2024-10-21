import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)['$post']
>;
type RequestType = InferRequestType<(typeof client.api.auth.register)['$post']>;

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register.$post({ json });
      const result = await response.json();

      if (response.status !== 200) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      router.refresh();
      toast.success('User created!');
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

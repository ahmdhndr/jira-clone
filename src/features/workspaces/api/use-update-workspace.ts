import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[':workspaceId']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[':workspaceId']['$patch']
>;

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspaces[':workspaceId'].$patch({
        form,
        param,
      });
      const result = await response.json();

      if (response.status !== 200) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: ({ data, message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', data?.$id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

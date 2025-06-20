import {useQuery} from '@tanstack/react-query';
import Api from '@constant/Api.ts';
import {ITechStack} from './interfaces.ts';

interface ITechStacksResponse {
  stacks: ITechStack[];
}

export function useStacks() {
  return useQuery({
    queryKey: ['techStacks'],
    queryFn: async () => {
      const response = await Api.fetch('stacks.json');
      if (!(response?.ok)) {
        throw new Error('Network response was not ok');
      }

      return await response.json() as Promise<ITechStacksResponse>;
    },
    select: (data: ITechStacksResponse) => data.stacks,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

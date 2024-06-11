import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import base from './base';

const Services = {
  getAll: async () => await base.get('record').then((res) => res.data),
  deleteRecord: async (id) => await base.delete(`record/${id}`).then((res) => res.data),
  updateRecord: async ({ id, data }) => await base.put(`record/${id}`, data).then((res) => res.data)
};

export function useGetRecords() {
  const { data, isLoading } = useQuery({ queryKey: ['records'], queryFn: Services.getAll });

  return {
    data,
    dataLoading: isLoading
  };
}

export function useDeleteRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: Services.deleteRecord,
    onSuccess: () => {
      queryClient.invalidateQueries('records');
      toast.success('Record deleted!');
    }
  });
}

export const useUpdateRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: Services.updateRecord,
    onSuccess: () => {
      queryClient.invalidateQueries('records');
      toast.success('Record updated!');
    }
  });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./client";
import { SectionSchema } from "../validation";

export const useGetAllScreens = () => {
  return useQuery({
    queryKey: ["screens"],
    queryFn: async () => {
      const { data } = await apiClient.get("/screen/all");
      return data;
    },
  });
};

export const useUpdateScreen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      screenId,
      sections,
    }: {
      screenId: string;
      sections: SectionSchema[];
    }) => {
      const { data } = await apiClient.post("/screen", {
        screenId,
        sections,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens"] });
    },
  });
};

export const useUpsertSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      screenId,
      section,
    }: {
      screenId: string;
      section: SectionSchema;
    }) => {
      const { data } = await apiClient.post(`/screen/section`, {
        screenId,
        section,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens"] });
    },
  });
};

export const useDeleteSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      screenId,
      sectionId,
    }: {
      screenId: string;
      sectionId: string;
    }) => {
      const { data } = await apiClient.delete(`/screen/section`, {
        data: { screenId, sectionId },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens"] });
    },
  });
};

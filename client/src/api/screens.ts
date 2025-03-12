import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./client";
import { Section } from "../types";

export const useGetAllScreens = () => {
  return useQuery({
    queryKey: ["screens"],
    queryFn: async () => {
      const { data } = await apiClient.get("/screen/all");
      return data;
    },
  });
};

// export const useCreateScreen = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (screenData: Omit<Screen, "id">) => {
//       const { data } = await apiClient.post("/screens", screenData);
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["screens"] });
//     },
//   });
// };

export const useUpdateScreen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      screenId,
      sections,
    }: {
      screenId: string;
      sections: Section[];
    }) => {
      const { data } = await apiClient.put("/screen", {
        screenId,
        sections,
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["screens"] });
    },
  });
};

// export const useAddSectionToScreen = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({
//       screenId,
//       sectionData,
//     }: {
//       screenId: string;
//       sectionData: Omit<Section, "id">;
//     }) => {
//       const { data } = await apiClient.post(
//         `/screens/${screenId}/sections`,
//         sectionData
//       );
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["screens"] });
//     },
//   });
// };

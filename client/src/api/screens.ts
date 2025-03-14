import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./client";
import { Section } from "../types";
import { ItemFormData } from "../components/EditItemForm";

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

export const useAddSectionToScreen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      screenId,
      sectionData,
    }: {
      screenId: string;
      sectionData: {
        title: string;
        type: "horizontal" | "vertical" | "banner" | "grid";
      };
    }) => {
      const { data } = await apiClient.post(`/screen/section`, {
        screenId,
        section: { ...sectionData },
      });
      return data;
    },
    onSuccess: () => {
      console.log("onSuccess");
      queryClient.invalidateQueries({ queryKey: ["screens"] });
    },
  });
};

export const useAddItemToSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      screenId,
      sectionId,
      itemData,
    }: {
      screenId: string;
      sectionId: string;
      itemData: ItemFormData;
    }) => {
      const { data } = await apiClient.post(`/screen/section/item`, {
        screenId,
        sectionId,
        item: { ...itemData },
      });
      return data;
    },
    onSuccess: () => {
      console.log("onSuccess");
      queryClient.invalidateQueries({ queryKey: ["screens"] });
    },
  });
};

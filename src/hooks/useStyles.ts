import { useQuery } from "@tanstack/react-query";
import * as stylesService from "@/services/styles";

export const useStyles = () =>
  useQuery({
    queryKey: ["styles"],
    queryFn: async () => {
      const { data, error } = await stylesService.getActiveStyles();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

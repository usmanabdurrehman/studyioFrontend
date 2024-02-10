import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export const RequestLoading = () => {
  const isMutating = useIsMutating({
    predicate: (data) => !data?.meta?.skipGlobalLoader,
  });

  return null;

  if (!isMutating) {
    return null;
  }
};

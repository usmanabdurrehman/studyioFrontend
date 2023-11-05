import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

export const RequestLoading = () => {
  const isFetching = useIsFetching({
    predicate: (data) => !data?.meta?.skipGlobalLoader,
  });

  const isMutating = useIsMutating({
    predicate: (data) => !data?.meta?.skipGlobalLoader,
  });

  if (!isFetching && !isMutating) {
    return null;
  }

  return <LoadingIndicator />;
};

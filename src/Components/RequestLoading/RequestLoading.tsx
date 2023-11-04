import { useIsFetching, useIsMutating } from "@tanstack/react-query";

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

  return (
    <div
      style={{
        background: "#eee",
        height: "100vh",
        width: "100vw",
        zIndex: 100000,
        position: "fixed",
        opacity: "0.8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src="/HourGlass.gif" height={100} width={100} />
    </div>
  );
};

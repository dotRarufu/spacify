import { useEffect } from "react";
import toast, { useToasterStore } from "react-hot-toast";

const useToastLimit = (limit: number = 2) => {
  const { toasts } = useToasterStore();

  // Enforce Limit
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= limit) // Is toast index over limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [limit, toasts]);
};

export default useToastLimit;

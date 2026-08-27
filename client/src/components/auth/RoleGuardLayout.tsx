import { useAuthStore } from "@/features/auth/store";
import type { UserRole } from "@/lib/types";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { Commonloader } from "../common/Loader";

type RoleGuardLayoutProps = {
  allow: UserRole[];
};

export function RoleGuardLayout({ allow }: RoleGuardLayoutProps) {
  const { isBootstrapped, status, user } = useAuthStore();

  const isAllowed = Boolean(user && allow.includes(user.role));

  useEffect(() => {
    if (isBootstrapped && status !== "loading" && user && !isAllowed) {
      toast.error("You don't have permission to access the admin panel.");
    }
  }, [isBootstrapped, status, user, isAllowed]);

  if (!isBootstrapped || status === "loading") {
    return <Commonloader />;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

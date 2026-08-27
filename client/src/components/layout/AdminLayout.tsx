import { Link, Outlet } from "react-router-dom";
import { AdminSidebar } from "../admin/common/sidebar";
import { UserButton } from "@clerk/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-secondary/45">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border px-4 backdrop-blur lg:px-6">
            <Link to="/" className="lg:hidden flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span>View Store</span>
            </Link>

            <div className="ml-auto flex items-center gap-3">
              <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex items-center gap-2 rounded-xl">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 text-amber-500" />
                  <span>View Store</span>
                </Link>
              </Button>
              <UserButton />
            </div>
          </header>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

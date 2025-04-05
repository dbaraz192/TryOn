import { Link } from "@tanstack/react-router";
import authClient from "~/lib/auth-client";
import ThemeToggle from "~/lib/components/ThemeToggle";
import { Button } from "~/lib/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/lib/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "~/lib/components/ui/avatar";

import { QueryClient } from '@tanstack/react-query';
import { useRouter } from "@tanstack/react-router";

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
} | null;

type HeaderProps = {
  user: User;
  queryClient: QueryClient;
};

function Header({ user, queryClient }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center w-full p-4 border-b bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-4xl font-bold">TryOn</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="rounded-full p-0">
                <Avatar>
                  <AvatarImage src={user.image ?? undefined} alt="@shadcn" />
                  <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="divide-y divide-gray-100">
              <div className="px-4 py-3 space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </p>
              </div>
              <ul>
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Button
                    onClick={async () => {
                      await authClient.signOut();
                      await queryClient.invalidateQueries({ queryKey: ["user"] });
                      await router.invalidate();
                    }}
                    type="button"
                    variant="ghost"
                    className="w-full rounded-none justify-start px-4"
                  >
                    Sign out
                  </Button>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        ) : (
          <Button type="button" asChild className="w-fit" size="lg">
            <Link to="/signin">Sign in</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
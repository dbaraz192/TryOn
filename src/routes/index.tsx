// import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
// import { useState } from "react";
// import authClient from "~/lib/auth-client";
// import ThemeToggle from "~/lib/components/ThemeToggle";
// import { Button } from "~/lib/components/ui/button";

// export const Route = createFileRoute("/")({
//   component: Home,
//   loader: ({ context }) => {
//     return { user: context.user };
//   },
// });

// function Home() {
//   const { queryClient } = Route.useRouteContext();
//   const { user } = Route.useLoaderData();
//   const router = useRouter();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   return (
//     <div className="flex flex-col gap-4 p-6">
//       <header className="flex justify-between items-center w-full p-4 border-b">
//         <h1 className="text-4xl font-bold">TryOn</h1>
//         <div className="flex items-center gap-4 relative">
//           <ThemeToggle />
//           {user ? (
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex items-center gap-2 text-sm focus:outline-none"
//               >
//                 <img
//                   src={user.image ?? ""}
//                   alt={user.name}
//                   className="w-10 h-10 rounded-full border"
//                 />
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
//                   <div className="px-4 py-3">
//                     <p className="text-sm font-medium text-gray-900 dark:text-white">
//                       {user.name}
//                     </p>
//                     <p className="text-xs text-gray-500 truncate dark:text-gray-400">
//                       {user.email}
//                     </p>
//                   </div>
//                   <ul className="py-2">
//                     <li>
//                       <Link
//                         to="/dashboard"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                       >
//                         Dashboard
//                       </Link>
//                     </li>
//                     <li>
//                       <Button
//                         onClick={async () => {
//                           await authClient.signOut();
//                           await queryClient.invalidateQueries({ queryKey: ["user"] });
//                           await router.invalidate();
//                         }}
//                         type="button"
//                         variant="ghost"
//                         className="w-full rounded-none justify-start"
//                       >
//                         Sign out
//                       </Button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Button type="button" asChild className="w-fit" size="lg">
//               <Link to="/signin">Sign in</Link>
//             </Button>
//           )}
//         </div>
//       </header>
//     </div>
//   );
// }


import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import authClient from "~/lib/auth-client";
import ThemeToggle from "~/lib/components/ThemeToggle";
import { Button } from "~/lib/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/lib/components/ui/popover"

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  const { queryClient } = Route.useRouteContext();
  const { user } = Route.useLoaderData();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 p-6">
      <header className="flex justify-between items-center w-full p-4 border-b">
        <h1 className="text-4xl font-bold">TryOn</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full p-0">
                  <img
                    src={user.image ?? ""}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="divide-y divide-gray-100"
              >
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
    </div>
  );
}

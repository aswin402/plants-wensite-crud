import Link from "next/link";
import { HomeIcon, LogIn, LogOut, Sprout } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import  ModeToggle from './ModeToggle';
import { stackServerApp } from "@/stack/server";
import { UserButton } from "@stackframe/stack";
import { NavLink } from "./NavLink";

async function Navbar() {
  const user= await stackServerApp.getUser();
  const app=stackServerApp.urls;
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-primary font-mono tracking-wider"
          >
            🌱 Plantventory
          </Link>

          {/* Nav items */}
          <div className="hidden md:flex items-center space-x-4">
                
           <NavLink href="/plants" exact={false}>
             <Sprout className="h-4 w-4" />
             <span className="hidden lg:inline">Plants</span>
           </NavLink>
           
           <NavLink href="/">
             <HomeIcon className="h-4 w-4" />
             <span className="hidden lg:inline">Home</span>
           </NavLink>
               
           <ModeToggle />
           {user ?(
            <>

             {/* sign out */}
            <Link
              href={app.signOut}
              className={cn(
                buttonVariants({ variant: "gradient" }),
                "flex items-center gap-2"
              )}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Sign out</span>
             </Link>
             <UserButton />
            </>

           ):(

            <>
            {/* Sign in */}
            <Link
              href={app.signIn}
              className={cn(
                buttonVariants({ variant: "gradient" }),
                "flex items-center gap-2"
              )}
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden lg:inline">Sign in</span>
            </Link>
            </>
           )}
            

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import Link from "next/link";
import { HomeIcon, Sprout } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import  ModeToggle from './ModeToggle';

function Navbar() {
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
            
            <Link
              href="/plants"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex items-center gap-2"
              )}
            >
              <Sprout className="h-4 w-4" />
              <span className="hidden lg:inline">Plants</span>
            </Link>

            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex items-center gap-2"
              )}
            >
              <HomeIcon className="h-4 w-4" />
              <span className="hidden lg:inline">Home</span>
            </Link>
           
           <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

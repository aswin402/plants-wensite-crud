# Key Design Decisions
## Why Server Component for Navbar?

* Secure access to user session
* No client-side auth flicker
* Faster initial render

## Why asChild with Button?
 
* Allows Link to behave like a button
* Prevents invalid <button><a></a></button> HTML
* Recommended shadcn/ui pattern
 
## Why not use <Button> everywhere?
 
* Some cases (like theme toggle) require full control
* Using buttonVariants gives styling without component constraints
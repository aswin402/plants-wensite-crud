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
* Using buttonVariants gives styling without component 

## 🔐 Stack Auth Integration

Authentication is handled using **Stack Auth**, which provides:

- Server-first authentication
- Secure session handling
- Built-in sign-in / sign-out URLs
- Easy integration with Next.js App Router

### Why Stack Auth?

- Works perfectly with **Server Components**
- No manual JWT/session handling
- Clean separation of server & client logic

---
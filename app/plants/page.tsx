import InventaryTable from "@/components/InventaryTable";
import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";

async function Plants() {
     const user= await stackServerApp.getUser();
      const app=stackServerApp.urls;
    return (  
      <>
      {user ? (
          <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventaryTable />
          </div>
        </div>
      ):(
        <div className="flex justify-center items-center mt-20">
            <SignUp />
        </div>
      )}
      </>
    );
}

export default Plants;
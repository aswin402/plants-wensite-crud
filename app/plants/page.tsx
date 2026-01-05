import InventaryTable from "@/components/InventaryTable";
import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";

async function Plants() {
     const user= await stackServerApp.getUser();
      const app=stackServerApp.urls;
    return (  
      <>
      {user ? (
        <>
        <InventaryTable />
        </>
      ):(
        <div className="flex justify-center items-center mt-20">
            <SignUp />
        </div>
      )}
      </>
    );
}

export default Plants;
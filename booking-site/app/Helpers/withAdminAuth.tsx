import { useGlobalContext } from "../context";
import { useRouter } from "next/navigation";
import { User } from "./Users";
import { useEffect, useState } from "react";

//higher order component
//check for user, if user is admin display admin page
const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    //set usercontext
    const userContext = useGlobalContext() || null;
    //get user
    const user: User = userContext?.user || null;
    //set loading state to prevent redirect on refresh
    const [isLoading, setIsLaoding] = useState(true);
    const router = useRouter();
    useEffect(() => {
      //there will call a delay when user navagates to page
      const delayRedirect = setTimeout(() => {
        try {
          if (!user) {
            router.push("/");
          } else {
            if (user.role !== "admin") {
              router.push("/");
            } else {
              setIsLaoding(false);
            }
          }
        } catch (error: any) {
          console.error(error.message);
        }
      }, 100);
      return () => {
        clearTimeout(delayRedirect);
      };
    }, [user, router]);
    if (isLoading) {
      return <p>loading...</p>;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;

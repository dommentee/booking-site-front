import { useGlobalContext } from "../context";
import { useRouter } from "next/navigation";
import { User } from "./Users";
import { useEffect } from "react";

//higher order component
//check for user, if user is admin display admin page
const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const userContext = useGlobalContext() || null;
    const user: User = userContext?.user || null;

    const router = useRouter();

    if (user) {
      const { role } = user;
    }

    useEffect(() => {
      if (!user) {
        router.push("/");
      } else {
        if (user && user.role !== "admin") {
          router.push("/");
        }
      }
    }, [user, router]);
    if (!user || (user && user.role !== "admin")) {
      router.push("/");
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;

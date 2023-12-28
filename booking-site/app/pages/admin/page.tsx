"use client";
import Tabs from "@/app/components/tabs/Tabs";
import withAdminAuth from "@/app/Helpers/withAdminAuth";

const page = () => {
  return (
    <>
      <Tabs />
    </>
  );
};

export default withAdminAuth(page);

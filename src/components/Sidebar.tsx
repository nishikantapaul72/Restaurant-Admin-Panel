"use client";
import React, { useState, useRef } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";

export default function SizeDemo() {
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const router = useRouter();
  const items = [
    {
      label: "Navigation",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-th-large",
          command: () => router.push("/dashboard"),
        },
        {
          label: "Orders",
          icon: "pi pi-shopping-cart",
          command: () => router.push("/orders"),
        },
        {
          label: "Menu Items",
          icon: "pi pi-list",
          command: () => router.push("/menu-items"),
        },
        {
          label: "Customers",
          icon: "pi pi-users",
          command: () => router.push("/customers"),
        },
      ],
    },
    {
      label: "Profile",
      items: [
        {
          label: "Settings",
          icon: "pi pi-cog",
          command: () => router.push("/settings"),
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: () => {
            router.push("/login");
          },
        },
      ],
    },
  ];
  return (
    <div className="w-full card flex justify-content-center">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-full md:w-20rem lg:w-30rem"
      >
        <Toast ref={toast} />
        <Menu model={items} />
      </Sidebar>
      <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
    </div>
  );
}

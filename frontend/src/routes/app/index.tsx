import { lazy, Suspense } from "react";
import { RouteObject } from "react-router";
import Layout from "@/components/layout/Layout";

const Products = lazy(() => import("@/components/pages/products"));
const Product = lazy(() => import("@/components/pages/product"));

const withSuspense = (
  Component: React.LazyExoticComponent<React.ComponentType<unknown>>,
) => (
  <Suspense fallback={<div style={{ height: "60vh" }} />}>
    <Component />
  </Suspense>
);

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: "",
        element: withSuspense(Products),
      },
      {
        path: "products/:id",
        element: withSuspense(Product),
      },
    ],
  },
];

export default routes;

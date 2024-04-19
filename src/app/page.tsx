"use client";
// src/app/page.tsx
import LoginButton from "@/components/loginButton";
import { SessionProvider } from "next-auth/react";
import LinePlot from "./../components/linePlot";
import StackedBarChart from "./../components/linePlot copy";
import StackedBarChartH from "./../components/linePlot copy 2";

export default function Home() {
  const data = [10, 20, 30, 80];
  const StackedBarChartData = [
    {
      state: "AL",
      age: "<10",
      population: 598478,
    },
    {
      state: "AB",
      age: "<10",
      population: 123456,
    },
    {
      state: "AL",
      age: "10-19",
      population: 638789,
    },
    {
      state: "AB",
      age: "10-19",
      population: 223456,
    },
  ];
  return (
    <main>
      <SessionProvider>
        <LoginButton />
      </SessionProvider>

      <StackedBarChart />
      <StackedBarChartH></StackedBarChartH>
    </main>
  );
}

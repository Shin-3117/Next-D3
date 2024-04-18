"use client";
// src/app/page.tsx
import LoginButton from "@/components/loginButton";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <main>
      <h1>test</h1>
      <SessionProvider>
        <LoginButton />
      </SessionProvider>
    </main>
  );
}

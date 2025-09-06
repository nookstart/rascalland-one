
"use client"
import Navigation from "@/components/navigation";
import MintComponent from "@/components/mint";

export default function Mint() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <MintComponent />
      </section>
    </main>
  );
}
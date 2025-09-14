"use server"
import Navigation from "@/components/navigation";
import MintComponent from "@/components/mint";
// import RenameComponent from "@/components/rename";



export default async function Mint() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
          <MintComponent />
        </section>
        {
        /*
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
          <RenameComponent />
        </section>
        */
        }
      </main>
      <footer role="contentinfo" className="w-full flex flex-col sm:flex-row items-center justify-center border-t mx-auto text-center text-xs gap-4 sm:gap-8 py-8 sm:py-16">
          <p>
            Rascal Land @2025 
          </p>
      </footer>
    </>
  );
}
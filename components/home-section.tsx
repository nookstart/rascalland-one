"use client";


const HomeSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Welcome to Rascal Land
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10">
          The New Hit Kids Animation Series.
          Earn your 15% royalty stake in the new TV Kids Animated Series now !!!
        </p>
       
      </div>
    </section>
  );
};

export default HomeSection;
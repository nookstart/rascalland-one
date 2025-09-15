"use client";

import RoadMapBg from '@/public/images/roadmap.png';

const RoadmapSection = () => {
  const roadmapItems = [
    {
      title: "Q1 2023",
      description: "Project conception and team formation",
      completed: true,
    },
    {
      title: "Q2 2023",
      description: "Smart contract development and testing",
      completed: true,
    },
    {
      title: "Q3 2023",
      description: "Website launch and community building",
      completed: true,
    },
    {
      title: "Q4 2023",
      description: "NFT minting and initial distribution",
      completed: false,
    },
    {
      title: "Q1 2024",
      description: "Secondary marketplace launch",
      completed: false,
    },
    {
      title: "Q2 2024",
      description: "Mobile app release and ecosystem expansion",
      completed: false,
    },
  ];

  return (
    <section
      id="roadmap"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 py-2 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${RoadMapBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="text-center mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Roadmap
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-white dark:bg-black bg-gradient-to-r from-cyan-500 to-yellow-500 mb-12">
          Our strategic plan for building the ultimate Solana ecosystem
        </p>

        <div className="relative mt-12">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 to-yellow-500 -z-10"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
              >
                <div className="w-5/12"></div>
                <div className="w-2 h-2 rounded-full bg-purple-600 z-10"></div>
                <div
                  className={`w-5/12 p-4 rounded-lg shadow-md ${
                    item.completed
                      ? "bg-gradient-to-r from-cyan-500 to-yellow-500 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  }`}
                >
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
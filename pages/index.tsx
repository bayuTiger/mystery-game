import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const Home: React.FC = () => {
  return (
    <Layout title="Mystery Game - Home">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-blue-800">
          探偵事務所あなた
        </h1>
        <Link
          href="/game"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          ゲームスタート
        </Link>
      </div>
    </Layout>
  );
};

export default Home;

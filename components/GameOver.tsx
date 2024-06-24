import React from "react";

interface GameOverProps {
  score: number;
  accusedNPC: string;
  correctCulprit: string;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({
  score,
  accusedNPC,
  correctCulprit,
  onRestart,
}) => {
  const isCorrect = accusedNPC.toLowerCase() === correctCulprit.toLowerCase();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-800">
          {isCorrect ? "ゲームクリア！" : "ゲームオーバー"}
        </h1>
        <p className="text-2xl mb-4 text-gray-700">
          あなたは <span className="font-bold text-blue-600">{accusedNPC}</span>{" "}
          を犯人だと告発しました。
        </p>
        <p className="text-2xl mb-4 text-gray-700">
          {isCorrect ? (
            <span className="text-green-600">
              正解です！見事に事件を解決しました。
            </span>
          ) : (
            <span className="text-red-600">
              残念ながら不正解です。真犯人は {correctCulprit} でした。
            </span>
          )}
        </p>
        <p className="text-2xl mb-8 text-gray-700">
          あなたのスコア:{" "}
          <span className="font-bold text-green-600">{score}点</span>
        </p>
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          トップに戻る
        </button>
      </div>
    </div>
  );
};

export default GameOver;

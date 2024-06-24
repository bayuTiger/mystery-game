import React, { useState } from "react";

interface GameOverProps {
  score: number;
  accusedNPC: string;
  correctCulprit: string;
  onRestart: () => void;
  hints: string[];
  ending: EndingScene;
}

interface EndingScene {
  dialogue: { speaker: string; text: string }[];
  bestStrategy: {
    choices: string[];
    explanation: string;
  };
}

const GameOver: React.FC<GameOverProps> = ({
  score,
  accusedNPC,
  correctCulprit,
  onRestart,
  hints,
  ending,
}) => {
  const isCorrect = accusedNPC.toLowerCase() === correctCulprit.toLowerCase();
  const [showHints, setShowHints] = useState([false, false, false]);
  const [showBestStrategy, setShowBestStrategy] = useState(false);

  const toggleHint = (index: number) => {
    setShowHints((prev) => {
      const newHints = [...prev];
      newHints[index] = !newHints[index];
      return newHints;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-2xl w-full">
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
              残念ながら不正解です。
            </span>
          )}
        </p>
        <p className="text-2xl mb-8 text-gray-700">
          あなたのスコア:{" "}
          <span className="font-bold text-green-600">{score}点</span>
        </p>

        {isCorrect && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">エンディング</h2>
            <div className="text-left mb-4">
              {ending.dialogue.map((line, index) => (
                <p key={index} className="mb-2">
                  <strong>{line.speaker}:</strong> {line.text}
                </p>
              ))}
            </div>
            <button
              onClick={() => setShowBestStrategy(!showBestStrategy)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              {showBestStrategy ? "ベストな戦略を隠す" : "ベストな戦略を表示"}
            </button>
            {showBestStrategy && (
              <div className="text-left">
                <h3 className="text-xl font-bold mb-2">
                  最高得点を取るための選択肢:
                </h3>
                <ul className="list-disc list-inside mb-4">
                  {ending.bestStrategy.choices.map((choice, index) => (
                    <li key={index}>{choice}</li>
                  ))}
                </ul>
                <p className="whitespace-pre-line">
                  {ending.bestStrategy.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {!isCorrect && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">ヒント</h2>
            {hints.map((hint, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => toggleHint(index)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  {showHints[index]
                    ? `ヒント${index + 1}を隠す`
                    : `ヒント${index + 1}を表示`}
                </button>
                {showHints[index] && (
                  <p className="mt-2 text-gray-700">{hint}</p>
                )}
              </div>
            ))}
          </div>
        )}

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

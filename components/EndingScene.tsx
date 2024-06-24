import React, { useState } from "react";

interface EndingSceneProps {
  dialogue: { speaker: string; text: string }[];
  bestStrategy: {
    choices: string[];
    explanation: string;
  };
}

const EndingScene: React.FC<EndingSceneProps> = ({
  dialogue,
  bestStrategy,
}) => {
  const [showBestStrategy, setShowBestStrategy] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">エンディング</h2>
      <div className="mb-6">
        {dialogue.map((line, index) => (
          <p key={index} className="mb-2">
            <strong>{line.speaker}:</strong> {line.text}
          </p>
        ))}
      </div>
      <button
        onClick={() => setShowBestStrategy(!showBestStrategy)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {showBestStrategy ? "ベストな戦略を隠す" : "ベストな戦略を表示"}
      </button>
      {showBestStrategy && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">
            最高得点を取るための選択肢:
          </h3>
          <ul className="list-disc list-inside mb-4">
            {bestStrategy.choices.map((choice, index) => (
              <li key={index}>{choice}</li>
            ))}
          </ul>
          <p className="whitespace-pre-line">{bestStrategy.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default EndingScene;

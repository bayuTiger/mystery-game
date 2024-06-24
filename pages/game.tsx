import React, { useState, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { gameStateAtom } from "../atoms/gameState";
import { scenario } from "../data/scenario";
import { NPC, DialogueOption } from "../types";
import Layout from "../components/Layout";
import NPCDialog from "../components/NPCDialog";
import GameOver from "../components/GameOver";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Image from "next/image";
import { saveGameState, loadGameState } from "../utils/localStorage";
import { calculateScore } from "../utils/gameLogic";
import { resetGameState } from "../utils/gameState";

const Game: React.FC = () => {
  const [gameState, setGameState] = useRecoilState(gameStateAtom);
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);
  const [accusedNPC, setAccusedNPC] = useState("");
  const [showScenario, setShowScenario] = useState(false);
  const [dialogFilter, setDialogFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const savedState = loadGameState();
    if (savedState && savedState.currentScene !== "gameOver") {
      setGameState(savedState);
      setShowScenario(true);
    } else {
      setGameState(resetGameState());
      setShowScenario(false);
    }
  }, []);

  useEffect(() => {
    if (gameState.currentScene !== "gameOver") {
      saveGameState(gameState);
    }
  }, [gameState]);

  const handleNPCSelect = (npc: NPC) => {
    setGameState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    // Simulating API call delay
    setTimeout(() => {
      setSelectedNPC(npc);
      setGameState((prev) => ({
        ...prev,
        conversationCount: prev.conversationCount + 1,
        isLoading: false,
      }));
    }, 500);
  };

  const handleDialogueSelect = (option: DialogueOption) => {
    setGameState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    // Simulating API call delay
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        dialogHistory: [
          ...prev.dialogHistory,
          `${selectedNPC?.name}: ${option.response}`,
        ],
        isLoading: false,
      }));
      setSelectedNPC(null);
    }, 500);
  };

  const handleReturnToLobby = () => {
    setSelectedNPC(null);
  };

  const handleAccuse = () => {
    if (!accusedNPC.trim()) {
      setGameState((prev) => ({
        ...prev,
        error: "犯人の名前を選択してください。",
      }));
      return;
    }

    setGameState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    // Simulating API call delay
    setTimeout(() => {
      const isCorrect =
        accusedNPC.toLowerCase() === scenario.culprit.toLowerCase();
      const score = calculateScore(isCorrect, gameState.conversationCount);
      setGameState((prev) => ({
        ...prev,
        currentScene: "gameOver",
        score,
        accusedNPC: accusedNPC,
        isLoading: false,
      }));
    }, 1000);
  };

  const handleSave = () => {
    setGameState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    // Simulating API call delay
    setTimeout(() => {
      saveGameState(gameState);
      setGameState((prev) => ({
        ...prev,
        isLoading: false,
      }));
      alert("ゲームの進行状況が保存されました。");
    }, 500);
  };

  const filteredAndReversedDialogs = useMemo(() => {
    const filteredDialogs =
      dialogFilter === "all"
        ? gameState.dialogHistory
        : gameState.dialogHistory.filter((dialog) =>
            dialog.startsWith(dialogFilter)
          );
    return [...filteredDialogs].reverse();
  }, [gameState.dialogHistory, dialogFilter]);


  if (gameState.currentScene === "gameOver") {
    return (
      <Layout title="探偵事務所あなた - Game Over">
        <GameOver
          score={gameState.score || 0}
          accusedNPC={gameState.accusedNPC || ""}
          correctCulprit={scenario.culprit}
          onRestart={() => {
            setGameState(resetGameState());
            router.push("/");
          }}
          hints={scenario.hints}
          ending={scenario.ending}
        />
      </Layout>
    );
  }

  return (
    <Layout title="探偵事務所あなた - Investigation">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">
          {scenario.title}
        </h1>
        <p className="mb-6 text-gray-700">{scenario.description}</p>
        <p className="mb-6 text-gray-700 font-bold">
          * 調査結果は下の「会話ログ」に溜まる *
        </p>
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-800">
          登場人物
        </h2>
        <p className="mb-6 text-gray-800">
          中嶋駿介：ホテルの支配人 <br />
          多久島由佳：新人清掃員 <br />
          小栗旬：宝石コレクター <br />
          松田志穂：ホテルの受付
        </p>

        {gameState.isLoading && <Loading />}

        {gameState.error && <ErrorMessage message={gameState.error} />}

        {selectedNPC ? (
          <NPCDialog
            npc={selectedNPC}
            onDialogueSelect={handleDialogueSelect}
            onReturnToLobby={handleReturnToLobby}
          />
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {scenario.npcs.map((npc) => (
                <div
                  key={npc.id}
                  className="flex items-center bg-gray-200 p-3 rounded-lg"
                >
                  <div className="relative w-16 h-16 mr-3">
                    <Image
                      src={`/images/${npc.image}`}
                      alt={npc.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </div>
                  <button
                    onClick={() => handleNPCSelect(npc)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    {npc.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-800">
            犯人を告発
          </h2>
          <select
            value={accusedNPC}
            onChange={(e) => setAccusedNPC(e.target.value)}
            className="border p-2 mr-2 rounded w-full sm:w-auto mb-2 sm:mb-0 text-gray-900 bg-white"
          >
            <option value="">犯人を選択してください</option>
            {scenario.npcs.map((npc) => (
              <option key={npc.id} value={npc.name}>
                {npc.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAccuse}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-full sm:w-auto"
          >
            告発する
          </button>
        </div>

        {/* <button
          onClick={handleSave}
          className="mt-6 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          セーブ
        </button> */}

        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">
            会話ログ
          </h2>
          <div className="mb-4">
            <label
              htmlFor="dialog-filter"
              className="block text-sm font-medium text-gray-700"
            >
              フィルター:
            </label>
            <select
              id="dialog-filter"
              value={dialogFilter}
              onChange={(e) => setDialogFilter(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">すべて</option>
              {scenario.npcs.map((npc) => (
                <option key={npc.id} value={npc.name}>
                  {npc.name}
                </option>
              ))}
            </select>
          </div>
          <ul className="list-disc pl-5">
            {filteredAndReversedDialogs.map((dialog, index) => (
              <li key={index} className="mb-1 text-gray-700">
                {dialog}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Game;

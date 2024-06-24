import React from "react";
import Image from "next/image";
import { NPC, DialogueOption } from "../types";

interface NPCDialogProps {
  npc: NPC;
  onDialogueSelect: (option: DialogueOption) => void;
}

const NPCDialog: React.FC<NPCDialogProps> = ({ npc, onDialogueSelect }) => {
  return (
    <div
      className="bg-gray-100 p-4 rounded-lg"
      role="dialog"
      aria-labelledby="npc-name"
    >
      <div className="flex items-center mb-4">
        <Image
          src={`/images/${npc.image}`}
          alt={npc.name}
          width={64}
          height={64}
          className="rounded-full"
        />
        <h2 id="npc-name" className="text-2xl font-semibold text-blue-700">
          {npc.name}との会話
        </h2>
      </div>
      <ul className="space-y-2">
        {npc.dialogues.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => onDialogueSelect(option)}
              className="w-full text-left bg-white hover:bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded border border-blue-500 transition duration-300"
            >
              {option.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NPCDialog;

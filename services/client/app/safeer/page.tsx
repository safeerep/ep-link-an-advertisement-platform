"use client"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from "react"

export default function Home() {
  const [ text, setText] = useState('')

  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl">yeah its the value: {text}</span>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        className="my-2 p-2 border border-gray-300"
      />
      <Picker
        data={data}
        onEmojiSelect={(e: any) => {
          const sym = e.unified.split("_");
          let codeArray: any = []
          sym.forEach((el: any) => {
            codeArray.push("0x" + el)
          })
          let emoji = String.fromCodePoint(...codeArray)
          setText(text + emoji)
        }}
        className="my-2"
      />
      <button
        className="bg-black p-2 text-white"
        onClick={() => {
          console.log(text);
        }}
      >
        ok print
      </button>
    </div>
  );
}

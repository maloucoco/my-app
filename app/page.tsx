"use client";

import { useState } from "react";
import Player from "@/app/components/Player";
import SongList from "@/app/components/SongList";
import type { Song } from "@/app/types"; // 推荐将类型定义移到单独文件

const sampleSongs: Song[] = [
  {
    id: "1",
    title: "噢乖",
    artist: "窦唯",
    duration: 210,
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    audioSrc: "https://blog.cqapp.eu.org/malou/music/哦乖.mp3",
  },
  {
    id: "2",
    title: "你不要担心",
    artist: "野菊花",
    duration: 300,
    cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
    audioSrc: "https://blog.cqapp.eu.org/malou/music/你不要担心.mp3",
  },
  {
    id: "3",
    title: "妈妈的话",
    artist: "zyboy忠宇",
    duration: 230,
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    audioSrc: "https://blog.cqapp.eu.org/malou/music/妈妈的话.mp3",
  },
  {
    id: "4",
    title: "鼓楼",
    artist: "赵雷",
    duration: 270,
    cover: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=300&h=300&fit=crop",
    audioSrc: "https://blog.cqapp.eu.org/malou/music/鼓楼-赵雷.mp3",
  },
];

export default function Home() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-indigo-300">
          🎵 我的音乐盒
        </h1>
        <p className="text-center text-indigo-200 mb-8">享受音乐，放松心情</p>

        {/* 当前播放卡片 */}
        <div className="mb-8">
          <Player song={currentSong} />
        </div>

        {/* 播放列表 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <div className="px-6 py-4 border-b border-white/20">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-400 rounded-full"></span>
              播放列表
            </h2>
          </div>
          <SongList
            songs={sampleSongs}
            onSelectSong={setCurrentSong}
            currentSong={currentSong}
          />
        </div>
      </div>
    </main>
  );
}

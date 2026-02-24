"use client";

import type { Song } from "@/app/types";

interface SongListProps {
  songs: Song[];
  onSelectSong: (song: Song) => void;
  currentSong: Song | null;
}

export default function SongList({ songs, onSelectSong, currentSong }: SongListProps) {
  return (
    <ul className="divide-y divide-white/10">
      {songs.map((song) => (
        <li
          key={song.id}
          className={`group px-6 py-4 flex items-center gap-4 cursor-pointer transition-all duration-300 ${
            currentSong?.id === song.id
              ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20"
              : "hover:bg-white/5"
          }`}
          onClick={() => onSelectSong(song)}
        >
          {/* 封面小图 */}
          <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md flex-shrink-0">
            <img
              src={song.cover}
              alt={song.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* 歌曲信息 */}
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{song.title}</p>
            <p className="text-sm text-indigo-200/80 truncate">{song.artist}</p>
          </div>

          {/* 时长 + 播放指示 */}
          <div className="flex items-center gap-3 text-sm text-indigo-200/60">
            <span>
              {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, "0")}
            </span>
            {currentSong?.id === song.id && (
              <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { Song } from "@/app/types";

interface PlayerProps {
  song: Song | null;
}

export default function Player({ song }: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current && song) {
      audioRef.current.src = song.audioSrc;
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || !song) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!song) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 shadow-2xl">
        <p className="text-indigo-200">✨ 从列表中选择一首歌曲开始欣赏</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
      <audio ref={audioRef} preload="metadata" />

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div
            className={`w-36 h-36 md:w-44 md:h-44 rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
            style={{ animation: isPlaying ? "spin 8s linear infinite" : "none" }}
          >
            <img
              src={song.cover}
              alt={song.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg">
            ♪
          </div>
        </div>

        <div className="flex-1 w-full">
          <h3 className="text-2xl font-bold mb-1">{song.title}</h3>
          <p className="text-indigo-200 mb-4">{song.artist}</p>

          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-400 [&::-webkit-slider-thumb]:shadow-lg"
            />
            <div className="flex justify-between text-sm text-indigo-200">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex justify-center md:justify-start items-center gap-4 mt-4">
            <button
              onClick={() => skip(-10)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/30 text-white"
            >
              ⏪ 10s
            </button>
            <button
              onClick={togglePlay}
              className="w-14 h-14 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl shadow-lg transition"
            >
              {isPlaying ? "⏸️" : "▶️"}
            </button>
            <button
              onClick={() => skip(10)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/30 text-white"
            >
              10s ⏩
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

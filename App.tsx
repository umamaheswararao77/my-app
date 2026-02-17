import "./global.css";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

const GRID_SIZE = 20;
const CELL_SIZE = Math.floor(Dimensions.get("window").width / GRID_SIZE);

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Point = { x: number; y: number };

export default function App() {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>(randomFood());
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  
  // NEW STATES: For handling game flow
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // If the game is paused, hasn't started, or is over, do not run the loop
    if (!isPlaying || gameOver) return;

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction, isPlaying, gameOver]);

  function moveSnake() {
    const head = snake[0];
    let newHead = { ...head };

    if (direction === "UP") newHead.y -= 1;
    if (direction === "DOWN") newHead.y += 1;
    if (direction === "LEFT") newHead.x -= 1;
    if (direction === "RIGHT") newHead.x += 1;

    // Collision with wall
    if (
      newHead.x < 0 ||
      newHead.y < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y >= GRID_SIZE
    ) {
      handleGameOver();
      return;
    }

    // Collision with self
    if (snake.some((p) => p.x === newHead.x && p.y === newHead.y)) {
      handleGameOver();
      return;
    }

    const newSnake = [newHead, ...snake];

    // Eat food
    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(randomFood());
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function randomFood(): Point {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }

  // --- GAME CONTROL FUNCTIONS ---
  function startGame() {
    setHasStarted(true);
    setIsPlaying(true);
    setGameOver(false);
  }

  function pauseGame() {
    setIsPlaying(false);
  }

  function resumeGame() {
    setIsPlaying(true);
  }

  function stopGame() {
    // Reset everything back to default
    setSnake([{ x: 10, y: 10 }]);
    setFood(randomFood());
    setDirection("RIGHT");
    setGameOver(false);
    setHasStarted(false);
    setIsPlaying(false);
  }

  function handleGameOver() {
    setGameOver(true);
    setIsPlaying(false);
  }

  function restart() {
    setSnake([{ x: 10, y: 10 }]);
    setFood(randomFood());
    setDirection("RIGHT");
    setGameOver(false);
    setHasStarted(true);
    setIsPlaying(true);
  }

  return (
    <View className="flex-1 bg-zinc-950 items-center justify-center">
      <StatusBar style="light" />

      {/* Score */}
      <Text className="text-white text-2xl font-bold mb-4">
        Score: {snake.length - 1}
      </Text>

      {/* Game Controls Panel */}
      <View className="flex-row gap-3 mb-6">
        {!hasStarted && !gameOver && (
          <TouchableOpacity
            onPress={startGame}
            className="bg-green-500 px-6 py-2 rounded-full"
          >
            <Text className="text-white font-bold text-lg">Start Game</Text>
          </TouchableOpacity>
        )}

        {hasStarted && !gameOver && isPlaying && (
          <TouchableOpacity
            onPress={pauseGame}
            className="bg-yellow-500 px-6 py-2 rounded-full"
          >
            <Text className="text-white font-bold text-lg">Pause</Text>
          </TouchableOpacity>
        )}

        {hasStarted && !gameOver && !isPlaying && (
          <TouchableOpacity
            onPress={resumeGame}
            className="bg-blue-500 px-6 py-2 rounded-full"
          >
            <Text className="text-white font-bold text-lg">Resume</Text>
          </TouchableOpacity>
        )}

        {hasStarted && (
          <TouchableOpacity
            onPress={stopGame}
            className="bg-red-500 px-6 py-2 rounded-full"
          >
            <Text className="text-white font-bold text-lg">Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Game Board */}
      <View
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
        className="bg-zinc-900 border-2 border-zinc-700 rounded-lg overflow-hidden"
      >
        {/* Food */}
        <View
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
          className="absolute bg-rose-500 rounded-full"
        />

        {/* Snake */}
        {snake.map((segment, index) => (
          <View
            key={index}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
            className={`absolute ${
              index === 0 ? "bg-emerald-400" : "bg-emerald-600"
            } rounded-sm border border-emerald-800/30`}
          />
        ))}
      </View>

      {/* Direction Controls */}
      <View className="mt-8 items-center">
        <TouchableOpacity
          onPress={() => setDirection("UP")}
          className="bg-zinc-800 px-8 py-4 rounded-xl mb-2 active:bg-zinc-700"
        >
          <Text className="text-white font-bold">UP ▲</Text>
        </TouchableOpacity>

        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={() => setDirection("LEFT")}
            className="bg-zinc-800 px-6 py-4 rounded-xl active:bg-zinc-700"
          >
            <Text className="text-white font-bold">◀ LEFT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setDirection("RIGHT")}
            className="bg-zinc-800 px-6 py-4 rounded-xl active:bg-zinc-700"
          >
            <Text className="text-white font-bold">RIGHT ▶</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setDirection("DOWN")}
          className="bg-zinc-800 px-8 py-4 rounded-xl mt-2 active:bg-zinc-700"
        >
          <Text className="text-white font-bold">DOWN ▼</Text>
        </TouchableOpacity>
      </View>

      {/* Game Over Overlay */}
      {gameOver && (
        <View className="absolute bg-black/90 inset-0 items-center justify-center z-50">
          <Text className="text-rose-500 text-5xl font-black mb-2 shadow-lg">
            GAME OVER
          </Text>
          <Text className="text-white text-xl mb-8">
            Final Score: {snake.length - 1}
          </Text>
          <TouchableOpacity
            onPress={restart}
            className="bg-emerald-500 px-8 py-4 rounded-full active:bg-emerald-600"
          >
            <Text className="text-white text-xl font-bold uppercase tracking-widest">
              Play Again
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
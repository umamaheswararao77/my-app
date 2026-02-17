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

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction]);

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
      setGameOver(true);
      return;
    }

    // Collision with self
    if (snake.some(p => p.x === newHead.x && p.y === newHead.y)) {
      setGameOver(true);
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

  function restart() {
    setSnake([{ x: 10, y: 10 }]);
    setFood(randomFood());
    setDirection("RIGHT");
    setGameOver(false);
  }

  return (
    <View className="flex-1 bg-zinc-950 items-center justify-center">
      <StatusBar style="light" />

      {/* Score */}
      <Text className="text-white text-xl mb-2">
        Score: {snake.length - 1}
      </Text>

      {/* Game Board */}
      <View
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
        className="bg-zinc-900 border border-zinc-700"
      >
        {/* Food */}
        <View
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
          className="absolute bg-red-500 rounded"
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
              index === 0 ? "bg-green-400" : "bg-green-600"
            } rounded`}
          />
        ))}
      </View>

      {/* Controls */}
      <View className="mt-6">
        <TouchableOpacity
          onPress={() => setDirection("UP")}
          className="bg-zinc-700 px-6 py-3 rounded mb-2"
        >
          <Text className="text-white text-center">UP ^</Text>
        </TouchableOpacity>

        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={() => setDirection("LEFT")}
            className="bg-zinc-700 px-6 py-3 rounded"
          >
            <Text className="text-white">LEFT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setDirection("RIGHT")}
            className="bg-zinc-700 px-6 py-3 rounded"
          >
            <Text className="text-white">RIGHT  </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setDirection("DOWN")}
          className="bg-zinc-700 px-6 py-3 rounded mt-2"
        >
          <Text className="text-white text-center">DOWN v </Text>
        </TouchableOpacity>
      </View>

      {/* Game Over */}
      {gameOver && (
        <View className="absolute bg-black/80 inset-0 items-center justify-center">
          <Text className="text-red-500 text-3xl font-bold mb-4">
            Game Over
          </Text>
          <TouchableOpacity
            onPress={restart}
            className="bg-indigo-500 px-6 py-3 rounded-full"
          >
            <Text className="text-white text-lg font-bold">Restart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}


// loading.tsx
export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900">
      <div className="flex space-x-2">
        <div className="h-4 w-4 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-cyan-400"></div>
        <div className="h-4 w-4 animate-[pulse_1s_ease-in-out_0.2s_infinite] rounded-full bg-cyan-400"></div>
        <div className="h-4 w-4 animate-[pulse_1s_ease-in-out_0.4s_infinite] rounded-full bg-cyan-400"></div>
      </div>
    </div>
  );
}
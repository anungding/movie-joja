import AppRouter from "./AppRouter";

const App: React.FC = () => {
  return (
    <div>
      <nav className="bg-black p-4">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-white text-2xl font-bold">Anung Movie</h1>
        </div>
      </nav>
      <AppRouter />
    </div>
  );
}

export default App;

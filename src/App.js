import { MainPage } from "./pages/mainPage/MainPage";
import { Navbar } from "./components/navbar/Navbar";
import { Sidebar } from "./components/sidebar/Sidebar";
import './index.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <MainPage />
    </div>
  );
}

export default App;

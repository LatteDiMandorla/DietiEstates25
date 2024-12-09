import Topbar from "./components/Topbar"
import HomePage from "./pages/HomePage"
import ImmobilePage from "./pages/ImmobilePage";

function App() {

  const home : boolean = false;

  return (
    <>
      <Topbar title="Topbar" />
      {
        home ? <HomePage /> : <ImmobilePage />
      }
    </>
  )
}

export default App

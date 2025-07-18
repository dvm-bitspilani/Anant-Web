// import { useState } from "react";
// import styles from "./App.module.scss";
import { BrowserRouter } from "react-router-dom";
import SingleScrollPage from "./SingleScrollPage";
import { useState } from "react";
import Preloader from "./pages/preloader/Preloader";

function App() {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      {isLoading ?
        <Preloader
          setIsLoading={setIsLoading} /> :
        <SingleScrollPage /> 
      }
    </BrowserRouter>
  );
}

export default App;

import { NextUIProvider } from "@nextui-org/react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Root from "./routes/Root";
import Card from "./routes/Card";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/article/:id" element={<Card />}></Route>
          </Route>
        </Routes>
      </NextUIProvider>
    </>
  );
}

export default App;

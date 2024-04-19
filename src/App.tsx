import { NextUIProvider } from "@nextui-org/react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Root from "./routes/Root";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route path="/" element={<Root />} />
          {/* ... */}
        </Routes>
      </NextUIProvider>
    </>
  );
}

export default App;

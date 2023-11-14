import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Add from "./components/Add";
import Update from "./components/Update";
import Read from "./components/Read";

const App = () => {
  const Navigate = useNavigate();

  const handleOperation = (e) => {
    const operation = e.target.value.toLowerCase();
    Navigate(`/${operation}`);
  };

  useEffect(() => {
    Navigate("/");
  }, []);

  return (
    <>
      <div className="image flex justify-center mt-4">
        <img src="/images/mySql.png" alt="mysql" className="w-36" />
      </div>
      <div className="operation text-center mt-4 border border-pink-300 p-3">
        <select
          name="operation"
          id="operation"
          onChange={(e) => handleOperation(e)}
          className="border-4"
        >
          <option vAlue="#">Select Operation</option>
          <option value="ADD">ADD</option>
          <option value="UPDATE">UPDATE</option>
          <option value="READ">READ</option>
        </select>
      </div>
      <Routes>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/update" element={<Update />}></Route>
        <Route path="/read" element={<Read />}></Route>
      </Routes>
    </>
  );
};

export default App;

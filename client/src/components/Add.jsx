import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Add = () => {
  const [locator, setLocator] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  const addNewLocator = () => {
    const addLocator = async () => {
      try {
        const add = await axios.post('http://localhost:8080/addLocator', {
          locatorName: locator,
        });
        console.log(add);
        setShowSummary(true);
      } catch (error) {
        console.log(error);
      }
    };
    addLocator();
  };

  return (
    <>
      <div className="container m-4 border border-green-300 p-2 flex items-center justify-evenly">
        <div className="locatorname">
          <input
            type="text"
            className="border-2"
            value={locator}
            placeholder="Locator Name"
            onChange={(e) => setLocator(e.target.value)}
          />
        </div>
        <button
          className="border-2 px-2 py-1 bg-blue-500 text-white rounded-sm"
          onClick={() => addNewLocator()}
        >
          Insert Locator
        </button>
      </div>
      {showSummary && (
        <div className="flex flex-col my-2 mx-auto border border-blue-300 p-4 gap-6 items-center ">
          <p className="text-green-900 font-bold">
            Successfully Inserted New Locator to DB
          </p>
          <Link to="/update">
            <button className="bg-blue-500 text-white px-2 py-1 rounded-sm">
              Click Here to Assign Value
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Add;

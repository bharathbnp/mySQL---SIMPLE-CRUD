import axios from 'axios';
import React, { useState } from 'react';

const Read = () => {
  const [brand, setbrand] = useState('');
  const [locale, setlocale] = useState('');
  const [locator, setLocator] = useState('');
  const [locatorValue, setLocatorValue] = useState('');
  const [display, setDisplay] = useState(false);

  const getLocator = () => {
    const fetchLocator = async () => {
      try {
        const res = await axios.get('http://localhost:8080/showLocator', {
          params: {
            brand: brand,
            locale: locale,
            locator: locator,
          },
        });
        const data = res.data[0];
        setLocatorValue(data[`${brand}_${locale}`]);
        setDisplay(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocator();
  };

  return (
    <>
      <div className="container m-4 border border-green-300 p-2 flex items-center justify-evenly">
        <div className="brand">
          <select
            name="brand"
            id="brand"
            onChange={(e) => {
              setbrand(e.target.value);
              setDisplay(false);
            }}
            className="border-2"
          >
            <option value="#">Select Brand</option>
            <option value="MAC">MAC</option>
            <option value="EL">EL</option>
            <option value="BB">BB</option>
          </select>
        </div>
        <div className="locale">
          <select
            name="locale"
            id="locale"
            onChange={(e) => {
              setlocale(e.target.value);
            }}
            className="border"
          >
            <option value="#">Select Locale</option>
            <option value="FR">FR</option>
            <option value="AT">AT</option>
            <option value="BE">BE</option>
          </select>
        </div>
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
          className="border px-2 py-1 bg-blue-500 text-white rounded-sm"
          onClick={() => getLocator()}
        >
          Get Locator Value
        </button>
      </div>
      {display && (
        <div className="flex flex-col my-2 mx-auto border border-blue-300 p-4 gap-6 items-center ">
          <p>Brand: {brand}</p>
          <p>Locale: {locale}</p>
          <p className="text-green-700 font-bold">
            LocatorValue: {locatorValue}
          </p>
        </div>
      )}
    </>
  );
};

export default Read;

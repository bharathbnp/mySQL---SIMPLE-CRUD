import React, { useState } from 'react';

const Input = ({ input, locatorData, setDisplay, name }) => {
  const { isbrand, islocale, islocator, isupdateLocator } = input;
  const [brand, setbrand] = useState('');
  const [locale, setlocale] = useState('');
  const [locator, setLocator] = useState('');
  const [updatedLocator, setupdatedLocator] = useState('');

  const sendData = () => {
    locatorData({
      brand,
      locale,
      locator,
      updatedLocator,
    });
  };

  return (
    <>
      <div className="container m-4 border border-green-300 p-2 flex items-center justify-evenly">
        {isbrand && (
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
        )}
        {islocale && (
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
        )}
        {islocator && (
          <div className="locatorname">
            <input
              type="text"
              className="border-2"
              value={locator}
              placeholder="Locator Name"
              onChange={(e) => setLocator(e.target.value)}
            />
          </div>
        )}
        {isupdateLocator && (
          <input
            type="text"
            name="updatedLocator"
            id="updatedLocator"
            className="border-2"
            value={updatedLocator}
            placeholder="Updated Value"
            onChange={(e) => setupdatedLocator(e.target.value)}
          />
        )}

        <button
          className="border-2 px-2 py-1 bg-blue-500 text-white rounded-sm"
          onClick={() => sendData()}
        >
          {name}
        </button>
      </div>
    </>
  );
};

export default Input;

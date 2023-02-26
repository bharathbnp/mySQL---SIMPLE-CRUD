import axios from 'axios';
import React, { useState } from 'react';

const Update = () => {
  const [brand, setbrand] = useState('');
  const [locale, setlocale] = useState('');
  const [locator, setLocator] = useState('');
  const [locatorValue, setLocatorValue] = useState('');
  const [updatedLocator, setupdatedLocator] = useState('');
  const [showSummary, setShowSummary] = useState({
    display: false,
    oldValue: '',
    updatedValue: '',
  });

  const updateLocator = () => {
    const updateLocator = async () => {
      try {
        const oldValue = await axios.get('http://localhost:8080/showLocator', {
          params: {
            brand: brand,
            locale: locale,
            locator: locator,
          },
        });
        const data = oldValue.data[0];
        setShowSummary((state) => {
          return {
            ...state,

            oldValue: data[`${brand}_${locale}`],
          };
        });
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.post('http://localhost:8080/update', {
          brand: brand,
          locale: locale,
          locator: locator,
          updatedLocator: updatedLocator,
        });
      } catch (error) {
        console.log(error);
      }

      try {
        const newValue = await axios.get('http://localhost:8080/showLocator', {
          params: {
            brand: brand,
            locale: locale,
            locator: locator,
          },
        });
        const data = newValue.data[0];
        setShowSummary((state) => {
          return {
            ...state,
            updatedValue: data[`${brand}_${locale}`],
          };
        });
      } catch (error) {
        console.log(error);
      }
      setShowSummary((state) => {
        return {
          ...state,
          display: true,
        };
      });
    };

    updateLocator();
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
              setShowSummary((state) => {
                return {
                  ...state,
                  display: false,
                };
              });
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
        <input
          type="text"
          name="updatedLocator"
          id="updatedLocator"
          className="border-2"
          value={updatedLocator}
          placeholder="Updated Value"
          onChange={(e) => setupdatedLocator(e.target.value)}
        />
        <button
          className="border-2 px-2 py-1 bg-blue-500 text-white rounded-sm"
          onClick={() => updateLocator()}
        >
          Update Locator
        </button>
      </div>
      {showSummary.display && (
        <div className="flex flex-col my-2 mx-auto border border-blue-300 p-4 gap-6 items-center ">
          <p>Brand: {brand}</p>
          <p>Locale: {locale}</p>
          <p className="text-red-500">
            Previous Locator Value : {!showSummary.oldValue && 'NULL'}
          </p>
          <p className="text-green-900 font-bold">
            New LocatorValue: {showSummary.updatedValue}
          </p>
        </div>
      )}
    </>
  );
};

export default Update;

import axios from 'axios';
import React, { useState } from 'react';
import { apiCalls } from '../utils/APIRequests';
import Input from './Input';

const Read = () => {
  const [showSummary, setShowSummary] = useState({
    display: false,
    brand: '',
    locale: '',
    locatorValue: '',
  });
  const setDisplay = (stateOfDisplay) => {
    setShowSummary((state) => {
      return {
        ...state,
        display: stateOfDisplay,
      };
    });
  };

  const locatorData = ({ brand, locale, locator }) => {
    const fetchLocator = async () => {
      const res = await apiCalls(
        `showLocator?brand=${brand}&locale=${locale}&locator=${locator}`,
        'GET'
      );
      const data = res[0];
      setShowSummary((state) => {
        return {
          brand,
          locale,
          locatorValue: data[`${brand}_${locale}`],
          display: true,
        };
      });
    };
    fetchLocator();
  };
  const input = {
    isbrand: true,
    islocale: true,
    islocator: true,
  };

  return (
    <>
      <Input
        input={input}
        locatorData={locatorData}
        setDisplay={setDisplay}
        name="Get Locator Value"
      />
      {showSummary.display && (
        <div className="flex flex-col my-2 mx-auto border border-blue-300 p-4 gap-6 items-center ">
          <p>Brand: {showSummary.brand}</p>
          <p>Locale: {showSummary.locale}</p>
          <p className="text-green-700 font-bold">
            LocatorValue: {showSummary.locatorValue}
          </p>
        </div>
      )}
    </>
  );
};

export default Read;

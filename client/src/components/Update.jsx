import axios from 'axios';
import React, { useState } from 'react';
import { apiCalls } from '../utils/APIRequests';
import Input from './Input';

const Update = () => {
  const [showSummary, setShowSummary] = useState({
    display: false,
    oldValue: '',
    updatedValue: '',
    brand: '',
    locale: '',
  });
  const setDisplay = (stateOfDisplay) => {
    setShowSummary((state) => {
      return {
        ...state,
        display: stateOfDisplay,
      };
    });
  };

  const locatorData = ({ brand, locale, locator, updatedLocator }) => {
    const updateLocator = async () => {
      /**get existing value */
      const oldValue = await apiCalls(
        `showLocator?brand=${brand}&locale=${locale}&locator=${locator}`,
        'GET'
      );
      setShowSummary((state) => {
        return {
          ...state,
          oldValue: oldValue[0][`${brand}_${locale}`],
          brand,
          locale,
        };
      });

      /**update locator */
      await apiCalls('update', 'POST', {
        brand: brand,
        locale: locale,
        locator: locator,
        updatedLocator: updatedLocator,
      });

      /**fetch new value again */
      const newValue = await apiCalls(
        `showLocator?brand=${brand}&locale=${locale}&locator=${locator}`,
        'GET'
      );
      setShowSummary((state) => {
        return {
          ...state,
          updatedValue: newValue[0][`${brand}_${locale}`],
        };
      });

      /**display summary */
      setShowSummary((state) => {
        return {
          ...state,
          display: true,
        };
      });
    };

    updateLocator();
  };
  const input = {
    isbrand: true,
    islocale: true,
    islocator: true,
    isupdateLocator: true,
  };

  return (
    <>
      <Input
        input={input}
        locatorData={locatorData}
        name="Update Locator"
        setDisplay={setDisplay}
      />
      {showSummary.display && (
        <div className="flex flex-col my-2 mx-auto border border-blue-300 p-4 gap-6 items-center ">
          <p>Brand: {showSummary.brand}</p>
          <p>Locale: {showSummary.locale}</p>
          <p className="text-red-500">
            Previous Locator Value :
            {showSummary.oldValue ? showSummary.oldValue : 'NULL'}
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

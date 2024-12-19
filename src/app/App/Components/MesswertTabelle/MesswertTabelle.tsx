"use client";

import React, { useState } from "react";
import './MesswertTabelle.css';
import { Messwert } from "./types";
import data from '../../../data.json';

const MesswertTabelle: React.FC = () => {
  const [messwerte, setMesswerte] = useState<Messwert[]>(data);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Messwert; direction: 'ascending' | 'descending' } | null>(null);

  const sortData = (key: keyof Messwert) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key == key && sortConfig.direction == 'ascending') {
      direction = 'descending';
    }
    
    //console.log(sortConfig);
    const sortedData = [...messwerte].sort((a, b) => {
      //console.log("a: " + a[key]);
      //console.log("b: " + b[key]);
      if (a[key] < b[key]) return direction == 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction == 'ascending' ? 1 : -1;
      return 0;
    });
    setMesswerte(sortedData);
    //console.log(sortedData);
    setSortConfig({ key, direction });
    //console.log(sortConfig);
  };

  const getRowColor = (co2: number) => {
    // low = <medium
    let medium = 400;
    let high = 801;
    if (co2 < medium) {
      return 'lightgreen'; 
    } else if (co2 < high) {
      return 'khaki'; 
    } else {
      return 'lightcoral'; 
    }
  };

  return (
    <div>
      <h1>Messwert-Tabelle</h1>
      <table>
        <thead>
          <tr>
            <th>Zeitpunkt</th>
            <th style={{cursor:'pointer'}} onClick={() => sortData('temperatur')}>Temperatur in °C</th>
            <th style={{cursor:'pointer'}} onClick={() => sortData('co2')}>CO2</th>
          </tr>
        </thead>
        <tbody>
          {messwerte.map((row, index) => (
            <tr key={index} style={{ backgroundColor: getRowColor(row.co2) }}>
              <td >{row.zeitpunkt} </td>
              <td>{row.temperatur.toFixed(1)}</td>
              <td>{row.co2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MesswertTabelle;
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Tokens from './components/Tokens'
import Updater from './components/Updater'
import Footer from "./components/Footer"
import About from "./components/About"

const App = () => {
  const SHEET_ID = '1Bo-0qaCJl26AscSirzOc3bZvPcaI2ILiTcx14PR5u4k'
  const ACCESS_TOKEN = 'ya29.A0AVA9y1vo3oEXo_w9VVlBUKKCG8GBkAXmbsZDYcZmQIOuqrioPmRKsv3YWccVJiWmkwVW4pC3tqJA6Tpajb8mXrMpxSX7CKMbrS-w_YQ1aT5i3qjqMtsuvW_CmhTpkeKALs9q8mSnELzgxhu4gj9bLsWnJSP_iAYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4T1ItQlF2SXlycFQycWI2dzRySHc5Zw0165'

  const [updated, setUpdated] = useState(false)
  const [tokens, setTokens] = useState([])
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // getGSV()
    getDB()
  }, []);

  // Get DataBase from json file
  const getDB = async () => {
    const dataFromDB = await fetchDB()
    setData(dataFromDB)
  }

  // Get Data from Google Sheets
  const getGSV = async () => {
    const dataFromGoogleSheet = await fetchGoogleSheet()
    const headers = dataFromGoogleSheet[0]
    const data = dataFromGoogleSheet.slice(1)
    const dataGoogleSheet = {}
    const columns = []
    const tokens = []
    // Columns from Google Sheet
    for(let i in headers){
      let column = {"label": `${headers[i]}`,"field": `${headers[i]}`,"sort": "asc","width": 100}
      columns.push(column)
    }
    dataGoogleSheet["columns"] = columns
    // Tokens from Google Sheet
    for(let i in data){
      let token = {}
      for(let j in data[i]){
        token[`${headers[j]}`] = data[i][j]
      }
      tokens.push(token)
    }
    dataGoogleSheet["tokens"] = tokens
    setData(dataGoogleSheet)
  }

  // Get Data From Server
  const getServer = async () => {
    const dataFromServer = await fetchServer()
    setData(dataFromServer)
  }

  // Set Data
  const setData = async (rawJSONData) => {
    const columns = rawJSONData.columns
    const tokens = []
    for(let i in rawJSONData.tokens){
      let token = {}
      for(let j in rawJSONData.tokens[i]){
        // token[j] = rawJSONData.tokens[i][j]
        switch(j){
          case 'id':
          case 'avg_ranking':
          case 'days_between':
          case 'supply_ratio':
          case 'mkt_cap (Musd)':
          case 'first_mkt_cap (Musd)':
            token[j] = Number(rawJSONData.tokens[i][j])
            break
          case 'current_date':
          case 'first_max_date':
            token[j] = rawJSONData.tokens[i][j].replace('T', ' ').slice(0, -5)
            break
          default:
            token[j] = rawJSONData.tokens[i][j]
            break
        }
      }
      tokens.push(token)
    }
    setColumns(columns)
    setTokens(tokens)
  }

  // Fetch Google Sheet
  const fetchGoogleSheet = async () =>{
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/current!A1:U27`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        // "Authorization": `API_KEY ${API_KEY}`,    
    }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json().values
    }).catch(err => {
      console.log(`Uh-oh!`, err)

    })
  }

  // Fetch DB
  const fetchDB = async () => {
    const res = require("./db.json")
    const data = res
    return data
  };

  // Fetch Server
  const fetchServer = async () => {
    const res = await fetch("http://localhost:5000/db")
    const data = await res.json()
    return data
  };

  return (
    <Router>
      <div className="container-kl">
        <Header
          title='THONTH'
        />    
        <Routes>
          <Route
            path="/"
            element={
              <>
                {tokens.length > 0 || columns.length > 0 ? (
                  <Tokens
                    columns={columns}
                    tokens={tokens}
                  />
                ) : (
                  "No Tokens To Show"
                )}
                <Updater
                    onUpdate={() => {
                      // useEffect()
                      setUpdated(!updated)
                      }
                    }
                  />
              </> 
            }
          />
          <Route path='/about' element={<About />}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
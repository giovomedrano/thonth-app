import React, { useState, useEffect } from 'react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import { Amplify, API, Storage } from 'aws-amplify';
import { listTodos as listNotes } from './graphql/queries';
import {
  createTodo as createNoteMutation,
  deleteTodo as deleteNoteMutation
} from './graphql/mutations';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Tokens from './components/Tokens';
import Footer from "./components/Footer";
import About from "./components/About";
import Updater from './components/Updater';
import awsExports from './aws-exports';

Amplify.configure(awsExports);
const initialFormState = { name: '', description: '' }

const App = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  const [showAddTask, setShowAddTask] = useState(false);
  const [tokens, setTokens] = useState([]);

  const columns = [ { "label": "Name", "field": "name", "sort": "asc", "width": 150 }, { "label": "Position", "field": "position", "sort": "asc", "width": 270 }, { "label": "Chain", "field": "chain", "sort": "asc", "width": 200 }, { "label": "Potential", "field": "potential", "sort": "asc", "width": 100 }, { "label": "ATH Date", "field": "date", "sort": "asc", "width": 150 }, { "label": "Price", "field": "price", "sort": "desc", "width": 100 } ]

  const tokensis = [ { "name": "Tiger Nixon", "position": "System Architect", "chain": "Edinburgh", "potential": "61", "date": "2011/04/25", "price": "$320" }, { "name": "Garrett Winters", "position": "Accountant", "chain": "Tokyo", "potential": "63", "date": "2011/07/25", "price": "$170" }, { "name": "Ashton Cox", "position": "Junior Technical Author", "chain": "San Francisco", "potential": "66", "date": "2009/01/12", "price": "$86" }, { "name": "Cedric Kelly", "position": "Senior Javascript Developer", "chain": "Edinburgh", "potential": "22", "date": "2012/03/29", "price": "$433" }, { "name": "Airi Satou", "position": "Accountant", "chain": "Tokyo", "potential": "33", "date": "2008/11/28", "price": "$162" }, { "name": "Brielle Williamson", "position": "Integration Specialist", "chain": "New York", "potential": "61", "date": "2012/12/02", "price": "$372" }, { "name": "Herrod Chandler", "position": "Sales Assistant", "chain": "San Francisco", "potential": "59", "date": "2012/08/06", "price": "$137" }, { "name": "Rhona Davidson", "position": "Integration Specialist", "chain": "Tokyo", "potential": "55", "date": "2010/10/14", "price": "$327" }, { "name": "Colleen Hurst", "position": "Javascript Developer", "chain": "San Francisco", "potential": "39", "date": "2009/09/15", "price": "$205" }, { "name": "Sonya Frost", "position": "Software Engineer", "chain": "Edinburgh", "potential": "23", "date": "2008/12/13", "price": "$103" }, { "name": "Jena Gaines", "position": "Office Manager", "chain": "London", "potential": "30", "date": "2008/12/19", "price": "$90" }, { "name": "Quinn Flynn", "position": "Support Lead", "chain": "Edinburgh", "potential": "22", "date": "2013/03/03", "price": "$342" }, { "name": "Charde Marshall", "position": "Regional Director", "chain": "San Francisco", "potential": "36", "date": "2008/10/16", "price": "$470" }, { "name": "Haley Kennedy", "position": "Senior Marketing Designer", "chain": "London", "potential": "43", "date": "2012/12/18", "price": "$313" }, { "name": "Tatyana Fitzpatrick", "position": "Regional Director", "chain": "London", "potential": "19", "date": "2010/03/17", "price": "$385" }, { "name": "Michael Silva", "position": "Marketing Designer", "chain": "London", "potential": "66", "date": "2012/11/27", "price": "$198" }, { "name": "Paul Byrd", "position": "Chief Financial Officer (CFO)", "chain": "New York", "potential": "64", "date": "2010/06/09", "price": "$725" }, { "name": "Gloria Little", "position": "Systems Administrator", "chain": "New York", "potential": "59", "date": "2009/04/10", "price": "$237" }, { "name": "Bradley Greer", "position": "Software Engineer", "chain": "London", "potential": "41", "date": "2012/10/13", "price": "$132" }, { "name": "Dai Rios", "position": "Personnel Lead", "chain": "Edinburgh", "potential": "35", "date": "2012/09/26", "price": "$217" }, { "name": "Jenette Caldwell", "position": "Development Lead", "chain": "New York", "potential": "30", "date": "2011/09/03", "price": "$345" }, { "name": "Yuri Berry", "position": "Chief Marketing Officer (CMO)", "chain": "New York", "potential": "40", "date": "2009/06/25", "price": "$675" }, { "name": "Caesar Vance", "position": "Pre-Sales Support", "chain": "New York", "potential": "21", "date": "2011/12/12", "price": "$106" }, { "name": "Doris Wilder", "position": "Sales Assistant", "chain": "Sidney", "potential": "23", "date": "2010/09/20", "price": "$85" }, { "name": "Angelica Ramos", "position": "Chief Executive Officer (CEO)", "chain": "London", "potential": "47", "date": "2009/10/09", "price": "$1" }, { "name": "Gavin Joyce", "position": "Developer", "chain": "Edinburgh", "potential": "42", "date": "2010/12/22", "price": "$92" }, { "name": "Jennifer Chang", "position": "Regional Director", "chain": "Singapore", "potential": "28", "date": "2010/11/14", "price": "$357" }, { "name": "Brenden Wagner", "position": "Software Engineer", "chain": "San Francisco", "potential": "28", "date": "2011/06/07", "price": "$206" }, { "name": "Fiona Green", "position": "Chief Operating Officer (COO)", "chain": "San Francisco", "potential": "48", "date": "2010/03/11", "price": "$850" }, { "name": "Shou Itou", "position": "Regional Marketing", "chain": "Tokyo", "potential": "20", "date": "2011/08/14", "price": "$163" }, { "name": "Michelle House", "position": "Integration Specialist", "chain": "Sidney", "potential": "37", "date": "2011/06/02", "price": "$95" }, { "name": "Suki Burks", "position": "Developer", "chain": "London", "potential": "53", "date": "2009/10/22", "price": "$114" }, { "name": "Prescott Bartlett", "position": "Technical Author", "chain": "London", "potential": "27", "date": "2011/05/07", "price": "$145" }, { "name": "Gavin Cortez", "position": "Team Leader", "chain": "San Francisco", "potential": "22", "date": "2008/10/26", "price": "$235" }, { "name": "Martena Mccray", "position": "Post-Sales support", "chain": "Edinburgh", "potential": "46", "date": "2011/03/09", "price": "$324" }, { "name": "Unity Butler", "position": "Marketing Designer", "chain": "San Francisco", "potential": "47", "date": "2009/12/09", "price": "$85" }, { "name": "Howard Hatfield", "position": "Office Manager", "chain": "San Francisco", "potential": "51", "date": "2008/12/16", "price": "$164" }, { "name": "Hope Fuentes", "position": "Secretary", "chain": "San Francisco", "potential": "41", "date": "2010/02/12", "price": "$109" }, { "name": "Vivian Harrell", "position": "Financial Controller", "chain": "San Francisco", "potential": "62", "date": "2009/02/14", "price": "$452" }, { "name": "Timothy Mooney", "position": "Office Manager", "chain": "London", "potential": "37", "date": "2008/12/11", "price": "$136" }, { "name": "Jackson Bradshaw", "position": "Director", "chain": "New York", "potential": "65", "date": "2008/09/26", "price": "$645" }, { "name": "Olivia Liang", "position": "Support Engineer", "chain": "Singapore", "potential": "64", "date": "2011/02/03", "price": "$234" }, { "name": "Bruno Nash", "position": "Software Engineer", "chain": "London", "potential": "38", "date": "2011/05/03", "price": "$163" }, { "name": "Sakura Yamamoto", "position": "Support Engineer", "chain": "Tokyo", "potential": "37", "date": "2009/08/19", "price": "$139" }, { "name": "Thor Walton", "position": "Developer", "chain": "New York", "potential": "61", "date": "2013/08/11", "price": "$98" }, { "name": "Finn Camacho", "position": "Support Engineer", "chain": "San Francisco", "potential": "47", "date": "2009/07/07", "price": "$87" }, { "name": "Serge Baldwin", "position": "Data Coordinator", "chain": "Singapore", "potential": "64", "date": "2012/04/09", "price": "$138" }, { "name": "Zenaida Frank", "position": "Software Engineer", "chain": "New York", "potential": "63", "date": "2010/01/04", "price": "$125" }, { "name": "Zorita Serrano", "position": "Software Engineer", "chain": "San Francisco", "potential": "56", "date": "2012/06/01", "price": "$115" }, { "name": "Jennifer Acosta", "position": "Junior Javascript Developer", "chain": "Edinburgh", "potential": "43", "date": "2013/02/01", "price": "$75" }, { "name": "Cara Stevens", "position": "Sales Assistant", "chain": "New York", "potential": "46", "date": "2011/12/06", "price": "$145" }, { "name": "Hermione Butler", "position": "Regional Director", "chain": "London", "potential": "47", "date": "2011/03/21", "price": "$356" }, { "name": "Lael Greer", "position": "Systems Administrator", "chain": "London", "potential": "21", "date": "2009/02/27", "price": "$103" }, { "name": "Jonas Alexander", "position": "Developer", "chain": "San Francisco", "potential": "30", "date": "2010/07/14", "price": "$86" }, { "name": "Shad Decker", "position": "Regional Director", "chain": "Edinburgh", "potential": "51", "date": "2008/11/13", "price": "$183" }, { "name": "Michael Bruce", "position": "Javascript Developer", "chain": "Singapore", "potential": "29", "date": "2011/06/27", "price": "$183" }, { "name": "Donna Snider", "position": "Customer Support", "chain": "New York", "potential": "27", "date": "2011/01/25", "price": "$112" } ]

  useEffect(() => {
    const getTokens = async () => {
      const tokensFromServer = await fetchTokens();
      setTokens(tokensFromServer);
    };
    getTokens();
  }, []);

  // Fetch Tokens
  const fetchTokens = async () => {
    const res = await fetch("http://localhost:5000/tokens");
    const data = await res.json();

    return data;
  };

  // Fetch Token
  const fetchToken = async (id) => {
    const res = await fetch(`http://localhost:5000/tokens/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Token
  const addToken = async (token) => {
    const res = await fetch("http://localhost:5000/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });

    const data = await res.json();
    setTokens([...tokens, data]);
  };

  // Delete Token
  const deleteToken= async (id) => {
    await fetch(`http://localhost:5000/tokens/${id}`, { method: "DELETE" });

    setTokens(tokens.filter((token) => token.id !== id));
  };

  // Toogle Reminder
  const toggleReminder = async (id) => {
    const tokenToToggle = await fetchToken(id);
    const updToken = { ...tokenToToggle, reminder: !tokenToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tokens/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updToken),
    });

    const data = await res.json();

    setTokens(
      tokens.map((token) =>
        token.id === id ? { ...token, reminder: data.reminder } : token
      )
    );
  };

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } })
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  return (
    <Router>
      <div className="container">
        <Header
          title='THONTH'
        />    
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addToken} />}
                {/* {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                    "No Tasks To Show"
                )} */}
                {/* <Tokens 
                  caption={""}
                  highlightOnHover={true}
                  size={"large"}
                  variation={"primary"}
                /> */}
                <Tokens
                  columns={columns}
                  tokens={tokensis}
                />
              </> 
            }
          />
          <Route path='/about' element={<About />}/>
        </Routes>
        
        <Updater
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Footer/>
      </div>
    </Router>
  )
}

export default App;
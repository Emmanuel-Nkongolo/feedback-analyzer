import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./services/apolloClient";

// Import pages
import Dashboard from "./pages/Dashboard/Dashboard";
import AddFeedback from "./pages/AddFeedback/AddFeedback";
import NotFound from "./pages/NotFound/NotFound";

// Import components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-feedback" element={<AddFeedback />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

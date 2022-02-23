import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import HomePage from './home';
import TransactionPage from './transactions';
import TestPage from './budget/TestPage';

import BudgetPage, { CategoryDetailsPage } from './budget';
import NotFoundPage from './other';

/**
 * Top-level component that displays the Navbar and uses React Router to show pages based on the URL
 *
 * @component
 * @example
 * <App />
 */
function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Budget Extravaganza</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/transactions">Transactions</Nav.Link>
            <Nav.Link as={NavLink} to="/budget">Budget</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="budget" element={<BudgetPage />} />
          {/* REMOVE THIS! */}
          <Route path="test" element={<TestPage />} />
          {/* REMOVE THIS! */}
          <Route path="budget/:categoryId" element={<CategoryDetailsPage />} />
          <Route path="notfound" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

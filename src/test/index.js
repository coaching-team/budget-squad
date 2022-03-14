import React from 'react';
import { render } from '@testing-library/react';
import { PropTypes } from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../transactions/TransactionSlice';
import categoryReducer from '../budget/CategorySlice';

export * as TestData from './TestData';

/**
 * Overrides React Testing Library's render method to add wrappers for React Router and Redux
 * Allows you to specify as an option a preloaded state for the entire test Redux Store
 *
 * @param {Element} ui - Passed straight through to React Testing Library's render function
 * @param {Object} options - Adds preloadedState property for giving Redux a preloaded state
 * @returns the return value from React Testing Library's render function
 */
function customRender(ui, options = {}) {
  // Test Redux Store with preloaded state
  const testStore = configureStore({
    reducer: {
      transactions: transactionReducer,
      categories: categoryReducer,
    },
    preloadedState: options.preloadedState,
  });

  // Wrapping Component with Redux and React Router
  function Wrappers({ children }) {
    return (
      <Provider store={testStore}>
        <BrowserRouter>
          { children }
        </BrowserRouter>
      </Provider>
    );
  }
  Wrappers.propTypes = { children: PropTypes.element.isRequired };

  // Return the result of calling React Testing Library's render function, but with the wrappers
  return render(ui, { wrapper: Wrappers, ...options });
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

import { v4 as uuid } from 'uuid';

/**
 * Creates a new transaction object with the specified data
 *
 * @param {?number} amount - the amount of the transaction (can be null or not provided)
 * @param {?Object} date - the date of the transaction (can be null or not provided)
 * @param {?string} categoryId - the categoryId of the transaction (can be null or not provided)
 * @returns a new transaction object
 */
export const getTransaction = (amount, date, categoryId) => ({
  id: uuid(),
  date: date || new Date(),
  payee: 'Ullrich Group',
  categoryId: categoryId || '2457cec9-d841-49d7-9fba-8c6e852cbc22',
  notes: '',
  amount: amount || 0,
});

/**
 * Gets an array of transactions for testing
 * Can specify amounts, dates and categories for the generated transactions
 * If no parameters are given, then it returns 5 default transactions
 * All default transactions have a category of Income or Shopping
 *
 * @param {number[]} amounts - an array of the amounts to use
 * @param {?Object[] | Object} dates - an array of dates or one date (optional)
 * @param {?string[] | string} categoryIds - an array of category ids or one category id (optional)
 * @returns an array of test transactions
 */
export const getTransactions = (amounts, dates, categoryIds) => {
  // Return a custom list of transactions
  if (Array.isArray(amounts)) {
    return amounts.map((amount, index) => {
      const date = (Array.isArray(dates)) ? dates[index] : dates;
      const category = (Array.isArray(categoryIds)) ? categoryIds[index] : categoryIds;
      return getTransaction(amount, date, category);
    });
  }
  // Or return a default list of 5 transactions
  return [
    {
      id: '3b2e29b6-d911-4c8b-8e4e-5808f7559418',
      date: new Date('2021-03-24'),
      payee: 'Tromp, Howell and Grant',
      categoryId: '91c33650-6df8-4845-b3e3-2450bed8541c',
      notes: 'nulla neque libero convallis',
      amount: -297.8,
    },
    {
      id: 'abf3abac-3d22-488d-b208-dc9b1e44008e',
      date: new Date('2022-02-27'),
      payee: 'Ullrich Group',
      categoryId: '6321da2a-98ef-457d-8357-797a9041fe10',
      notes: 'nullam varius nulla facilisi',
      amount: 240.2,
    }, {
      id: '7e66e23e-d99e-48ba-8cff-195911f6c06e',
      date: new Date('2022-01-01'),
      payee: 'Tromp, Howell and Grant',
      categoryId: '6321da2a-98ef-457d-8357-797a9041fe10',
      notes: '',
      amount: 46.5,
    }, {
      id: '0249ab94-b9b2-4890-9fff-09408a9a18d8',
      date: new Date('2021-12-31'),
      payee: 'Macejkovic, Sipes and Swift',
      categoryId: '91c33650-6df8-4845-b3e3-2450bed8541c',
      notes: 'quam sollicitudin vitae consectetuer eget',
      amount: -147.97,
    }, {
      id: '5ab89d1b-6199-4e3a-bc40-047788dad4cb',
      date: new Date('2021-05-13'),
      payee: 'Bergnaum-Pouros',
      categoryId: '91c33650-6df8-4845-b3e3-2450bed8541c',
      notes: '',
      amount: -295.46,
    },
  ];
};

/**
 * Creates a new category with the specified target
 * Default target is 0
 *
 * @param {?number} target - the target of the category (can be null or not provided)
 * @returns a new category object
 */
export const getCategory = (target) => ({
  id: uuid(),
  name: 'Groceries',
  target: target || 0,
});

/**
 * Gets five test categories
 * Income has an index of '6321da2a-98ef-457d-8357-797a9041fe10'
 *
 * @returns 5 test categories
 */
export const getCategories = () => [
  {
    id: '6321da2a-98ef-457d-8357-797a9041fe10',
    name: 'Income',
    target: 3000,
  },
  {
    id: '2457cec9-d841-49d7-9fba-8c6e852cbc22',
    name: 'Rent',
    target: 1500,
  },
  {
    id: '59726654-f530-4d5d-976c-006173cdd86a',
    name: 'Groceries',
    target: 400,
  },
  {
    id: '85bc38b9-4ebe-4639-b82a-789b4918f9e6',
    name: 'Gas',
    target: 150,
  },
  {
    id: '91c33650-6df8-4845-b3e3-2450bed8541c',
    name: 'Shopping',
    target: 250,
  },
];

/**
 * Gets test state with the specified transactions and categories
 * If no transactions are provided (null or no argument), defaults to 5 test transactions
 * If no categories are provided (null or no argument), defaults to 5 test categories
 *
 * @param {?Object[]} transactions - the transactions to use (can be null or not provided)
 * @param {?Object[]} categories - the categories to use (can be null or not provided)
 * @returns a new state object for preloading in a test Redux store
 */
export const getState = (
  transactions = getTransactions(),
  categories = getCategories(),
) => (
  {
    categories: {
      entities: categories || getCategories(),
    },
    transactions: {
      entities: transactions || getTransactions(),
    },
  }
);

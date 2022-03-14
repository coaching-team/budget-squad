/**
 * Gets five test transactions
 * All have either categoryId 0 or categoryId 4
 *
 * @returns - 5 test transactions
 */
export const getTransactions = () => [
  {
    id: '3b2e29b6-d911-4c8b-8e4e-5808f7559418',
    date: new Date('2021-03-24'),
    payee: 'Tromp, Howell and Grant',
    categoryId: 4,
    notes: 'nulla neque libero convallis',
    amount: -297.8,
  },
  {
    id: 'abf3abac-3d22-488d-b208-dc9b1e44008e',
    date: new Date('2022-02-27'),
    payee: 'Ullrich Group',
    categoryId: 0,
    notes: 'nullam varius nulla facilisi',
    amount: 240.2,
  }, {
    id: '7e66e23e-d99e-48ba-8cff-195911f6c06e',
    date: new Date('2022-01-01'),
    payee: 'Tromp, Howell and Grant',
    categoryId: 0,
    notes: '',
    amount: 46.5,
  }, {
    id: '0249ab94-b9b2-4890-9fff-09408a9a18d8',
    date: new Date('2021-12-31'),
    payee: 'Macejkovic, Sipes and Swift',
    categoryId: 4,
    notes: 'quam sollicitudin vitae consectetuer eget',
    amount: -147.97,
  }, {
    id: '5ab89d1b-6199-4e3a-bc40-047788dad4cb',
    date: new Date('2021-05-13'),
    payee: 'Bergnaum-Pouros',
    categoryId: 4,
    notes: '',
    amount: -295.46,
  },
];

/**
 * Gets five test categories
 * Income has an index of 0
 *
 * @returns - 5 test categories
 */
export const getCategories = () => [
  {
    id: 0,
    name: 'Income',
    target: 3000,
  },
  {
    id: 1,
    name: 'Rent',
    target: 1500,
  },
  {
    id: 2,
    name: 'Groceries',
    target: 400,
  },
  {
    id: 3,
    name: 'Gas',
    target: 150,
  },
  {
    id: 4,
    name: 'Shopping',
    target: 250,
  },
];

/**
 * Gets test state with the specified transactions and categories
 * If no transactions are provided (null or no argument), defaults to 5 test transactions
 * If no categories are provided (null or no argument), defaults to 5 test categories
 *
 * @param {*} transactions - the transactions to use (can be null or not provided)
 * @param {*} categoires - the categories to use (can be null or not provided)
 * @returns - a new state object for preloading in a test Redux store
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

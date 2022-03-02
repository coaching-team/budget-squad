// import React, { useState } from 'react';
// import { TRANSACTIONS } from "./data";
// import { withRouter } from 'react-router-dom';
// import 'bootswatch/dist/zephyr/bootstrap.min.css';
// import './index.css';

// //attempt #1 at writing out sorting code for category id
// const renderCategoryId = data => {
//     return data.categoryid.map((item, index) => {
//       return (
//         <div className='payee-id'
//           key={item.id}
//           onClick={() => pushToRoute(item.route)}
//           {...item.name});
//     })
//   }

// //attept #2 at writing out sorting for category id
// const CategoryId = (TRANSACTIONS) => {
//     const {
//         // id: string,
//         // date: Date,
//         // payee: string,
//         categoryId: number,
//         // notes: string,
//         // amount: number,
//   }
//   return
//   {categoryId.map((categoryId))}
//     <div>
//         <h6> payee Id: {CategoryId.number}</h6>
//     </div>

// //attept #3 at writing out sorting for category id
// found a stack overflow and tried to mimic the template given
// {/* const renderCategoryId = data => {
//     return data.categoryid.map((item, index) => {
//       return (
//         <div className='payee-id'
//           key={item.id}
//           onClick={() => pushToRoute(item.route)}
//           {...item.name});
//     })
//   }

// for (const [payee, items] of group(data, 'payee')) {
//   console.log(`
//        <div class="item">
//           <h3>${payee}</h3>
//           <ol>${items.map((item) => `<li>${item.categoryId}</li>`).join('')}</ol>
//        </div>
//     `);
// }

// function group(items, key) {
//   // get unique values for grouping key
//   const unique = [
//     ...new Set(items.map((item) => item[key])),
//   ];

//   // will be ascending by default
//   unique.sort();

//   // sorting all of the results by categoryId field
//   const sortFn = (a, b) => a.categoryId > b.categoryId;

//   const sortItems = (val) => {
//     // filters the result set to items sharing the current group field value
//     const sorted = items.filter((item) => item[key] === val);
//     // sort by categoryId
//     sorted.sort(sortFn);
//     return sorted;
//   };

//   // reduce to a Map (which preserves insertion order and maintains the group key sorting)
//   return unique.reduce((map, cur) => map.set(cur, sortItems(cur)), new Map());
// }

// // testing it out; copy and pasted 4 of the first id in data.js
// const data = [
//   {
//     id: 'abf3abac-3d22-488d-b208-dc9b1e44008e',
//     date: new Date('2021-09-27 17:21:54'),
//     payee: 'Ullrich Group',
//     categoryId: 0,
//     notes: 'nullam varius nulla facilisi',
//     amount: -240.2,
//   }, {
//     id: '3b2e29b6-d911-4c8b-8e4e-5808f7559418',
//     date: new Date('2021-03-24 13:34:07'),
//     payee: 'Tromp, Howell and Grant',
//     categoryId: 4,
//     notes: 'nulla neque libero convallis',
//     amount: -297.8,
//   }, {
//     id: '0249ab94-b9b2-4890-9fff-09408a9a18d8',
//     date: new Date('2021-04-22 20:17:23'),
//     payee: 'Macejkovic, Sipes and Swift',
//     categoryId: 0,
//     notes: 'quam sollicitudin vitae consectetuer eget',
//     amount: -147.97,
//   }, {
//     id: '5ab89d1b-6199-4e3a-bc40-047788dad4cb',
//     date: new Date('2021-05-13 21:39:55'),
//     payee: 'Bergnaum-Pouros',
//     categoryId: 0,
//     notes: '',
//     amount: -295.46,
//   },
// ];

// const dropdown = document.querySelector('#group');

// dropdown.addEventListener('change', function () {
//   const html = [];
//   const results = document.querySelector('#results');
//   for (const [payee, items] of group(data, this.value)) {
//     html.push(`
//          <div class="item">
//             <h3>${payee}</h3>
//             <ol>${items.map((item) => `<li>${item.categoryId}</li>`).join('')}</ol>
//          </div>
//       `);
//   }

//   results.innerHTML = html.join('');
// }); */}

// // attempted to construct a dropdown list for the category id list on transaction table
// const dropdown = () => {
//     <Dropdown>
//       <dropdown.Toggle variant="success" id="dropdown-basic">
//         Choose payee to sort.
//       </dropdown.Toggle>

//       <dropdown.Menu>
//         <dropdown.Item href="categoryId:[0]">Income</dropdown.Item>
//         <dropdown.Item href="categoryId:[1]">Rent</dropdown.Item>
//         <dropdown.Item href="categoryId:[2]">Groceries</dropdown.Item>
//         <dropdown.Item href="categoryId:[3]">Gas</dropdown.Item>
//         <dropdown.Item href="categoryId:[4]">Shopping</dropdown.Item>
//         <dropdown.Item href="categoryId:[5]">Eating Out</dropdown.Item>
//       </dropdown.Menu>
//     </Dropdown>;
//   };
// export default dropdown;

// {/* found a simple select box list for "select items"  */}
// function changeFunc() {
//     var selectBox = document.getElementById("selectBox");
//     var selectedValue = selectBox.options[selectBox.selectedIndex].value;
//     alert(selectedValue);

//     <select id="selectBox" onchange="changeFunc();">
//    <option value="1">Option #1</option>
//    <option value="2">Option #2</option>
//   </select>

//   const sortById = ['0', '91', '32', '43','84', '95'];
// sortById.sort();
// console.log(sortById);
// // expected output: Array ["Dec", "Feb", "Jan", "March"]

// const array1 = [1, 30, 4, 21, 100000];
// array1.sort();
// console.log(array1);
// // expected output: Array [1, 100000, 21, 30, 4]

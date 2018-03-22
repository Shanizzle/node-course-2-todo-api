const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = 'abc123!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

let hashedPassword = '$2a$10$.kc/fw9Xpas/XwbXn9nBK.aLtFdpzzxWKCUM9rQOtP3RFc5Pe/HRy';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});





// let data = {
//   id: 10
// };
//
//
//
// let token = jwt.sign(data, '123abc');
//   console.log(token);
// let decoded = jwt.verify(token, '123abc');
//   console.log('decoded', decoded);
// let message = 'I am user number 3';
// let hash =  SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//   id: 4  //example:  Shannen
// };
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()  //example nennahS
// }
//
// // //******if a middleman tried the below code it would fail becuase they wouldn't have the secret.
// // token.data.id = 5; //example Ken
// // token.hash = SHA256(JSON.stringify(data)).toString(); //example neK
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// //******because we salted the hash above 'somesecret' the resultHash  will not match
//   ******and middleman will be denied

// if (resultHash === token.hash) {
//   console.log('Data was not change');
// } else {
//   console.log ('Data was changed. Do not trust!');
// }

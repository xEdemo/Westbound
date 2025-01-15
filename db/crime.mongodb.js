const { validateCrimeCreation } = require("./validation/crimes.js");

use("Westbound");

const now = Date.now();

db.crimes.createIndex({ name: 1 }, { unique: true });

const crime = {
	name: "An",
	type: "Environmental",
	difficulty: 1,
	levelRequired: 1,
	environmentalDamage: "steven",
	createdAt: now,
	updatedAt: now,
}

const validationError = validateCrimeCreation(crime);
if (!validationError) {
	db.crimes.insertOne(crime);
} else {
	console.log(validationError.msg)
}



// db.runCommand({
//     collMod: "crimes",
//     validator: {
//         $jsonSchema: {
//             bsonType: "object",
//             required: ["name", "type", "difficulty", "levelRequired"],
//             properties: {
//                 name: { bsonType: "string", description: "must be a string and is required" },
//                 type: { enum: ["Financial", "Environmental"], description: "must be 'Financial' or 'Environmental'" },
//                 difficulty: { bsonType: "int", minimum: 1, maximum: 10, description: "must be an integer between 1 and 10" },
//                 levelRequired: { bsonType: "int", description: "must be an integer and is required" },
//                 environmentalDamage: { bsonType: ["double", "int"], description: "required if type is 'Environmental'" },
//                 fineAmount: { bsonType: ["double", "int"], description: "required if type is 'Financial'" },
//             },
//             oneOf: [
//                 {
//                     properties: { type: { enum: ["Environmental"] } },
//                     required: ["environmentalDamage"],
//                 },
//                 {
//                     properties: { type: { enum: ["Financial"] } },
//                     required: ["fineAmount"],
//                 },
//             ],
//         },
//     },
//     validationLevel: "strict",
// });

// Switch to the appropriate database
// use("Westbound");

// try {
//     // Run the command to modify the collection schema
//     const result = db.runCommand({
//         collMod: "crimes",  // Modify the 'crimes' collection
//         validator: {
//             $jsonSchema: {
//                 bsonType: "object",
//                 required: ["name", "type", "difficulty", "levelRequired"],
//                 properties: {
//                     name: {
//                         bsonType: "string",
//                         description: "must be a string and is required",
//                     },
//                     type: {
//                         enum: ["Financial", "Environmental"],
//                         description: "must be 'Financial' or 'Environmental'",
//                     },
//                     difficulty: {
//                         bsonType: "int",
//                         minimum: 1,
//                         maximum: 10,
//                         description: "must be an integer between 1 and 10",
//                     },
//                     levelRequired: {
//                         bsonType: "int",
//                         description: "must be an integer and is required",
//                     },
//                     environmentalDamage: {
//                         bsonType: ["double", "int"],
//                         description: "required if type is 'Environmental'",
//                     },
//                     fineAmount: {
//                         bsonType: ["double", "int"],
//                         description: "required if type is 'Financial'",
//                     },
//                 },
//                 oneOf: [
//                     {
//                         properties: { type: { enum: ["Environmental"] } },
//                         required: ["environmentalDamage"],
//                     },
//                     {
//                         properties: { type: { enum: ["Financial"] } },
//                         required: ["fineAmount"],
//                     },
//                 ],
//             },
//         },
//         validationLevel: "strict", // Ensure strict validation for data
//     });

//     // If the command is successful, log the result
//     print("Schema validation update successful.");
//     printjson(result);  // Logs the result of the command

// } catch (error) {
//     // If an error occurs, log it
//     print("Error occurred during schema validation update:");
//     printjson(error);  // Logs the error details
// }

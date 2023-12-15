// Import required dependencies
const { database, tables } = require("../setup");

// Test suite for the create method of ItemManager
describe("Create user", () => {
  it("should create an user successfully", async () => {
    // Define a sample item for testing
    const testUser = {
      firstname: "Prenom",
      lastname: "Nom",
      sexe: "Homme",
      code_postal: 75000,
      ville: "Paris",
      email: "nom.prenom@wcs.com",
      password: "Azerty1234",
      logged_in: false,
      nb_vehicule: 1,
      isAdmin: true,
    };

    // Send a create request to the item table with a test item
    const insertId = await tables.users.create(testUser);

    // Check if the newly added item exists in the database
    const [rows] = await database.query(
      "select * from users where id = ?",
      insertId
    );

    const foundItem = rows[0];

    // Assertions
    expect(foundItem).toBeDefined();
    expect(foundItem).toHaveProperty("id");
    expect(foundItem).toHaveProperty("firstname");
    expect(foundItem).toHaveProperty("lastname");
    expect(foundItem).toHaveProperty("sexe");
    expect(foundItem).toHaveProperty("code_postal");
    expect(foundItem).toHaveProperty("ville");
    expect(foundItem).toHaveProperty("email");
    expect(foundItem).toHaveProperty("password");
    expect(foundItem).toHaveProperty("logged_in");
    expect(foundItem).toHaveProperty("nb_vehicule");
    expect(foundItem).toHaveProperty("isAdmin");
    expect(typeof foundItem.id).toEqual("number");
    expect(typeof foundItem.firstname).toEqual("string");
    expect(typeof foundItem.lastname).toEqual("string");
    expect(typeof foundItem.sexe).toEqual("string");
    expect(typeof foundItem.code_postal).toEqual("number");
    expect(typeof foundItem.ville).toEqual("string");
    expect(typeof foundItem.email).toEqual("string");
    expect(typeof foundItem.password).toEqual("string");
    expect(typeof foundItem.logged_in).toEqual("number");
    expect(typeof foundItem.nb_vehicule).toEqual("number");
    expect(typeof foundItem.isAdmin).toEqual("number");
    expect(foundItem.firstname).toBe(testUser.firstname);
    expect(foundItem.lastname).toBe(testUser.lastname);
    expect(foundItem.sexe).toBe(testUser.sexe);
    expect(foundItem.code_postal).toBe(testUser.code_postal);
    expect(foundItem.ville).toBe(testUser.ville);
    expect(foundItem.email).toBe(testUser.email);
    expect(foundItem.password).toBe(testUser.password);
    expect(foundItem.logged_in).toBe(testUser.logged_in === true ? 1 : 0);
    expect(foundItem.nb_vehicule).toBe(testUser.nb_vehicule);
    expect(foundItem.isAdmin).toBe(testUser.isAdmin === true ? 1 : 0);
  });

  it("should throw when passing invalid object", async () => {
    // Thx https://jestjs.io/docs/asynchronous#asyncawait

    // Send a create request to the item table with an empty object
    const promise = tables.users.create({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});

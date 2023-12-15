// Import required dependencies
const { app, request, tables } = require("../setup");

// Test suite for the GET /api/users route
describe("GET /api/users", () => {
  it("should fetch users successfully", async () => {
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

    // Create a sample item in the database
    const insertId = await tables.users.create(testUser);

    // Send a GET request to the /api/users endpoint
    const response = await request(app).get("/api/users");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Check if the created item is present in the response
    const foundItem = response.body.find((user) => user.id === insertId);

    // Assertions
    expect(foundItem).toBeInstanceOf(Object);
    expect(foundItem.firstname).toBe(testUser.firstname);
  });
});

// Test suite for the GET /api/users/:id route
describe("GET /api/users/:id", () => {
  it("should fetch a single item successfully", async () => {
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

    // Create a sample item in the database
    const insertId = await tables.users.create(testUser);

    // Send a GET request to the /api/users/:id endpoint
    const response = await request(app).get(`/api/users/${insertId}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.id).toBe(insertId);
    expect(response.body.firstname).toBe(testUser.firstname);
  });

  it("should return 404 for non-existent item", async () => {
    // Send a GET request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app).get("/api/users/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/users route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling log could help ;)
describe("POST /api/users", () => {
  it("should add a new user successfully", async () => {
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

    // Send a POST request to the /api/users endpoint with a test item
    const response = await request(app).post("/api/users").send(testUser);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toEqual(expect.any(Number));

    // Check if the newly added item exists in the database
    const foundItem = await tables.users.read(response.body.insertId);

    // Assertions
    expect(foundItem).toBeDefined();
    expect(foundItem.firstname).toBe(testUser.firstname);
  });
});

// TODO: implement PUT and DELETE routes

/*
// Test suite for the PUT /api/users/:id route
describe("PUT /api/users/:id", () => {
  it("should update an existing item successfully", async () => {
    // Define a sample item for testing
    const testItem = {
      title: "Sample Item",
    };

    // Create a sample item in the database
    const insertId = await tables.item.create(testItem);

    // Define an updated item object
    const updatedItem = {
      title: "Updated Item",
    };

    // Send a PUT request to the /api/users/:id endpoint with updated data
    const response = await request(app)
      .put(`/api/users/${insertId}`)
      .send(updatedItem);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the item has been updated in the database
    const foundItem = await tables.item.read(insertId);

    // Assertions
    expect(foundItem).toBeDefined();
    expect(foundItem.title).toBe(updatedItem.title);
  });
});

// Test suite for the DELETE /api/users/:id route
describe("DELETE /api/users/:id", () => {
  it("should delete an existing item successfully", async () => {
    // Define a sample item for testing
    const testItem = {
      title: "Sample Item",
    };

    // Create a sample item in the database
    const insertId = await tables.item.create(testItem);

    // Send a DELETE request to the /api/users/:id endpoint
    const response = await request(app).delete(`/api/users/${insertId}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the item has been deleted from the database
    const foundItem = await tables.item.read(insertId);

    // Assertions
    expect(foundItem).toBeUndefined();
  });
});
*/

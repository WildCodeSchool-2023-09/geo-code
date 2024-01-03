const AbstractManager = require("./AbstractManager");

class BorneManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "borne" });
  }

  // The C of CRUD - Create operation

  async create(newName) {
    console.info(newName);
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `LOAD DATA INFILE ? INTO TABLE ${this.table} FIELDS TERMINATED BY "," ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES`,
      [`${__dirname}../../../${newName}`]
    );
    // Return the ID of the newly inserted item
    return result;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select *
             from ${this.table}
             where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select *
                                                  from ${this.table}`);

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = BorneManager;

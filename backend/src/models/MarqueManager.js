const AbstractManager = require("./AbstractManager");

class MarqueManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "marque" });
  }

  // The C of CRUD - Create operation

  async create(newMarques) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    await this.database.query(`ALTER TABLE modele DROP FOREIGN KEY modele_fk0`);

    this.database.query(`TRUNCATE TABLE marque`);

    this.database.query(
      `ALTER TABLE modele ADD CONSTRAINT modele_fk0 FOREIGN KEY (marque_id) REFERENCES marque(id);`
    );

    newMarques.map((element) => {
      this.database.query(
        `insert into ${this.table} (name)
           values (?)`,
        [element]
      );
      return true;
    });

    // Return the ID of the newly inserted item
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

module.exports = MarqueManager;

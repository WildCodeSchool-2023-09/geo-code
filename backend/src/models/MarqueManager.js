const AbstractManager = require("./AbstractManager");

class MarqueManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "marque" });
  }

  // The C of CRUD - Create operation

  async create(newMarques, full) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    console.info(full);
    if (full.length === 0) {
      console.info("est vide je passe par là");
      try {
        await newMarques.map((element) =>
          this.database.query(
            `insert into ${this.table} (name)
           values (?)`,
            [element]
          )
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await this.database.query(
          `ALTER TABLE modele DROP FOREIGN KEY modele_fk0`
        );
        await this.database.query(
          `ALTER TABLE vehicule DROP FOREIGN KEY vehicule_fk1`
        );
        await this.database.query(`TRUNCATE TABLE marque`);

        await this.database.query(`TRUNCATE TABLE modele`);

        await this.database.query(
          `ALTER TABLE modele ADD CONSTRAINT modele_fk0 FOREIGN KEY (marque_id) REFERENCES marque(id);`
        );
        await this.database.query(
          `ALTER TABLE vehicule ADD CONSTRAINT vehicule_fk1 FOREIGN KEY (modele_id) REFERENCES modele(id);`
        );

        await newMarques.map((element) =>
          this.database.query(
            `insert into ${this.table} (name)
           values (?)`,
            [element]
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
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

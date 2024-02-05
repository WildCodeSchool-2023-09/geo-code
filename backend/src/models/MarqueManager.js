/* eslint-disable no-await-in-loop */
// C'est le seul moyen qu'on ait trouvé pour remplir la db avec le bonne ordre à chaque fois
const AbstractManager = require("./AbstractManager");

class MarqueManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "marque" });
  }

  // The C of CRUD - Create operation

  async create(newMarques, full, marque) {
    // Execute the SQL INSERT query to add a new item to the "item" table

    if (full.length === 0) {
      // si db vide
      try {
        await newMarques.map((element) =>
          this.database.query(
            `insert into ${this.table} (name)
                         values (?)`,
            [element]
          )
        );

        for (let i = 0; i < marque.length; i += 1) {
          const [id] = await this.database.query(
            `select id from marque where name="${marque[i].make}"`
          );

          await this.database.query(
            `insert into modele (name,marque_id, type_prise)
             values (?, ?, ?)`,
            [marque[i].model, id[0].id, marque[i].atvtype]
          );
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // si db pleine
      try {
        await this.database.query(
          `ALTER TABLE modele
                        DROP FOREIGN KEY modele_fk0`
        );
        await this.database.query(
          `ALTER TABLE vehicule
                        DROP FOREIGN KEY vehicule_fk1`
        );

        await this.database.query(`TRUNCATE TABLE marque`);

        await this.database.query(`TRUNCATE TABLE modele`);

        // ajout des marques
        for (let i = 0; i < newMarques.length; i += 1) {
          await this.database.query(
            `insert into ${this.table} (name)
                         values (?)`,
            [newMarques[i]]
          );
        }

        // ajout des modeles
        for (let i = 0; i < marque.length; i += 1) {
          const [id] = await this.database.query(
            `select id from marque where name="${marque[i].make}"`
          );

          await this.database.query(
            `insert into modele (name,marque_id, type_prise)
             values (?, ?, ?)`,
            [marque[i].model, id[0].id, marque[i].atvtype]
          );
        }

        await this.database.query(
          `ALTER TABLE modele
                        ADD CONSTRAINT modele_fk0 FOREIGN KEY (marque_id) REFERENCES marque (id);`
        );
        await this.database.query(
          `ALTER TABLE vehicule
                        ADD CONSTRAINT vehicule_fk1 FOREIGN KEY (modele_id) REFERENCES modele (id);`
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

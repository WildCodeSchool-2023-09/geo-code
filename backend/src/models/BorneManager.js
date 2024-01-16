const fs = require("fs");
const csv = require("csv-parser");
const AbstractManager = require("./AbstractManager");

class BorneManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "borne" });
  }

  // The C of CRUD - Create operation

  async create(fileCSV) {
    const compare = [];
    const [bornesExist] = await this.database.query(
      `select id from ${this.table}`
    );
    // rempli un tableau avec les id de la db
    const noRepeat = [];
    for (let i = 0; i < bornesExist.length; i += 1) {
      noRepeat.push(bornesExist[i].id);
    }

    fs.createReadStream(fileCSV)
      .pipe(csv({ separator: ";" }))
      .on("data", async (data) => {
        const line = data;

        if (data.id_pdc === "") {
          line.id_pdc = "non renseigné";
        }

        if (data.n_enseigne === "") {
          line.n_enseigne = "non renseigné";
        }

        if (data.n_station === "") line.n_station = "non renseigné";

        if (data.ad_station === "") line.ad_station = "non renseigné";

        if (data.code_insee === "") line.code_insee = "non renseigné";

        if (data.xlongitude === "") line.xlongitude = 0.1;

        if (data.ylatitude === "") line.ylatitude = 0.1;

        if (data.puiss_max === "") line.puiss_max = "non renseigné";

        if (data.type_prise === "") line.type_prise = "non renseigné";

        if (data.accessibilite === "") line.accessibilite = "non renseigné";

        // s'il n'y a pas de borne dans la db

        if (bornesExist.length === 0) {
          if (compare.includes(line.id_pdc) !== true) {
            this.database.query(
              `INSERT INTO ${this.table} ( id, n_station, ad_station, code_postal, lng, lat, puiss_max, accessibilite, type_prise, date_maj, n_enseigne) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                line.id_pdc,
                line.n_station,
                line.ad_station,
                line.code_insee,
                line.xlongitude,
                line.ylatitude,
                line.puiss_max,
                line.accessibilite,
                line.type_prise,
                line.date_maj,
                line.n_enseigne,
              ]
            );
            compare.push(line.id_pdc);
          }
        }
        // si l'id de la borne n'est pas connu

        if (noRepeat.includes(line.id_pdc) !== true) {
          this.database.query(
            `INSERT INTO ${this.table} ( id, n_station, ad_station, code_postal, lng, lat, puiss_max, accessibilite, type_prise, date_maj, n_enseigne) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              line.id_pdc,
              line.n_station,
              line.ad_station,
              line.code_insee,
              line.xlongitude,
              line.ylatitude,
              line.puiss_max,
              line.accessibilite,
              line.type_prise,
              line.date_maj,
              line.n_enseigne,
            ]
          );
        }

        // si la db est vide
      })
      .on("end", () => {
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

module.exports = BorneManager;

const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (nom, prenom, code_postal, ville, rue, email, password, connection,
                                        nb_vehicule, admin, anniversaire, inscription, derniere_maj)
             values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.nom,
        user.prenom,
        user.code_postal,
        user.ville,
        user.rue,
        user.email,
        user.hashedPassword,
        user.connexion,
        user.nb_vehicule,
        false,
        user.anniversaire,
        user.inscription,
        user.derniere_maj,
      ]
    );

    return result.insertId;
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

  async update(
    token,
    prenom,
    nom,
    anniversaire,
    rue,
    codePostal,
    ville,
    derniereMaj
  ) {
    const [result] = await this.database.query(
      `UPDATE user
             SET nom=?, prenom=?, anniversaire=?, rue=?, code_postal=?, ville=?, derniere_maj=?
                 WHERE token = ?`,
      [nom, prenom, anniversaire, rue, codePostal, ville, derniereMaj, token]
    );

    return result;
  }

  async signIn(email) {
    const [user] = await this.database.query(
      `SELECT *
             FROM user
             WHERE email = ?`,
      [email]
    );
    return user;
  }

  async saveToken(token, email) {
    const [result] = await this.database.query(
      `UPDATE user
             SET token=?
             WHERE email = ?`,
      [token, email]
    );
    return result;
  }

  async setLastConnexion(date, email) {
    const [result] = await this.database.query(
      `UPDATE user
             SET connection=?
             WHERE email = ?`,
      [date, email]
    );
    return result;
  }

  async checkToken(token) {
    const [user] = await this.database.query(
      `SELECT *
             FROM user
             WHERE token = ?`,
      [token]
    );
    return user;
  }

  async takeData(token) {
    const [user] = await this.database.query(
      `SELECT nom, prenom, rue, code_postal, ville, email, DATE_FORMAT(anniversaire, "%Y-%m-%d") as anniversaire
             FROM user
             WHERE token = ?`,
      [token]
    );
    return user;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async userDelete(id) {
    const [result] = await this.database.query(
      `DELETE
             FROM user
             WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = UserManager;

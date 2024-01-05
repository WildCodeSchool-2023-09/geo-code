const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (prenom, nom, code_postal, ville, email, password, connection,
                                        nb_vehicule, admin, anniversaire, inscription, derniere_maj)
             values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.prenom,
        user.nom,
        user.code_postal,
        user.ville,
        user.email,
        user.password,
        user.connection,
        user.nb_vehicule,
        user.admin,
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

  async update(id, updatedUser) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET nom=?,
    prenom=?,
    code_postal=?,
    ville=?,
    email=?,
    password=?,
    connection=?,
    nb_vehicule=?,
    admin=?,
    anniversaire=?,
    inscription=?,
    derniere_maj=? WHERE id=? `,
      [
        updatedUser.nom,
        updatedUser.prenom,
        updatedUser.code_postal,
        updatedUser.ville,
        updatedUser.email,
        updatedUser.password,
        updatedUser.connection,
        updatedUser.nb_vehicule,
        updatedUser.admin,
        updatedUser.anniversaire,
        updatedUser.inscription,
        updatedUser.derniere_maj,
        id,
      ]
    );
    console.info(result);
    return result;
  }

  async signIn(email) {
    const [user] = await this.database.query(
      `SELECT * FROM user WHERE email = ?`,
      [email]
    );
    return user;
  }

  async saveToken(token, email) {
    const [result] = await this.database.query(
      `UPDATE user SET token=? WHERE email=?`,
      [token, email]
    );
    return result;
  }

  async checkToken(token) {
    const [user] = await this.database.query(
      `SELECT * FROM user WHERE token = ?`,
      [token]
    );
    return user;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = UserManager;

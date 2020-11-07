const bcrypt = require("bcrypt");
const { connection } = require("../database");
const { sql } = require("../database");
const findOne = async function (Email) {
  let query = `select * from Clients where Email="${Email}";`;
  try {
    let users = await sql(query);
    if(users.length>0){
      return users[0]
    }else{
      return null
    }
  } catch (err) {
    console.log({ err });
  }
};

const findById = async function (id) {
  let query = `select * from Clients where id="${id}";`;
  try {
    let users = await sql(query);
    if(users.length>0){
      return users[0]
    }else{
      return null
    }
  } catch (err) {
    console.log({ err });
  }
};
const validPassword = async function (password) {
  try {
    if (await bcrypt.compare(password)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

const save = async (data) => {
  try {
    let existUsername = await findOne(data.Username);
    let existEmail = await findOne(data.Email);
    if (!!existUsername) {
      return { err: "User with this username already exist" };
    }
    if (!!existEmail) {
      return { err: "User with this Email already exist" };
    } else {
      console.log("DB user data=>", data);
      const hashedPassword = await bcrypt.hash(data.password, 10);
      let user = `INSERT INTO Clients (Username,Email,password,Gender,Age,City,Adresse,imgsrc,provider,providerId) VALUES ('${data.Username}','${data.Email}','${hashedPassword}','${data.Gender}','${data.Age}','${data.City}','${data.Adresse}','${data.imgsrc}','${data.provider}','${data.providerId}');`;
      const newUser = await sql(user);
      delete newUser.password;
      return newUser;
    }
  } catch (err) {
    return { errNew: err };
  }
};

const login = async ({ email, password }) => {
  try {
   let user = await findOne(email);
    if (!user) {
      return { err: "Username or Email not exist." };
    } else {
      let validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return { err: "Incorrect password." };
      }
      console.log("login user =>", user);

      return { id: user.id, email: user.email };
    }
  } catch (err) {
    return { errNew: err };
  }
};

const getUserById = async (id) => findById(id);

const getUserByEmail = async (email) => findOne(email);

const findOrCreate = async ({ provider, providerId, username }) => {
  try {
    let user = await findOne({ provider, providerId });
    if (!user) {
      let create = `INSERT INTO Clients (provider, providerId, userName) VALUES('${provider}','${providerId}','${username}')`;
      user = await sql(create);
    }
    return user;
  } catch (err) {
    return false;
  }
};
module.exports = {
  save,
  login,
  getUserById,
  getUserByEmail,
  findOrCreate,
  findOne,
  validPassword,
};

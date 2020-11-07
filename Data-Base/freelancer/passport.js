const bcrypt = require("bcrypt");
const { connection } = require("../database");
const { sql } = require("../database");
const findFreelancer = async function (Email) {
  let query = `select * from Freelancers where Email="${Email}";`;
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

const findFreelancerById = async function (id) {
  let query = `select * from Freelancers where id="${id}";`;
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

const saveFreelancer = async (data) => {
  try {
    let existUsername = await findFreelancer(data.Username);
    let existEmail = await findFreelancer(data.Email);
    if (!!existUsername) {
      return { err: "User with this username already exist" };
    }
    if (!!existEmail) {
      return { err: "User with this Email already exist" };
    } else {
      console.log("DB user data=>", data);
      const hashedPassword = await bcrypt.hash(data.password, 10);
      let user = `INSERT INTO Freelancers (Username,Email,password,Gender,Age,City,Adresse,Field,imgsrc,provider,providerId) VALUES ('${data.Username}','${data.Email}','${hashedPassword}','${data.Gender}','${data.Age}','${data.City}','${data.Adresse}','${data.Field}','${data.imgsrc}','${data.provider}','${data.providerId}');`;
      const newUser = await sql(user);
      console.log(newUser);
      delete newUser.password;
      return newUser;
    }
  } catch (err) {
    return { errNew: err };
  }
};

const login = async ({ email, password }) => {
  try {
   let user = await findFreelancer(email);
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

const getFreelancerById = async (id) => findFreelancerById(id);

const getFreelancerByEmail = async (email) => findFreelancer(email);

const findOrCreate = async ({ provider, providerId, username }) => {
  try {
    let user = await findFreelancer({ provider, providerId });
    if (!user) {
      let create = `INSERT INTO Freelancers (provider, providerId, userName) VALUES('${provider}','${providerId}','${username}');`;
      user = await sql(create);
    }
    return user;
  } catch (err) {
    return false;
  }
};
module.exports = {
  saveFreelancer,
  login,
  getFreelancerById,
  getFreelancerByEmail,
  findOrCreate,
  findFreelancer,
  validPassword,
};

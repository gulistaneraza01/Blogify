import bcrypt from "bcrypt";

const saltRound = 10;

async function encPassword(password) {
  try {
    const hashPassword = await bcrypt.hash(password, saltRound);
    return hashPassword;
  } catch (error) {
    throw new Error(error);
  }
}

async function comparePassword(password, hashPassword) {
  try {
    const result = await bcrypt.compare(password, hashPassword);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export { encPassword, comparePassword };

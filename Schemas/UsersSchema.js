const signupSchema = {
  type: "object",
  properties: {
    userName: { type: "string" },
    userSurname: { type: "string" },
    userPhone: { type: "string" },
    userEmail: { type: "string" },
    userPassword: { type: "string", minLength: 2 },
    userRepassword: { type: "string", minLength: 2 },
    userBio: { type: "string" }
  },
  required: ["userName", "userSurname", "userPhone", "userEmail", "userPassword", "userRepassword"],
  additionalProperties: false
}

const loginSchema = {
  type: "object",
  properties: {
    userEmail: { type: "string" },
    userPassword: { type: "string", minLength: 2 },
  },
  required: ["userEmail", "userPassword"],
  additionalProperties: false
}

module.exports = { signupSchema, loginSchema }
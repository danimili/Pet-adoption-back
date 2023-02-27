const petSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    name: { type: "string" },
    adoptionStatus: { type: "string" },
    picture: { type: "string" },
    height: { type: "number" },
    weight: { type: "number" },
    color: { type: "string" },
    bio: { type: "string" },
    dietery: { type: "string" },
    breed: { type: "string" },
  },
  required: [
    "type",
    "name",
    "adoptionStatus",
    "height",
    "weight",
    "color",
    "breed",
  ],
};

module.exports = petSchema;
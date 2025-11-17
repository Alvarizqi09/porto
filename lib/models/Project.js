export const ProjectSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "title",
        "image",
        "tag",
        "desc",
        "demo",
        "preview",
        "tech_stack",
      ],
      properties: {
        title: {
          bsonType: "string",
          maxLength: 100,
          description: "Project title is required and must be a string",
        },
        image: {
          bsonType: "string",
          description: "Image URL is required",
        },
        tag: {
          bsonType: "array",
          items: {
            bsonType: "string",
          },
          description: "Tags must be an array of strings",
        },
        desc: {
          bsonType: "string",
          maxLength: 500,
          description: "Description is required",
        },
        demo: {
          bsonType: "string",
          description: "Demo URL is required",
        },
        preview: {
          bsonType: "string",
          description: "Preview URL is required",
        },
        tech_stack: {
          bsonType: "array",
          items: {
            bsonType: "string",
          },
          description: "Tech stack must be an array of strings",
        },
        featured: {
          bsonType: "bool",
          description: "Featured flag must be a boolean",
        },
        order: {
          bsonType: "int",
          description: "Order must be an integer",
        },
        createdAt: {
          bsonType: "date",
        },
        updatedAt: {
          bsonType: "date",
        },
      },
    },
  },
};

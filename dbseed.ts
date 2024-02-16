const admin = require("firebase-admin");
const { faker } = require("@faker-js/faker");

// initialization
const projectId = "solifood"; // replace with your own project id
process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";

admin.initializeApp({
  projectId,
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();
const auth = admin.auth();

const users: any = [];

async function seedUsers(count: number) {
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const user = {
      id: faker.string.alphanumeric({ length: 28 }),
      firstName: firstName,
      lastName: lastName,
      picture: "/assets/user.svg",
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
      location: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
      ratings: [],
      blocked: false,
      lastLogin: admin.firestore.Timestamp.now(),
      joinedAt: admin.firestore.Timestamp.now(),
    };

    // Authenticate user
    await auth.createUser({
      uid: user.id,
      displayName: user.firstName + " " + user.lastName,
      email: user.email,
      emailVerified: true,
      password: "password",
    });

    // Create user
    await db.collection("users").doc(user.id).set(user, { merge: true });
    users.push(user);
  }
}

async function seedBaskets(count: number) {
  for (let i = 0; i < count; i++) {
    // Generate images
    const imagesCount = faker.number.int({ min: 1, max: 5 });
    const images = [];
    for (let i = 0; i < imagesCount; i++) {
      images.push(faker.image.url());
    }

    // Generate tags
    const tagsCount = faker.number.int({ min: 1, max: 5 });
    const tags = [];
    for (let i = 0; i < tagsCount; i++) {
      tags.push(faker.lorem.word());
    }

    // Generate ingredients
    const ingredientsCount = faker.number.int({ min: 1, max: 5 });
    const ingredients = [];
    for (let i = 0; i < ingredientsCount; i++) {
      ingredients.push(faker.lorem.word());
    }

    const basket = {
      id: faker.string.alphanumeric({ length: 28 }),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      images,
      realPrice: faker.number.int({ min: 1, max: 100 }),
      price: faker.number.int({ min: 1, max: 100 }),
      location: {
        lat: faker.location.latitude(),
        lon: faker.location.longitude(),
      },
      available: true,
      blocked: false,
      tags,
      ingredients,
      createdBy: faker.helpers.arrayElement(users),
      claimedBy: null,
      expiredAt: admin.firestore.Timestamp.fromDate(faker.date.future()),
      soldAt: null,
      createdAt: admin.firestore.Timestamp.now(),
    };

    // Create basket
    await db.collection("baskets").doc(basket.id).set(basket, { merge: true });
  }
}

async function main() {
  // Seed users
  console.log("🌱 Seeding users ...");
  await seedUsers(10);

  // Seed baskets
  console.log("🌱 Seeding baskets ...");
  await seedBaskets(50);
}

main();

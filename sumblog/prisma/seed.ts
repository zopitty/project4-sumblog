import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();
async function main() {
  const password = await hash("test", 12);

  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      name: "test user",
      password,
      age: 25,
      bio: "I'm a test user. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan risus ut nunc pulvinar, at ultrices tellus dapibus. Fusce cursus semper rutrum. Quisque auctor, magna in ullamcorper pretium, est massa consectetur nisl, vitae fringilla felis tortor a dui. Phasellus commodo fermentum arcu in ullamcorper. In ac purus lacus. Etiam at justo magna. Praesent tincidunt velit ut turpis maximus, eget mattis orci aliquam. Donec commodo arcu sit amet ante ultrices tincidunt. Vivamus vehicula nunc eget orci bibendum, eget eleifend est semper. Duis ac elit sit amet orci tempus ullamcorper. Aliquam pellentesque bibendum leo, id euismod nibh. Sed ullamcorper sapien vitae pharetra pellentesque. Nullam faucibus dui dolor, sed condimentum tortor vestibulum vel.",
    },
  });
  console.log({ user });
  const catPassword = await hash("cat", 12);
  await prisma.user.upsert({
    where: { email: "cat@cat.com" },
    update: {},
    create: {
      email: "cat@cat.com",
      name: "cat",
      password: catPassword,
      age: 8,
      bio: "Meow! My name is Whiskers, and I'm a mischievous and curious cat. I love exploring every nook and cranny of my surroundings. Whether it's chasing after toy mice or basking in the sunbeam, I find joy in the simple pleasures of life. My purrs and gentle head nudges are my way of showing affection. I bring a touch of elegance and mystery to the world, as I gracefully navigate my way through each day.",
    },
  });
  const dogPassword = await hash("dog", 12);
  await prisma.user.upsert({
    where: { email: "dog@dog.com" },
    update: {},
    create: {
      email: "dog@dog.com",
      name: "dog",
      password: dogPassword,
      age: 12,
      bio: "Woof woof! My name is Buddy, and I'm a loyal and energetic dog. I'm always ready for an adventure, whether it's a long walk in the park or a game of fetch. I have an infectious enthusiasm and a wagging tail that never stops. I'm fiercely protective of my loved ones and can sense their emotions. I bring joy and laughter wherever I go, and my unconditional love knows no bounds.",
    },
  });
  const hoomanPassword = await hash("hooman", 12);
  await prisma.user.upsert({
    where: { email: "hooman@hooman.com" },
    update: {},
    create: {
      email: "hooman@hooman.com",
      name: "hooman",
      password: hoomanPassword,
      age: 40,
      bio: "Hello, fellow earthlings! My name is Sarah, and I'm a passionate and curious human being. I find inspiration in the beauty",
    },
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

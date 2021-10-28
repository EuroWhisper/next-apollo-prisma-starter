import { PrismaClient } from '@prisma/client';
import { title } from 'process';

const prisma = new PrismaClient();

async function main() {
  const books = await prisma.book.createMany({
    data: [
      { title: 'Harry Potter', author: 'Rowling' },
      { title: 'Lord of the rings', author: 'Tolkein' },
      { title: 'Cabal', author: 'Clive Barker' },
      { title: 'Nightbreed', author: 'Clive Barker' },
    ],
  });
  const movies = await prisma.movie.createMany({
    data: [{ title: 'Silent Hill', director: 'unknown director' }],
  });

  console.log(books);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

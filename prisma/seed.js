const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deleteEvery() {
  await prisma.postTag.deleteMany();
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.tag.deleteMany();
}

async function createUserAdmin() {
  await prisma.user.create({
    data: {
      login: 'AGPR5',
      name: 'Admin AGPR5',
      password: '$2b$10$.VOBWY4q8mLT.amOoVx2BuHaksqcw3NZpA6B16z4//IT/dY6BAM0O',
    },
  });
}

async function createTags() {
  const tags = [
    { name: 'javascript' },
    { name: 'typescript' },
    { name: 'nodejs' },
    { name: 'expressjs' },
    { name: 'react' },
    { name: 'frontend' },
    { name: 'backend' },
    { name: 'css' },
    { name: 'html' },
    { name: 'npm' },
    { name: 'microsserviço' },
    { name: 'estilização-de-código' },
    { name: 'testes' },
    { name: 'segurança' },
    { name: 'arquitetura-de-software' },
    { name: 'git' },
    { name: 'nextjs' },
    { name: 'nestjs' },
    { name: 'prisma-orm' },
  ];

  await prisma.tag.createMany({
    data: tags.map((tag) => ({ name: tag.name })),
  });
}

async function main() {
  await deleteEvery();
  await createUserAdmin();
  await createTags();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

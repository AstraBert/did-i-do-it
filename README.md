# did-i-do-it

DIDI (short for Did-I-Do-It?) is an app for people who forget, in their day-to-day life, which tasks they completed and which ones not. The idea is simple: you create tasks and, once you completed them, you do not only have the reward of feeling productive, but also a physical proof that yes, you did it - an email.

🔗 **[Try It Now](https://dididoit.clelia.dev)**

## 📌 Features

- ✅ **Next.js 15** with App Router
- ✅ **Better Auth** for authentication
- ✅ **Prisma** for database management
- ✅ **shadcn/ui** for UI components
- ✅ **Personal Space** for task management once you are authenticated
- ✅ TypeScript support

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/AstraBert/did-i-do-it
   cd did-i-do-it
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:

   ```sh
   cp .env.example .env
   ```

   Fill in the necessary values in the `.env` file.

4. Set up the database:

   ```sh
   npx prisma migrate dev
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

## 🚀 Usage

- Run `npm run dev` to start the development server.
- Use `npx prisma studio` to manage your database visually.
- Customize authentication using Better Auth settings.

--- 

Shout out to [Achour Meguenni](https://github.com/Achour) for making the starter project on which this app is built!

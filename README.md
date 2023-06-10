# sumblog

A platform design to foster connections among people. With the app, users can effortlessly share their daily experiences, follow other users, leave comments on posts, and show appreciation by liking content. This app started as a project to

explore new technologies such as Next.js 13, Prisma and Typescript. I'm excited to provide people with a seamles and engaging social experience that keeps everyone connected.

# Technologies used

## Typescript

This app was built with Typescript, utilizing the Next.js's new app router to link the backend with the frontend with React server componenets.

## Front-end

### <a href="https://nextjs.org/" target="_blank" >Next.js</a>

This app was built with the new Next.js 13 app router. A framework built on top of React for building web applications. It offers features like server-side rendering (SSR), static-site generation (SSG), intecremental static regeneration (ISR)

built-in routing, API routers, and TypeScript integration. Combined, they provide a develope with tools to create a highly performant application.

### <a href="https://tailwindcss.com/" target="_blank" >Tailwind CSS</a>

A highly customizable CSS framwrok that steamlines web development by providing a comprehensive set of pre-built CSS classes. With Tailwind CSS, you can rapidly build modern and responsive user interfaces by composing classes directly in the

HTML markup. It is fast and highly flexbile with the present values allowing for a consistent responsive design throughout the app.

## Back-end

### <a href="https://www.prisma.io/" target="_blank" >Prisma</a>

Prisma is an ORM with consists of an auto-generated type-safe query builder for Node.js & Typescript (Prisma Client), a migration system (Prisma Migrate) and a GUI to view and edit data in the database (Prisma Studio).

### <a href="https://next-auth.js.org/" target="_blank" >NextAuth.js</a>

An open source community project to help with authentication. It consists of built-in support for OAuth, email/passwordless/magic links and any user/password store.

### <a href="https://github.com/kelektiv/node.bcrypt.js" target="_blank" >bcrypt</a>

This package was used to hash passwords, securing them in our database whilst preserving user’s privacy even from database administrators. As such, our server was reliant on bcrypt to compare passwords entered in with stored hashes.

## Database

### <a href="https://vercel.com/storage/postgres" target="_blank" >Vercel Postgres</a>

Vercel Postgres was utilized in this project as a serverless postgresSQL database.

# General Approach

The initial design of the app was based off the idea of allowing users to post their daily experiences then slowly built-on to allow more features for connection such as following/followers, comments and likes.

<br/>

## Front-end

### Login page

With the help of NextAuth, a signin page is displayed to the user to allow them to start posting content and also look at other user to follow or unfollow if they enjoy their content.

### Your Feed page

Only shows the posts of users that you follow.

### Home page

The home page provides a feed for users to look at every uesr's posted content. They are also prompted to log in if they have not to enable to start posting content on the site.

### Individual Post page

Users can go into individual posts to read more about a post that caught their attention in the home feed and likewise, they can only give comments/likes if they are logged in. Once logged in, users can start liking and commenting on the post. The comments are nested if replied to and can be deleted if the user that commented wishes to do so. Deleting a comment will cause all child comments to be deleted as well.

### Profile page

The profile page allows users to look at their own following/follwers by clicking following/followers and at the same time they can edit their profile if they wish to do so.

### Users page

The users pages consist of all the users in the application. It also allows for a logged in user to follow anyone in the page or view their individual profiles

#### Individual profile pages

Contains a short biography of the user and their details.

<br/>

## Back-end

### Models

#### Users Model

Contains all the required information for authentication purposes like email and password. Also contains the related relations that are linked to the user like Posts, Comments, Follows and Likes.

#### Post Model

Contains all the posts that are made by the user. Linked to the user via foreign key of the user id.

#### Likes & Follows Model

Both are used to create a relation between the targeted user (follow) or post (likes). A unique Id will be formed which is made up of the 2 entities. For examples, liking a post, the post and the user will form a unique id and likewise for follows, the follower and following will form a unique if in their relation.

#### Comments model

The comments model contains a parent and child relation which relates back to itself. This is to facilitate the use of the nested comments feature to show which comment belong to which parent comment.

#### API Routes

API routes are created where server actions are not possible in the arrangement of components and a client componenet needs to be used. Most of the API routes are create to delete, update and create. Reading is mostly done on the server components via server actions.

# Created by

- Tan Bing Hong

# Tech-Blog
A CMS-style blog site similar to a Wordpress site, where its posible to publish blog posts and comment on other person posts as well.

## Installation 
* Fork this repository on GitHub to create your own copy. 
* Clone the project to your local machine using the "git clone + URL" command. 
* Open the project in your preferred text editor, such as VS Code. To do this from the terminal, navigate to the project folder using "cd foldername" and then launch your text editor with "code .". 
* If you haven't already, install Node.js by downloading it from their official website.
* If you haven't already, install MySQL from the official MySQL website. Below are some additional steps.
* This project includes a "package.json" file that lists project dependencies. To install these dependencies, run "npm install" in your terminal.

## Use 
* Open your terminal and access the database file.
* Execute the following command: "mysql -uroot -p" and provide your password (Note: Your keystrokes won't be visible).
* Run "SOURCE schema.sql" to initialize the database and create tables.
* For a quicker setup, you can use "npm run resetdb" (password required when prompted) to combine steps 2 and 3.
* To exit MySQL, simply type 'quit' and press Enter.
* In your integrated terminal, open the "server.js" file.
* If you want to populate the database with initial data, use "npm run seed" (or "node seeds/index.js").
* Start the server by running "npm run start" (or "node server.js"). If you have Nodemon installed, consider using "npm run watch" (or "nodemon server.js") for automatic reloading.
* Access 'localhost:3001' in your web browser to view the website.
* Feel free to perform login, logout, and signup actions as needed. Create new blog posts, update or delete existing ones, and add comments to posts.
* When you're done, stop Nodemon by pressing CONTROL-C in the terminal and end the session.

## Screenshots

![image1](./images/image1.gif)
<br>

![Video Here](https://drive.google.com/file/d/1V60HhjbbtV-m8Kgqb4tXYd_UvTJACnWM/view)
<br>




# **Introduction**

We will implement a simple front-end app that shows user posts. The app uses a JSON server, which uses a JSON file as a post database and displays the posts to the user, split into pages.

- A JSON server is initialized using a JSON file to hold the posts. The JSON file is initially small, but you will replace it with your own, much larger, JSON file.
- The client sees the posts split into pages: 10 posts at a page. Initially, only the first page is shown to the user.
- The UI component used is called pagination.
- When a specific page loads, only the messages of that page will be sent from the server for obvious efficiency reasons.



## **JSON Server - Example Code**

In the following, `active_page` is the currently displayed page, and `POSTS_PER_PAGE` is 10, `NOTES_URL` is `http://localhost:3001/notes`.

```javascript
useEffect(() => {
const promise = axios.get(NOTES_URL, {
  params: {
    _page: activePage,
    _limit: POSTS_PER_PAGE
  }
});
promise.then(response => {
  // fill
}).catch(error => {
  console.log("Encountered an error:" + error);
});
});

See: JSON Server

```
# GitHub

HW1 will be submitted via GitHub. If you don't have a user, please create one with your BGU email address.
Starting a New Project

    Initiate a new repository or clone this one.

    Start a new react project using create-next-app and use the default settings. See here.

    Install json-server locally

    css

`npm install json-server@0.17.4`


Create and seed the database. Recommendation: Create a script that creates a JSON file with the number of posts given by an input N in the same format as notes.json. Use it to initialize a JSON file in, e.g., ./data/notes.json.

Run the server with an input JSON file:


`npx json-server --port 3001 --watch ./data/notes.json`

``
Run your code:
    npm run dev
``

# **Frontend Description**

1.   The front-end should connect to the server, and get posts (just) for the current page.
    Each page has 10 posts.
    Add pagination UI element to the website.

## **Suggested Implementation Steps**

1.    Show a list of posts (tip: start from a local variable holding the post list).
    Connect to the server: (tip: start by getting all posts).
    Add pagination in the UI (tip: plan the component tree).
    Optimize: when rendering a page, send only the data needed now instead of the entire database.

2. Pagination

    2.1. The minimum number of page buttons is 1.
    
    2.2. The maximum number of page buttons is 5.
    
    2.3. The first page is 1.
    
    2.4. The Active page button is shown in bold.
    
    2.5. The 4 buttons with "First, Prev, Next, Last" text on them always appear.
    Which page numbers should be shown on the buttons? Let a be the current page.
        
        If there are <=5 total pages, show buttons [1, ..., , #Num_pages].
    
        If there are >=6 total pages, assume there are 10 ( but implement 
        for any number of pages):
            if a <3 : show buttons [1,2,3,4,5]
            
            if 3 <= a <= 8 : show buttons [a-2,a-1,a,a+1,a+2]
            
            if a > 8: show buttons [6,7,8,9,10]

## **Checking the Coding Task**
Test Requirements

    Each post should be of class name "post".
    A post must get the unique ID from the database and use it as the html id attribute.
    Pagination buttons:
        Navigation buttons should be with html name attribute "first", "previous", "next", "last".
        Page buttons should be with the html name attribute "page-<target_page_number>"

# **The Tester Will:**

1. Clone and install your submitted GitHub repository.

    java

2. git clone <your_submitted_github_repo>
cd <cloned dir>
3. npm install (package.json should exist)
4. npm run dev (configured to default port 3000)

5. Start the server with a JSON file. It will always contain at least one post.

6. npx json-server --port 3001 ./data/notes.json

## **Run tests.**

```
<div class="post" id="1">
  <h2>Note 1</h2>
  <small>By Author 1</small>
  <br />
  Content for note 1
</div>
```

### The pagination will look like this :
<div>
  <button name="first">First</button>
  <button name="previous">Previous</button>
  <button name="page-1">1</button>
  <button name="page-2">2</button>
  <button name="page-3">3</button>
  <button name="page-4">4</button>
  <button name="page-5">5</button>
  <button name="next">Next</button>
  <button name="last">Last</button>
</div>

### The code :
```
<div>
  <button name="first">First</button>
  <button name="previous">Previous</button>
  <button name="page-1">1</button>
  <button name="page-2">2</button>
  <button name="page-3">3</button>
  <button name="page-4">4</button>
  <button name="page-5">5</button>
  <button name="next">Next</button>
  <button name="last">Last</button>
</div>
```


## Using GitHub Basic Git Commands

To perform common tasks using Git, you can use the following commands:

1. Cloning the Repository: To clone the repository to your local machine: 
    ``` git clone <your_repository_url> ```

2. Creating a New Branch: To create and switch to a new branch: ```git checkout -b <new_branch_name>```

3. Committing Changes: After making changes, you can stage and commit them:
``git add .``
``git commit -m "Describe your changes"``
4. Pushing Changes: To push your changes to the remote repository: ``git push origin <branch_name>``

5. Creating and Pushing Tags: To create a new tag and push it to the remote repository: `git tag -a <tag_name> -m "Tag message"`
    `git push origin <tag_name>`



## Author
Fawzi Abu Hussin

[LinkedIn Profile](https://www.linkedin.com/in/fawzi-abu-hussin-7874a3233/)


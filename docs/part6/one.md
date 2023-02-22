## Front-end Developer Interview Questions

### Explain what the "box model" CSS is and the layout components that make it up?

```css
The CSS box model is a rectangular layout paradigm for HTML elements. It consists of the following elements:

Content - The content of the field, which reflects all images and text

Padding - the transparent area that surrounds the content (the amount of space between the border and the content)

Border - border surrounding the padding (if any) and content

Margin - is the transparent area around the border (the amount of space between the border and any neighboring elements)
```

### What are some of the main benefits of REST web services?

```css
Here are some of the main benefits of REST web services:

The learning curve is very simple because it works based on HTTP protocols
Supports several data transfer technologies such as ext, XML, JSON, image, etc.
Has no predefined contract between server and client, so loosely coupled implementation
REST is a very lightweight protocol
REST methods can be easily tested in the browser
```

### What is Cross-Site Scripting (XSS)?

```css
Cross-Site Scripting (XSS) is an attack that occurs when an attacker uses a web application to send malicious code to a different end-user. This code is usually in the form of a browser-side script.

The page provided by the server when someone requests it is unaltered. The XSS attack exploits weaknesses in the page that include a variable submitted in a request to show up in the raw form in the response. The page will only display what was sent along with this request.
```

### What is "strict mode"?

```css
Strict Mode is a new ECMAScript 5 feature that allows you to specify a program or function in n a "strict" operating context. This strict context prevents some actions and also throws more exceptions.

Here's an example of such a strict mode:

// Non-strict code ...

(Function () {

  "Use strict";

  // Define your library strictly ...

}) ();

// Non-strict code ...
```

### What is a CSS rule?

```css
Web browsers often apply the CSS rule to documents to influence their content. This CSS rule is formed from several things:

1. A selector that selects from a list of elements to which you want to apply updated property values.
2. A set of properties, which have values set to update how the HTML content is displayed
It is also worth adding that the set of CSS rules contained in the stylesheet determines how the web page should look.
```

### What is meant by the KISS principle?

```css
KISS, a backronym for "keep it simple, stupid" is a design principle that was invented by the U.S. Navy in 1960. The KISS principle states that almost all systems work best when they remain simple rather than made complicated. That is why design should always be kept simple and avoid unnecessary complexity.
```

### What is the difference between span and div?

```css
1.Div is a block element
2.Span is an inline element
Placing a block element inside an inline element is illegal. Although a div can have a p tag, and a p tag can have a span, a span can't have a div or p tag inside.
```

### When would you use ReactJS?

```css
This open-source front-end JavaScript library is primarily used for the front-end development of one-page applications as well as for managing the view layer for mobile and web apps.
```

### What is polymorphism?

```css
In the object-oriented programming paradigm, Polymorphism is the ability of an action or method to perform different functions based on the object it’s acting upon. Some aspects of Polymorphism include overloading, overriding and dynamic method binding.
```

### When would you use jQuery?

```css
jQuery is a good option for simple tasks. It has several advantages over other frameworks.

1.easy to expand
2.Easy to use and learn
3.Easy to use for DOM manipulation and traversal.
4.Cross-browser support (IE 6.0+, FF 1.5+, Safari 2.0+, Opera 9.0+)
5.AJAX Capabilities
6.Ways to change and apply CSS, and create animations
7.Lots of plug-ins for all kinds of needs
```

## HTML Interview Questions 

### **What does semantic HTML mean?** 

```css
Semantic HTML means using the most appropriate tag for the task at hand. It means using meaningful elements such as `<form>`, `<article>`, and `<table>` instead of only using `<div>` and `<span>`.
```

### **What is Web Accessibility?** 

```css
Web Accessibility means making sure the web is usable by people with a wide range of disabilities. It includes making sure keyboard-only users can navigate your site while also making certain people who have difficulties hearing or seeing can use it as well.
```

### **What is the difference between a tag and an attribute?** 

```css
HTML tags are elements. Think `<a>`, `<button>`, and `<div>`. HTML attributes describe characteristics of elements. Think `src`, `class`, and `id`.
```

### **What is the difference between inline and block elements?** 

```css
Inline elements cannot have a height or width. Examples of inline elements include span, a, and img. Block elements get their own line and take up the full width available. Examples of block elements are div, p, and h1.
```

### **Display none vs. visibility hidden** 

```css
Both display none and visibility hidden will hide the element from the page. The difference is that with display none, no space will be allocated for the element, whereas with visibility hidden, a blank space will appear on the page.
```

## CSS Interview Questions 

### **What is the box model?** 

```css
The CSS box model refers to the way CSS handles layout. Each element is composed of its content, padding, border, and margin.
```

### **Know your CSS selectors!** 

```css
Many interview questions will require you to know class selectors like `.foo` and id selectors like `#bar`. It's also good to know that you can select siblings `div + p`, Descendents `div p`, and children `div > p`.
```

### **CSS specificity** 

```css
If your CSS has two conflicting selectors, who wins? For example, if you write
<!DOCTYPE html>
<html>
  <head>
    <style>
      .foo {
        color: blue;
      }
      #bar {
        color: red;
      }
    </style>
  </head>
  <body>
    <div class="foo" id="bar">Hello</div>
  </body>
</html>
```

Will the word "hello" be red or blue? To solve this, CSS has a priority order for which types of selectors win over other ones. `!important` tags are the strongest, and the universal `*` selector is the weakest. For a fun illustration to help you learn CSS specificity, check out [specifishity.com](https://specifishity.com/).

### **What are pseudo-elements?** 

```css
[Pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) are keywords that let you specify specific parts of an element instead of the entire thing. For example, you can select an element's `::first-line` or select `::before` an element.
```

### **What is Flexbox?** 

```css
Flexbox is a W3 specified layout system for CSS. It allows you to easily position elements inside a container even if the size of that container is dynamic. You should familiarize yourself with some basic Flexbox layouts. Some free resources include:

- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Zombies](https://flexboxzombies.com/p/flexbox-zombies)
```

### **What is CSS grid?** 

Grid is a W3 system for making entire page layouts. CSS Grid is great for literal grids and full pages, whereas Flexbox is great for groups of items on a page. Some free resources include:

- [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Grid Garden](https://cssgridgarden.com/)

## JavaScript Interview Questions 

### **What is the `this` keyword in JavaScript?** 

```javascript
`this` is a little tricky in JavaScript. Its value is determined by what the function you are inside of is called. In the global state, `this` is set to the window object. The value of `this` also depends on whether or not you are in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode). Inside a top-level function, a strict mode `this` will be undefined, whereas a non-strict mode `this` will be the window object. It's also worth knowing that the value of `this` can be overwritten with the [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) method.
```

### **What is the difference between let, const, and var?** 

```javascript
Originally, var was the only option JavaScript had for defining variables. In ES6, we got const and let as additional options. The important takeaways are:

1. Variables defined with const cannot be reassigned.
2. Const and let variables are block-scoped.
3. Var variables are function scoped.
4. Variables defined with var are [hoisted](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting).
```

### **What is the difference between == and ===?** 

```javascript
Doubles equals checks for value only. Before checking, it does any necessary type coercion. For example, the string "1" will be == to the integer 1, but it will not be ===. Many projects these days prefer to always use ===. Although, some folks advocate writing code that works well with the == type coercion.
```

### **How can you access HTML elements with JavaScript?** 

```javascript
Familiarize yourself with [getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById), [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector), and [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).
```

### **What options do we have to store data?** 

```javascript
You can store user data in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies), or [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
```

### **How can you traverse the DOM with JavaScript?** 

```javascript
You can grab a DOM node with either `getElementById` or `querySelector`. You can then get all of its children by calling `.childNodes` (note: childNodes returns a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList), not an Array). You can then traverse the DOM by iterating through the childNodes and calling `.childNodes` on each one of them. You can walk your way back up by checking any node's `parentNode`.
```

For more information, check out all of [the properties stored on DOM nodes](https://developer.mozilla.org/en-US/docs/Web/API/Node).

### **What is functional programming in JavaScript?** 

```javascript
Functional programming refers to using pure functions. In the context of JavaScript, this means familiarizing yourself with [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), and [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce). It's also worth understanding the concept of immutability.
```

## ReactJS Interview Questions

[React is a popular Frontend](https://www.simplilearn.com/tutorials/reactjs-tutorial/what-is-reactjs) JavaScript library. It is vital to have a good understanding of a JavaScript framework or library for app development. 

The following segment of Frontend Developer Interview Questions comprises React questions. 

### 1. What Is JSX?

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/React_JSX.PNG)

- JSX is a JavaScript syntactic extension. It's a term used in React to describe how the user interface should seem.
- You can write HTML structures in the same file as JavaScript code by utilizing JSX.
- Because it avoids the use of complicated JS DOM structures, JSX makes the code easier to comprehend and debug.

### 2. What is Virtual DOM?

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/React_DOM.PNG)

- The [Virtual DOM](https://www.simplilearn.com/tutorials/javascript-tutorial/javascript-dom) is the lightweight version of the Real DOM that React retains in memory.
- Because nothing is drawn on the screen when processing Real DOM, it is substantially slower than handling virtual DOM.
- When an object's state changes, Virtual DOM updates only that object in the real DOM rather than all of them.

### 3. What are React Extensions? Name a few of them.

- React is more than just a UI framework; it contains a slew of extensions that cover the entire application architecture.

- It has a server-side rendering feature.

- Supports the creation of mobile apps.

- Flux and Redux, among other things, have been added to the mix.

  ![](https://www.simplilearn.com/ice9/free_resources_article_thumb/React_Extensions.PNG)

- Flux is Facebook's application architecture for developing online applications.
- React Native allows you to create mobile apps entirely in JavaScript.

### 4. What is an Event in React? How do you create one?

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/React_Event.PNG)

An event is an action triggered by the user or any system event, like pressing a key, a mouse key, etc. 

### 5. What are Components in ReactJS?

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/React_Components.PNG)

Components are the building blocks of a React application that represent a part of the user interface.

- A component used in one area of the application can be reused in another area. This helps speed up the development process.
- A component can contain several other components.
- A component must define a render method that specifies how the component renders to the DOM in its minimal form.
- A component can also receive props. These are properties passed by its parent to specify values.

### 6. What is a State in React? How do you implement it?

A state is an object that stores the values of properties belonging to a component that could change over a period of time. 

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/React_State.PNG)

Here are a few features of a State - 

- You can change a state as a result of a user's action or changes in the network.
- React re-renders the component to the browser whenever the state of an object changes.
- You initialize the state object in the constructor.
- It can store multiple properties in the state object.
- this.setState() is used to alter the state object's value.
- The setState() function merges the new and old state and the previous state in a shallow merge.

### 7. What is a Higher Order and Pure Components in React?

#### Higher Order Components 

- A higher-order component is a function that takes a component and returns a new component.
- It facilitates reusing of component logic.

 const NewComponent = higherOrderComponent(originalComponent)

#### Pure Components 

- React.Component is the base class for React components. React.PureComponent is a variation of React.Component class and does a shallow comparison of props and state.
- A React component can be considered pure if it renders the same output for the same state and props.

### 8. How do you Implement React Routing?

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/React_Routing.PNG)

Considering that you have the App, About, and Contact components, routing can be implemented using the code shown above. 

## Git Interview Questions

### 1. What is ‘Version Control System’ ? 

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/Version_Control_Git.PNG)

A [version control system (VCS)](https://www.simplilearn.com/tutorials/devops-tutorial/version-control) is a program that records any changes to a file or set of data so that it is possible to restore it to a previous version if necessary. This guarantees that everyone on the team is working on the most up-to-date version of the file. 

### 2. Differentiate Between Centralized and Distributed Version Control System

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/VersionControlSystemTypes.PNG)

```javascript
In a Centralized Version Control System: 

- It stores all file versions on a central server.
- No developer has a complete copy of the local system's files.
- If the project's central server fails, you will lose all the project's data.

In a Distributed Version Control System:

- Every developer has a copy of all the code versions on their computer.
- Improves the ability to work offline and eliminates the need for a single backup location.
- Even if the server crashes, there is no danger.
```

### 3. Explain Git Push and Git Pull

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/Git_Push.PNG)

[Git push is a command](https://www.simplilearn.com/tutorials/git-tutorial/git-push-command) that pushes the contents of a local repository to a remote repository. It runs a push after it has changed a local repository to share the changes with remote team members.

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/Git_Pull.PNG)

[Git pull is a command](https://www.simplilearn.com/tutorials/git-tutorial/git-pull-request) that pulls changes from a remote repository and merges them into the local repository. It's made up of two commands: git fetch followed by git merge.

### 4. Name a few Git Commands and function

```javascript
1.Git Config - Configure the username and email address
2.Git init - Initialize a local Git repository
3.Git Add - Add one or more files to the staging area
4.Git Diff - View the changes made to the file
5.Git Commit - Commit changes to the head but not to the remote repository
6.Git reset - Undo local changes to the state of a Git repo
7.Git Status - Displays the state of the working directory and staging area
8.Git Merge - Merge a branch into an active branch
9.Git Push - Upload content from the local repository to a remote repository
10.Git Pull - Fetch and download content from a remote repository
```

### 5. Explain the Difference Between Git Pull and Git Fetch

```javascript
Git Fetch 
It downloads only new data from a remote repository using Git fetch
It does not include any of this new information in your working files
To update the remote-tracking branches, run Git fetch at any time
Command - git fetch origin
              git fetch –-all

Git Pull
Git pulls new data and integrates it with the current working files, updating the current HEAD branch with the latest modifications from the remote server
It attempts to combine remote modifications with those made locally
Command - git pull origin master
```

### 6. What is Git Stash?

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/GitStash.PNG)

### 7. Differentiate Between Git Merge and Git Rebase？

Assume you're working on a new feature in a dedicated branch, and another team member pushes new commits to the master branch. 

#### Merge

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/Git_Merge.PNG)

Merge is used to incorporate new commits into your feature branch. Every time you need to include modifications, this requires an extra merging commit. It taints the history of your feature branch.

#### Rebase 

![](https://www.simplilearn.com/ice9/free_resources_article_thumb/Git_Rebase.PNG)

You can rebase the feature branch into master instead of merging it. This incorporates all the new commits in the master branch. It also re-writes the project history by creating brand new commits for each commit in the original branch.

This brings us to the end of Git Questions. These are some of the most important Front End Interview Questions related to Version Control.
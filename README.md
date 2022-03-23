## Coding Challenge

> ### ⚠️ Read it first!
>
> The purpose of this challenge is to give us an idea about your coding skills. At New Work we value
> well structured and tested code. Semantic HTML, modern and responsive CSS, a consistent coding
> style and a structured code base are important to us. I know... you probably love to code (we also
> love it!). But please, read this file until the end and make sure you understand the requirements
> before you start coding! If you have any questions, just let us know!

### Challenge

Build a Javascript application that contains a list and a detail view of news articles. The
application should be built with two columns and behave like this:

- The left side with the list of news articles.
  - When you click on one of the articles in the list, the content is shown in the other section and
    that article is marked as read.
- The right side with a detailed view of the current active article, or an empty view if none is
  selected.

The final app should look somewhat similar to the mockup below, but as long as you meet the criteria
described above, you can build it in whichever way you find appropriate.

<p align="center">
  <img src="fe_hiring_challenge.png">
</p>

## Tech Requirements

- Use React to build this application.
  - If you think it makes it easier for you, start with
    create-react-app(https://github.com/facebook/create-react-app).
- Please do the layout and styling with your own CSS (pre-processors are allowed). Don't use any
  component libraries like bootstrap or material-ui.
- Please do **not** use Redux for app state management. We'd like to see simpler and more modern
  approaches like hooks and React Context for this.
- We value good code structure (naming of variables, files/folders, separation of concerns, etc.)
  and consistent coding style (hint: you may use a linter).
- Testing your code is important, we'd like to see some meaningful tests (full coverage not
  required).
- Use this README to document what you've built. Make sure that the person that reviews this code
  understands your choices and challenges:
  - Outline your reasoning behind technical choices (architecture, third party libs, etc.)
  - Explain technical trade-offs
  - Anything you skipped due to time constraint?
  - What would you add if you had additional time for this project?

## Basic Tooling & API

To get you started in the right direction, we give you a couple of yarn scripts. But feel free to
improve and extend it as you go through the assignment.

```sh
> cd api
> yarn install
> yarn api       # run API on 0.0.0.0:8000
```

The API serves the endpoint you'll need:

```sh
/v1/news?q=      # get the list of articles
```

Or if you want to use GraphQL

```sh
query GetNewsArticles($title: String){
  articles(title: $title) {
    author
    title
    description
    url
    urlToImage
    publishedAt
    content
  }
}
```

It is not mandatory to run with this server or to use this API, but we highly recommend it. If you
really want to use another API, please give a good reason in the
[Development Journal](#development-journal) section. If you feel the need to change the API or add
something, feel free to do so.

> The data was obtained through newsapi.org

### Not challenging enough?

- Add a search functionality for the list view so we can reach certain articles easier.
- We're showing too many articles on a single page. Implement pagination using client-side routing,
  so we only see 10 articles at a time.
- We like tidy code! Configure linting for your JavaScript and CSS files (you can use style guides
  like [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)).
- Let's say we need our application to support IE11. To a reasonable extent, ensure we can support
  modern Javascript in not-so-modern browsers.
- We all know designers love animations, so try adding some CSS animations.
- Anything else you'd like to show us? :)

### Notes

- The total working time should be around 6 hours. Focus on completing the
  [Tech Requirements](#tech-requirements) first and only then move to the
  [Not challenging enough?](#not-challenging-enough) section. This last section is not mandatory,
  but with that done we can get more information on your coding skills.
- We'd like to see how familiar you're with React and React features, but if you think you'll need
  another framework please explain shortly in the documentation section.
- In general, we'd rather see something simple you understand than something fancy you can't
  explain.
- Please don't use something you already developed.

Happy coding & good luck! 🚀

---

## Development Journal

### Architecture

I have decided to divide this page of articles into 4 different components. In the case of a more
complex project, we would probably reuse them.

- Article Header: Component that shows the title of the article, its description and whether the
  article is read or not.
- Article Content: Component that shows all the article details.
- Article Search: Component that adds the article search functionality
- Article Pagination: Component that adds the article pagination functionality.

Afterwards, I have joined them all on the Articles Page.

Regarding the folder structure, I’ve named the folders with the content of each folder itself. It is
to say:

- Components: reusable components
- Context
- Hooks: custom hooks
- Interfaces: TypeScript variable’s interfaces
- Pages: all the pages (that use reusable components)
- Styles: SCSS stylesheets
- Test
- Utils: shared functionalities

States related to articles (e.g. main article shown, page number, listed articles) are used across
all components. Therefore, I have decided to use **Context API** in order to store all that
information.

To create a responsive page that shows (1, 2, 3 or 5) article headers depending on screen width, I
have created a **custom hook** that keeps track of the width and updates the maximum amount of
displayed articles.

I have also decided to use typescript in order to have a cleaner code.

### Third-party libraries

I have used the following libraries:

- Framer motion: to add movement
- Axios: to make the http requests to the fake server.
- React Icons: to add illustrative icons to the page

### Technical trade-offs and time constraints

I have not experienced any technical trade-offs whatsoever. With regard to time limitations, I don’t
have further comments either.

### Additional features

If I had additional time to work on this project, I would suggest adding a sorting filter. This
would sort posts by criteria such as published date or alphabetical order. Another suggestion could
be adding an autocomplete feature to the search functionality.

### Extra comments

My experience with React doesn’t include testing at all, so I haven’t included any. I wanted to
avoid writing code based on a short tutorial without being completely sure about what exactly I was
doing. I wanted to deliver an honest answer to the suggested exercise.

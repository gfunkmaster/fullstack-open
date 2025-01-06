const express = require("express");
const morgan = require("morgan");
const app = express();

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(express.json());

app.use(morgan("tiny"));
// Define a custom token to log the request body
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body); // Convert body to a string for logging
});

// Configure Morgan to use the "tiny" format and add the custom token for POST requests
app.use(
  morgan((tokens, req, res) => {
    // Use "tiny" format and append the body token for POST requests
    return [
      tokens.method(req, res), // HTTP method
      tokens.url(req, res), // URL
      tokens.status(req, res), // Status code
      tokens.res(req, res, "content-length"), // Response size
      "-",
      tokens["response-time"](req, res),
      "ms", // Response time
      req.method === "POST" ? `Body: ${tokens.body(req, res)}` : "", // Log body only for POST
    ].join(" ");
  })
);

app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // Check if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number is missing",
    });
  }

  // Check if the name already exists in the phonebook
  const nameExists = persons.some((person) => person.name === body.name);
  if (nameExists) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  // Generate a new person
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id; // id is a string, so no conversion is needed
  persons = persons.filter((person) => person.id !== id); // Compare strings

  response.status(204).end(); // Send a 204 No Content response
});

app.get("/info", (request, response) => {
  const entryCount = persons.length;
  const currentTime = new Date().toString();

  response.send(`
        <h1> Phonebook has info for ${entryCount} people </h1>
        <br/>
        <p> ${currentTime} </p>
        
        `);
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

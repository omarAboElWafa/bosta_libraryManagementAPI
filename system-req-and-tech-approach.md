## Library Management System

- ## System Requirements:

  - #### Library borrower:
    1. As Library borrower, I should search books by **title, author, or ISBN** , so that I reach the needed book quickly and precisely.
    2. As Library borrower, I can view the list of all avalilable books in the library. **(As upgrade list should be paginated and filtered)**.
    3. As Library borrower, I can check out a book. so that the system can keep track of which books are checked out and by whom. **(for guests: When I intend to reserve the book, it should be blocked for (5 min) from reservation by other while I enter my booking data)**.
    4. As Library borrower, I can list my current checked-out books.
    5. As Library borrower, I can return one or more of my cecked-out books.
  - #### Librarian (Admin):
    1. As librarian, I can add a book with details like title, author, ISBN, available quantity, and shelf location (for convience: I assume textbased shelf location like: "A-12").
    2. As librarian, I can update all details for specific book.
    3. As librarian, I can delete a specific book.
    4. As librarian, I can register a borrower with details like name, email, and registered date.
    5. As librarian, I can list all borrowers available in the system.
    6. As librarian, I can update a borrower details.
    7. As librarian, I can delete a borrower from the system.
    8. As librarian, I can keep track of due dates for the books and list books that are overdue.

- ## Technical considerations (based on non-functional requirements):

  - ##### Performance:
    - Use pagination based listing endpoints.
    - Use Caching layer (Redis) to store frequently fetched data "espicially if not changed for specific time" like: (Borrowers' list,Auth tokens, books list, and recent pagination - search).
  - ##### Security:

    - Validate and sanitize inputs in the router, and controller layer before bassing the inputs to the service layer.
    - Queries should use parameterized inputs.
    - Implement rate limiting for the API
    - Use JWT for authentication and authorization (Access and Refresh Tokens).
    - Sanitize and validate the inputs before passing them to the controller.

  - ##### Scalability/extendability:
    - I should use simple (for MVP) but scalable architecture, So I will use a **Multi-layered Modular Monolith** architecture, Layers:
      - **Storage Layer**: Responsible for data persistence, interacts with the database - Implementing the Repository pattern.
      - **Service Layer**: Where the business logic resides, the only layer that interacts with storage layer, where the data comes in/out database are processed.
      - **Controller layer**: It maps HTTP requests comes from the client to the appropriate service methods, and returns the response, responsible for orchestrating the flow of data between the client and the service layer.
      - **Router Layer**: Defines the application's endpoints and routes incoming requests to the appropriate controller methods, **Sanitizes** and validates the inputs before passing them to the controller.

DB UML Diagram as SVG:
<img src="./DB_design uml.svg">

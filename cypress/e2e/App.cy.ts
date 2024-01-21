const url = "http://localhost:8081";

describe("My First Test", () => {
  beforeEach(() => {
    cy.visit(url);
    cy.get("[aria-label='todo-input']").as("todoInput");
    cy.get("[aria-label='add-todo-button']").as("addTodoButton");
    cy.get("[aria-label='add-todo-button-text']").as("addTodoButtonText");
    cy.get("[aria-label='todo-list-title']").as("todoListTitle");
  });

  it("should render the title", () => {
    cy.get("@todoListTitle").should("have.text", "Todo List");
  });

  it("add todo button should disabled when input is empty", () => {
    cy.get("@todoInput").should("have.value", "");
    cy.get("[aria-label='add-todo-button'][aria-disabled='true']").should(
      "exist"
    );
  });

  it("add todo button should enabled when input is not empty", () => {
    cy.get("@todoInput").type("todo item");
    cy.get("[aria-label='add-todo-button'][aria-disabled='true']").should(
      "not.exist"
    );
  });

  it("if input has only spaces then warning message should appear", () => {
    cy.get("@todoInput").type("   ").blur();
    cy.get("[aria-label='warning-message']").should("exist");
  });

  it("if input has text then warning message should not appear", () => {
    cy.get("@todoInput").type("todo item").blur();
    cy.get("[aria-label='warning-message']").should("not.exist");
  });

  it("add to btn should disabled when input has only spaces", () => {
    cy.get("@todoInput").type("   ");
    cy.get("[aria-label='add-todo-button'][aria-disabled='true']").should(
      "exist"
    );
  });

  it("should add a todo item", () => {
    const todoText = "todo item";
    cy.get("@todoInput").type(todoText);
    cy.get("@addTodoButton").click();
    cy.get('[aria-label="todo-item-0"]').should("have.text", todoText);
  });

  it("todo item should have a remove button", () => {
    const todoText = "todo item";
    cy.get("@todoInput").type(todoText);
    cy.get("@addTodoButton").click();
    cy.get('[aria-label="remove-todo-button-0"]').should("exist");
  });

  it("todo item should have a toggle button", () => {
    const todoText = "todo item";
    cy.get("@todoInput").type(todoText);
    cy.get("@addTodoButton").click();
    cy.get('[aria-label="toggle-todo-button-0"]').should("exist");
  });

  it("todo item should get completed when toggle button is clicked", () => {
    const todoText = "todo item";
    cy.get("@todoInput").type(todoText);
    cy.get("@addTodoButton").click();
    cy.get('[aria-label="toggle-todo-button-0"]').click();
  });

  // test the interlocal state of the component

  it("should add a todo item and clear the input", () => {
    const todoText = "todo item";
    cy.get("@todoInput").type(todoText);
    cy.get("@addTodoButton").click();
    cy.get("@todoInput").should("have.value", "");
  });

  it("should add a todo item and focus the input", () => {
    const todoText = "todo item";
    cy.get("@todoInput").type(todoText);
    cy.get("@addTodoButton").click();
    cy.get("@todoInput").should("have.focus");
  });

  it("should remove a todo item", () => {
    const todoText = "todo item";
    cy.get("@todoInput").type(todoText);
    cy.get("@addTodoButton").click();
    cy.get('[aria-label="todo-item-0"]').should("have.text", todoText);
    cy.get('[aria-label="remove-todo-button-0"]').click();
    cy.get('[aria-label="todo-item-0"]').should("not.exist");
  });
});

const todos = {
  todos: [
    {
      id: 1,
      todo: "Do something nice for someone you care about",
      completed: false,
      userId: 152,
    },
    { id: 2, todo: "Memorize a poem", completed: true, userId: 13 },
    {
      id: 3,
      todo: "Watch a classic movie",
      completed: true,
      userId: 68,
    },
    {
      id: 4,
      todo: "Watch a documentary",
      completed: false,
      userId: 84,
    },
    {
      id: 5,
      todo: "Invest in cryptocurrency",
      completed: false,
      userId: 163,
    },
    {
      id: 6,
      todo: "Contribute code or a monetary donation to an open-source software project",
      completed: false,
      userId: 69,
    },
    {
      id: 7,
      todo: "Solve a Rubik's cube",
      completed: true,
      userId: 76,
    },
    {
      id: 8,
      todo: "Bake pastries for yourself and neighbor",
      completed: true,
      userId: 198,
    },
    {
      id: 9,
      todo: "Go see a Broadway production",
      completed: false,
      userId: 7,
    },
    {
      id: 10,
      todo: "Write a thank you letter to an influential person in your life",
      completed: true,
      userId: 9,
    },
    {
      id: 11,
      todo: "Invite some friends over for a game night",
      completed: false,
      userId: 104,
    },
    {
      id: 12,
      todo: "Have a football scrimmage with some friends",
      completed: false,
      userId: 32,
    },
    {
      id: 13,
      todo: "Text a friend you haven't talked to in a long time",
      completed: true,
      userId: 2,
    },
    { id: 14, todo: "Organize pantry", completed: false, userId: 46 },
    {
      id: 15,
      todo: "Buy a new house decoration",
      completed: true,
      userId: 105,
    },
    {
      id: 16,
      todo: "Plan a vacation you've always wanted to take",
      completed: true,
      userId: 162,
    },
    { id: 17, todo: "Clean out car", completed: false, userId: 71 },
    {
      id: 18,
      todo: "Draw and color a Mandala",
      completed: true,
      userId: 6,
    },
    {
      id: 19,
      todo: "Create a cookbook with favorite recipes",
      completed: true,
      userId: 53,
    },
    {
      id: 20,
      todo: "Bake a pie with some friends",
      completed: false,
      userId: 162,
    },
    {
      id: 21,
      todo: "Create a compost pile",
      completed: false,
      userId: 13,
    },
    {
      id: 22,
      todo: "Take a hike at a local park",
      completed: true,
      userId: 37,
    },
    {
      id: 23,
      todo: "Take a class at local community center that interests you",
      completed: true,
      userId: 65,
    },
    {
      id: 24,
      todo: "Research a topic interested in",
      completed: true,
      userId: 130,
    },
    {
      id: 25,
      todo: "Plan a trip to another country",
      completed: false,
      userId: 140,
    },
    {
      id: 26,
      todo: "Improve touch typing",
      completed: false,
      userId: 178,
    },
    { id: 27, todo: "Learn Express.js", completed: false, userId: 194 },
    { id: 28, todo: "Learn calligraphy", completed: false, userId: 80 },
    {
      id: 29,
      todo: "Have a photo session with some friends",
      completed: true,
      userId: 91,
    },
    { id: 30, todo: "Go to the gym", completed: true, userId: 142 },
  ],
};
const handleGet=(req,res)=>{
  const{query}=req
  if (query.id) {
    const todo = todos.todos.find((t) => t.id === parseInt(query.id));
    return todo
      ? res.status(200).json(todo)
      : res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(todos);
}
const handlePut=(req,res)=>{
  const { id, todo, userId, completed } = req.body;
  if (
    id === undefined ||
    todo === undefined ||
    userId === undefined ||
    completed === undefined
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const index = todos.todos.findIndex((t) => t.id === parseInt(id));
  if (index === -1){
    return res.status(404).json({ message: "Todo not found" });
  }       
  todos.todos[index] = {
    ...todos.todos[index],
    todo,
    userId: parseInt(userId),
    completed: completed === "true" ? true : false,
  };
  return res.status(200).json(todos[index]);
}
const handlePost=(req,res)=>{
  const{body}=req
  const newTodo = { id: todos.todos.length + 1, ...body };
  todos.todos.push(newTodo);
  return res.status(201).json(newTodo);
}
const handleDelete=(req,res)=>{
  const{query}=req
  todos.todos = todos.todos.filter((t) => t.id !== parseInt(query.id));
      return res.status(200).json({ message: "Deleted successfully" });
}
export default function handler(req, res) {
  const { method, query, body } = req;
  // console.log("body.id",req.query);
  switch (method) {
    case "GET":
      // if (query.id) {
      //   const todo = todos.todos.find((t) => t.id === parseInt(query.id));
      //   return todo
      //     ? res.status(200).json(todo)
      //     : res.status(404).json({ message: "Not found" });
      // }
      // return res.status(200).json(todos);
      return handleGet(req,res)

    case "PUT":
      return handlePut(req,res)

    case "POST":
      // const newTodo = { id: todos.todos.length + 1, ...body };
      // todos.todos.push(newTodo);
      // return res.status(201).json(newTodo);
      return handlePost(req,res)

    case "DELETE":
      return handleDelete(req,res)

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }  
}
// if (req.method === "GET") {
  //   const { id } = req.query;
  // }
  //   if (id) {
  //     const specificTodo = todos.todos.find((t) => t.id === parseInt(id)); // Find the todo item by ID
  //     if (!specificTodo) {
  //       return res.status(404).json({ message: "Todo not found" });
  //     }
  //     res.status(200).json(specificTodo);
  //   }

  //   res.status(200).json(todos);
  // } else {
  //   res.status(405).json({ message: "Method not allowed" });
  // }

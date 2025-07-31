import httpRequest from "../utils/httpRequest";

interface TodoData {
  title: string;
}

interface UpdateTodoData {
  id: string;
  title?: string;
  completed?: boolean;
}

export const getAllTodos = async () => {
  const { data } = await httpRequest.get("/todo", {
    withCredentials: true,
  });
  return data;
};

export const getTodoById = async (id: string) => {
  const { data } = await httpRequest.get(`/todo/${id}`, {
    withCredentials: true,
  });

  return data;
};

export const createTodo = async (todo: TodoData) => {
  const { data } = await httpRequest.post("/todo", todo, {
    withCredentials: true,
  });
  return data;
};

export const updateTodo = async ({ id, ...update }: UpdateTodoData) => {
  const { data } = await httpRequest.put(`/todo/${id}`, update, {
    withCredentials: true,
  });
  return data;
};

export const deleteTodo = async (id: string) => {
  const { data } = await httpRequest.delete(`/todo/${id}`, {
    withCredentials: true,
  });
  return data;
};

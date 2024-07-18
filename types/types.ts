export type User = {
  id: string;
};

export type TasksType = {
  id?: string;
  title: string;
  description?: string | null;
  listName: string | null;
}[];

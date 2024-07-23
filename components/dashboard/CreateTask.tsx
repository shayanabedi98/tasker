"use client";

type InputValues = {
  title: string;
  description: string;
};

type Props = {
  inputValues: InputValues;
  handleTaskInputChange: (value: string, name: string) => void;
  handleAddNewTask: (obj: InputValues) => void;
  isCreate: boolean;
};

export default function CreateTask({
  handleTaskInputChange,
  handleAddNewTask,
  inputValues,
  isCreate,
}: Props) {
  return (
    <div>
      {isCreate && (
        <div>
          <input
            type="text"
            name="title"
            onChange={(e) =>
              handleTaskInputChange(e.target.value, e.target.name)
            }
            value={inputValues.title}
          />
          <input
            type="text"
            name="description"
            onChange={(e) =>
              handleTaskInputChange(e.target.value, e.target.name)
            }
            value={inputValues.description}
          />
          <button onClick={() => handleAddNewTask(inputValues)}>Create</button>
        </div>
      )}
    </div>
  );
}

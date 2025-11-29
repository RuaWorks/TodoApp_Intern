import type { TaskType } from '../../types';
import { TaskCard } from '../TaskCard/TaskCard';
import { listStyle } from './TaskList.styles';

type Props = {
  taskList: TaskType[];
  onSubmitEditTask: (newTask:TaskType) => void
};

export const TaskList = ({ taskList ,onSubmitEditTask}: Props) => {


  return (
    <div style={listStyle}>
      {taskList.map((task) => (
        <TaskCard key={task.id} task={task} onSubmitEditTask={onSubmitEditTask}/>
      ))}
    </div>
  );
};

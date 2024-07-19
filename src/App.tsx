import { CheckCircle, Circle, PlusCircle, Trash } from '@phosphor-icons/react';
import styles from './App.module.css'
import { Header } from './components/Header';

import './global.css';


import ClipboardImage from './assets/clipboard.svg';

import { ChangeEvent, FormEvent, useState } from 'react';

interface Task {
    text: string;
    done: boolean;
}


export default function App() {

    const [newTaskText, setNewTaskText] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);


    const handleCreateNewTask = (event: FormEvent) => {
        event.preventDefault();

        setTasks([...tasks, { text: newTaskText } as Task]);
        setNewTaskText("");
    }

    const handleChangeNewTaskText = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskText(event.target.value);
    }

    const handleCheckTask = (task: string) => {
        setTasks(tasks.map(t => {
            if (t.text === task)
                return { ...t, done: !t.done };

            return t;
        }))
    }

    const handleDeleteTask = (task: string) => {
        setTasks(tasks.filter(p => p.text !== task));
    }

    const doneTasksCount = tasks.filter(p => p.done === true).length;

    return (
        <div className={styles.wrapper}>
            <Header />
            <main>
                <form onSubmit={handleCreateNewTask} className={styles.formNewTask}>
                    <input
                        value={newTaskText}
                        type="text"
                        placeholder="Adicione uma nova tarefa"
                        onChange={handleChangeNewTaskText}
                        required
                        autoFocus
                    />
                    <button type="submit">
                        Criar
                        <PlusCircle size={16} />
                    </button>
                </form>
                <div className={styles.taskList}>
                    <header>
                        <div className={styles.createdSummary}>Tarefas criadas
                            <span className={styles.chip}>{tasks.length}</span>
                        </div>
                        <div className={styles.doneSummary}>Tarefas concluídas
                            <span className={styles.chip}>{doneTasksCount > 0 ? `${doneTasksCount} de ${tasks.length}` : doneTasksCount}</span>
                        </div>
                    </header>
                    <div className={styles.listContainer}>
                        {tasks.length === 0 ?

                            <div className={styles.emptyList}>
                                <img src={ClipboardImage} alt="Clipboard image" />
                                <strong>Você ainda não tem tarefas cadastradas</strong>
                                <span>Crie tarefas e organize seus itens a fazer</span>
                            </div>
                            :
                            tasks.map(task =>
                                <div key={task.text} className={`${styles.listItem} ${task.done && styles.listItemChecked}`}>
                                    <button className={styles.listItemPrimaryAction} onClick={() => handleCheckTask(task.text)}>
                                        {task.done
                                            ? <CheckCircle weight="fill"/>
                                            : <Circle />
                                        }
                                    </button>
                                    <span className={styles.listItemText}>{task.text}</span>
                                    <button className={styles.listItemSecondaryAction} onClick={() => handleDeleteTask(task.text)}>
                                        <Trash />
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
            </main>
        </div>
    )
}

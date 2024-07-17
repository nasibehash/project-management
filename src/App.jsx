import SideBarProject from './components/SideBarProject.jsx';
import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import { useState } from 'react';
import SelectedProject from './components/SelectedProject.jsx';

function App () {
  const [ projectsState, setProjectState ] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleStartAddProject () {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      };
    });
  }

  function handleAddProject ( projectData ) {
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [ ...prevState.projects, newProject ]
      };
    });
  }

  function handleSelectProject ( id ) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      };
    });
  }

  function handleCancelAddProject () {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      };
    });
  }

  function handleDeleteProject () {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId)
      };

    });
  }

  function handleAddTask ( text ) {
    setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };
      return {
        ...prevState,
        tasks: [ ...prevState.tasks, newTask ]
      };
    });
  }

  function handleDeleteTask (id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        tasks: prevState.tasks.filter(task => task.id !== id)
      };

    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject
    project={selectedProject}
    onDeleteProject={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectsState.tasks}
  />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBarProject
        projects={projectsState.projects}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;

import React, { createContext, useContext, useState } from "react";
import Task from '../models/task';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';  
import SimpleDialog from "../../client/ui/components/simpleDialog";

const EditTaskContext = createContext();

export const useEditTask = () => useContext(EditTaskContext);

const initialState = {
    loading: false,
    personalChecked: false,
};

const initialStateAlert = {
    show: false,
    onClose: () => { },
    title:'',
    message: '',
}

export const EditTaskController = ({ children }) => {
    const navigate = useNavigate();  

    const [state, setState] = useState(initialState);
    const [alertState, setAlertState] = useState(initialStateAlert);

    const changePersonalChecked = () => setState(prevState => ({ ...prevState, personalChecked: !prevState.personalChecked }));
    const openAlert = (title, message, onClose) => {
        setAlertState({
            show: true,
            onClose: onClose,
            title: title,
            message: message,
        });
    };

    const closeAlert = () => {
        setState(prevState => ({
            ...prevState,
            showAlert: false,
        }));

        navigate('/tasks');
    };

    const onRegisterSubmit = async (e) => {
        e.preventDefault();
        setState(prevState => ({ ...prevState, loading: true }));

        try {
            const task = new Task({
                name: e.target.name.value,
                description: e.target.description.value,
                date: e.target.date.value,
                personal: state.personalChecked,
                status: e.target.status.value,
            });

            await Meteor.call('tasks.insert', task);
            openAlert('Tarefa cadastrada', 'Tarefa cadastrada com sucesso!', () => {
                setAlertState(prevState => ({ ...prevState, show: false }));
                navigate('/tasks');  
            });
        } catch (e) {
            openAlert('Erro ao cadastrar tarefa', e.message, () => {setAlertState(prevState => ({ ...prevState, show: false }))});
        }

        setState(prevState => ({ ...prevState, loading: false }));
    }

    const contextValue = {
        ...state,
        onRegisterSubmit,
        changePersonalChecked,
    };

    return (
        <>
            <EditTaskContext.Provider value={contextValue}>
                {children}
            </EditTaskContext.Provider>
            <SimpleDialog 
                open={alertState.show}
                onClose={alertState.onClose}
                title={alertState.title}
                message={alertState.message}
            />

        </>
    );
};

export default EditTaskController;

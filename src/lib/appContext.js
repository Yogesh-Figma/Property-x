"use client"
import React, { createContext, useState, useContext } from 'react';
import { SessionProvider } from "next-auth/react"

const AppContext = createContext();

export const AppProvider = ({ children, session }) => {
    const [comparisonProjects, setProjectsForComparison] = useState([]);

    const addProjectForComparison = (projectData) => {
        if (comparisonProjects.some(data == projectData.id)) {
            //project already present returning
            return prevData;
        }
        let newData = new Array(comparisonProjects);
        if (newData.length == 2) {
            newData[0] = projectData
        }
        else {
            newData.push(projectData);
        }
        setProjectsForComparison(newData);
    }

    const removeProjectFromComparison = (projectData) => {
        setProjectsForComparison(newData.filter(data => data.id != projectData.id));
    }

    const value = {
        comparisonProjects,
        addProjectForComparison,
        removeProjectFromComparison
    };
    return <SessionProvider session={session}>
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </SessionProvider>;
};

export const useAppContext = () => useContext(AppContext)
"use client"
import React, { createContext, useState, useContext } from 'react';
import { SessionProvider } from "next-auth/react"
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import CircularProgress from '@mui/material/CircularProgress';

const AppContext = createContext();

export const AppProvider = ({ children, session }) => {
    const [userLocation, setUserLocation] = useState("");
    const [loaderEnabled, enableLoader] = useState(false);
    const [comparisonProjects, setProjectsForComparison] = useState([]);
    const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10000,
          },
        },
      })

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
        removeProjectFromComparison,
        userLocation,
        setUserLocation,
        enableLoader
    };
    return <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
            <AppContext.Provider value={value}>
                {loaderEnabled && <div className='global-loader position-fixed'>
                    <CircularProgress size="4rem"/>
                </div>}
                {children}
                
            </AppContext.Provider>
        </QueryClientProvider>
    </SessionProvider>;
};

export const useAppContext = () => useContext(AppContext)
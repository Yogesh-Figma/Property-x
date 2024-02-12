"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';
import { SessionProvider } from "next-auth/react"
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import CircularProgress from '@mui/material/CircularProgress';

const AppContext = createContext();

function getInitialState() {
    let appState;
    if (typeof window !== 'undefined') {
        appState = localStorage.getItem('appState')
    }
    return appState ? JSON.parse(appState) : {comparisonProjects:[]}
}

export const AppProvider = ({ children, session }) => {
    const [appState, setAppState] = useState(getInitialState());
    const [userLocation, setUserLocation] = useState("");
    const [loaderEnabled, enableLoader] = useState(false);
    useEffect(() => {
        const storedState = localStorage.getItem('appState');
        if (storedState) {
          setAppState(JSON.parse(storedState));
        }
      }, []);
      
      useEffect(() => {
        localStorage.setItem('appState', JSON.stringify(appState));
      }, [appState]);

    const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10000,
          },
        },
      })

    const setProjectsForComparison = (newData) => {
        setAppState(prev => ({...prev, comparisonProjects:newData}))
    }

    const addProjectForComparison = (projectData) => {
        let { comparisonProjects } = appState;
        if (comparisonProjects.some(data=> data.id == projectData.id)) {
            //project already present returning
            return;
        }
        let newData = [...comparisonProjects];
        if (newData.length == 2) {
            newData[0] = projectData
        }
        else {
            newData.push(projectData);
        }
        setProjectsForComparison(newData);
    }

    const removeProjectFromComparison = (id) => {
        let { comparisonProjects } = appState;
        setProjectsForComparison(comparisonProjects.filter(data => data.id != id));
    }

    const value = {
        comparisonProjects:appState.comparisonProjects,
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
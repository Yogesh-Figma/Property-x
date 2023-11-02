"use client"
import "./styles.scss"
import React from "react";

const SlantedTabs = ({ children, className="" }) => {
    const [activeTab, setActiveTab] = React.useState(children[0].props.label)

    const onClickTabItem = (tab) => {
        setActiveTab(tab);
    };


    return (
        <div className={`slanted-tabs `}>
            <div className="tab-list">
                {children.map((child) => {
                    const { label } = child.props;
                    return (<span className={`tab-list-item cursor-pointer ${activeTab === label ? "tab-list-active" : ""}`} onClick={() => onClickTabItem(label)}>
                        {label}
                    </span>
                    );
                })}
            </div>
            <div className={`tab-content-wrapper ${className}`}>
                {children.map((child) => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
    );
}

export default SlantedTabs;
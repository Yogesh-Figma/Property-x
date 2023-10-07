import './styles.scss'

const FormTabs = ({ items = [], name, variant="outlined", selectedTab, width, height, onClick, className="" }) => {
    return (
        <div className={`form-tab-container flex-wrap d-flex align-items-center ${className} ${variant}`}>
            {items.map((item, index) => <div key={index} style={{width, height}} className={`tab d-flex align-items-center justify-content-center text-center${selectedTab == item.value ? " selected" : ""} ${!!item.disabled ? " disabled" : ""}`} onClick={() => onClick({target:{name, value:item.value}})}>{item.label}</div>)}
        </div>
    )
}

export default FormTabs;
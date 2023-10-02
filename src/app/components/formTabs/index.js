import './styles.scss'

const FormTabs = ({ items = [], name, selectedTab, width, height = "100px", onClick }) => {
    return (
        <div className='form-tab-container d-flex align-items-center'>
            {items.map((item, index) => <div key={index} className={`tab d-flex align-items-center justify-content-center text-center${selectedTab == item.value ? " selected" : ""}`} onClick={() => onClick({target:{name, value:item.value}})}>{item.label}</div>)}
        </div>
    )
}

export default FormTabs;
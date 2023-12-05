import './styles.scss'

const FormTabs = ({ items = [], name, variant = "outlined", selectedTab=null, width, height, onClick, className = "", register, errors, errorMessage }) => {
    return (
        <>
            <div className={`form-tab-container flex-wrap d-flex align-items-center ${className} ${variant}`}>
                {register && <input className='d-none' defaultValue={""} {...register(name, { required: errorMessage })} value={selectedTab} />}
                {items.map((item, index) => <div key={index} style={{ width, height }} className={`tab d-flex align-items-center justify-content-center text-center${selectedTab == item.value ? " selected" : ""} ${!!item.disabled ? " disabled" : ""}`} onClick={() => onClick({ target: { name, value: item.value } })}>{item.label}</div>)}
            </div>
            {errors && errors[name] && <div className='error-helper-text'>{errors[name].message}</div>}
        </>
    )
}

export default FormTabs;
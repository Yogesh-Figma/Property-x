import React from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Loading from "../../utils/Loading";
import { MdDelete } from "react-icons/md";  

function ButtonGroup({
  buttons,
  isSelected,
  setSelected,
  menuOpen,
  subMenuOpen,
  duplicate,
  buttonClick,
  isLoading,
  onDelete,

}) {
  return (
    <div className="button-container">
      {buttons.map((button, index) => (
        <div key={index} className="button-wrapper">
          <motion.button
            className={
              isSelected === button.text ? "selected-button" : "button"
            }
            onClick={() => {
              if (button.url) {
                // Navigate to the provided URL
                window.location.href = button.url;  
              } else if (buttonClick) {
                buttonClick();
              } else {
                setSelected(button.text, duplicate);
              }
            }}
            whileHover={{ scale: 1.05 }} // Scale on hover
            whileTap={{ scale: 0.95 }} // Scale on tap
            transition={{ type: "spring", stiffness: 70 }} // Spring transition
          >
            {isLoading ? (
             <Loading  Loading={true}/>
            ) : (
              <>
                <img
                  src={button.image}
                  alt={button.text}
                  className="button-image"
                />
                {menuOpen && (
                  <>
                    {button.text}
                    {button.text === " Leads Data" && (
                      <IoIosArrowDown
                        className={`arrow-icon ${subMenuOpen ? "rotate" : ""}`}
                      />
                    )}
                    {button.text === "Duplicate Leads Data" && (
                      <IoIosArrowDown
                        className={`arrow-icon ${subMenuOpen ? "rotate" : ""}`}
                      />
                    )}
                    {button.text === " Calling Data" && (
                      <IoIosArrowDown
                        className={`arrow-icon ${subMenuOpen ? "rotate" : ""}`}
                      />
                    )}
                  </>
                )}
                   {button.showDelete && (
                      <motion.button
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(button.text);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MdDelete className="delete-icon"/>
                      </motion.button>
                    )}
              </>
            )}
          </motion.button>
          {!menuOpen && !isLoading && (
            <div className="tooltip">{button.text}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ButtonGroup;

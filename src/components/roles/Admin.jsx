import React, { useEffect, useState } from "react";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Admin.css";
import { useNavigate, Outlet } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropdown from "../small-component/ProfileDropdown.jsx";
import ButtonGroup from "../crm/ButtonGroup";
import { Mode } from "../../styles/Mode.ts";
import {ThemeContext  } from '../../contexts/UseColoeScheme.js'
import Loading from "../../utils/Loading.jsx";
import apiServiceInstance from "../../Api/ApiService.jsx";

function Admin() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [dSubMenuOpen, setDSubMenuOpen] = useState(false);
  const [callingData, setCallingData] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [hamburger, sethamburger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [urlresponse, setUrlresponse] = useState([]);
  const Rolename = localStorage.getItem("rolename");
  const admin = Rolename === "ADMIN";
  const user = Rolename === "USER";
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const fetchBookmarks = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await apiServiceInstance.getBookmarkByUserId(userId);
      console.log(response, "Bookmarks fetched successfully");
      setUrlresponse(response);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };
  useEffect(() => {
    fetchBookmarks();
  }, []);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setProfileDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setProfileDropdownVisible(false);
  };

 
    
  const toggleHamburger = () => {
    sethamburger((prevState) => !prevState);
    setMenuOpen((prevState) => !prevState);
  };

  const handleDeleteBookmark = async (name) => {
    try {
      const userId = localStorage.getItem("userId");
      await apiServiceInstance.deleteBookmarkByName(userId, name);
      fetchBookmarks();
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };
  const handlesaveUrlButton = (url) => {
    setLoading(true);
    window.location.href = url;
  };

  const handleButtonClick = (
    text,
    hasSubmenu = false,
    isDuplicate = false,
    isCallingData = false,
    e
  ) => {
    if (e) {
      e.stopPropagation(); // Stop event propagation
    }
    if (hasSubmenu) {
      if (isDuplicate) {
        setDSubMenuOpen(!dSubMenuOpen);
        setSubMenuOpen(false);
        setCallingData(false);
      } else if (isCallingData) {
        setCallingData(!callingData);
        setSubMenuOpen(false);
        setDSubMenuOpen(false);
      } else {
        setSubMenuOpen(!subMenuOpen);
        setDSubMenuOpen(false);
        setCallingData(false);
      }
    } else {
      const route = text.toLowerCase().replace(/\s+/g, "");
      navigate(`/admin/${route}?duplicate=${isDuplicate}`, {
        state: { admin, hamburger },
      });
    }
  };

  const sections = {
    dashboard: [
      { text: "Dashboard", image: require("../../images/dashboadicon.png") },
    ],
    leads: [
      {
        text: " Leads Data",
        image: require("../../images/leadIcon.png"),
        image2: <IoIosArrowDown />,
        submenu: [
          { text: "New Leads", image: require("../../images/dot.png") },
          { text: "Open Leads", image: require("../../images/dot.png") },
          { text: "Leads Report", image: require("../../images/dot.png") },
          { text: "Success Leads", image: require("../../images/dot.png") },
          ...(admin
            ? [
              {
                text: "Declined Leads",
                image: require("../../images/dot.png"),
              },
                {
                  text: "Total Leads",
                  image: require("../../images/dot.png"),
                },
              ]
            : []),
        ],
      },
    ],
    duplicateLeads: [
      {
        text: "Duplicate Leads Data",
        image: require("../../images/duplicateLead.png"),
        image2: <IoIosArrowDown />,
        submenu: [
          {
            text: "Duplicate New Lead",
            image: require("../../images/dot.png"),
          },
          {
            text: "Duplicate Open Leads",
            image: require("../../images/dot.png"),
          },
          {
            text: "Duplicate Leads Report",
            image: require("../../images/dot.png"),
          },
          {
            text: "Duplicate Closed Leads",
            image: require("../../images/dot.png"),
          },
          ...(admin
            ? [
              {
                text: "Duplicate Declined Leads",
                image: require("../../images/dot.png"),
              },
                {
                  text: "Duplicate Total Leads",
                  image: require("../../images/dot.png"),
                },
              ]
            : []),
        ],
      },
    ],
    callData: [
      {
        text: " Calling Data",
        image: require("../../images/CalledLead.png"),
        image2: <IoIosArrowDown />,
        submenu: [
          {
            text: "New call data",
            image: require("../../images/dot.png"),
          },
          {
            text: "Open Call data",
            image: require("../../images/dot.png"),
          },
        ],
      },
    ],
    employee: [
      { text: "Meeting", image: require("../../images/meetingicon.png") },
      { text: "Attendance", image: require("../../images/leads.png") },
      {
        text: "Employee Performance",
        image: require("../../images/lReport.png"),
      },
      {
        text: "Fib Request",
        image: require("../../images/lReport.png"),
      },
      {
        text: "Projects",
        image: require("../../images/lReport.png"),
      },
      ...(user
        ? []
        : [
            {
              text: "Employee Details",
              image: require("../../images/leads.png"),
            },
            {
              text: "Register Organization",
              image: require("../../images/totalLead.png"),
            },
            {
              text: "Subscription",
              image: require("../../images/lReport.png"),
            },
          ]),
    ],
    savedURLSection:
      urlresponse && urlresponse.length > 0
        ? urlresponse.map((bookmark) => ({
            text: bookmark.name || "Saved URL",
            image: require("../../images/tabicon.png"),
            url: bookmark.url || "/",
            showDelete: true,
          }))
        : [],
  };

  // const colorScheme = useColorScheme();
  // const colors = Mode[colorScheme ?? "dark"];
  const Photo = localStorage.getItem("photo");
  const UserName = localStorage.getItem("Username");

  return (
    <div className="app">
      <div className={`leftdiv ${menuOpen ? "open" : "closed"}`}>
        <div className="app-container">
          <div style={{ display: "flex", width: "100%", gap: "2%" }}>
            <label
              className="btn btn-circle swap swap-rotate"
              onClick={toggleHamburger}
            >
              {/* hamburger icon */}
              {!hamburger && (
                <svg
                  className="swap-off fill-current border-none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
              )}
              {/* close icon */}
              {hamburger && (
                <svg
                  className="swap-on fill-current border-none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              )}
            </label>
            <img
              src={require("../../images/favicon.png")}
              alt="imlogo"
              className="imlogo"
            />
          </div>
          <div className="section">
            <div className="section-title">MAIN</div>
            <ButtonGroup
              buttons={sections.dashboard}
              setSelected={(text, e) =>
                handleButtonClick(text, false, false, false, e)
              }
              menuOpen={menuOpen}
              isLoading={loading}
            />
          </div>

          <div className="section">
            <ButtonGroup
              buttons={sections.leads}
              setSelected={(text, e) =>
                handleButtonClick(text, true, false, false, e)
              }
              menuOpen={menuOpen}
              subMenuOpen={subMenuOpen}
              Duplicate={false}
            />
            {subMenuOpen && (
              <div className="submenu">
                <ButtonGroup
                  buttons={sections.leads[0].submenu}
                  setSelected={(text, e) =>
                    handleButtonClick(text, false, false, false, e)
                  }
                  menuOpen={menuOpen}
                  isLoading={loading}
                />
              </div>
            )}
          </div>

          <div className="section">
            <ButtonGroup
              buttons={sections.duplicateLeads}
              setSelected={(text, e) =>
                handleButtonClick(text, true, true, false, e)
              }
              menuOpen={menuOpen}
              subMenuOpen={subMenuOpen}
              Duplicate={true}
            />
            {dSubMenuOpen && (
              <div className="submenu">
                <ButtonGroup
                  buttons={sections.duplicateLeads[0].submenu}
                  setSelected={(text, e) =>
                    handleButtonClick(text, false, true, false, e)
                  }
                  menuOpen={menuOpen}
                  isLoading={loading}
                />
              </div>
            )}
          </div>

          {loading && <Loading show={loading} />}
          <div className="section">
            <ButtonGroup
              buttons={sections.callData}
              setSelected={(text, e) =>
                handleButtonClick(text, true, false, true, e)
              }
              menuOpen={menuOpen}
              subMenuOpen={subMenuOpen}
              isLoading={loading}
            />
            {callingData && (
              <div className="submenu">
                <ButtonGroup
                  buttons={sections.callData[0].submenu}
                  setSelected={(text, e) =>
                    handleButtonClick(text, false, false, true, e)
                  }
                  menuOpen={menuOpen}
                  isLoading={loading}
                />
              </div>
            )}
            <div className="grey-line"></div>
          </div>

          <div className="section">
            <div className="section-title">EXPLORE</div>
            <ButtonGroup
              buttons={sections.employee}
              setSelected={(text, e) =>
                handleButtonClick(text, false, false, false, e)
              }
              menuOpen={menuOpen}
            />
          </div>
          {
            <div className="section">
              <div className="section-title">Personalized tabs</div>
              <ButtonGroup
                buttons={sections.savedURLSection}
                setSelected={(text, e) => handleButtonClick(text, e)}
                menuOpen={menuOpen}
                buttonClick={(url) => {
                  handlesaveUrlButton(url);
                }}
                onDelete={(name) => handleDeleteBookmark(name)}
                isLoading={loading}
              />
            </div>
          }
        </div>
      </div>

      <div className={`rightdiv ${menuOpen ? "shifted" : ""}`}>
        <div className="navbar-main">
          <span className="greeting">Hi, {UserName}✋</span>
          <div className="icons">
            <>
              <div
                className="swap swap-rotate cursor-pointer"
                onClick={toggleTheme}
              >
                {/* Sun icon (Visible in light mode) */}
                {!isDarkMode && (
                  <svg
                    className="swap-on h-8 w-8 fill-current ml-2 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                )}

                {/* Moon icon (Visible in dark mode) */}
                {isDarkMode && (
                  <svg
                    className="swap-off h-8 w-8 fill-current ml-2 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                )}
              </div>
            </>
            <img
              className="notification-icon"
              alt="img"
              src={require("../../images/notification.png")}
            />
            <div
              className="profileDropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img className="avatar" src={Photo} alt="User Avatar" />
              <IoIosArrowDown
                style={{ marginLeft: "39px", marginTop: "-25px" }}
              />
              <ProfileDropdown visible={profileDropdownVisible} admin={admin} />{" "}
            </div>
          </div>
        </div>

        {/* Render child components using Outlet */}
        <Outlet context={hamburger} />
      </div>
    </div>
  );
}

export default Admin;

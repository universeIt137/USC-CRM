import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { NavLink, NavNavLink } from "react-router-dom";
import { RiBaseStationLine } from "react-icons/ri";
import { HiStatusOffline } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";

const AdminLayout = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      {user?.role === "admin" && (
        <>
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm">
              <NavLink
                rel="noopener noreferrer"
                to={`/dashboard`}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-gray-400"
                >
                  <path d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z"></path>
                </svg>
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li className="rounded-sm">
              <NavLink
                rel="noopener noreferrer"
                to={`/dashboard/lead-upload`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                    : " flex items-center p-2 space-x-3 rounded-md"
                }
              >
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-upload-network-and-cloud-computing-flatart-icons-flat-flatarticons.png"
                  alt="external-upload-network-and-cloud-computing-flatart-icons-flat-flatarticons"
                />
                <span>Upload Lead</span>
              </NavLink>
            </li>

            <li className="rounded-sm">
              <NavLink
                rel="noopener noreferrer"
                to={`/dashboard/total-leads`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                    : " flex items-center p-2 space-x-3 rounded-md"
                }
              >
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-lead-social-media-agency-flaticons-lineal-color-flat-icons-3.png"
                  alt="external-lead-social-media-agency-flaticons-lineal-color-flat-icons-3"
                />
                <span>Total Lead</span>
              </NavLink>
            </li>

            <li className="rounded-sm">
              <NavLink
                rel="noopener noreferrer"
                to={`/dashboard/total-admission`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                    : " flex items-center p-2 space-x-3 rounded-md"
                }
              >
                <img
                  width="24"
                  height="64"
                  src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-student-university-flaticons-lineal-color-flat-icons-3.png"
                  alt="external-student-university-flaticons-lineal-color-flat-icons-3"
                />
                <span>Total Admission</span>
              </NavLink>
            </li>
            <li className="rounded-sm">
              <NavLink
                rel="noopener noreferrer"
                to={`/dashboard/total-close`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                    : " flex items-center p-2 space-x-3 rounded-md"
                }
              >
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/external-fauzidea-outline-color-fauzidea/64/000000/external-student-back-to-school-fauzidea-outline-color-fauzidea.png"
                  alt="external-student-back-to-school-fauzidea-outline-color-fauzidea"
                />
                <span>Total Close</span>
              </NavLink>
            </li>
            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
              <NavLink
                rel="noopener noreferrer"
                to={`/dashboard/online-students`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                    : " flex items-center p-2 space-x-3 rounded-md"
                }
              >
                <RiBaseStationLine className="h-6 w-6"></RiBaseStationLine>
                <span>Total Online</span>
              </NavLink>
            </li>
            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
              <NavLink
                rel="noopener noreferrer"
                to={`/dashboard/offline-students`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                    : " flex items-center p-2 space-x-3 rounded-md"
                }
              >
                <HiStatusOffline className="h-6 w-6"></HiStatusOffline>
                <span>Total Offline</span>
              </NavLink>
            </li>
            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
              <NavLink
                rel="noopener noreferrer"
                to={`/dashboard/seminar-interesteds`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                    : " flex items-center p-2 space-x-3 rounded-md"
                }
              >
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-seminar-activism-flaticons-lineal-color-flat-icons-3.png"
                  alt="external-seminar-activism-flaticons-lineal-color-flat-icons-3"
                />
                <span>Total SI</span>
              </NavLink>
            </li>
            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
              <NavLink
                rel="noopener noreferrer"
                to={`/dashboard/seminar-attends`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                    : " flex items-center p-2 space-x-3 rounded-md"
                }
              >
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/external-goofy-color-kerismaker/96/external-Seminar-communication-goofy-color-kerismaker.png"
                  alt="external-Seminar-communication-goofy-color-kerismaker"
                />
                <span>Total SA</span>
              </NavLink>
            </li>
            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
              <NavLink
                rel="noopener noreferrer"
                to={`/dashboard/total-no-receive`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                    : " flex items-center p-2 space-x-3 rounded-md"
                }
              >
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/arcade/64/phone.png"
                  alt="phone"
                />
                <span>No Receive</span>
              </NavLink>
            </li>
            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
              <NavLink
                rel="noopener noreferrer"
                to={`/dashboard/today-followUps`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                    : " flex items-center p-2 space-x-3 rounded-md"
                }
              >
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/bubbles/50/today.png"
                  alt="today"
                />
                <span>Today FUp</span>
              </NavLink>
            </li>
          </ul>

          <hr></hr>

          <ul className="p-4 space-y-4 text-left">
            <li>
              <details>
                <summary>Students</summary>

                <ul>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/student/all-student`}
                    >
                      <FaUsers></FaUsers>
                      <span className="text-xs">All Students</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/student/enroll-course`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/fluency/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">Enroll Course</span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
          <hr></hr>

          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
              <NavLink
                rel="noopener noreferrer"
                to={`/dashboard/admin-pay-details`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                    : " flex items-center p-2 space-x-3 rounded-md"
                }
              >
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/bubbles/50/card-in-use.png"
                  alt="card-in-use"
                />
                <span>Payment</span>
              </NavLink>
            </li>
          </ul>
          <hr></hr>

          <ul className="p-4 space-y-4 text-left">
            <li>
              <details>
                <summary>Course Report</summary>
                <ul>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/settings/course`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/color/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">Add Course Name</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/settings/batch`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/officel/16/mobile-payment.png"
                        alt="mobile-payment"
                      />
                      <span className="text-xs">Add Batch Name</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/report/collection`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/fluency/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">Date Wise Collection</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/admin-pay-report`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/stickers/100/batch-assign.png"
                        alt="batch-assign"
                      />
                      <span className="text-xs">Batch Wise Report</span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Extra Collection</summary>
                <ul>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/collection/purpose-type`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/fluency/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">
                        Add Collection Purpose Name
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/collection/add`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/arcade/64/add-property.png"
                        alt="add-property"
                      />
                      <span className="text-xs">Add Extra Collection</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/collection/collection`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/color/48/topup-payment.png"
                        alt="topup-payment"
                      />
                      <span className="text-xs">Extra Collection</span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Collection Report</summary>
                <ul>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/collection/date-report`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/color/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">Date Wise Report</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/collection/money-receipt`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/officel/16/mobile-payment.png"
                        alt="mobile-payment"
                      />
                      <span className="text-xs">Money Receipt</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/collection/purpose`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/arcade/64/health-graph.png"
                        alt="health-graph"
                      />
                      <span className="text-xs">Purpose Wise Report</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/report/payGetway`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/color-glass/48/profit-report.png"
                        alt="download-graph-report"
                      />
                      <span className="text-xs">PayGetway Report</span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Expense</summary>
                <ul>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/expense/head`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/fluency/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">Add Expense Title </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/expense/add`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/stickers/100/batch-assign.png"
                        alt="batch-assign"
                      />
                      <span className="text-xs">Add Expense</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/expense/expense`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/color-glass/48/profit-report.png"
                        alt="profit-report"
                      />
                      <span className="text-xs">Expense</span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Expense Report</summary>
                <ul>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/expense/date-report`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/fluency/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">Date Wise Report</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/expense/boucher-report`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/stickers/100/batch-assign.png"
                        alt="batch-assign"
                      />
                      <span className="text-xs">Voucher No Wise Report</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/expense/purpose`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/color-glass/48/profit-report.png"
                        alt="profit-report"
                      />
                      <span className="text-xs">Purpose Wise Report</span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details>
                <summary>Cash Report</summary>
                <ul>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/cash/cash-report`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/fluency/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">Date Wise Report</span>
                    </NavLink>
                  </li>
                  {/* <li>
                                                            <NavLink className={({ isActive }) =>
                                isActive ? "text-green-400 flex items-center p-2 space-x-3 rounded-md" : " flex items-center p-2 space-x-3 rounded-md"
                            } to={`/dashboard/expense/boucher-report`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/stickers/100/batch-assign.png" alt="batch-assign" />
                                                                <span className='text-xs'>Batch Wise Report</span></NavLink>
                                                        </li>
                                                        <li><NavLink className={({ isActive }) =>
                                isActive ? "text-green-400 flex items-center p-2 space-x-3 rounded-md" : " flex items-center p-2 space-x-3 rounded-md"
                            } to={`/dashboard/expense/purpose`}>
                                                            <img width="16" height="16" src="https://img.icons8.com/color-glass/48/profit-report.png" alt="profit-report" />
                                                            <span className='text-xs'>Purpose Wise Report</span></NavLink></li> */}
                </ul>
              </details>
            </li>

            <li>
              <details>
                <summary>Loan</summary>
                <ul>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/loan/head`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/fluency/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">Add Loan Purpose</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/loan/provide`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/color/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">Loan Payable</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/loan/all-provide`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/officel/16/mobile-payment.png"
                        alt="mobile-payment"
                      />
                      <span className="text-xs">All Payable</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/loan/receive`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/arcade/64/health-graph.png"
                        alt="health-graph"
                      />
                      <span className="text-xs">Loan Receiveable</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/loan/all-receive`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/color-glass/48/download-graph-report.png"
                        alt="download-graph-report"
                      />
                      <span className="text-xs">All Receiveable</span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
          </ul>

          <hr></hr>

          <ul className="text-sm p-4 space-y-4 text-left">
            <li>
              <details>
                <summary>User Info</summary>
                <ul>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/employee/add-account`}
                    >
                      <span className="text-xs">Add New User Account</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/employee/show-all`}
                    >
                      <span className="text-xs">All User Details</span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
          </ul>

          <hr></hr>

          <ul className="text-sm p-4 space-y-4 text-left">
            <li>
              <details>
                <summary>Setting</summary>
                <ul>
                  {/* <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/settings/course`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/color/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">Add Course Name</span>
                    </NavLink>
                  </li> */}
                  {/* <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/settings/batch`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/officel/16/mobile-payment.png"
                        alt="mobile-payment"
                      />
                      <span className="text-xs">Add Batch Name</span>
                    </NavLink>
                  </li> */}
                  {/* <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/collection/purpose-type`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/fluency/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">Add Purpose Name</span>
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/collection/payment-type`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/fluency/48/pay-date.png"
                        alt="pay-date"
                      />
                      <span className="text-xs">Add Payment Type</span>
                    </NavLink>
                  </li>
                  {/* <li>
                                                            <NavLink className={({ isActive }) =>
                                isActive ? "text-green-400 flex items-center p-2 space-x-3 rounded-md" : " flex items-center p-2 space-x-3 rounded-md"
                            } to={`/dashboard/settings/head`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/arcade/64/health-graph.png" alt="health-graph" />
                                                                <span className='text-xs'>Head Name</span></NavLink>
                                                        </li> */}
                  {/* <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                          : " flex items-center p-2 space-x-3 rounded-md"
                      }
                      to={`/dashboard/setting/user`}
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/color-glass/48/download-graph-report.png"
                        alt="download-graph-report"
                      />
                      <span className="text-xs">User & Head</span>
                    </NavLink> 
                  </li>*/}
                  {/* <li>
                                        <NavLink className={({ isActive }) =>
                                            isActive ? "text-green-400 flex items-center p-2 space-x-3 rounded-md" : " flex items-center p-2 space-x-3 rounded-md"
                                        } to={`/dashboard/setting/payment-type`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current dark:text-gray-400">
                                                <path d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z"></path>
                                                <path d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z"></path>
                                            </svg>
                                            <span className='text-xs'>Pay Type Setting</span></NavLink>
                                    </li> */}
                </ul>
              </details>
            </li>
          </ul>

          <hr></hr>

          <li className="rounded-sm">
            {/* <li className='font-semibold'><button onClick={logout}>Sign Out</button></li> */}
            <NavLink
              rel="noopener noreferrer"
              to="#"
              className="flex items-center p-4 space-x-3 rounded-md text-red-500 font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fill-current dark:text-gray-400"
              >
                <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                <rect width="32" height="64" x="256" y="232"></rect>
              </svg>
              <span onClick={logout}>Logout</span>
            </NavLink>
          </li>
        </>
      )}
    </div>
  );
};

export default AdminLayout;

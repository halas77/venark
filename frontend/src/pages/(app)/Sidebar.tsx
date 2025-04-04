import { dashboardContent, socialLinks } from "@/utils/constants";
import { ChevronsRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState(() =>
    JSON.parse(localStorage.getItem("isExpanded") || "false")
  );

  useEffect(() => {
    localStorage.setItem("isExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  return (
    <div className="relative">
      <div
        className={`absolute  lg:relative h-screen shadow bg-gray-950 border border-r border-white/15 transition-width duration-300 ${
          isExpanded ? "w-64" : "w-16"
        } ${className}`}
      >
        {/* Logo Section */}
        <Link to="/" className="h-16 flex items-center px-4 ">
          {isExpanded && (
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent font-serif">
              VENARK.
            </span>
          )}
        </Link>

        <ul className="flex-1 flex flex-col gap-4 p-2 mt-4">
          {dashboardContent.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.href}
                className={`"group relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/5  
                  ${location.pathname === item.href && "bg-white/5"}
                  `}
              >
                <item.icon
                  size={20}
                  className={`shrink-0 ${
                    location.pathname === item.href
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                />

                {isExpanded && (
                  <span
                    className={`text-lg capitalize ${
                      location.pathname === item.href
                        ? "font-medium text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        {isExpanded && (
          <div className="absolute bottom-6 left-0 w-full px-4 text-start text-gray-400 text-xs border-t border-white/10 pt-4 space-y-1">
            <p className="whitespace-nowrap">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
            <div className="pl-3">
              Powered by{" "}
              <a
                href="https://github.com/halas77"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline cursor-pointer"
              >
                halas77
              </a>
              .
            </div>
            <div className="flex justify-start pt-1 gap-6 pl-3">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon
                    className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                    size={18}
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`absolute top-6 z-50 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 cursor-pointer shadow-lg hover:shadow-purple-500/30 transition-all ${
            isExpanded ? "left-[236px]" : "left-[50px]"
          }`}
        >
          <ChevronsRight
            size={18}
            className="text-white transform transition-transform"
            style={{ rotate: isExpanded ? "180deg" : "0deg" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

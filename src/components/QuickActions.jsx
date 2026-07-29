import { Link } from "react-router-dom";
import {
  FaPlus,
  FaHandsHelping,
  FaNewspaper,
  FaImages,
  FaCalendarPlus,
} from "react-icons/fa";


const actions = [
  {
    title: "Add Program",
    icon: FaHandsHelping,
    path: "/program",
    className: "action-blue",
  },
  {
    title: "Create Blog",
    icon: FaNewspaper,
    path: "/blog",
    className: "action-green",
  },
  {
    title: "Upload Gallery",
    icon: FaImages,
    path: "/gallery",
    className: "action-orange",
  },
  {
    title: "Add Event",
    icon: FaCalendarPlus,
    path: "/events",
    className: "action-purple",
  },
];

function QuickActions() {
  return (
    <div className="quick-actions">
      <div className="section-heading">
        <h5>Quick Actions</h5>
        <p>Manage your foundation content quickly.</p>
      </div>

      <div className="row g-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <div className="col-6 col-md-3" key={action.title}>
              <Link
                to={action.path}
                className={`quick-action ${action.className}`}
              >
                <div className="quick-icon">
                  <Icon />
                </div>

                <span>{action.title}</span>

                <FaPlus className="quick-plus" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
import {
  FaArrowRight,
  FaGraduationCap,
  FaFemale,
  FaHeartbeat,
} from "react-icons/fa";

const programs = [
  {
    title: "Education Support",
    category: "Education",
    icon: FaGraduationCap,
  },
  {
    title: "Women Empowerment",
    category: "Women Development",
    icon: FaFemale,
  },
  {
    title: "Health Awareness",
    category: "Healthcare",
    icon: FaHeartbeat,
  },
];

function RecentPrograms() {
  return (
    <div className="dashboard-section">

      <div className="section-heading">
        <div>
          <h5>Recent Programs</h5>
          <p>Latest programs added to the foundation.</p>
        </div>

        <button className="view-all-btn">
          View All <FaArrowRight />
        </button>
      </div>

      {programs.map((program) => {
        const Icon = program.icon;

        return (
          <div className="program-row" key={program.title}>

            <div className="program-icon">
              <Icon />
            </div>

            <div>
              <h6>{program.title}</h6>
              <span>{program.category}</span>
            </div>

            <FaArrowRight className="row-arrow" />

          </div>
        );
      })}

    </div>
  );
}

export default RecentPrograms;
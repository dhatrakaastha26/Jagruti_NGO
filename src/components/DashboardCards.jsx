// import {
//   FaHandsHelping,
//   FaHandHoldingHeart,
//   FaNewspaper,
//   FaUsers,
// } from "react-icons/fa";

// const cards = [
//   {
//     title: "Active Programs",
//     value: "12",
//     icon: FaHandsHelping,
//     type: "navy",
//   },
//   {
//     title: "Total Donations",
//     value: "₹35,000",
//     icon: FaHandHoldingHeart,
//     type: "red",
//   },
//   {
//     title: "Published Blogs",
//     value: "24",
//     icon: FaNewspaper,
//     type: "navy",
//   },
//   {
//     title: "Beneficiaries",
//     value: "2,540",
//     icon: FaUsers,
//     type: "red",
//   },
// ];

// function DashboardCards() {
//   return (
//     <div className="row g-4 dashboard-cards">

//       {cards.map((card) => {
//         const Icon = card.icon;

//         return (
//           <div className="col-12 col-sm-6 col-xl-3" key={card.title}>
//             <div className={`dashboard-card ${card.type}`}>

//               <div className="card-icon">
//                 <Icon />
//               </div>

//               <div>
//                 <p>{card.title}</p>
//                 <h3>{card.value}</h3>
//               </div>

//               <span className="card-decoration">
//                 <Icon />
//               </span>

//             </div>
//           </div>
//         );
//       })}

//     </div>
//   );
// }

// export default DashboardCards;

import {
  FaBookOpen,
  FaUsers,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { MdGroups } from "react-icons/md";

function DashboardCards() {
  const cards = [
    {
      title: "Total Programs",
      value: "24",
      growth: "20%",
      icon: <FaBookOpen />,
      color: "purple",
    },
    {
      title: "Beneficiaries",
      value: "12,450+",
      growth: "15%",
      icon: <FaUsers />,
      color: "pink",
    },
    {
      title: "Total Donations",
      value: "₹ 8,65,430",
      growth: "12%",
      icon: <FaHandHoldingHeart />,
      color: "green",
    },
    {
      title: "Volunteers",
      value: "320+",
      growth: "10%",
      icon: <MdGroups />,
      color: "blue",
    },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <div className={`icon-circle ${card.color}`}>
            {card.icon}
          </div>

          <div className="card-content">
            <h4>{card.title}</h4>
            <h2>{card.value}</h2>

            <p className="growth">
              ↑ {card.growth} this month
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
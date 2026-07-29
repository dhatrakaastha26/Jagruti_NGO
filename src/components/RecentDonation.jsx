import { FaArrowRight, FaUserCircle } from "react-icons/fa";
import "../assets/css/RecentDonation.css";
const donations = [
  { name: "Anonymous Donor", amount: "₹5,000" },
  { name: "Rahul Sharma", amount: "₹2,000" },
  { name: "Priya Patil", amount: "₹1,500" },
];

function RecentDonations() {
  return (
    <div className="dashboard-section">

      <div className="section-heading">
        <div>
          <h5>Recent Donations</h5>
          <p>Latest contributions received.</p>
        </div>

        <button className="view-all-btn">
          View All <FaArrowRight />
        </button>
      </div>

      {donations.map((donation) => (
        <div className="donation-row" key={donation.name}>

          <FaUserCircle className="donor-icon" />

          <div>
            <h6>{donation.name}</h6>
            <span>Donation received</span>
          </div>

          <strong>{donation.amount}</strong>

        </div>
      ))}

    </div>
  );
}

export default RecentDonations;
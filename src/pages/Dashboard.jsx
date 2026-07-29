import AdminLayout from "../layouts/AdminLayout";
import DashboardCards from "../components/DashboardCards";
import RecentPrograms from "../components/RecentPrograms";
import RecentDonations from "../components/RecentDonation";
import QuickActions from "../components/QuickActions";

function Dashboard() {
  return (
    <AdminLayout>
      <div className="dashboard">

        {/* HERO HEADER */}
        <div className="dashboard-hero">
          <div className="hero-content">

            <span className="dashboard-label">
              ADMIN DASHBOARD
            </span>

            <h1>
              Welcome back, Admin 👋
            </h1>

            <p>
              Manage Jagruti Foundation's programs, donations and community impact from one place.
            </p>

            <div className="date-badge">
              📅 Today • Foundation Overview
            </div>

          </div>
        </div>

        {/* STATISTICS */}
        <div className="stats-wrapper">
          <DashboardCards />
        </div>

        {/* QUICK ACTIONS */}
        <QuickActions />

        {/* FEATURE + ACTIVITY */}
        <div className="row g-4 bottom-section">

          <div className="col-12 col-lg-4">

            <div className="welcome-card">

              <div className="welcome-icon">
                ❤️
              </div>

              <h3>
                Together, We Create Impact
              </h3>

              <p>
                Every program, donation and initiative helps us build a stronger and more empowered community.
              </p>

              <div className="welcome-circle"></div>

            </div>

          </div>

          <div className="col-12 col-lg-8">

            <div className="row g-4 h-100">

              <div className="col-12 col-md-6">
                <RecentPrograms />
              </div>

              <div className="col-12 col-md-6">
                <RecentDonations />
              </div>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default Dashboard;
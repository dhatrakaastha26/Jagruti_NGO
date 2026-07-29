function RecentOrders() {

  const orders = [

    {
      id:101,
      customer:"Rahul",
      product:"Laptop",
      amount:"₹55000",
      status:"Completed"
    },

    {
      id:102,
      customer:"Amit",
      product:"Mobile",
      amount:"₹25000",
      status:"Pending"
    },

    {
      id:103,
      customer:"Sneha",
      product:"Headphone",
      amount:"₹3500",
      status:"Completed"
    },

    {
      id:104,
      customer:"Priya",
      product:"Keyboard",
      amount:"₹1800",
      status:"Cancelled"
    }

  ];

  return (

    <div className="card shadow border-0 mt-4">

      <div className="card-body">

        <h5 className="mb-3">

          Recent Orders

        </h5>

        <table className="table table-hover">

          <thead>

            <tr>

              <th>ID</th>

              <th>Customer</th>

              <th>Product</th>

              <th>Amount</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {

              orders.map((item)=>(

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>{item.customer}</td>

                  <td>{item.product}</td>

                  <td>{item.amount}</td>

                  <td>

                    <span className={`badge ${
                      item.status==="Completed"
                      ?"bg-success"
                      :item.status==="Pending"
                      ?"bg-warning text-dark"
                      :"bg-danger"
                    }`}>

                      {item.status}

                    </span>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default RecentOrders;
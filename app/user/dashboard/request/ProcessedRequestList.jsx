import moment from "moment";

export default async function ProcessedRequestList({ requests }) {
  return (
    <div>
      <h4>Processed Requests</h4>
      <table className="table">
        <thead>
          <tr className="table__row table__row--size-head">
            <th>No.</th>
            <th>Requested Date</th>
            <th>Type</th>
            <th>From</th>
            <th>Department</th>
            <th>Detail</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            requests.map((request, index) => {
              const { id, detail, createdAt, requestType, requestOwner, requestDepartment, status } = request;
              if (!requestDepartment.name.startsWith("__") && status.name !== "pending") {
                return (
                  <tr key={index} className="table__row table__row--size-body">
                    <td className="table__cel">{index}</td>
                    <td className="table__cel table__cel--date">{moment(createdAt).format("MM/DD")}</td>
                    <td className="table__cel">{requestType.name}</td>
                    <td className="table__cel">{`${requestOwner.firstName} ${requestOwner.lastName}`}</td>
                    <td className="table__cel">{requestDepartment.name}</td>
                    <td className="table__cel"><div className="table__cel--detail"><span>{`${detail} | status: ${status.name}`}</span></div></td>
                    <td className="table__cel">
                      <div>
                        {status.name === "denied" && <span className="form__text--error-message">{status.name}</span>}
                        {status.name === "approved" && <span className="form__text--success-message">{status.name}</span>}
                        {status.name === "canceled" && <span className="form__text--canceled">{status.name}</span>}
                      </div>
                    </td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
    </div>
  )
}
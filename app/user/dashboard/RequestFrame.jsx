import Link from "next/link";

export default async function RequestFrame({ requests }) {
  return (
    <div className="request-status-frame">
      <div className="frame">
        <h4>Request Status</h4>
        <ul className="list list--no-wrap">

          {
            requests.length === 0
              ?
              <li className="list__item">
                <p>No requests yet.</p>
              </li>
              :
              requests.slice(0, 4).map(({ detail, createdAt, requestType, status }, index) => {
                return (
                  <li key={index} className="list__item">
                    <p>{requestType.name}: {new Date(createdAt).toLocaleDateString()}: {detail} | {status.name}</p>
                  </li>
                )
              })
          }
        </ul>
        {
          requests.length > 4 &&
          <div className="btn btn--show-all">
            <Link className="btn--show-all__text" href="/user/dashboard/request">SHOW ALL</Link>
          </div>
        }
      </div>
    </div>
  )
}
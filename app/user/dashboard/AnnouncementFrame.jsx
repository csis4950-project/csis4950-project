import Link from "next/link";

export default async function AnnouncementFrame({ announcements }) {
  return (
    <div className="announcement p__v12h24">
      <div className="frame">
        <h4>Announcements</h4>
        <ul className="list list--no-wrap">
          {
            announcements.slice(0, 4).map(({ title, detail, createdAt, announcementType }, index) => {
              return (
                <li key={index} className="list__item">
                  <p>{announcementType.name}: {new Date(createdAt).toLocaleDateString()}...{title} : {detail}</p>
                </li>
              )
            })
          }
        </ul>
        {
          announcements.length > 4 &&
          <div className="btn btn--show-all">
            <Link className="btn--show-all__text" href="/user/dashboard/announcement">SHOW ALL</Link>
          </div>
        }
      </div>
    </div>
  )
}
export default function Dashboard({ params }) {
  console.log(params);
  return (
    <div>
      <h1>dashboard here</h1>
      <p>parameter: { params.userId }</p>
    </div>
  )
}
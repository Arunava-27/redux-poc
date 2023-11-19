import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100px",
        height: "100px",
        margin: "-50px 0 0 -50px",
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Loader
import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>404: Route Not Found</h1>
    <p>Hono served the <code>index.html</code>, but React doesn't recognize this URL path!</p>
    <div style={{ marginTop: '20px' }}>
      <Link 
        to="/" 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#646cff', 
          color: 'white', 
          borderRadius: '8px',
          textDecoration: 'none'
        }}
      >
        Return to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
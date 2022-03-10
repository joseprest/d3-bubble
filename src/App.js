import React from "react"
import "./App.css";
import Bubbles from "./Bubbles";

const allCompanies = [
  {
    name: 'Doordash',
    small_logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/c29b3c85a1f648ebedea88c22f4656bafc2e7823.png'
  },
  {
    name: 'Zapier',
    small_logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/3e9a0092bee2ccf926e650e59c06503ec6b9ee65.png'
  },
  {
    name: 'Ironclad',
    small_logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/2f5bed7ab9abb66ee8ccbf622c27a9d741c3c4e4.png'
  },
  {
    name: 'Opensea',
    small_logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/d0e24465d91469fa05da337659e25131f5295e3d.png'
  },
  {
    name: 'Podium',
    small_logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/d5d8aefda7d4e7fdbe927854bc8021fbacdcbfb3.png'
  },
  {
    name: 'Doordash',
    small_logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/6c32f4ec11ecb3b2d9e5a551de4e5eb607aacd61.png'
  },
  {
    name: 'Fivetran',
    small_logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/d6b5710a13038fe1daa1421a986e1f4a7839a65a.png'
  },
  {
    name: 'Checkr',
    small_logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/d13287c52acc96909f32342e85c26a33cfdac310.png'
  },
  {
    name: 'Whatnot',
    small_logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/b9aae9ad065dcf8b7a07d47b45a0667c6953810b.png'
  },
  {
    name: 'Reddit',
    small_logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/26e4e494d6e29defd6a16183daf6bb53bd2e1844.png'
  },
  {
    name: 'Airbnb',
    small_logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/97b50381d59a451de03ed83ea27722b26a5f86b0.png'
  },
]
function App() {
  return (
    <div className="App">
      <div className="content">
        <Bubbles
          logos={allCompanies.map((c) => c.small_logo_url)}
        />
      </div>
    </div>
  );
}

export default App;

import './App.css';
import supabase from "./utils/supabase"
import { useEffect, useState } from 'react';

type Product = {
  id: number
  name: string
  description: string
  image_url: string
  price: number
}

function App() {

  const [products, setProducts] = useState<Product[]>([] )

  const getAllProducts = async () => {
    const { data, status, error } = await supabase.from("product").select()

    if(error) {
      console.error(error, status)
      return
    }

    if(data !== null && data.length != 0) {
      setProducts(data)
    }

  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <div className="logo">Rose and Patry shop</div>
          <ul className="nav-links">
            <li><a href="#home">Inicio</a></li>
            <li><a href="#products">Productos</a></li>
            <li><a href="#about">Nosotros</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Bienvenido a 'Rose and Patry shop'</h1>
          <p>Los mejores productos al mejor precio</p>
          <a href="#products"><button className="cta-button">Ver Catálogo</button></a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        <h2>Nuestros Productos Destacados</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <div className="price">${product.price.toLocaleString()}</div>
                <button className="buy-button">Ver Detalles</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>Sobre Nosotros</h2>
            <p>Somos Rosio y Patricia</p>
            <ul className="about-features">
              <li>✅ Garantía de 2 años</li>
              <li>✅ Envíos a todo el país</li>
              <li>✅ Soporte técnico 24/7</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Contacto</h2>
            <div>
            <a href='https://wa.me/5358259480?text=Hola,%20quiero%20contactarte%20por...'>Rosio</a>
            </div>
            <div>
              <a href='https://wa.me/5355726923?text=Hola,%20quiero%20contactarte%20por...'>Patricia</a>
            </div>
            <p>📧 info@techstore.com</p>
            <p>📍 Av. Tecnológica 1234, Ciudad Digital</p>
            <div className="social-links">
              <a href="#fb">Facebook</a>
              <a href="#tw">Twitter</a>
              <a href="#ig">Instagram</a>
            </div>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Nombre" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Mensaje" rows={5} required></textarea>
            <button type="submit">Enviar Mensaje</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2023 TechStore. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#terms">Términos de servicio</a>
          <a href="#privacy">Política de privacidad</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
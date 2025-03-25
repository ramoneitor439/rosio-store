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
    const { data: products} = await supabase.from("product").select()

    console.log("Products: ", products)

    if(products !== null && products.length > 1) {
      setProducts(products)
    }

  }

  useEffect(() => {
    getAllProducts()
  }, [products])

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <div className="logo">TechStore</div>
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
          <h1>Bienvenido a TechStore</h1>
          <p>Los mejores productos tecnológicos al mejor precio</p>
          <button className="cta-button">Ver Catálogo</button>
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
            <p>Somos una empresa líder en tecnología con más de 10 años de experiencia en el mercado. Nuestro compromiso es ofrecer productos de la más alta calidad con el mejor servicio al cliente.</p>
            <ul className="about-features">
              <li>✅ Garantía de 2 años</li>
              <li>✅ Envíos a todo el país</li>
              <li>✅ Soporte técnico 24/7</li>
            </ul>
          </div>
          <img src="https://via.placeholder.com/500x400" alt="Nuestra empresa" className="about-image" />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Contacto</h2>
            <p>📞 +1 234 567 890</p>
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
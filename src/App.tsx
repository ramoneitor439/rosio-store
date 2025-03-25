import './App.css';
import WhatsappIcon from './components/WhatsappIcon';
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

  const [products, setProducts] = useState<Product[]>([])
  const rosioWhatsappMsg = "https://wa.me/5358259480?text="
  const patriciaWhatsappMsg = "https://wa.me/51539789?text="

  const buildProductMsg = (url: string, product: string) => {
    const codedMsg = encodeURIComponent(
      `Hola, le escribo para preguntar por el producto ${product} que vi en su tienda.`
    );
    return url + codedMsg
  }

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
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a href={buildProductMsg(rosioWhatsappMsg, product.name)}><button className="buy-button">Hacer pedido (Rosío)</button></a>
                  <a href={buildProductMsg(patriciaWhatsappMsg, product.name)}><button className="buy-button">Hacer pedido (Patricia)</button></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Contacto</h2>
            <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
              <a href="Hola,%20quiero%20contactarte%20por...'" className="whatsapp-btn" target="_blank">
                <span className="whatsapp-icon">
                  <WhatsappIcon width='20px' height='20px' />
                </span>
                <div className="contact-info">
                    <span className="contact-name">Rosío</span>
                    <span className="contact-number">+53 58259480</span>
                </div>
              </a>
              <a href="https://wa.me/5351539789?text=Hola,%20quiero%20contactarte%20por...'" className="whatsapp-btn" target="_blank">
                <span className="whatsapp-icon">
                  <WhatsappIcon width='20px' height='20px' />
                </span>
                <div className="contact-info">
                    <span className="contact-name">Patricia</span>
                    <span className="contact-number">+53 51539789</span>
                </div>
              </a>
            </div>
            <p>📍 Granma, Yara. Mateo Romás calle C #195</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2023 Rose and Patry shop. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
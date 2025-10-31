import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  imageUrl?: string; // Optional image for product
}

interface Scenario {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  feedback: string;
  productIds?: string[]; // Products relevant to this scenario
  policyId?: string; // Policy relevant to this scenario
}

interface Policy {
  id: string;
  title: string;
  content: string;
}

const mockProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Ergonomic Office Chair',
    brand: 'ComfortCo',
    description: 'High-back ergonomic chair with lumbar support and adjustable armrests. Perfect for long working hours, promoting good posture and reducing back strain.',
    price: 350,
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Office+Chair',
  },
  {
    id: 'prod2',
    name: 'Modern Glass Coffee Table',
    brand: 'SleekDesigns',
    description: 'Tempered glass top with chrome legs, perfect for contemporary living spaces. Adds a touch of elegance and openness to any living room.',
    price: 200,
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Coffee+Table',
  },
  {
    id: 'prod3',
    name: 'Classic Wooden Bookshelf',
    brand: 'HeritageCraft',
    description: 'Solid oak bookshelf with five adjustable shelves, timeless design. Ideal for organizing books, displaying decor, and adding warmth to a room.',
    price: 450,
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Bookshelf',
  },
  {
    id: 'prod4',
    name: 'Luxury Leather Sofa',
    brand: 'EliteComfort',
    description: 'Premium Italian leather sofa with deep cushioning and sturdy hardwood frame. Offers unparalleled comfort and sophistication for your living area.',
    price: 1200,
    imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Leather+Sofa',
  },
  {
    id: 'prod5',
    name: 'Adjustable Standing Desk',
    brand: 'WorkSmart',
    description: 'Electric height-adjustable desk promoting a healthier work environment. Features memory presets and a spacious desktop.',
    price: 600,
    imageUrl: 'https://via.placeholder.com/150/00FFFF/000000?text=Standing+Desk',
  },
];

const mockPolicies: Policy[] = [
  {
    id: 'policy1',
    title: 'Return Policy',
    content: 'Customers can return items within 30 days of purchase with a valid receipt for a full refund. Items must be in their original condition and packaging. Custom orders are non-refundable.',
  },
  {
    id: 'policy2',
    title: 'Delivery Policy',
    content: 'Standard delivery takes 5-7 business days. Expedited delivery options are available at an additional cost. Assembly services can be requested for an extra fee.',
  },
];

const mockScenarios: Scenario[] = [
  {
    id: 'scenario1',
    question: 'A customer is looking for a comfortable office chair for long working hours. Which product would you recommend?',
    options: ['Modern Glass Coffee Table', 'Ergonomic Office Chair', 'Classic Wooden Bookshelf', 'Luxury Leather Sofa'],
    correctAnswer: 'Ergonomic Office Chair',
    feedback: 'The Ergonomic Office Chair is designed for comfort during long working hours, making it the ideal recommendation. Remember to highlight its lumbar support and adjustable features!',
    productIds: ['prod1'],
  },
  {
    id: 'scenario2',
    question: 'A customer wants a stylish centerpiece for their living room. Which product fits this description best?',
    options: ['Ergonomic Office Chair', 'Modern Glass Coffee Table', 'Classic Wooden Bookshelf', 'Adjustable Standing Desk'],
    correctAnswer: 'Modern Glass Coffee Table',
    feedback: 'The Modern Glass Coffee Table offers a sleek and contemporary design, perfect as a stylish centerpiece. Its tempered glass top and chrome legs are key selling points.',
    productIds: ['prod2'],
  },
  {
    id: 'scenario3',
    question: 'A customer wants to return a custom-ordered sofa after 15 days because they changed their mind. What is the correct policy to inform them about?',
    options: ['They can return it for a full refund.', 'They can return it for store credit.', 'Custom orders are non-refundable.', 'They can exchange it for another item.'],
    correctAnswer: 'Custom orders are non-refundable.',
    feedback: 'According to our Return Policy, custom orders are non-refundable. It\'s crucial to communicate this clearly to customers at the time of purchase.',
    policyId: 'policy1',
  },
  {
    id: 'scenario4',
    question: 'A customer is asking about the estimated delivery time for a standard order. What should you tell them?',
    options: ['2-3 business days', 'Next day delivery', '5-7 business days', 'It depends on the product'],
    correctAnswer: '5-7 business days',
    feedback: 'Our standard delivery typically takes 5-7 business days. Always confirm this with the customer and mention expedited options if they are in a hurry.',
    policyId: 'policy2',
  },
];

const Game: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetails, setShowProductDetails] = useState(false);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('furnitureGameHighScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('furnitureGameHighScore', score.toString());
    }
  }, [score, highScore]);

  const currentScenario = mockScenarios[currentScenarioIndex];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowFeedback(true);
    if (option === currentScenario.correctAnswer) {
      setScore(score + 1);
      setFeedback(currentScenario.feedback + ' Correct!');
    } else {
      setFeedback(currentScenario.feedback + ' Incorrect. The correct answer was: ' + currentScenario.correctAnswer + '. ' + currentScenario.feedback);
    }
  };

  const handleNextScenario = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedback('');
    if (currentScenarioIndex < mockScenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      alert(`Game Over! Your score: ${score}/${mockScenarios.length}`);
      if (score > highScore) {
        alert('New High Score!');
      }
      setCurrentScenarioIndex(0); // Reset for now
      setScore(0);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleCloseProductDetails = () => {
    setShowProductDetails(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Furniture Sales Training Game</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Scenario {currentScenarioIndex + 1} of {mockScenarios.length}</h5>
          <p className="card-text">{currentScenario.question}</p>
          <div className="list-group">
            {currentScenario.options.map((option, index) => (
              <button
                key={index}
                className={`list-group-item list-group-item-action ${selectedOption === option ? (option === currentScenario.correctAnswer ? 'list-group-item-success' : 'list-group-item-danger') : ''}`}
                onClick={() => handleOptionClick(option)}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className={`alert mt-3 ${selectedOption === currentScenario.correctAnswer ? 'alert-success' : 'alert-danger'}`} role="alert">
              {feedback}
            </div>
          )}
          {showFeedback && (
            <button className="btn btn-primary mt-3" onClick={handleNextScenario}>
              Next Scenario
            </button>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <p>Score: {score} | High Score: {highScore}</p>
        <p>Total Scenarios: {mockScenarios.length}</p>
      </div>

      <h2 className="mt-5">Product Catalog</h2>
      <div className="row">
        {mockProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100" onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
              {product.imageUrl && <img src={product.imageUrl} className="card-img-top" alt={product.name} />}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{product.brand}</h6>
                <p className="card-text">{product.description.substring(0, 100)}...</p>
                <p className="card-text"><strong>Price: ${product.price}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {showProductDetails && selectedProduct && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.name}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseProductDetails}></button>
              </div>
              <div className="modal-body">
                {selectedProduct.imageUrl && <img src={selectedProduct.imageUrl} className="img-fluid mb-3" alt={selectedProduct.name} />}
                <p><strong>Brand:</strong> {selectedProduct.brand}</p>
                <p><strong>Description:</strong> {selectedProduct.description}</p>
                <p><strong>Price:</strong> ${selectedProduct.price}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseProductDetails}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
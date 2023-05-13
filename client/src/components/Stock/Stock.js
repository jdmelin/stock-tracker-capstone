import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

function Stock({
  onAddStockToFavorites,
  onRemoveStockFromFavorites,
  stock,
  type,
}) {
  const { favorite, id, name, price, symbol } = stock;

  const addStockToFavorites = () => {
    onAddStockToFavorites(id);
  };

  const removeStockFromFavorites = () => {
    onRemoveStockFromFavorites(id);
  };

  const renderButton = () => {
    if (type === 'all') {
      return (
        <Button
          className={`${favorite ? 'disabled' : ''}`}
          onClick={addStockToFavorites}
          variant="primary"
        >
          Add to favorites!
        </Button>
      );
    }

    if (type === 'my') {
      return (
        <Button onClick={removeStockFromFavorites} variant="danger">
          Remove from favorites
        </Button>
      );
    }
  };

  return (
    <Col md="6" lg="3">
      <Card className="my-2">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{symbol}</Card.Subtitle>
          <Card.Text>${price}</Card.Text>
          {renderButton()}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Stock;

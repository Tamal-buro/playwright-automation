// playwright/test API test for https://fakestoreapi.com/products
const { test, expect } = require('@playwright/test');

// Optional: JSON schema for product validation
const productSchema = {
  type: 'object',
  required: ['id', 'title', 'price', 'category', 'description'],
  properties: {
    id: { type: ['integer', 'number'] },
    title: { type: 'string' },
    price: { type: ['number', 'integer'] },
    category: { type: 'string' },
    description: { type: 'string' },
  },
};

function validateProductSchema(product) {
  for (const key of productSchema.required) {
    if (!(key in product)) {
      return `Missing key: ${key}`;
    }
    const expectedType = productSchema.properties[key].type;
    const actualType = typeof product[key];
    if (Array.isArray(expectedType)) {
      if (!expectedType.includes(actualType)) {
        return `Key '${key}' has type '${actualType}', expected one of ${expectedType}`;
      }
    } else if (actualType !== expectedType) {
      return `Key '${key}' has type '${actualType}', expected '${expectedType}'`;
    }
  }
  return null;
}

test('GET /products/1 returns a valid product object', async ({ request }) => {
  const url = 'https://fakestoreapi.com/products/1';
  console.log(`Sending GET request to: ${url}`);
  const response = await request.get(url);
  expect(response.status(), 'Status code should be 200').toBe(200);

  const product = await response.json();
  expect(typeof product, 'Response should be an object').toBe('object');
  // Validate required keys
  for (const key of productSchema.required) {
    expect(product, `Product should have key: ${key}`).toHaveProperty(key);
  }
  // Optional: Validate types
  const schemaError = validateProductSchema(product);
  expect(schemaError, schemaError || 'Product schema valid').toBeNull();
  // Log title and price
  console.log(`Product: ${product.title} | Price: $${product.price}`);
});

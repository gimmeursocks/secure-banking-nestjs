import { Sequelize } from 'sequelize';
import { User } from '../entity/user.entity';

describe('Database Integration Test', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    // Create a Sequelize instance and connect to the database
    sequelize = new Sequelize('test', 'root', 'root', {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
    });

    // Sync the model with the database
    await User.sync({ force: true }); // Force sync to recreate the table
  });

  afterAll(async () => {
    // Close the Sequelize connection
    await sequelize.close();
  });

  it('should connect to the database', async () => {
    // Test database connection
    await sequelize.authenticate();
  });

  it('should create a user', async () => {
    // Create a new user
    const user = await User.create({
        email: 'testuser@example.com',
        password: 'testuser'
    });

    // Verify that the user was created successfully
    expect(user.id).toBeDefined();
    expect(user.email).toBe('testuser@example.com');
    expect(user.password).toBe('testuser');
  });

  it('should find users', async () => {
    // Find all users
    const users = await User.findAll();

    // Verify that users were found
    expect(users).toHaveLength(1);
  });

  // Add more tests for other CRUD operations as needed
});
